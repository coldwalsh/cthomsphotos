import GalleryPage from '../components/GalleryPage'

const base = import.meta.env.BASE_URL

/*
  Add photo paths here once you have images, e.g.:
  const photos = [
    `${base}photos/shoots/img1.jpg`,
    `${base}photos/shoots/img2.jpg`,
  ]
*/
const photos = []

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
