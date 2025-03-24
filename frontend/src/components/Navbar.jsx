// src/components/Navbar.jsx
import { Link } from "@tanstack/react-router";


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-blue-900 text-white p-4 flex justify-between items-center shadow-md z-50">
      <h1 className="text-lg font-semibold">MyStudyBuddy</h1>

      {/* Button Container */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="bg-white text-blue-900 px-4 py-2 rounded-md font-medium transition duration-300 hover:bg-blue-100"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
