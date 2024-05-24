import React, { useState, useEffect } from 'react';
import { createOrder } from './API';
import Map from './Map';
import "D:\\work\\Food shop\\front4 copy\\src\\css\\mapStyles.css"

const Confirm = ({ clientData, totalOrderPrice, totalFoodPrice, foodItems, cardInfo, localStorageData, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [clientName, setClientName] = useState(clientData);
  const [deliveryLocation, setDeliveryLocation] = useState(clientData);

  useEffect(() => {
    setClientName(clientData.name);
    setDeliveryLocation(clientData.address);
  }, [clientData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formJSON = Object.fromEntries(data.entries());
    const fetchOrder = async () => {
      const usersData = await createOrder(formJSON);
      console.log(usersData, "1234");
    };
    fetchOrder();
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
                  <h5 className="modal-title">Confirmation</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setConfirmed(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Map />
                  <label htmlFor="client">
                    Your Name:
                    <input
                      type="text"
                      id="client"
                      name="client"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </label>
                  <ul id="foodItems" name="foodItems">
                    {foodItems.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${totalFoodPrice[item.id]}
                        <input type="hidden" name="foodItems" value={localStorageData} />
                      </li>
                    ))}
                  </ul>
                  <p id="totalPrice" name="totalPrice">Total Price: ${totalOrderPrice}</p>
                  <input type="hidden" id="totalPrice" name="totalPrice" value={totalOrderPrice} />
                  <label htmlFor="deliveryAddress">
                    <p>Delivery Location:</p>
                    <input
                      type="text"
                      id="deliveryAddress"
                      name="deliveryAddress"
                      required
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                    />
                  </label>
                  <p>Card Info: {cardInfo}</p>
                  <label htmlFor="comment">
                    Your comment:
                    <textarea
                      id="comment"
                      name="comment"
                    >Your comment</textarea>
                  </label>
                  <button type="submit">Submit Order</button>
                  <p>Your order has been confirmed!</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Confirm;
