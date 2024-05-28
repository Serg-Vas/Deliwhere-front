import React, { useState } from 'react';

const OrderConfirmed = () => {
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>Thank you for using our service... your order is on the way</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderConfirmed;
