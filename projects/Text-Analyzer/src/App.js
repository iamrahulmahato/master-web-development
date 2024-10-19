import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Textform from "./components/Textform"
import Contact from "./components/Contact"
import Aboutus from "./components/Aboutus"



const App = () => {
  return (
    <Router>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Textform />} />
      <Route path="/contactus" element={<Contact />} />
    <Route path="/about" element={<Aboutus />} />
      </Routes>
    </Router>
  
    
  );
};

export default App;
