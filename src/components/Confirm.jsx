import React, { useState, useEffect, useRef } from 'react';
import { createOrder } from './API';
import Map from './Map';
import "D:\\work\\Food shop\\front4 copy\\src\\css\\mapStyles.css"


const Confirm = ({ clientData, totalOrderPrice, totalFoodPrice, foodItems, cardInfo, localStorageData, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [clientName, setClientName] = useState(clientData.name);
  const [deliveryLocation, setDeliveryLocation] = useState(clientData.address);
  const dialogRef = useRef(null);

  console.log(foodItems);
  console.log(localStorageData);

  useEffect(() => {
    setClientName(clientData.name);
    setDeliveryLocation(clientData.address);
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
    setConfirmed(true);
  };

  const showDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <div>
      <button
        type="button"
        onClick={showDialog}
      >
        Confirm
      </button>
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h5>Confirmation</h5>
              <button
                type="button"
                onClick={closeDialog}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div>
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
              <p id="totalPrice" name="totalPrice">
                Total Price: ${totalOrderPrice}
                <input type="hidden" id="totalPrice" name="totalPrice" value={totalOrderPrice} />
              </p>
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
                >
                  Your comment
                </textarea>
              </label>
              <button type="submit">Submit Order</button>
              <p>Your order has been confirmed!</p>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Confirm;
