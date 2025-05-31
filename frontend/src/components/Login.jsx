import {Link, useNavigate} from "@tanstack/react-router";
import { ArrowLeft, Github, Mail } from "lucide-react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {getSocialLoginUrl , fetchUserDetails} from  "../api/helper";
import { useAuth } from "../context/context";
import { useState } from "react";



export default function Login() {
   const auth = useAuth();
   const navigate = useNavigate();
   const [loading, setIsLoading] = useState(false);

   
  // Handle OAuth entirely in popup - no /authenticated route needed
  async function handlePopupLogin(authProvider) {
    setIsLoading(true);

    console.log("button clicked")
    
    try {
      // Get your existing OAuth URL (no changes to backend needed)
      const oauthUrl = getSocialLoginUrl(authProvider);
      
      // Open in popup instead of current window
      const popup = window.open(
        oauthUrl,
        'oauth-popup',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        alert('Popup blocked! Please allow popups for this site.');
        setIsLoading(false);
        return;
      }

      // Wait for OAuth completion and extract token from popup URL
      const result = await waitForOAuthComplete(popup);
      
      if (result.success) {
        // Store the token
        localStorage.setItem('jwt', result.token);
        
        // Fetch user details using your existing API
        const userData = await fetchUserDetails();
        
        if (userData.status === "success" || userData.statusCode === 200) {
          // Set user in auth context (if you're using useAuth)
          auth.setUserDetails(userData.data);
          
          // Navigate to dashboard
          navigate({
              to: "/dashboard",
              search: { error: "success" },
            })

        } else {
          throw new Error('Failed to fetch user details');
        }
      } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('OAuth error:', error);
      alert('Authentication failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Wait for OAuth completion by monitoring popup URL
  function waitForOAuthComplete(popup) {
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        try {
          // Check if popup is closed (user canceled)
          if (popup.closed) {
            clearInterval(checkInterval);
            reject(new Error('Authentication cancelled by user'));
            return;
          }

          // Try to read popup URL (will work when redirected back to your domain)
          const currentUrl = popup.location.href;
          
          // Check if we're back on your domain with token/error params
          if (currentUrl.includes(window.location.origin)) {
            const url = new URL(currentUrl);
            const token = url.searchParams.get('token');
            const error = url.searchParams.get('error');
            
            clearInterval(checkInterval);
            popup.close();
            
            if (token) {
              resolve({ success: true, token });
            } else if (error) {
              resolve({ success: false, error });
            } else {
              resolve({ success: false, error: 'No token received' });
            }
          }
        } catch (e) {
          // Cross-origin error (expected while on OAuth provider's domain)
          // Just continue checking
        }
      }, 1000);
      
      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!popup.closed) {
          popup.close();
        }
        reject(new Error('Authentication timeout'));
      }, 300000);
    });
  }
  
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          {/* Login card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Welcome to MyStudyBuddy</h1>
              <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
            </div>

            <div className="space-y-4">
              {/* Google OAuth Button */}
              <button

               onClick={() => handlePopupLogin("google")}
               
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md shadow-sm transition duration-300"
              >
                <Mail className="h-6 w-6 text-red-500" />
                <span>{loading ? "Loading..." : "Continue with Google"}</span>
              </button>

 
            </div> 

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                By continuing, you agree to MyStudyBuddy's{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>

      
    </div>
  )
}

