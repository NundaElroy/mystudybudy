// src/components/Features.jsx
import { BookOpen, Highlighter, Cloud } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Powerful Study Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Read PDFs Easily</h3>
            <p className="text-gray-600 text-center">
              Smooth and fast document rendering with intuitive navigation and bookmarking features.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <Highlighter className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Take Notes Instantly</h3>
            <p className="text-gray-600 text-center">
              Highlight text and attach notes with our powerful annotation tools that remember your study patterns.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <Cloud className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sync Across Devices</h3>
            <p className="text-gray-600 text-center">
              Access notes anywhere, anytime with real-time synchronization across all your devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

  