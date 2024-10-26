import React from 'react'
import "../components/css/Home.css";
import video from "../components/video/home.mp4"
import video1 from "../components/video/home-background.mp4"
import Typewriter from 'typewriter-effect';
import { Helmet } from 'react-helmet';
export default function Home() {
  
  return (

    
    <div>
      <Helmet>
  <title>Home | Toshan Bakery</title>
</Helmet>
      <div className="home">
     
   <div className="video">
   <video autoPlay loop muted className="w-full h-full object-cover">
           <source src={video} type="video/mp4" />
           Your browser does not support the video tag.
      </video>
      <h1 className="typewriter-text">
          <Typewriter
            options={{
              strings: ['Welcome to Our Bakery','Enjoy your delicious foddie' ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              cursor: '|',
              pauseFor: 2500,
            }}
          />
        </h1>
      
   </div>
   <div className="about" id="about">
   <div className="text"> <h2>ABOUT</h2>
    <p>The use of premium ingredients ensures delicious and nutritious products, while a diverse range of items, from bread and pastries to custom cakes and savory treats, appeals to a broad audience. Excellent customer service, a welcoming atmosphere, and convenient ordering options enhance the customer experience, fostering loyalty and satisfaction. Additionally, bakeries often engage in community support by sourcing locally, participating in events, and donating surplus goods, thereby strengthening their community ties and contributing to local economies. This combination of quality, variety, service, and community involvement makes a bakery a cherished and valuable establishment in any neighborhood.</p></div>
   <div className="image">
   <div className="video">
   <video autoPlay loop muted className="w-full h-full object-cover">
           <source src={video1} type="video/mp4" />
           Your browser does not support the video tag.
      </video>
   </div>
   </div>
      </div>
 </div>
 </div>
  )
}
