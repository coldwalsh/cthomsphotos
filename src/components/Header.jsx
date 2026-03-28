import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
]

export default function Header({ transparent = false }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = transparent
    ? 'text-white hover:text-accent-lt'
    : 'text-gray-800 hover:text-accent-lt'

  const activeBorder = transparent ? 'border-b border-white pb-0.5' : 'border-b border-black pb-0.5'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 ${
        transparent
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
      }`}
    >
      {/* Desktop left nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.slice(0, 2).map((link) => {
          const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${linkClass} ${active ? activeBorder : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Center brand */}
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className={`absolute left-1/2 -translate-x-1/2 text-base md:text-lg font-medium tracking-wide whitespace-nowrap ${
          transparent ? 'text-white' : 'text-gray-900'
        }`}
      >
        Christian Thompson
      </Link>

      {/* Desktop right nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.slice(2).map((link) => {
          const active = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${linkClass} ${active ? activeBorder : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden ml-auto z-10 flex flex-col justify-center gap-[5px] p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-px transition-all duration-300 origin-center ${transparent || menuOpen ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block w-6 h-px transition-all duration-300 ${transparent || menuOpen ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px transition-all duration-300 origin-center ${transparent || menuOpen ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-600 flex flex-col items-center py-8 gap-6 border-t border-gray-500 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-accent-lt text-lg font-light tracking-[0.2em] uppercase font-primary hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
