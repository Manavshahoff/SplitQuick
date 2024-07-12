import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


function Signup() {
  const history=useNavigate();

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  async function submit(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:3000/signup",{
              name,email,password
          })
          .then(res=>{
              if(res.data==="exist"){
                  alert("User already exists")
              }
              else if(res.data==="notexist"){
                  history("/home",{state:{id:email}})
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
        <form id="form" action = 'POST'>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="name" id="name" onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
            </div>
            <button type="submit" onClick={submit}>Signup</button>
            <p>Already have an account? <Link to="/login">Login here.</Link></p>
        </form>
    </div>
  );
}

export default Signup;
