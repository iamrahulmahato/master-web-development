import React from 'react';
import '../components/css/Features.css'
import { Helmet } from 'react-helmet';
const ProductList = ({ products, addToCart }) => {
  return (
    <div>
       <Helmet>
        <title>Shop | Toshan Bakery</title></Helmet>  
         <div className="product-list">
          

      {products.map((product) => (
        <div>
              <div className="product-item">    
       <div className="box-portion">
       <div class="box">
                    <div class="about">
                       <div class="heading">
                       
                    <div className="img-box img1 img1">   </div>
                    <div className="img-box img1">    <img src=
                   {product.srcs}
                         alt="img1"/></div>
                            <h3>{product.name}</h3>
                        <p>{product.des}   </p>
                       <div className="cart">
                       <h5>Rs {product.price} </h5>
                       <br></br>
             
                    <button class="addtocart"  onClick={() => addToCart(product)}> <span>Add to cart</span> <i class="fa-solid fa-cart-shopping"></i></button>
                       </div>
                       </div>  
                    </div>
            </div>
       
       </div>
        

      
        </div>
    </div>
      ))}
          <div className="nextpage">
        <button className="btn">1</button>
        <button className="btn">2</button>
        <button className="btn">3</button>
        <button className="btn">Next</button>

    </div>
      
    </div>
    </div>
  );
};

export default ProductList;
