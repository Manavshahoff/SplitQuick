import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem('email');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://nodejs-serverless-function-express-tan-theta.vercel.app/api/createGroup", {
        groupName,
        email
      });

      if (response.data === "success") {
        alert("Group created successfully");
        navigate("/groups", { state: { email: email } });
      } else {
        alert("Error creating group");
      }
    } catch (e) {
      console.error(e);
      alert("Error creating group");
    }
  }

  return (
    <div className="form-container">
      <h1>Create Group</h1>
      <form id="form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="groupName">Group Name</label>
          <input type="text" id="groupName" onChange={(e) => setGroupName(e.target.value)} placeholder="Group Name" required />
        </div>
        <button type="submit" className="addGroup">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroup;