import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from './Avatar';

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');

  const handleSignOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate('/'); // Navigate to login page after sign out
  };

  return (
    <><div className="profile-container">
          <div className="profile-header">
              <Avatar name={name} />
              <h1>{name}</h1>
              <p>{email}</p>
          </div>
          <div className="profile-content">
              <div className="profile-info">
                  <h2>Profile Information</h2>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Email:</strong> {email}</p>
              </div>
              <button className="signout-button" onClick={handleSignOut}>
                  Sign Out
              </button>
          </div>
      </div><div className="footer">
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
          </div></>
  );
}

export default Profile;
