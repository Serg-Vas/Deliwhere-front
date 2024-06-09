import React, { useEffect, useState } from 'react';

const OrderConfirmed = ({ onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out animation
      setTimeout(() => {
        onClose(); // Call the onClose function after animation completes

        function clearStorage(key) {
        console.log(localStorage.getItem(key), key);
        localStorage.removeItem(key); 
        console.log(localStorage.getItem(key));
        }
        const keyFood = "food"
        clearStorage(keyFood)
        window.location.replace('/');
      }, 500); // Wait for the animation to complete
    }, 5000); // Close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`modal oredered ${fadeOut ? 'fade-out' : ''}`} tabIndex="-1" role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderConfirmedModalLabel" style={{ paddingLeft: '33%' }}>Order Confirmed</h5>
          </div>
          <div className="modal-body">
            <p>Thank you for using our service, your order is on the way</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
