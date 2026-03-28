export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white px-10 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-light mb-2">Photos by Christian</h2>
          <p className="text-gray-300 text-sm">Made with</p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-light mb-2">Location</h3>
          <p className="text-gray-300 text-sm">35 University Cir</p>
          <p className="text-gray-300 text-sm">Charlottesville, VA 22903</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-light mb-2">Contact</h3>
          <p className="text-gray-300 text-sm">william.christian.thompson@gmail.com</p>
          <p className="text-gray-300 text-sm">(540)613-7884</p>
        </div>
      </div>
    </footer>
  )
}
