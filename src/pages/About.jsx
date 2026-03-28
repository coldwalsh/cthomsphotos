import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-20">
        <div className="max-w-5xl mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left — photo */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              {/* Drop your about photo at public/about.jpg */}
              <img
                src="/about.jpg"
                alt="Christian Thompson"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.parentElement.innerHTML =
                    '<div class="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Photo coming soon</div>'
                }}
              />
            </div>

            {/* Right — bio */}
            <div className="flex-1 space-y-6 pt-2">
              <h1 className="text-4xl font-light tracking-tight">Christian Thompson</h1>
              <p className="text-gray-700 leading-relaxed">
                Hi, I'm Christian — a photographer based in Charlottesville, VA. I
                specialize in capturing the moments that matter most, from sweeping
                landscapes to intimate portraits and lively events.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My work is driven by a passion for the outdoors and a deep appreciation
                for authentic, unposed moments. Whether you're looking for adventure
                photography, event coverage, or a personal shoot, I'd love to work with
                you.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I'm available for bookings in the Charlottesville area and beyond. Feel
                free to reach out through the{' '}
                <a href="/contact" className="underline hover:text-black transition-colors">
                  contact page
                </a>{' '}
                to discuss your project.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
