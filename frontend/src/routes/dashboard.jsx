import { createFileRoute, redirect } from "@tanstack/react-router";
import {useAuth}  from "../context/context";
import Dashboard from "../components/Dashboard";
import Portal from "../Portal";
import { useState } from "react";

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({context}) => {
    
    // Simplified redirect logic just to test
    if (!context.auth.isAuthenticated ) {
    throw redirect({
      to: "/login",
      search: { error: "please sign in or login in" },
    });
  }
  },
  
  component: DashboardPage,
    
  
})

const DashboardPage = () => {
  const { user } = useAuth();

  //things to do with the modals
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [folders, setFolders] = useState([
    { id: "1", name: "School" },
    { id: "2", name: "Research" },
    { id: "3", name: "Personal" },
  ])

   const [documents, setDocuments] = useState([])

  const handleAddDocument = (documentData) => {
    // In a real app, you would upload the file to your API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument = {
          id: Date.now().toString(),
          name: documentData.name,
          folderId: documentData.folderId || null,
          fileName: documentData.file.name,
          fileSize: documentData.file.size,
          uploadDate: new Date().toISOString(),
        }
        setDocuments([...documents, newDocument])
        resolve(newDocument)
      }, 1000) // Simulate API delay
    })}

  
  if (!user) return <div>Loading...</div>;
  
  return (
    <>
      <Dashboard 
      profilePictureUrl={user.picture}
      userName={user.name}
    />

    <Portal>
      <AddDocumentModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        onSubmit={handleAddDocument}
        folders={folders}
      />
    </Portal>
    
    </>
  
  );
};