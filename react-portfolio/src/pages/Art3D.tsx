import { useState, useEffect, useRef } from 'react'

const modelFiles = [
  "A4BMBR.glb",
  "BAC.glb",
  "DEBRIS.glb",
  "Death_Stranding.glb",
  "PYRAMID.glb",
  "Project_frame.glb",
  "THE SHIP.glb",
  "VFP.glb",
  "For_Anna.glb"
]
const githubBase = "https://raw.githubusercontent.com/thomasallwinanto/Imaginary_Axis_files/main/"

function Art3D() {
  const [currentModelIdx, setCurrentModelIdx] = useState(0)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const modelViewerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Load model-viewer script
    if (!scriptLoaded && !document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
      script.onload = () => setScriptLoaded(true)
      document.head.appendChild(script)
    } else {
      setScriptLoaded(true)
    }
  }, [scriptLoaded])

  const prevModel = () => {
    setCurrentModelIdx((prev) => (prev - 1 + modelFiles.length) % modelFiles.length)
  }

  const nextModel = () => {
    setCurrentModelIdx((prev) => (prev + 1) % modelFiles.length)
  }

  return (
    <section id="art-3d">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0, textAlign: 'center' }}>
        <h2>Imaginary Axis</h2>
        <div style={{ width: '92%', maxWidth: '600px', textAlign: 'justify', margin: '0 auto 1.2rem auto', lineHeight: 1.6 }}>
          I started this project during the 2020 lockdown. I was limited with the technology I possessed and used Paint 3D for all the works below. I've lost most of the raw files, but those works are on{' '}
          <a href="https://www.instagram.com/imaginary_axis/" target="_blank" rel="noopener" style={{ color: '#00bcd4', textDecoration: 'underline' }}>@imaginary_axis</a> IG account.
        </div>

        <div style={{ width: '100%', maxWidth: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* @ts-ignore */}
          <model-viewer
            id="main-model-viewer"
            ref={modelViewerRef}
            src={`${githubBase}${modelFiles[currentModelIdx]}`}
            alt="3D Art"
            camera-controls
            auto-rotate
          />
        </div>
        <div id="model-fallback" style={{ display: 'none', color: '#d32f2f', fontSize: '1.1rem', marginTop: '1rem' }}>
          3D model could not be loaded. Please check that the file exists and is a valid .glb file.
        </div>
        <p style={{ marginTop: '1rem', color: '#00bcd4' }}>
          Tip: Use your mouse or touch to <br /> interact with the model.
        </p>
        <div id="viewer-controls" style={{ margin: '0.6rem 0 1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem', width: '100%', maxWidth: '700px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.96rem', width: '100%', maxWidth: '700px', boxSizing: 'border-box' }}>
            <button
              id="prev-model"
              onClick={prevModel}
              style={{ background: 'none', color: '#00bcd4', border: 'none', borderRadius: 0, padding: '0.5rem 1.2rem', cursor: 'pointer', fontSize: '2rem', lineHeight: 1 }}
            >
              &#9664;
            </button>
            <button
              id="next-model"
              onClick={nextModel}
              style={{ background: 'none', color: '#00bcd4', border: 'none', borderRadius: 0, padding: '0.5rem 1.2rem', cursor: 'pointer', fontSize: '2rem', lineHeight: 1 }}
            >
              &#9654;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Art3D
