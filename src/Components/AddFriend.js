import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function AddFriend() {
  const [friendName, setFriendName] = useState('');
  const [friendNumber, setFriendNumber] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem('email'); // Get the logged-in user's email

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting friend details:", {
        userEmail: email,
        friendName,
        friendNumber,
        friendEmail
      });

    try {
      const response = await axios.post("https://nodejs-serverless-function-express-tan-theta.vercel.app/api/addFriend", {
        userEmail: email,
        friendName,
        friendNumber,
        friendEmail
      });

      if (response.data === "success") {
        alert("Friend added successfully");
        navigate("/friends", { state: { email: email } });
      } else if (response.data === "user_not_found") {
        alert("User not found");
      } else if (response.data === "friend_not_found") {
        alert("Friend not found");
      } else {
        alert("Error adding friend");
      }
    } catch (e) {
      console.error(e);
      alert("Error adding friend");
    }
  }

  return (
    <div className="form-container">
      <h1>Add Friend</h1>
      <form id="form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="friendName">Friend's Name</label>
          <input type="text" id="friendName" onChange={(e) => setFriendName(e.target.value)} placeholder="Friend's Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="friendNumber">Friend's Number</label>
          <input type="tel" id="friendNumber" onChange={(e) => setFriendNumber(e.target.value)} placeholder="Friend's Number" required />
        </div>
        <div className="form-group">
          <label htmlFor="friendEmail">Friend's Email</label>
          <input type="email" id="friendEmail" onChange={(e) => setFriendEmail(e.target.value)} placeholder="Friend's Email" required />
        </div>
        <button type="submit" className="addFriend">Add Friend</button>
      </form>
    </div>
  );
}

export default AddFriend;
