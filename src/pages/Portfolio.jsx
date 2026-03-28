import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const base = import.meta.env.BASE_URL

const categories = [
  {
    label: 'Places',
    to: '/portfolio/places',
    cover: `${base}photos/places-cover.jpg`,
  },
  {
    label: 'Captured Moments',
    to: '/portfolio/captured-moments',
    cover: `${base}photos/captured-moments-cover.jpg`,
  },
  {
    label: 'Shoots & Events',
    to: '/portfolio/shoots-events',
    cover: `${base}photos/shoots-events-cover.jpg`,
  },
]

const defaultCover = `${base}portfolio-cover.jpg`

export default function Portfolio() {
  const [hovered, setHovered] = useState(null)

  const activeCover = hovered ? hovered.cover : defaultCover

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header transparent />

      <main className="flex-1">
        <div className="relative w-full h-dvh overflow-hidden">
          {/* Render all covers, crossfade by opacity */}
          {[{ cover: defaultCover }, ...categories].map((cat) => (
            <img
              key={cat.cover}
              src={cat.cover}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: activeCover === cat.cover ? 1 : 0 }}
            />
          ))}

          <div className="absolute inset-0 bg-black/40" />

          {/* Category links — bottom-right on desktop, bottom-center on mobile */}
          <div className="absolute bottom-12 left-0 right-0 md:left-auto md:right-10 md:bottom-16 flex flex-col items-center md:items-end gap-3 md:gap-2 px-6 md:px-0 z-10">
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
                className="text-2xl md:text-4xl font-light text-white leading-snug transition-opacity duration-200 hover:opacity-70 text-center md:text-right"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
