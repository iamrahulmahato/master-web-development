import React from 'react';
import '../components/css/Cart.css'
import { Helmet } from 'react-helmet';
const Cart = ({ cartItems , increaseQuantity, decreaseQuantity , removeFromCart, getTotalPrice, confirmOrder, orderConfirmed}) => {
  
  return (
 <div className="bigbascket">
  <Helmet>
    <title>Cart | Toshan Bakery</title>
  </Helmet>
     <div className="carto">
      <div className="headers">
      <span>Item Name</span>
      <span>Price</span>
      <span>Quantity</span>
      <span>Final Price</span>
      </div>
      {cartItems.length === 0 ? (
        <p className="noitem">No items in cart</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="list">
            <h2 className="item">{item.name}</h2>
            <p className="item"> Rs {item.price}</p>
            <p className="item"><button onClick={() => decreaseQuantity(item.id)}><i class="fa-solid fa-minus"></i></button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}><i class="fa-solid fa-plus"></i></button>
             </p>
            <p className="item">Rs {item.price * item.quantity}</p>
            <button className="remove" onClick={() => removeFromCart(item.id)}><i class="fa-solid fa-trash"></i></button>
          </div>
        ))
      )}
       {cartItems.length > 0 && (
        <div className="orderconfirm">
          <h2>Total Price: Rs {getTotalPrice()}</h2>
        
          <button onClick={() => confirmOrder()}>Confirm Order</button>
        </div>
      )}
    </div>
 </div>
  );
};

export default Cart;
