import React from 'react';
import { useOrderContext } from './OrderContext';
import { Helmet } from 'react-helmet';
import "../components/css/Order.css";
const OrderTracking = () => {
  const { orders, updateOrderStatus } = useOrderContext();

  return (
    <div>
  <Helmet><title>Order Tracking | Toshan Bakery</title></Helmet>
      <h1>Order Tracking</h1>
      {orders.length === 0 ? (
        <p>No orders to track</p>
      ) : (
        orders.map((order) => (
          <div className="tracked" key={order.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>Order ID: {order.id}</h2>
            <p>Date: {order.date}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => updateOrderStatus(order.id, 'Shipped')}>Mark as Shipped</button>
            <button onClick={() => updateOrderStatus(order.id, 'Delivered')}>Mark as Delivered</button>
            {order.cartItems.map((item) => (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <p>Price: Rs {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderTracking;
