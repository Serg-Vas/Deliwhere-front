import React, { useEffect, useState } from 'react';

const OrderCancel = ({ onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out animation
      setTimeout(() => {
        onClose(); // Call the onClose function after animation completes
      }, 500); // Wait for the animation to complete
    }, 5000); // Close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`modal oredered ${fadeOut ? 'fade-out' : ''}`} tabIndex="-1" role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderConfirmedModalLabel" style={{ paddingLeft: '33%' }}>Something went wrong((</h5>
          </div>
          <div className="modal-body">
            <p>Your order were decline! Check your network connection, or try again later</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCancel;
