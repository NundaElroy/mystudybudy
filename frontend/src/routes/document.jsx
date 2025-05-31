import { createFileRoute, redirect } from "@tanstack/react-router";
import {useAuth}  from "../context/context";
import Document from "../components/Document"


export const Route = createFileRoute('/document')({
  beforeLoad: async ({context}) => {
    // Use console.log with a unique, identifiable message
    console.log('ROUTE_DEBUG: Document beforeLoad is DEFINITELY being called');
    
    // Simplified redirect logic just to test
    if (!context.auth.isAuthenticated ) {
    throw redirect({
      to: "/login",
      search: { error: "please sign in or login in" },
    });
  }
  },
  
  component: DocumentPage,
    
  
})

const DocumentPage = () => {
  const { user } = useAuth();
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <Document 
      profilePictureUrl={user.picture}
      userName={user.name}
    />
  );
};