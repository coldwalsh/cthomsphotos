import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const tabs = ['Places', 'Captured Moments', 'Shoots & Events']

/*
  To add photos:
  - Drop images into public/photos/places/, public/photos/captured/, public/photos/shoots/
  - Add their filenames to the arrays below, e.g.:
      placesPhotos: ['/photos/places/photo1.jpg', '/photos/places/photo2.jpg']
*/
const photos = {
  Places: [],
  'Captured Moments': [],
  'Shoots & Events': [],
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Places')
  const currentPhotos = photos[activeTab]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero banner with background image */}
        <div className="relative h-[60vh] overflow-hidden">
          {/* Drop a portfolio cover image at public/portfolio-cover.jpg */}
          <img
            src="/portfolio-cover.jpg"
            alt="Portfolio cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.classList.add('bg-gray-800')
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right text-white z-10">
            <p className="text-4xl font-light leading-snug">Places</p>
            <p className="text-4xl font-light leading-snug">Captured Moments</p>
            <p className="text-4xl font-light leading-snug">Shoots &amp; Events</p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-8 flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm tracking-wide transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-black text-black font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Photo gallery */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          {currentPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-400">
              <p className="text-lg">No photos yet</p>
              <p className="text-sm mt-1">
                Add images to{' '}
                <code className="bg-gray-100 px-1 rounded text-xs">
                  public/photos/{activeTab.toLowerCase().replace(/ /g, '-')}/
                </code>
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {currentPhotos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${activeTab} ${i + 1}`}
                  className="w-full block break-inside-avoid object-cover hover:opacity-95 transition-opacity cursor-pointer"
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
