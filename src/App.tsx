
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import Pentago from './GamePages/pentago';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pentago" element={<Pentago />} />
      </Routes>
    </Router>
  );
}

export default App;