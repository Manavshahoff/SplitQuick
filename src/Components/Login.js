import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("https://nodejs-serverless-function-express-e1sne2qsq.vercel.app/api/login", {
        email,
        password
      })
      .then(res => {
        if (res.data.status === "exist") {
          const name = res.data.name; // Get the name from the response
          localStorage.setItem("name", name); // Store the name in local storage
          localStorage.setItem("email", email); // Store the email in local storage
          navigate("/friends", { state: { id: email, name: name } }); // Redirect to friends page
        } else if (res.data === "notexist") {
          alert("User has not signed up");
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
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value); }} placeholder="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); }} placeholder="Password" required />
        </div>
        <button type="submit" className='Loginbutton'>Login</button>
        <p>Don't have an account? <Link to="/signup">Sign up here.</Link></p>
      </form>
    </div>
  );
}

export default Login;
