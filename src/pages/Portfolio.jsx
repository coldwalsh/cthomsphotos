import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const base = import.meta.env.BASE_URL

const placesModules = import.meta.glob(
  '../assets/photos/places/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)
const momentsModules = import.meta.glob(
  '../assets/photos/moments/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)
const eventsModules = import.meta.glob(
  '../assets/photos/events/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const categories = [
  {
    label: 'Places',
    to: '/portfolio/places',
    cover: `${base}photos/places-cover.jpg`,
    photos: shuffle(Object.values(placesModules).map(m => m.default)),
  },
  {
    label: 'Videography',
    to: '/portfolio/videography',
    cover: `${base}portfolio-cover.jpg`,
    photos: [],
  },
  {
    label: 'Shoots & Events',
    to: '/portfolio/shoots-events',
    cover: `${base}photos/events-cover.jpg`,
    photos: shuffle(Object.values(eventsModules).map(m => m.default)),
  },
  {
    label: 'Captured Moments',
    to: '/portfolio/captured-moments',
    cover: `${base}photos/moments-cover.jpg`,
    photos: shuffle(Object.values(momentsModules).map(m => m.default)),
  },
]

const defaultCover = `${base}portfolio-cover.jpg`

export default function Portfolio() {
  const [hovered, setHovered] = useState(null)
  const [slotA, setSlotA] = useState(defaultCover)
  const [slotB, setSlotB] = useState(defaultCover)
  const [activeSlot, setActiveSlot] = useState('A')
  const activeSlotRef = useRef('A')  // mirrors activeSlot, updated after the flip
  const intervalRef = useRef(null)
  const fadeTimeoutRef = useRef(null)

  // Always write to the INACTIVE slot, then flip after a frame.
  // activeSlotRef is only updated inside the timeout so it always
  // reflects what is actually visible — preventing writes to the live slot.
  const crossfadeTo = useRef(null)
  crossfadeTo.current = (src) => {
    clearTimeout(fadeTimeoutRef.current)
    const inactive = activeSlotRef.current === 'A' ? 'B' : 'A'
    if (inactive === 'B') {
      setSlotB(src)
      fadeTimeoutRef.current = setTimeout(() => {
        activeSlotRef.current = 'B'
        setActiveSlot('B')
      }, 20)
    } else {
      setSlotA(src)
      fadeTimeoutRef.current = setTimeout(() => {
        activeSlotRef.current = 'A'
        setActiveSlot('A')
      }, 20)
    }
  }

  useEffect(() => {
    clearInterval(intervalRef.current)
    if (!hovered) {
      crossfadeTo.current(defaultCover)
      return
    }
    // Show cover photo first, then cycle randomly through assets photos
    crossfadeTo.current(hovered.cover)
    if (hovered.photos.length === 0) return
    let idx = 0
    intervalRef.current = setInterval(() => {
      crossfadeTo.current(hovered.photos[idx])
      idx = (idx + 1) % hovered.photos.length
    }, 1500)
    return () => clearInterval(intervalRef.current)
  }, [hovered])

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header transparent />

      <main className="flex-1">
        <div className="relative w-full h-dvh overflow-hidden">
          {/* Two slots crossfade with opacity */}
          <img src={slotA} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" style={{ opacity: activeSlot === 'A' ? 1 : 0 }} />
          <img src={slotB} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" style={{ opacity: activeSlot === 'B' ? 1 : 0 }} />
          <div className="absolute inset-0 bg-black/40" />

          {/* Category links */}
          <div className="absolute bottom-12 left-0 right-0 md:left-auto md:right-20 md:bottom-20 flex flex-col items-center md:items-end gap-3 md:gap-7 px-6 md:px-0 z-10">
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
                className="text-[2.5rem] md:text-5xl font-light text-white/70 leading-snug transition-opacity duration-200 hover:opacity-70 text-center md:text-right"
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
