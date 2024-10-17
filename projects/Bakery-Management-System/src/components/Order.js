import React, { useEffect, useState } from 'react';
import { useOrderContext } from './OrderContext';
import generateBill from './generateBill';
import { Helmet } from 'react-helmet';
import "../components/css/Order.css";


const OrderPage = () => {
  const { orders } = useOrderContext();
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    if (orders.length > 0) {
      setLatestOrder(orders[orders.length - 1]);
    }
  }, [orders]);

  if (!latestOrder) {
    return <p>No recent orders</p>;
  }

  const { cartItems, date, status } = latestOrder;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="orderpage">
    <Helmet>
  <title>Order | Toshan Bakery</title>
</Helmet>
      <h1>Order Confirmation</h1>
      <p>Date: {date}</p>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Price: Rs {item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <h2>Total Price: Rs {totalPrice}</h2>
      <p>Status: {status}</p>
      <button onClick={() => generateBill(cartItems, date, totalPrice)} class="button" type="button">
  <span class="button__text">Bill</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
</button>
    </div>
  );
};

export default OrderPage;
