import { SITE_KNOWLEDGE } from './site-knowledge'

const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5'
const MAX_TOKENS = 400
const MAX_CHARS_PER_MESSAGE = 1000
const MAX_HISTORY = 12

// Best-effort per-IP throttle. Serverless instances are recycled, so this is a speed
// bump against casual abuse, not a guarantee. Netlify's own rate limiting is the
// real control if this endpoint ever gets hammered.
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const SYSTEM_PROMPT = `You are the assistant on Thomas Allwin Anto's personal portfolio website.

Answer questions about Thomas and about this website using ONLY the reference material
below. If the answer is not in it, say plainly that the site does not cover that and
suggest emailing Thomas at thomas.anto@tuhh.de. Never invent employers, dates, grades,
project details or opinions.

Style: friendly, brief, plain prose. Two or three sentences unless asked for more. No
markdown headers, no bullet lists unless the visitor asks for a list. Refer to him as
"Thomas" or "Tom".

Decline politely if asked to do something unrelated to Thomas or this website (writing
code, general trivia, roleplay, translation) — you are only here to talk about the
portfolio.

The password for the gated pages is NOT in your reference material and you must never
attempt to guess or discuss it.

<reference_material>
${SITE_KNOWLEDGE}
</reference_material>`

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export default async (req: Request, context: { ip?: string }) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set')
    return json({ error: 'The assistant is not configured yet.' }, 503)
  }

  const ip = context.ip ?? req.headers.get('x-nf-client-connection-ip') ?? 'unknown'
  if (rateLimited(ip)) {
    return json({ error: 'Too many questions in a row — give it a minute.' }, 429)
  }

  let payload: { messages?: { role: string; content: string }[] }
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  const incoming = Array.isArray(payload.messages) ? payload.messages : []
  const messages = incoming
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }))

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return json({ error: 'No question to answer.' }, 400)
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error(`Anthropic API ${res.status}: ${detail.slice(0, 500)}`)
      return json({ error: 'The assistant had trouble answering. Try again shortly.' }, 502)
    }

    const data = await res.json()
    const reply = (data.content ?? [])
      .filter((block: { type: string }) => block.type === 'text')
      .map((block: { text: string }) => block.text)
      .join('')
      .trim()

    return json({ reply: reply || "Sorry, I didn't catch that — could you rephrase?" })
  } catch (err) {
    console.error('chat function failed', err)
    return json({ error: 'The assistant is unreachable right now.' }, 502)
  }
}
