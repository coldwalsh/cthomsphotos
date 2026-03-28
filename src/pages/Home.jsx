import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header transparent />

      {/* Hero — full-viewport video background */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          /* Drop your hero video into public/hero.mp4 */
          src="/hero.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Centre CTA */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
          <Link
            to="/portfolio"
            className="px-10 py-3 bg-white/80 backdrop-blur-sm text-sm tracking-widest font-medium text-gray-900 hover:bg-white transition-colors"
          >
            PORTFOLIO
          </Link>
        </div>

        {/* Bottom corner labels */}
        <div className="absolute bottom-8 left-8 z-10">
          <Link to="/about" className="text-white/80 text-xs tracking-widest hover:text-white transition-colors">
            ABOUT ME
          </Link>
        </div>
        <div className="absolute bottom-8 right-8 z-10">
          <Link to="/contact" className="text-white/80 text-xs tracking-widest hover:text-white transition-colors">
            CONTACT AND SCHEDULING
          </Link>
        </div>

        {/* Scrolling marquee text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10 py-3 pointer-events-none">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-5xl font-light text-white mr-16 select-none"
              >
                Relive Your Best Moments
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
