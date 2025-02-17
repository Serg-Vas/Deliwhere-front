import React, { useEffect, useState } from 'react';
import { getOrders } from "./API";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const clientName = userData.name; // Assuming userData contains a name field
        const response = await getOrders(clientName);
        setOrders(response.data.orders);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.map((order, orderIndex) => (
        <div key={orderIndex} className="order">
          <h3>Order #{orderIndex + 1}</h3>
          <p><strong>Client Name:</strong> {order.client_name}</p>
          <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
          <p><strong>Comment:</strong> {order.comment}</p>
          <p><strong>Total Amount:</strong> ${order.total_amount}</p>
          <p><strong>Order Date:</strong> {order.order_date}</p>
          <h4>Food Items:</h4>
          <ul id="foodItems" name="foodItems">
            {order.foodItems.map((item, index) => (
              <li key={index}>
                {item.name} ({item.quantity}) - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
