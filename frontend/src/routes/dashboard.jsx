import { createFileRoute, redirect } from "@tanstack/react-router";
import {useAuth}  from "../context/context";
import Dashboard from "../components/Dashboard"


export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({context}) => {
    // Use console.log with a unique, identifiable message
    console.log('ROUTE_DEBUG: Dashboard beforeLoad is DEFINITELY being called');
    
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
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <Dashboard 
      profilePictureUrl={user.picture}
      userName={user.name}
    />
  );
};