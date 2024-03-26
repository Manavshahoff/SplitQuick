import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div class="form-container">
        <h1>SplitQuick</h1>
        <form id="form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Signup</button>
            <p>Already have account? <Link to="/Login">login here.</Link></p>
        </form>
        </div>
  );
}

export default Signup;


