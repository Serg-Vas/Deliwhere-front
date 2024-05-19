import React, { useState, useEffect } from 'react';
import { createOrder } from './API';

const Confirm = ({ clientData, totalOrderPrice, totalFoodPrice, foodItems, cardInfo, localStorageData, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [clientName, setClientName] = useState(clientData);
  const [deliveryLocation, setDeliveryLocation] = useState(clientData);
console.log(foodItems);
console.log(localStorageData);

  useEffect(() => {
    setClientName(clientData.name);
    setDeliveryLocation(clientData.address)
  }, [clientData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data, e.target, "1234");
    const formJSON = Object.fromEntries(data.entries());
    console.log(formJSON, 'formJSON');
    const fetchOrder = async () => {
      const usersData = await createOrder(formJSON);
      console.log(usersData, "1234");
    };
    fetchOrder();
    // setConfirmed(true);  
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
        <form onSubmit={handleSubmit}>
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
                  {/* <label htmlFor="foodItems"> */}
                  <ul id="foodItems"
                      name="foodItems">
                    {foodItems.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${totalFoodPrice[item.id]}
                        <input type="hidden" name='foodItems' value={localStorageData} />
                      </li>
                    ))}
                  </ul>
                  {/* </label> */}
                  {/* <label htmlFor="totalPrice"> */}
                  <p id="totalPrice"
                      name="totalPrice">Total Price: ${totalOrderPrice}</p>
                      <input type="hidden" id="totalPrice" name="totalPrice" value={totalOrderPrice} />
                  {/* </label> */}
                  <label htmlFor="deliveryAddress">
                    <p>Delivery Location:</p>
                    <input type="text" id='deliveryAddress' name='deliveryAddress' required value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)}/>
                  </label>
                  <p>Card Info: {cardInfo}</p>
                  <label htmlFor="comment">
                    Your comment:
                    <textarea
                      id="comment"
                      name="comment"
                      // value={comment}
                      // onChange={(e) => setComment(e.target.value)}
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
