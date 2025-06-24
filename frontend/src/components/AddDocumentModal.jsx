import { useState, useRef } from "react"
import { X, FileText, Upload, Folder } from "lucide-react"

export default function AddDocumentModal({ isOpen, onClose, onSubmit, folders = [] }) {
  const [fileName, setFileName] = useState("")           // Stores the document name
  const [selectedFolder, setSelectedFolder] = useState("") // Stores which folder to put document in
  const [selectedFile, setSelectedFile] = useState(null)   // Stores the actual file object
  const [isSubmitting, setIsSubmitting] = useState(false)  // Tracks if upload is in progress
  const fileInputRef = useRef(null)                       // Reference to hidden file input

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Auto-fill the file name field with the file name (without extension)
      const nameWithoutExtension = file.name.split(".").slice(0, -1).join(".")
      setFileName(nameWithoutExtension || file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fileName.trim() || !selectedFile) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        file: selectedFile,
        name: fileName.trim(),
        folderId: selectedFolder,
      })
      resetForm()
      onClose()
    } catch (error) {
      console.error("Error uploading document:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFileName("")
    setSelectedFolder("")
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
              Add New Document
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* File Upload */}
            <div>
              <label htmlFor="document-file" className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <div
                className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer ${
                  selectedFile ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  id="document-file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  required
                />
                {selectedFile ? (
                  <div className="text-center">
                    <FileText className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      type="button"
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""
                        }
                      }}
                    >
                      Change file
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, TXT (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* File Name */}
            <div>
              <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 mb-2">
                Document Name
              </label>
              <input
                id="document-name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter document name"
                required
              />
            </div>

            {/* Folder Selection */}
            <div>
              <label htmlFor="document-folder" className="block text-sm font-medium text-gray-700 mb-2">
                Select Folder
              </label>
              <div className="relative">
                <select
                  id="document-folder"
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">Root Folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Folder className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 p-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              disabled={isSubmitting || !selectedFile}
            >
              {isSubmitting ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
