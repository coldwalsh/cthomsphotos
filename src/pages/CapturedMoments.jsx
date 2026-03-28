import GalleryPage from '../components/GalleryPage'

const base = import.meta.env.BASE_URL

/*
  Add photo paths here once you have images, e.g.:
  const photos = [
    `${base}photos/captured/img1.jpg`,
    `${base}photos/captured/img2.jpg`,
  ]
*/
const photos = []

export default function CapturedMoments() {
  return (
    <GalleryPage
      title="Captured Moments"
      description="Candid, unposed moments that tell a story."
      heroCover={`${base}photos/captured-moments-cover.jpg`}
      photos={photos}
    />
  )
}
