import { useState } from "react"
import Layout from "../pages/Layout"
import { Link } from "@tanstack/react-router";
import {
  FileText,
  Clock,
  ChevronRight,
  BookOpen,
  BarChart3,
} from "lucide-react"

export default function Dashboard({ profilePictureUrl, userName }) {
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for recent documents
  const recentDocuments = [
    { id: 1, title: "Physics Notes Chapter 5", lastOpened: "2 hours ago", pages: 12 },
    { id: 2, title: "History Essay Research", lastOpened: "Yesterday", pages: 8 },
    { id: 3, title: "Calculus Formulas", lastOpened: "3 days ago", pages: 4 },
    { id: 4, title: "Literature Review", lastOpened: "1 week ago", pages: 15 },
  ]

  return (
    <Layout 
      profilePictureUrl={profilePictureUrl} 
      userName={userName}
      isLoading={isLoading}
      currentPath="/dashboard"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Documents</h3>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pages Read</h3>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-md">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Study Streak</h3>
              <p className="text-2xl font-semibold">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium">Recent Documents</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {recentDocuments.map((doc) => (
            <div key={doc.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{doc.title}</h3>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="ml-1 text-xs text-gray-500">{doc.lastOpened}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{doc.pages} pages</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <Link href="/documents" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all documents
          </Link>
        </div>
      </div>
    </Layout>
  )
}