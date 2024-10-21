import React from 'react'
import {NavLink} from 'react-router-dom';
import '../components/css/Navbar.css'

export default function Navbar() {
  return (
    <div clasSNameName="Navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className=" logo" to="/">Toshan Bakery</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Shop">Shop</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/Cart" >cart</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Order">Order</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/order-tracking">Order Tracking</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/Contact" >Contact</NavLink>
          </li>
         
        
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}
