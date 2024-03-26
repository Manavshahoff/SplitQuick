import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Corrected import
import Login from './Login';
import Signup from './Signup';
import './App.css';
function App() {
  return (
    
    <Router>
    <div>
      {/* Route configuration */}
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
