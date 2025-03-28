import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useAuth } from './context/context';
import { AuthProvider } from './context/provider';


// const router = createRouter({ routeTree })
const router = createRouter({ 
  routeTree,
  context: {
    // auth will initially be undefined
    auth: {},
  }

})
function InnerApp() {
  const auth = useAuth();
  
  return (
    <>
      <RouterProvider 
        router={router} 
        context={{ 
          auth 
        }} 
      />
      
    </>
  );
}

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
      {/* <TanStackRouterDevtools /> */}
    </StrictMode>
  );
}

// Render the App
createRoot(document.getElementById('root')).render(<App />);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider  router={router} />
//   </StrictMode>,
// )