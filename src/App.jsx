import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Places from './pages/Places'
import CapturedMoments from './pages/CapturedMoments'
import ShootsEvents from './pages/ShootsEvents'
import Videography from './pages/Videography'
import Contact from './pages/Contact'
import About from './pages/About'
import './index.css'

export default function App() {
  return (
    <BrowserRouter basename="/cthomsphotos">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/places" element={<Places />} />
        <Route path="/portfolio/captured-moments" element={<CapturedMoments />} />
        <Route path="/portfolio/shoots-events" element={<ShootsEvents />} />
        <Route path="/portfolio/videography" element={<Videography />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
