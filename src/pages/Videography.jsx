import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const videoModules = import.meta.glob(
  '../assets/videos/*.{mp4,webm,mov,MP4,WEBM,MOV}',
  { eager: true }
)
const videos = Object.values(videoModules).map(m => m.default)

const PLACEHOLDER_COUNT = 3

export default function Videography() {
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [videoPlayer, setVideoPlayer] = useState(null)

  const slides = videos.length > 0 ? videos : new Array(PLACEHOLDER_COUNT).fill(null)

  function scrollToSlide(idx) {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
  }

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIdx(idx)
  }

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header transparent />

      <main className="flex-1">
        {/* ── Full-screen horizontal scroll-snap slideshow ── */}
        <div className="relative w-full h-dvh overflow-hidden">
          <div
            ref={scrollRef}
            className="flex h-full overflow-x-scroll overflow-y-hidden no-scrollbar"
            style={{ scrollSnapType: 'x mandatory', touchAction: 'pan-x' }}
            onScroll={handleScroll}
          >
            {slides.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-screen h-full bg-black"
                style={{ scrollSnapAlign: 'start' }}
              >
                {src ? (
                  <video
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 gap-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-white/20">
                      <path d="M2 6a2 2 0 012-2h9l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      <path fillRule="evenodd" d="M10 9a1 1 0 00-1.447-.894l-4 2a1 1 0 000 1.788l4 2A1 1 0 0010 13V9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm tracking-[0.3em] uppercase font-primary text-white/30">Coming Soon</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/35" />
              </div>
            ))}
          </div>

          {/* Back to Portfolio */}
          <Link
            to="/portfolio"
            className="absolute top-20 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm tracking-wide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Portfolio
          </Link>

          {/* Title */}
          <div className="absolute bottom-20 left-8 z-10 pointer-events-none">
            <h1 className="text-3xl md:text-5xl font-light text-white mb-2">Videography</h1>
            <p className="text-white/70 text-sm md:text-base">Stories captured in motion.</p>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx
                    ? 'w-5 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Right-arrow swipe hint — fades after first scroll */}
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none ${
              activeIdx === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white/50 animate-bounce-x"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>

          {/* Scroll down hint */}
          <div className="absolute bottom-8 right-8 z-10 text-white/40 text-xs font-primary tracking-widest hidden md:block">
            Scroll ↓ for gallery
          </div>
        </div>

        {/* ── Video gallery ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <h2 className="text-3xl md:text-4xl text-center pb-7 font-accent text-bold text-accent">Videos</h2>
          {videos.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video rounded-sm bg-black/90 coming-soon-tile">
                  <span className="coming-soon-text">Coming Soon...</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {videos.map((src, i) => (
                <div
                  key={src}
                  className="aspect-video rounded-sm overflow-hidden cursor-pointer group relative bg-black"
                  onClick={() => setVideoPlayer(i)}
                >
                  <video
                    src={src}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-3 text-white/60 text-xs font-primary tracking-widest bg-black/30 px-2 py-0.5 rounded-full">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Page navigation ── */}
        <div className="flex justify-between items-center px-6 md:px-12 py-8 border-t border-gray-200 max-w-7xl mx-auto w-full">
          <Link
            to="/portfolio/places"
            className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors font-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Places
          </Link>
          <Link
            to="/portfolio/shoots-events"
            className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors font-primary"
          >
            Shoots & Events
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />

      {/* ── Video lightbox ── */}
      {videoPlayer !== null && videos.length > 0 && (
        <div
          className="fixed inset-0 z-50 animate-fade-in flex items-center justify-center"
          style={{ backdropFilter: 'blur(12px) brightness(0.35)' }}
          onClick={() => setVideoPlayer(null)}
        >
          <div
            className="relative w-full h-full md:w-auto md:h-auto md:max-h-[90vh] md:max-w-[85vw] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <video
              src={videos[videoPlayer]}
              className="w-full h-full object-contain md:max-h-[90vh] md:max-w-[85vw] md:w-auto md:h-auto"
              controls
              autoPlay
              playsInline
            />
            <button
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-accent hover:text-white transition-all duration-200 text-lg leading-none"
              onClick={() => setVideoPlayer(null)}
            >
              ✕
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/60 text-xs font-primary tracking-widest bg-black/30 px-3 py-1 rounded-full">
              {videoPlayer + 1} / {videos.length}
            </div>
          </div>

          <button
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
            onClick={e => { e.stopPropagation(); setVideoPlayer(prev => (prev - 1 + videos.length) % videos.length) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
            onClick={e => { e.stopPropagation(); setVideoPlayer(prev => (prev + 1) % videos.length) }}
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
