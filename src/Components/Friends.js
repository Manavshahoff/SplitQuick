import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from './Avatar'; // Adjust the import path if necessary

function Friends() {
  const [friends, setFriends] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('email');
  const name = location.state?.name || localStorage.getItem('name');

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await axios.post("http://localhost:8000/getFriends", {
          email: email
        });
        setFriends(response.data.friends);
      } catch (e) {
        console.log(e);
      }
    }

    fetchFriends();
  }, [email]);

  const renderItem = (friend) => (
    <div className="item-container" key={friend.email}>
      <Avatar name={friend.name} />
      <span className="name">{friend.name}</span>
      <span className="amount">{friend.amount || "$0.00"}</span> {/* Adjust the amount logic as per your data */}
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <Avatar name={name} />
        <h1 className="name">{name}</h1>
        <div className="summary">
          <div className="summary-item">
            <span className="header-text">Owed</span>
            <span className="amount-owed">$1</span> {/* Adjust the amount logic as per your data */}
          </div>
          <div className="summary-item">
            <span className="header-text">Owe</span>
            <span className="amount-owe">$2</span> {/* Adjust the amount logic as per your data */}
          </div>
        </div>
        <button className="addFriend" onClick={() => navigate("/addfriend", { state: { email: email } })}>
          Add Friends
        </button>
      </div>
      <div className="content">
        <div className="search-container">
          <input className="search-input" placeholder="Search" />
        </div>
        <div className="list">
          {friends.map(renderItem)}
        </div>
      </div>
      <div className="footer">
        <div className="footer-item">
          <Avatar iconType="user" />
          <span>Friends</span>
        </div>
        <div className="footer-item">
          <Avatar iconType="group" />
          <span>Groups</span>
        </div>
        <div className="footer-item">
          <Avatar iconType="profile" />
          <span>Profile</span>
        </div>
        <div className="footer-item">
          <Avatar iconType="activity" />
          <span>Activity</span>
        </div>
      </div>
    </div>
  );
}

export default Friends;
