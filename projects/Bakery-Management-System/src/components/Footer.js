import React from 'react'
import '../components/css/Footer.css';
export default function Footer() {
  return (
    <div>
      <div className="main">
        <div className="social">
            <div className="logo">
                <h1>Toshan Bakery</h1>
            </div>
           <div className="subscribe">
           <input type="email" placeholder="Enter Email" />
            <button>Subscribe Now</button>
           </div>
           <div className="accounts">
           <span><i class="fa-brands fa-twitter"></i></span>
            <span><i class="fa-brands fa-facebook-f"></i></span>
            <span><i class="fa-brands fa-youtube"></i></span>
            <span><i class="fa-brands fa-linkedin-in"></i></span>
           </div>
        </div>
        <div className="links">
          <div className=" link">
            <h4>Shop Info</h4>
            < a href="/#about">About Us</a>
            < a href="/">Contact Us</a>
            < a href="/">Privacy Policy</a>
            < a href="/">Terms & Condition</a>
            < a href="/">Return Policy</a>
            < a href="/">FAQs & Help</a>
            </div> 
          <div className=" link">
          <h4>Accounts</h4>
            < a href="/">My Account</a>
            < a href="/">Shop details</a>
            < a href="/">Shopping Cart</a>
            < a href="/">Wishlist</a>
            < a href="/">Order History</a>
            < a href="/">International Orders</a>
          </div>
          <div className=" link">
          <h4>Contact</h4>
            < a href="/">Address IIIT Naya Raipur Chhattisgarh</a>
            < a href="mailto:contact@toshankanwar.in">Email : contact@toshankanwar.in</a>
            < a href="/">phone : 1234567891</a>
            < a href="/">Feel free to contact</a>
            < a href="/">Thanks for visiting</a>
            < a href="/">All Type Payments Accepted</a></div>
          
        </div>
        <div className="copyright">
            <div className="mention"> <span>Copyright @bakery.toshankanwar.in</span> All Rights Reserved</div>
            <div className="design">Design and Developed By  <a href="https://www.linkedin.com/in/toshankanwar2005/" target='blank'><span>Toshan Kanwar</span></a></div>
        </div>
      </div>
    </div>
  )
}
