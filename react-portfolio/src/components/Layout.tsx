import { NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import MusicPlayer from './MusicPlayer'

function Layout() {
  return (
    <>
      <ThemeToggle />
      {/* Hidden YouTube player container */}
      <div id="yt-player" aria-hidden="true"></div>
      
      <nav className="navbar">
        <div className="container">
          <ul className="nav-links">
            <li><NavLink to="/" end className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>About Me</NavLink></li>
            <li><NavLink to="/academic-projects" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Academic Projects</NavLink></li>
            <li><NavLink to="/personal-projects" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Personal Projects</NavLink></li>
            <li><NavLink to="/art" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Art Projects</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Blogs/Reviews</NavLink></li>
            <li><NavLink to="/stuff-i-love" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Stuff I Love</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>Contact</NavLink></li>
          </ul>
        </div>
      </nav>

      <MusicPlayer />

      <Outlet />
    </>
  )
}

export default Layout
