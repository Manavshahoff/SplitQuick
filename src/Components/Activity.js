import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

function Activity() {
  const [activities, setActivities] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('email');

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await axios.post("http://localhost:8000/getActivities", { email });
        if (response.data && response.data.activities) {
          setActivities(response.data.activities);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchActivities();
  }, [email]);

  const handleActivityClick = (activity) => {
    navigate('/activitydetails', { state: { activity } });
  };

  const renderActivity = (activity) => {
    const isCreator = activity.createdBy === email;
    const creatorName = isCreator ? 'You' : activity.createdByName;
    const groupName = activity.groupName ? `in ${activity.groupName}` : '';
    const description = `${creatorName} added expense ${groupName}`;

    return (
      <div className="activity-item" key={activity._id} onClick={() => handleActivityClick(activity)}>
        <span className="activity-name">{activity.expenseName}</span>
        <span className="activity-description">{description}</span>
        <span className="activity-amount">${activity.amount.toFixed(2)}</span>
        <span className="activity-date">{new Date(activity.date).toLocaleDateString()}</span>
      </div>
    );
  };

  return (
    <>
      <div className="activity-log-container">
        <h1>Activity Log</h1>
        <div className="activity-list">
          {activities.map(renderActivity)}
        </div>
      </div>
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
    </>
  );
}

export default Activity;
