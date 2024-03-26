import React from 'react';
import { Link } from 'react-router-dom'; // Corrected import for future use

const Login = () => {
  // Example form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
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
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Login</button>
            {/* Uncomment and use when navigation is needed */}
            <p>Don't have an account? <Link to="/signup">Sign up here.</Link></p>
        </form>
    </div>
  )
}

export default Login;
