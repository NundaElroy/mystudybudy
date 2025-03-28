import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../context/context";
import {  useEffect, useState } from "react";
import { fetchUserDetails } from "../api/helper";
import SimpleLoader from "../components/SimplerLoader";
import { useNavigate } from "@tanstack/react-router";


//before load runs before  a route is fully loaded
//location object contains
/**
 * {
  href: string,        // Full URL
  pathname: string,    // Current path
  search: string,      // Query parameters
  hash: string         // URL hash
* }

this is the context token passed
{ 
    location,      // Current URL details
    navigate,      // Route navigation function
    params,        // Route parameters
    search,        // Parsed query parameters
    router         // Router instance
  }
 * 
 */
  export const Route = createFileRoute("/authenticated")({
    beforeLoad: async ({ search }) => {
      // Get the token
      const urlParams = new URLSearchParams(search);
      const token = urlParams.get("token");
  
      // Immediately redirect if no token
      if (!token) {
         throw redirect({
          to: "/login",
          search: { error: "Invalid authentication details" },
        });
      }
  
      // Store token in local storage
      localStorage.setItem("jwt", token);
  
     
    },
  
    component: Authenticate
  });
  
  function Authenticate() {
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchData() {
     
          // Immediately set loading state
          setIsLoading(true);
  
          // Fetch user details
          const userData = await fetchUserDetails();
  
          // Check for successful response
          if (userData.status === "success" || userData.statusCode === 200) {
            // Set user details
            auth.setUserDetails(userData.data);
  
            // Redirect to dashboard
            navigate({
              to: "/dashboard",
              search: { error: "success" },
            } 
            );
          } else {
            // Handle authentication failures
            setError("Authentication failed");
            
            // Redirect to login with error
            navigate("/login", { 
              search: { 
                error: userData.message || "Authentication failed" 
              } 
            });
          }
        
          // Always set loading to false
          setIsLoading(false);
        
      }
     debugger
      // Call the fetch data function
      fetchData();
    }, []); // Empty dependency array
  
    // If still loading, show loader
    if (loading) {
      return (
        <SimpleLoader isLoading={true} text="Authenticating...">
          {/* Optional: You can pass children if needed */}
        </SimpleLoader>
      );
    }
  
    // Optional: Handle error state
    if (error) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </div>
      );
    }
  
    // This should rarely be reached due to navigation
    return null;
  }