import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup submission logic here
  };

  return (
    <div className="form-container">
        <h1>SplitQuick</h1>
        <form id="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Signup</button>
            <p>Already have an account? <Link to="/login">Login here.</Link></p>
        </form>
    </div>
  );
}

export default Signup;
