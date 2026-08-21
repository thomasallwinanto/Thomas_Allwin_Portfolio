import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Route-split: each page ships its own chunk, fetched only when visited,
// instead of one bundle loaded up front for every first visit.
const About = lazy(() => import('./pages/About'))
const PersonalProjects = lazy(() => import('./pages/PersonalProjects'))
const Art3D = lazy(() => import('./pages/Art3D'))
const Blog = lazy(() => import('./pages/Blog'))
const StuffILove = lazy(() => import('./pages/StuffILove'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* Projects now live inside the About page; old links still resolve. */}
          <Route path="projects" element={<Navigate to="/about#cv-projects" replace />} />
          <Route path="academic-projects" element={<Navigate to="/about#cv-projects" replace />} />
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
    </Suspense>
  )
}

export default App
