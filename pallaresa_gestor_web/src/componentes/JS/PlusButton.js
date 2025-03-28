import React, { useState } from 'react';
import '../Css/PlusButton.css';

export const PlusButton = ({ PageComponent }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const closeOverlay = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowOverlay(false);
    }
  };

  return (
    <>
      <button type="button" className='Plus' onClick={() => setShowOverlay(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
          <path d="M32.2776 20.1027C32.6761 19.7042 32.9 19.1637 32.9 18.6001C32.9 18.0365 32.6761 17.496 32.2776 17.0975C31.8791 16.699 31.3386 16.4751 30.775 16.4751H20.525V6.2251C20.525 5.66151 20.3011 5.12101 19.9026 4.7225C19.5041 4.32398 18.9636 4.1001 18.4 4.1001C17.8364 4.1001 17.2959 4.32398 16.8974 4.7225C16.4989 5.12101 16.275 5.66151 16.275 6.2251V16.4751H6.025C5.46142 16.4751 4.92091 16.699 4.5224 17.0975C4.12389 17.496 3.9 18.0365 3.9 18.6001C3.9 19.1637 4.12388 19.7042 4.5224 20.1027C4.92092 20.5012 5.46142 20.7251 6.025 20.7251H16.275V30.9751C16.275 31.5387 16.4989 32.0792 16.8974 32.4777C17.2959 32.8762 17.8364 33.1001 18.4 33.1001C18.9636 33.1001 19.5041 32.8762 19.9026 32.4777C20.3011 32.0792 20.525 31.5387 20.525 30.9751V20.7251H30.775C31.3386 20.7251 31.8791 20.5012 32.2776 20.1027Z" fill="white" stroke="white" strokeWidth="2"/>
        </svg>
      </button>

      {showOverlay && (
        <div className="overlay" onClick={closeOverlay}>
            <button className="close-btn" onClick={() => setShowOverlay(false)}>Close</button>
            <PageComponent />
          </div>
      )}
    </>
  );
};

export default PlusButton;
