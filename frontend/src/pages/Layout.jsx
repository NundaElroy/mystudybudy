// Layout.jsx
import { Link } from "@tanstack/react-router";
import {
  Home,
  Book,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
} from "lucide-react"
import SimpleLoader from "../components/SimplerLoader"

const Layout = ({ children, profilePictureUrl, userName, isLoading = false, currentPath = "/dashboard" }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-blue-900">MyStudyBuddy</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-3 py-2 rounded-md ${
              currentPath === "/dashboard" 
                ? "text-blue-900 bg-blue-50" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            to="/document" 
            className={`flex items-center px-3 py-2 rounded-md ${
              currentPath === "/documents" 
                ? "text-blue-900 bg-blue-50" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Documents
          </Link>
          <Link 
            to="/notes" 
            className={`flex items-center px-3 py-2 rounded-md ${
              currentPath === "/notes" 
                ? "text-blue-900 bg-blue-50" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Book className="w-5 h-5 mr-3" />
            Notes
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center px-3 py-2 rounded-md ${
              currentPath === "/settings" 
                ? "text-blue-900 bg-blue-50" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-2 w-64">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search documents..."
                className="ml-2 bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div className="flex items-center">
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              </button>
              <div className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium overflow-hidden">
                  <img 
                    src={profilePictureUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{userName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content with Loading */}
        <SimpleLoader isLoading={isLoading}>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SimpleLoader>
      </div>
    </div>
  )
}

export default Layout;
