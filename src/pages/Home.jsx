import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const marqueeItems = [
  'Places, People & Stories',
  '[◉°]',
  'Charlottesville & Beyond',
  '[◉°]',  
  'Relive Your Best Moments',
  '[◉°]',
  'Available for Hire',
  '[◉°]',
  'Adventure Photography',
  '[◉°]',
]

// Duplicate for seamless loop
const marqueeLoop = [...marqueeItems, ...marqueeItems]

export default function Home() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const mq = window.matchMedia('(max-width: 767px)')

    function swapSrc(mobile) {
      const next = mobile
        ? `${import.meta.env.BASE_URL}hero-mobile.mp4`
        : `${import.meta.env.BASE_URL}hero.mp4`
      const current = v.src.split('/').pop()
      const target = next.split('/').pop()
      if (current !== target) {
        v.src = next
        v.load()
        v.play().catch(() => {})
      }
    }

    v.muted = true
    swapSrc(mq.matches)
    v.play().catch(() => {})

    const handler = (e) => swapSrc(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header transparent />

      <section className="relative w-full h-dvh overflow-hidden">
        {/* Video — object-fit cover ensures it always fills the viewport with no black bars */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={`${import.meta.env.BASE_URL}photos/home-cover.jpg`}
        />

        {/* Gradient overlay — darker at bottom to anchor the marquee */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/20 to-black/60" />

        {/* Centre content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5">
          <p className="text-white/70 text-[0.75rem] tracking-[0.3em] uppercase font-primary">
            Photos by Christian Thompson
          </p>
          <Link
            to="/portfolio"
            className="mt-1 px-9 py-2.5 border border-white/60 text-white text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-gray-900 transition-all duration-300 font-primary backdrop-blur-sm"
          >
            View Portfolio
          </Link>
        </div>

        {/* Corner links — desktop only */}
        <div className="hidden md:block absolute bottom-24 left-8 z-30">
          <Link
            to="/about"
            className="text-white/60 lg:text-[12px] md:text-[10px] tracking-[0.2em] uppercase hover:text-accent-lt transition-colors font-primary"
          >
            About Me
          </Link>
        </div>
        <div className="hidden md:block absolute bottom-24 right-8 z-30">
          <Link
            to="/contact"
            className="text-white/60 lg:text-[12px] md:text-[10px] tracking-[0.2em] uppercase hover:text-accent-lt transition-colors font-primary"
          >
            Contact &amp; Scheduling
          </Link>
        </div>

        {/* Marquee — always on top of everything */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
          }}
        >
          <div className="flex whitespace-nowrap animate-marquee items-center py-8" style={{ willChange: 'transform' }}>
            {marqueeLoop.map((item, i) => (
              <span
                key={i}
                className={`select-none mr-8 ${
                  item === '✦'
                    ? 'text-sm text-white/40'
                    : 'font-primary text-sm tracking-[0.18em] uppercase font-light text-white/80'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
