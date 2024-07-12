import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {

  const history=useNavigate();

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  async function submit(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:8000/",{
              email,password
          })
          .then(res=>{
              if(res.data==="exist"){
                  history("/home",{state:{id:email}})
              }
              else if(res.data==="notexist"){
                  alert("User have not sign up")
              }
          })
          .catch(e=>{
              alert("wrong details")
              console.log(e);
          })

      }
      catch(e){
          console.log(e);

      }

  }
  return (
    <div className="form-container">
        <h1>SplitQuick</h1>
        <form id="form" action = "POST">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password"  name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
            </div>
            <button type="submit" onClick={submit}>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign up here.</Link></p> {/* Ensure your route is correct */}
        </form>
    </div>
  );
};

export default Login;
