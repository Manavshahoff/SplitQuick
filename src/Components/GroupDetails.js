import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Avatar from './Avatar'; // Adjust the import path if necessary

function GroupDetails() {
  const [group, setGroup] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const groupData = location.state?.group;

  useEffect(() => {
    setGroup(groupData);
  }, [groupData]);

  const handleAddMembers = () => {
    navigate("/addmemberstogroup", { state: { email, group } });
  };

  const handleShareLink = () => {
    alert("Share link functionality not implemented yet.");
  };

  const renderMember = (member) => (
    <div className="item-container" key={member.email}>
      <Avatar name={member.name} />
      <span className="name">{member.name}</span>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/groups", { state: { email: email } })}>
          ←
        </button>
        {group && <Avatar name={group.name} />}
        <h1 className="name">{group?.name}</h1>
        <div className="summary">
          <button className="add" onClick={handleAddMembers}>
            Add members
          </button>
          <button className="add" onClick={handleShareLink}>
            Share link
          </button>
        </div>
      </div>
      <div className="content">
        <div className="search-container">
          <input className="search-input" placeholder="Search" />
        </div>
        <div className="list">
          {group?.members?.map(renderMember)}
        </div>
      </div>
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

export default GroupDetails;
