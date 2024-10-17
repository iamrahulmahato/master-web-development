
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } 
from 'react-router-dom';
import Order from './components/Order';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import OrderTracking from './components/OrderTracking';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useOrderContext } from './components/OrderContext';
import { useState } from 'react';

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { addOrder } = useOrderContext();


 
  const products = [
    { id:1, name: 'Freshly Baked Bread', price: 100,des:"Bread is a staple in Indian households, and local bakeries serve up an array of freshly baked options. From soft white bread to whole wheat loaves, multi-grain bread, and flavored varieties. ",srcs:"https://img.freepik.com/free-photo/front-view-tasty-fresh-bread-with-eggs-milk-dark-surface_179666-44176.jpg?t=st=1723045866~exp=1723049466~hmac=4dd5300fa18b6fcffe35aaca84f3cdbc272a6366eb68433818b620f1d5cefe4b&w=1060"},
    { id:2, name: 'Puffs and Pastries', price: 200,des:"Puffs and pastries are popular bakery snacks in India. These flaky delights are filled with a variety of savory and sweet fillings. Vegetable puffs, chicken puffs, and mutton puffs.",srcs:"https://img.freepik.com/free-photo/assortment-delicious-tequenos-dish_23-2148945411.jpg?t=st=1723045984~exp=1723049584~hmac=591e82e38fbbb2f980877c06fdf6eca99408052e6e1a370db31c3bb797c9373d&w=1060" },
    { id:3, name: 'Biscuits and Cookies', price: 300,des:"Indian bakeries are renowned for their assortment of biscuits and cookies. From butter cookies and coconut macaroons to chocolate chip cookies and khara biscuits.",srcs:"https://img.freepik.com/free-photo/biscuits-nuts-black-surface_23-2148238773.jpg?t=st=1723046092~exp=1723049692~hmac=3bdf0921ad70bfad70c0de1b258d5f2abf3463dbe474d8dcfb51d0f2a1d4c348&w=1060"},
    { id:4, name: 'Cakes', price: 400,des:"Cakes hold a special place in Indian celebrations, and local bakeries offer a wide range of flavors and designs. From classic sponge cakes to rich chocolate cakes, black forest cakes.",srcs:"https://img.freepik.com/free-photo/creamy-cake-topped-with-chocolate-multiple-fruits_140725-2730.jpg?t=st=1723046234~exp=1723049834~hmac=59ee95382b875db2a12f0fd4fe7d3f96767b9648ef284d3764da10a2c0fbbd1a&w=740"},
    { id:5, name: 'Samosas', price: 500,des:"Though samosas are typically associated with savory street food, bakery-style samosas have their own charm. These triangular pockets of flaky pastry are stuffed with a savory filling",srcs:"https://img.freepik.com/free-photo/front-view-delicious-brazilian-food-composition_23-2148739224.jpg?t=st=1723046326~exp=1723049926~hmac=575430d624193fee9a44d4c0eb629c586521a07e1d0b48a97af47222f99423f5&w=1060"},

    { id:6, name: 'Muffins', price: 600,des:"Muffins have gained popularity in Indian bakeries as a quick and indulgent snack. These individual-sized cakes come in a variety of flavors, including blueberry, banana, chocolate.",srcs:"https://img.freepik.com/free-photo/front-view-delicious-muffins-with-berries_23-2148833982.jpg?t=st=1723046394~exp=1723049994~hmac=58f53a50b28e5164189ed299bf8fed03b4e2b22656d2380efe78448e2497690e&w=1380"},
    { id:7, name: 'Bread Rolls', price: 700,des:"Bread rolls are another beloved bakery item in India. These rolls are made by stuffing spiced potato or paneer (Indian cottage cheese) fillings into soft bread slices",srcs:"https://img.freepik.com/free-photo/sausage-dough-sprinkled-with-sesame-seeds-wooden-table-rustic-style_2829-20119.jpg?t=st=1723046481~exp=1723050081~hmac=645050fab58be30a9e029c0f222dd8e2496e7b297ca3e88a58eae6c43180b995&w=1060"},
    { id:8, name: 'Naan and Kulcha', price: 800,des:"While naan and kulcha are commonly associated with Indian cuisine, bakery-style versions are equally delightful. These soft and fluffy breads are typically topped with butter. ",srcs:"https://img.freepik.com/free-photo/top-view-pakistani-meal-arrangement_23-2148825100.jpg?t=st=1723046534~exp=1723050134~hmac=6bb7bb3f389c0d48f4faa2fe38c992fac7882ca32413de3d731c1660f9078365&w=1060"},
    { id:9, name: 'Khari and Toast', price: 900,des:"Khari and toast are popular tea-time snacks in India. Khari is a flaky, puff pastry-like biscuit with a buttery and savory taste, while toast is a crisp, rectangular biscuit. ",srcs:"https://img.freepik.com/free-photo/sandwiches-arrangement-with-drink_23-2148633467.jpg?t=st=1723046595~exp=1723050195~hmac=109787bc8185df2e931a3b0356b84879f67c50bcecd9e26276991a42a7bcf6e7&w=1060"},
    { id:10, name: 'Mawa Cake', price: 1000,des:"Mawa cake is a rich and dense cake made with mawa (reduced milk solids), butter, and a hint of cardamom. It has a distinct flavor and a moist texture that makes it a favorite among bakery-goers..",srcs:"https://img.freepik.com/free-photo/tasty-homemade-soviet-traditional-anthill-cake-with-walnut-condensed-milk-cookies_114579-8457.jpg?t=st=1723046654~exp=1723050254~hmac=d80951f0425fb6b42fb2a4123e86644b4308b1fe01a1a0efde12f7836cb964f2&w=1060"},
   
    // Add more products as needed
  ];

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart!`);
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };



  const confirmOrder = () => {
    const currentDate = new Date().toLocaleString();
    setOrderConfirmed(true);
    toast.success('Order confirmed! Thank you for your purchase.');

    const newOrder = {
      id: Date.now(),
      cartItems: [...cartItems],
      date: currentDate,
      status: 'Pending'
    };

    addOrder(newOrder);
    setCartItems([]);
  };

  return (
 
     
    <Router>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Shop" element={<ProductList products={products} addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cartItems={cartItems} increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                getTotalPrice={getTotalPrice}
                confirmOrder={confirmOrder}
                orderConfirmed={orderConfirmed}/>} />
      
      <Route path="/Order" element={<Order/>} />
      <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/Contact" element={<Contact />} />
     
       
         
  
      </Routes>
      <ToastContainer />
      <Footer/>
    </Router>
    
  );
}

export default App;
