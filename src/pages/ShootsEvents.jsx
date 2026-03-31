import GalleryPage from '../components/GalleryPage'

const photoModules = import.meta.glob(
  '../assets/photos/events/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)
const photos = Object.values(photoModules).map(m => m.default)

const base = import.meta.env.BASE_URL

export default function ShootsEvents() {
  return (
    <GalleryPage
      title="Shoots & Events"
      description="Personal shoots, group sessions, and live events."
      heroCover={`${base}photos/shoots-events-cover.jpg`}
      photos={photos}
    />
  )
}
