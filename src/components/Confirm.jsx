import React, { useState, useEffect } from 'react';
import { createOrder } from './API';
import Map from './Map';
import OrderConfirmed from './OrderConfirmed';
import OrderCancel from './OrderCancel'; // Corrected import
import "../css/mapStyles.css";

const Confirm = ({ clientData, totalOrderPrice, totalFoodPrice, foodItems, foodAmount, localStorageData, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [clientName, setClientName] = useState(clientData && clientData.name);
  const [deliveryLocation, setDeliveryLocation] = useState(clientData && clientData.address);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderFailed, setOrderFailed] = useState(false);

  useEffect(() => {
    if (clientData) {
      setClientName(clientData.name);
      setDeliveryLocation(clientData.address);
    }
  }, [clientData]);

  const handleAddressUpdate = (address) => {
    setDeliveryLocation(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formJSON = Object.fromEntries(data.entries());
    try {
      const usersData = await createOrder(formJSON);
      console.log(usersData, "1234");
      setConfirmed(false);
      setOrderSubmitted(true);
      setOrderFailed(false);
    } catch (error) {
      console.error("Order submission failed:", error);
      setConfirmed(false);
      setOrderSubmitted(false);
      setOrderFailed(true); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setConfirmed(true)}
      >
        Confirm
      </button>
      {confirmed && (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" style={{paddingLeft: '38%'}}>Confirmation</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setConfirmed(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <label htmlFor="client" style={{marginBottom: '1rem'}}>
                  <h5>Your Name:</h5>
                    <input
                      type="text"
                      id="client"
                      name="client"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </label>
                  <div>
                  <h5>Cart Items:</h5>
                  <ul id="foodItems" name="foodItems">
                    {foodItems.map((item, index) => (
                      <li key={index}>
                        {item.name} ({item.amount}) {item.shopName} - ${totalFoodPrice[item.id].toFixed(2)}
                        <input type="hidden" name="foodItems" value={localStorageData} />
                      </li>
                    ))}
                  </ul>
                  <p id="totalPrice" name="totalPrice">Total Price: ${totalOrderPrice}</p>
                  </div>
                  <input type="hidden" id="totalPrice" name="totalPrice" value={totalOrderPrice} />
                  <div>
                  <h5>Delivery Location:</h5>
                    <Map onAddressUpdate={handleAddressUpdate} />
                  <label htmlFor="deliveryAddress">
                    <input type='hidden' name="deliveryAddress" value={deliveryLocation} />
                  </label>
                  </div>
                  <div className='comment'>
                  <label htmlFor="comment">
                  <h5>Your comment:</h5>
                    <textarea style={{width: '400px'}}
                      id="comment"
                      name="comment"
                      placeholder='Your comment'
                    ></textarea>
                  </label>
                  <button type="submit">Submit Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {orderSubmitted && <OrderConfirmed onClose={() => setOrderSubmitted(false)} />}
      {orderFailed && <OrderCancel onClose={() => setOrderFailed(false)} />}
    </div>
  );
};

export default Confirm;
