
import {Link} from "@tanstack/react-router";
import { ArrowLeft, Github, Mail } from "lucide-react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {getSocialLoginUrl} from  "../api/helper";


export default function Login() {

  function redirect(authProvider) {
    window.location.href = getSocialLoginUrl(authProvider);
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

               onClick={() => redirect("google")}
               
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md shadow-sm transition duration-300"
              >
                <Mail className="h-6 w-6 text-red-500" />
                <span>Continue with Google</span>
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

      <Footer />
    </div>
  )
}

