import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Portal = ({children}) => {
    // Create a ref to store the DOM element
    // useRef allows you to create a mutable reference 
    // that persists across component re-renders
    const elRef = useRef(null);

    // Check if the ref doesn't have a current DOM element
    // This runs only once when the component first renders
    if(!elRef.current){
       // Create a new div element to host the modal
       // This div will be the container for modal content
       elRef.current = document.createElement("div");
    }

    // useEffect hook for managing DOM manipulation
    useEffect(() => {
        // Find the root element where modals will be rendered
        // Typically, this is a div with id="modal" in index.html
        const modalRoot = document.getElementById("modal");
        
        // Append the created div to the modal root
        // This moves the modal outside the normal DOM hierarchy
        modalRoot.appendChild(elRef.current);

        // Cleanup function: remove the div when component unmounts
        // Prevents memory leaks and keeps the DOM clean
        return () => modalRoot.removeChild(elRef.current);
    }, []); // Empty dependency array means this effect runs once on mount/unmount
     
    // createPortal allows rendering children 
    // into a different part of the DOM tree
    return createPortal(
        // Wrapper div for modal content
        <div>
            {children}
        </div>,
        // Second argument is where to render the portal
        elRef.current
    )
}

export default Portal;