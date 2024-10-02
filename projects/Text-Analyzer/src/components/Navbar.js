import React from 'react'
import { NavLink } from 'react-router-dom';
export default function Navbar() {
  return (
  
      <div className="App">
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"  >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page"to="/">Home</NavLink>
        </li>
     
  
      </ul>
    </div>
  </div>
</nav>
      </div>
 
  )
}
