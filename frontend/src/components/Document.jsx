import { useState } from "react"
import Layout from "../pages/Layout"
import { Link } from "@tanstack/react-router";
import {
  FileText,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Folder,
} from "lucide-react"
import SimpleLoader from "../components/SimplerLoader"

export default function Document({ profilePictureUrl, userName }) {
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // "grid" or "list"

  // Mock data for documents
  const documents = [
    { id: 1, title: "Physics Notes Chapter 5", lastModified: "May 28, 2025", type: "PDF", size: "2.4 MB" },
    { id: 2, title: "History Essay Research", lastModified: "May 27, 2025", type: "DOCX", size: "1.8 MB" },
    { id: 3, title: "Calculus Formulas", lastModified: "May 25, 2025", type: "PDF", size: "0.9 MB" },
    { id: 4, title: "Literature Review", lastModified: "May 22, 2025", type: "PDF", size: "3.2 MB" },
    { id: 5, title: "Chemistry Lab Notes", lastModified: "May 20, 2025", type: "PDF", size: "1.5 MB" },
    { id: 6, title: "Spanish Vocabulary", lastModified: "May 18, 2025", type: "DOCX", size: "0.7 MB" },
  ]

  return (
    <Layout 
      profilePictureUrl={profilePictureUrl} 
      userName={userName}
      isLoading={isLoading}
      currentPath="/document"
    >
      <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Documents</h1>

              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Folders */}
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-500 mb-4">FOLDERS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <Folder className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">School</h3>
                      <p className="text-xs text-gray-500">12 documents</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-50 rounded-md">
                      <Folder className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Research</h3>
                      <p className="text-xs text-gray-500">8 documents</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-50 rounded-md">
                      <Folder className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Personal</h3>
                      <p className="text-xs text-gray-500">4 documents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-4">RECENT DOCUMENTS</h2>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium truncate">{doc.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{doc.lastModified}</span>
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Last Modified
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Size
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-2 bg-gray-100 rounded-md">
                                <FileText className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{doc.lastModified}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{doc.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="p-1 rounded-full hover:bg-gray-200">
                              <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
    </Layout>
  )
}