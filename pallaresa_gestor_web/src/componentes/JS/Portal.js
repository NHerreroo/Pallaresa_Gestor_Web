import React from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  // Create a div element to act as the portal container
  const portalRoot = document.getElementById("portal-root");

  // If the portal root doesn't exist, create it
  if (!portalRoot) {
    const newPortalRoot = document.createElement("div");
    newPortalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(newPortalRoot);
  }

  // Render the children into the portal root
  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;