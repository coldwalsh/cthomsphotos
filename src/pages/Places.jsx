import GalleryPage from '../components/GalleryPage'

const base = import.meta.env.BASE_URL

/*
  Add photo paths here once you have images, e.g.:
  const photos = [
    `${base}photos/places/img1.jpg`,
    `${base}photos/places/img2.jpg`,
  ]
*/
const photos = []

export default function Places() {
  return (
    <GalleryPage
      title="Places"
      description="Landscapes and destinations captured through the lens."
      heroCover={`${base}photos/places-cover.jpg`}
      photos={photos}
    />
  )
}
