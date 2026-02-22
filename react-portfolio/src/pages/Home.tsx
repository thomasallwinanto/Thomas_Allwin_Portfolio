function Home() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <p className="home-music-hint">Click the play button to listen to music as you scroll through the page.</p>
        <div style={{ margin: '1rem 0 0.5rem 0', display: 'flex', justifyContent: 'center' }}>
          <img id="profile-pic" src="/assets/profile.jpg" alt="Profile Picture" />
        </div>
        <h1 style={{ marginTop: '0.5rem', textAlign: 'center', color: '#333' }}>Hello, I'm Tom and welcome to my site :)</h1>
      </div>
    </section>
  )
}

export default Home
