import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Avatar from './Avatar';

function Friends() {
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('email');
  const name = location.state?.name || localStorage.getItem('name');

  const fetchFriends = async () => {
    try {
      const response = await axios.post("http://localhost:8000/getFriends", { email });
      setFriends(response.data.friends);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [email]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 0) {
      const filteredSuggestions = friends.filter(friend =>
        friend.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const renderItem = (friend) => (
    <div className="item-container" key={friend.email}>
      <Avatar name={friend.name} />
      <span className="name">{friend.name}</span>
      <span className={`amount ${friend.balance >= 0 ? 'amount-owe' : 'amount-owed'}`}>
        ${Math.abs(friend.balance).toFixed(2)}
      </span>
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
            <span className="amount-owed">
              ${friends.reduce((acc, friend) => friend.balance < 0 ? acc - friend.balance : acc, 0).toFixed(2)}
            </span>
          </div>
          <div className="summary-item">
            <span className="header-text">Owe</span>
            <span className="amount-owe">
              ${friends.reduce((acc, friend) => friend.balance > 0 ? acc + friend.balance : acc, 0).toFixed(2)}
            </span>
          </div>
          <button className="add" onClick={() => navigate("/addfriend", { state: { email: email } })}>
            Add Friends
          </button>
        </div>
      </div>
      <div className="content">
        <div className="search-container">
          <input
            className="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((friend, index) => (
                <li key={index} className="suggestion-item">
                  {friend.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="list">
          {friends.map(renderItem)}
        </div>
      </div>
      <button className="fab" onClick={() => navigate("/expenseselection", { state: { email } })}>
        <span className="fab-text">+</span>
      </button>
      <div className="footer" style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Link to="/friends" className="footer-item">
          <Avatar iconType="user" />
          <span>Friends</span>
        </Link>
        <Link to="/groups" className="footer-item">
          <Avatar iconType="group" />
          <span>Groups</span>
        </Link>
        <Link to="/profile" className="footer-item">
          <Avatar iconType="profile" />
          <span>Profile</span>
        </Link>
        <Link to="/activity" className="footer-item">
          <Avatar iconType="activity" />
          <span>Activity</span>
        </Link>
      </div>
    </div>
  );
}

export default Friends;
