import React, { useState, useEffect } from "react";
import "../assests/styles/popupstyles.css";

const Popup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      hidePopup();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const hidePopup = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={hidePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
