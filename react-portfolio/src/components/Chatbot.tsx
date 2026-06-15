import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Hi! Ask me anything about Thomas or this portfolio.' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    // TODO: Connect to your backend or LLM API (e.g., OpenAI, Gemini, Claude) here.
    // For now, it's a mock response. You'll need to pass the website's data as context to the LLM.
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "I'm a work-in-progress chatbot! Once connected to an AI API, I will be able to answer questions based strictly on the portfolio's content." 
      }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{
          width: '300px',
          height: '400px',
          backgroundColor: 'var(--bg-color, white)',
          color: 'var(--text-color, black)',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
          overflow: 'hidden'
        }}>
          <div style={{ backgroundColor: '#00bcd4', color: 'white', padding: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
            <span>Portfolio Assistant</span>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
          </div>

          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.role === 'user' ? '#00bcd4' : '#eee',
                color: msg.role === 'user' ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: '15px',
                maxWidth: '80%',
                wordWrap: 'break-word'
              }}>
                {msg.content}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #ccc', padding: '10px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '5px' }}
            />
            <button onClick={handleSend} style={{ padding: '8px 12px', backgroundColor: '#00bcd4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={toggleChat}
          style={{
            backgroundColor: '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}