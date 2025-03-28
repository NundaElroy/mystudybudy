import { createFileRoute, redirect } from "@tanstack/react-router";
import {useAuth}  from "../context/context";



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

function DashboardPage() {
  const auth = useAuth();
    console.log('Dashboard component rendered');

   
    return(
      <>
      <h1>Dashboard</h1>
      <img src={auth.user.picture} alt="profile picture" />
      <h1>{auth.user.name}</h1>
      </>
    )
    
}