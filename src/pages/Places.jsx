import GalleryPage from '../components/GalleryPage'

const photoModules = import.meta.glob(
  '../assets/photos/places/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)
const photos = Object.values(photoModules).map(m => m.default)

const base = import.meta.env.BASE_URL

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
