

export default function SimpleLoader({ isLoading, children, text = "Loading..." }) {
  // If not loading, just render the children
  if (!isLoading) {
    return children
  }

  return (
    <div className="relative">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
        {/* Simple spinner */}
        <div className="flex items-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span className="text-blue-900">{text}</span>
        </div>
      </div>

      {/* Content (blurred when loading) */}
      <div className={isLoading ? "blur-sm" : ""}>{children}</div>
    </div>
  )
}

