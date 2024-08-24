import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Avatar from './Avatar'; // Adjust the import path if necessary

function Groups() {
  const [groups, setGroups] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('email');
  const name = location.state?.name || localStorage.getItem('name');

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await axios.post("https://nodejs-serverless-function-express-tan-theta.vercel.app/api/getGroups", {
          email: email
        });
        setGroups(response.data.groups);
      } catch (e) {
        console.log(e);
      }
    }

    fetchGroups();
  }, [email]);

  const renderItem = (group) => (
    <div className="item-container" key={group._id} onClick={() => navigate("/groupdetails", { state: { email, group } })}>
      <Avatar name={group.name} />
      <span className="name">{group.name}</span>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <Avatar name={name} />
        <h1 className="name">{name}</h1>
        <div className="summary">
          <button className="add" onClick={() => navigate("/creategroup", { state: { email } })}>
            Create Group
          </button>
        </div>
      </div>
      <div className="content">
        <div className="search-container">
          <input className="search-input" placeholder="Search" />
        </div>
        <div className="list">
          {groups.map(renderItem)}
        </div>
      </div>
      <button className="fab" onClick={() => navigate("/expenseselection", { state: { email } })}>
        <span className="fab-text">+</span>
      </button>
      <div className="footer">
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

export default Groups;
