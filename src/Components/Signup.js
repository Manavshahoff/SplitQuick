import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("https://nodejs-serverless-function-express-tan-theta.vercel.app/api/signup", {
        name,
        email,
        password
      })
      .then(res => {
        if (res.data === "exist") {
          alert("User already exists");
        } else if (res.data === "notexist") {
          alert("Signup successful. Please log in.");
          navigate("/");
        }
      })
      .catch(e => {
        alert("Wrong details");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="form-container">
      <h1>SplitQuick</h1>
      <form id="form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={(e) => { setName(e.target.value); }} placeholder="Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={(e) => { setEmail(e.target.value); }} placeholder="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => { setPassword(e.target.value); }} placeholder="Password" required />
        </div>
        <button type="submit" className='signupbutton'>Signup</button>
        <p>Already have an account? <Link to="/">Login here.</Link></p>
      </form>
    </div>
  );
}

export default Signup;
