import React from 'react';
import './Success.css'; // Import the CSS file

const Success = ({ message, buttonText, onAction }) => {
  return (
    <div className="success-container">
      <div className="success-icon">
        {/* SVG icon inline for better control */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
            fill="#e6ff00" 
            stroke="#333" 
            strokeWidth="1.5"
          />
          <path 
            d="M8 12L11 15L16 9" 
            stroke="#333" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="success-title">Success!</h3>
      <p className="success-message">{message}</p>
      <button className="success-button" onClick={onAction}>
        {buttonText}
      </button>
    </div>
  );
};

export default Success;