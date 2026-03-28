import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header />

      <main className="flex-1 pt-20 bg-earth-bg">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-20">
          <div className="flex flex-col md:flex-row gap-16 items-start">

            {/* Left — photo */}
            <div className="w-full md:w-1/3 flex-shrink-0 md:sticky md:top-24 animate-fade-left">
              <div className="relative">
                <img
                  src={`${import.meta.env.BASE_URL}/photos/about-photo.png`}
                  alt="Christian Thompson"
                  className="w-full h-auto object-cover border-8 border-earth-surface rounded-md shadow-lg"
                  onError={(e) => {
                    e.target.parentElement.innerHTML =
                      '<div class="w-full aspect-[3/4] bg-earth-surface flex items-center justify-center text-earth-muted text-sm">Photo coming soon</div>'
                  }}
                />
                {/* Accent corner decoration */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-accent opacity-60" />
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-accent opacity-60" />
              </div>

              {/* Italic tagline under photo */}
              <p className="mt-6 text-center font-accent italic text-accent text-xl font-light animate-fade-up-2">
                  3+ Years of Professional Photography
              </p>
            </div>

            {/* Right — bio */}
            <div className="flex-1 pt-2">

              {/* Name + accent rule */}
              <div className="animate-fade-up mb-8">
                <p className="text-xs tracking-[0.3em] uppercase text-earth-muted font-primary mb-2">
                  Photographer
                </p>
                <h1 className="text-3xl md:text-5xl font-light tracking-tight text-earth-text">
                  Christian Thompson
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-12 bg-accent" />
                  <span className="text-accent text-xs tracking-widest uppercase font-primary">Charlottesville, VA</span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-earth-text leading-relaxed animate-fade-up-2">
                  I am a photographer that will try to make a story out of every single photo, 
                  since each shooting space I’m in has a unique setting that is interesting to explore 
                  and make an adventure out of. Usually, I go out and shoot for my enjoyment, 
                  which is on trail runs, mountain expeditions or backpacking trips, however, 
                  I get asked to take photos as well. Outside of the landscapes and the people I’m with when I am exploring, 
                  I have shot a wide variety of action, ranging from outdoor climbing to triathlons, and have taken graduation 
                  and formal photos for numerous individuals and couples. 
                </p>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-accent pl-5 py-1 animate-fade-up-3">
                  <p className="font-accent italic text-2xl text-earth-text font-light leading-snug">
                    "Reliving the most special moments requires an eye 
                    for framing the subject while conveying emotion and realism."
                  </p>
                </blockquote>

                <p className="text-earth-text leading-relaxed animate-fade-up-3">
                  A framed subject makes it clear who or what the photo is being taken 
                  of and why it is being taken. Emphasizing emotion and realism are also 
                  crucial in creating the perfect picture, since these aspects make each 
                  shot as close as possible to how the moment looks and feels. That is, unless 
                  I’m taking vintage or black and white photos.
                </p>

                <p className="text-earth-text leading-relaxed animate-fade-up-3">
                  I have been taking photos with a pro camera for almost 3 years now 
                  and by now I know I’ve learned what I takes to capture the perfect 
                  moment with my camera no matter what occasion that may be. The camera
                  I’ve been shooting on for the past 2 years is a Sony a7iii due to its optimal versatility. 
                </p>

                <p className="text-earth-text leading-relaxed animate-fade-up-4">
                  I'm available for bookings in the Charlottesville area and beyond. Feel
                  free to reach out through the{' '}
                  <Link to="/contact" className="text-accent hover:text-accent-lt transition-colors underline underline-offset-2">
                    contact page
                  </Link>{' '}
                  to discuss your project.
                </p>

                {/* CTA */}
                <div className="pt-4 animate-fade-up-5">
                  <Link
                    to="/contact"
                    className="inline-block px-8 py-3 border border-accent text-accent text-xs tracking-[0.25em] uppercase hover:bg-accent hover:text-white transition-all duration-300 font-primary"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
