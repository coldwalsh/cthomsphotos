import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Wire up to a backend / email service (e.g. Formspree) when ready
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gray-100 pt-20">
        <div className="max-w-5xl mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left */}
            <div className="w-full md:w-2/5">
              <h1 className="text-5xl font-light tracking-tight mb-6">Contact Me</h1>
              <p className="text-gray-700 leading-relaxed mb-6">
                Let me know what kind of pictures you would like me to take and what
                times you are available, and we can go from there!
              </p>
              <p className="text-gray-800 text-sm mb-1">william.christian.thompson@gmail.com</p>
              <p className="text-gray-800 text-sm mb-6">(540) 613-7884</p>

              {/* Instagram icon */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-700 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>

            {/* Right — form */}
            <div className="flex-1">
              {submitted ? (
                <div className="py-16 text-center text-gray-700">
                  <p className="text-2xl font-light mb-2">Thanks for reaching out!</p>
                  <p className="text-sm">I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name row */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          First Name <span className="text-gray-400">(required)</span>
                        </label>
                        <input
                          required
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          Last Name <span className="text-gray-400">(required)</span>
                        </label>
                        <input
                          required
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Email <span className="text-gray-400">(required)</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Message <span className="text-gray-400">(required)</span>
                    </label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-black text-white text-sm tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    SEND
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
