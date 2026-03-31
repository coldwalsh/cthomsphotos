import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function GalleryPage({ title, description, heroCover, photos = [] }) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [fade, setFade] = useState(true)
  const [sortedPhotos, setSortedPhotos] = useState(photos)
  const [portraitSet, setPortraitSet] = useState(new Set())

  const heroPhotos = photos.length > 0 ? photos : [heroCover]

  // Sort: landscape first, then portrait
  useEffect(() => {
    if (photos.length === 0) return
    Promise.all(
      photos.map(src => new Promise(resolve => {
        const img = new Image()
        img.onload = () => resolve({ src, landscape: img.naturalWidth >= img.naturalHeight })
        img.onerror = () => resolve({ src, landscape: true })
        img.src = src
      }))
    ).then(results => {
      const landscape = results.filter(r => r.landscape).map(r => r.src)
      const portrait  = results.filter(r => !r.landscape).map(r => r.src)
      setSortedPhotos([...landscape, ...portrait])
      setPortraitSet(new Set(portrait))
    })
  }, [photos])

  // Auto-advance hero slideshow
  useEffect(() => {
    if (heroPhotos.length <= 1) return
    const id = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setHeroIndex(i => (i + 1) % heroPhotos.length)
        setFade(true)
      }, 800)
    }, 5000)
    return () => clearInterval(id)
  }, [heroPhotos.length])

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return
    function onKey(e) {
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % sortedPhotos.length)
      if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + sortedPhotos.length) % sortedPhotos.length)
      if (e.key === 'Escape')     setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, photos.length])

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header />

      <main className="flex-1 pt-16">
        {/* ── Hero slideshow ── */}
        <div className="relative w-full h-[70vh] overflow-hidden bg-black">
          <img
            src={heroPhotos[heroIndex]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: fade ? 1 : 0 }}
          />
          <div className="absolute inset-0 bg-black/45" />

          {/* Back arrow */}
          <Link
            to="/portfolio"
            className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Portfolio
          </Link>

          {/* Slide dots
          {heroPhotos.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {heroPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setHeroIndex(i); setFade(true) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )} */}

          {/* Title */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 max-w-xl pr-4">
            <h1 className="text-3xl md:text-5xl font-light text-white mb-2 md:mb-3">{title}</h1>
            {description && (
              <p className="text-white/80 text-sm md:text-base leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        {/* ── Photo grids ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 space-y-4">
          {photos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400">
              <p className="text-lg">No photos yet</p>
              <p className="text-sm mt-1">Add images to the assets folder</p>
            </div>
          ) : (
            <>
              {/* Landscape grid */}
              {(() => {
                const landscapes = sortedPhotos.filter(src => !portraitSet.has(src))
                const placeholders = landscapes.length % 3 === 0 ? 0 : 3 - (landscapes.length % 3)
                return landscapes.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-5xl italic text-center pb-7 font-accent text-bold text-accent">Landscapes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                      {landscapes.map((src, i) => (
                        <div
                          key={src}
                          className="aspect-[3/2] rounded-sm overflow-hidden cursor-pointer group"
                          onClick={() => setLightbox(sortedPhotos.indexOf(src))}
                        >
                          <img
                            src={src}
                            alt={`${title} landscape ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          />
                        </div>
                      ))}
                      {Array.from({ length: placeholders }).map((_, i) => (
                        <div key={`land-ph-${i}`} className="aspect-[3/2] rounded-sm bg-black/90 items-center justify-center coming-soon-tile">
                          <span className="coming-soon-text">Coming Soon...</span>
                        </div>
                      ))}
                    </div>
                  </div> 
                )
              })()}

              {/* Portrait grid */}
              {(() => {
                const portraits = sortedPhotos.filter(src => portraitSet.has(src))
                const placeholders = portraits.length % 4 === 0 ? 0 : 4 - (portraits.length % 4)
                return portraits.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-5xl italic text-center py-7 font-accent text-bold text-accent">Portraits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
                      {portraits.map((src, i) => (
                        <div
                          key={src}
                          className="aspect-[2/3] rounded-sm overflow-hidden cursor-pointer group"
                          onClick={() => setLightbox(sortedPhotos.indexOf(src))}
                        >
                          <img
                            src={src}
                            alt={`${title} portrait ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          />
                        </div>
                      ))}
                      {Array.from({ length: placeholders }).map((_, i) => (
                        <div key={`port-ph-${i}`} className="aspect-[2/3] rounded-sm bg-black/90 items-center justify-center coming-soon-tile">
                          <span className="coming-soon-text">Coming Soon...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 animate-fade-in flex items-center justify-center"
          style={{ backdropFilter: 'blur(12px) brightness(0.35)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Photo wrapper — full screen on mobile, constrained on desktop */}
          <div
            className="relative w-full h-full md:w-auto md:h-auto md:max-h-[90vh] md:max-w-[85vw] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={sortedPhotos[lightbox]}
              alt=""
              className="w-full h-full object-contain md:max-h-[90vh] md:max-w-[85vw] md:w-auto md:h-auto select-none"
            />

            {/* Close — top-right of photo wrapper */}
            <button
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-accent hover:text-white transition-all duration-200 text-lg leading-none"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-xs font-primary tracking-widest bg-black/30 px-3 py-1 rounded-full">
              {lightbox + 1} / {sortedPhotos.length}
            </div>
          </div>

          {/* Left arrow — outside photo, on screen edge */}
          <button
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
            onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + sortedPhotos.length) % sortedPhotos.length) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
            onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % sortedPhotos.length) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
