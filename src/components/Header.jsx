import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
]

export default function Header({ transparent = false }) {
  const location = useLocation()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 ${
        transparent
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
      }`}
    >
      {/* Left nav */}
      <nav className="flex items-center gap-8">
        {navLinks.slice(0, 2).map((link) => {
          const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${
                transparent
                  ? `text-white hover:text-white/70 ${active ? 'border-b border-white pb-0.5' : ''}`
                  : `text-gray-800 hover:text-black ${active ? 'border-b border-black pb-0.5' : ''}`
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Center brand */}
      <Link
        to="/"
        className={`absolute left-1/2 -translate-x-1/2 text-lg font-medium tracking-wide ${
          transparent ? 'text-white' : 'text-gray-900'
        }`}
      >
        Christian Thompson
      </Link>

      {/* Right nav */}
      <nav className="flex items-center gap-8">
        {navLinks.slice(2).map((link) => {
          const active = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${
                transparent
                  ? `text-white hover:text-white/70 ${active ? 'border-b border-white pb-0.5' : ''}`
                  : `text-gray-800 hover:text-black ${active ? 'border-b border-black pb-0.5' : ''}`
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
