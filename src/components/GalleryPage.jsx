import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * Reusable gallery page layout.
 *
 * Props:
 *   title       — page heading
 *   description — subtitle / blurb shown over the hero
 *   heroCover   — path to the full-width hero image (e.g. "/photos/places-cover.jpg")
 *   photos      — array of image src strings for the gallery grid
 */
export default function GalleryPage({ title, description, heroCover, photos = [] }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-16">
        {/* ── Full-width hero ── */}
        <div className="relative w-full h-[70vh] overflow-hidden">
          <img
            src={heroCover}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.classList.add('bg-gray-900')
            }}
          />
          <div className="absolute inset-0 bg-black/45" />

          {/* Back arrow */}
          <Link
            to="/portfolio"
            className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm tracking-wide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Portfolio
          </Link>

          {/* Title + description bottom-left */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 max-w-xl pr-4">
            <h1 className="text-3xl md:text-5xl font-light text-white mb-2 md:mb-3">{title}</h1>
            {description && (
              <p className="text-white/80 text-base leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        {/* ── Photo grid ── */}
        <div className="max-w-7xl mx-auto px-6 py-14">
          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400">
              <p className="text-lg">No photos yet</p>
              <p className="text-sm mt-1">Add image paths to this page's photos array</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${title} ${i + 1}`}
                  className="w-full h-72 object-cover hover:opacity-95 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
