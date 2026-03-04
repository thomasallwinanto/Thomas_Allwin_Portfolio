import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PasswordProtected from './components/PasswordProtected'
import Home from './pages/Home'
import About from './pages/About'
import AcademicProjects from './pages/AcademicProjects'
import PersonalProjects from './pages/PersonalProjects'
import Art3D from './pages/Art3D'
import Blog from './pages/Blog'
import StuffILove from './pages/StuffILove'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<PasswordProtected><About /></PasswordProtected>} />
        <Route path="academic-projects" element={<PasswordProtected><AcademicProjects /></PasswordProtected>} />
        <Route path="personal-projects" element={<PersonalProjects />} />
        <Route path="art" element={<Art3D />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<Blog />} />
        <Route path="stuff-i-love" element={<StuffILove />} />
        <Route path="stuff-i-love/:category" element={<StuffILove />} />
        <Route path="contact" element={<Contact />} />
        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
