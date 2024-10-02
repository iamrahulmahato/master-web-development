import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Textform from "./components/Textform"



const App = () => {
  return (
    <Router>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Textform />} />
      </Routes>
    </Router>
  
    
  );
};

export default App;
