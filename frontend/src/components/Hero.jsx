
export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/assets/background.jpg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
      </div>

      {/* Main content with padding-top to prevent content from hiding behind the fixed navbar */}
      <main className="relative z-10 pt-20 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Read & Organize Your Notes Seamlessly</h1>
          <p className="text-gray-100 text-lg mb-8">Highlight text, take notes, and sync them anytime.</p>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md font-medium transition duration-300 shadow-lg">
            Start Reading
          </button>
        </div>
      </main>
    </div>
  )
}


  