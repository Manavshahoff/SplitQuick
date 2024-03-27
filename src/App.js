import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Corrected import
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import './App.css';
function App() {
  return (
    
    <Router>
    <div>
      {/* Route configuration */}
      <Routes>
        <Route path="/Pages/Login" element={<Login />} />
        <Route path="/Pages/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
