import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";
import Portal from "../Portal";
import SimpleModal from "../components/Modal"; // Adjust import path as needed

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  // Get location and search params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const error  = queryParams.get('error');
  const [errorMessage, setErrorMessage] = useState(error);

  // Effect to handle error message
  useEffect(() => {
    // If error exists in URL, set it in state
    const error = queryParams.get('error');
    setErrorMessage(error);
  }, [error]);

  // Handler to close modal and clear error
  const handleCloseModal = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <LoginPage />
      
      {/* Error Modal using SimpleModal */}
      <Portal>
        <SimpleModal
          isOpen={!!errorMessage} // Convert to boolean
          onClose={handleCloseModal}
          title="Login Error"
          primaryAction={handleCloseModal}
          primaryActionLabel="Okay"
        >
          <p className="text-red-600">{errorMessage}</p>
        </SimpleModal>
      </Portal>
    </>
  );
}

export default Login;