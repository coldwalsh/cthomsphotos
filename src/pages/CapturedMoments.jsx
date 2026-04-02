import GalleryPage from '../components/GalleryPage'

const photoModules = import.meta.glob(
  '../assets/photos/moments/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)
const photos = Object.values(photoModules).map(m => m.default)

const base = import.meta.env.BASE_URL

export default function CapturedMoments() {
  return (
    <GalleryPage
      title="Captured Moments"
      description="Candid, unposed moments that tell a story."
      heroCover={`${base}photos/captured-moments-cover.jpg`}
      photos={photos}
      prevPage={{ label: 'Places', to: '/portfolio/places' }}
      nextPage={{ label: 'Videography', to: '/portfolio/videography' }}
    />
  )
}
