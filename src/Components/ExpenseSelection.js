import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ExpenseSelection() {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('email');

  useEffect(() => {
    async function fetchData() {
      try {
        const friendsResponse = await axios.post("http://localhost:8000/getFriends", { email });
        setFriends(friendsResponse.data.friends);

        const groupsResponse = await axios.post("http://localhost:8000/getGroups", { email });
        setGroups(groupsResponse.data.groups);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    }
    fetchData();
  }, [email]);

  const handleFriendChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFriends((prev) =>
      checked ? [...prev, value] : prev.filter((friend) => friend !== value)
    );
  };

  const handleGroupChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const selectedGroup = groups.find(group => group._id === value);
      if (selectedGroup) {
        const groupMembers = selectedGroup.members.map(member => member.email);
        setSelectedFriends(prev => [...new Set([...prev, ...groupMembers])]);
        setSelectedGroups((prev) => [...prev, value]);
      }
    } else {
      setSelectedGroups((prev) => prev.filter((group) => group !== value));
    }
  };

  const handleSubmit = () => {
    console.log('Submitting with selected friends:', selectedFriends);
    console.log('Submitting with selected groups:', selectedGroups);
    if (selectedFriends.length > 0 || selectedGroups.length > 0) {
      navigate("/addexpense", {
        state: { email, selectedFriends, selectedGroups }
      });
    } else {
      alert("Please select at least one friend or group.");
    }
  };

  return (
    <div className="expense-selection-container">
      <h1>Select Friends and Groups</h1>
      <div className="list">
        <h2>Friends</h2>
        {friends.map((friend) => (
          <div key={friend.email} className="checkbox-container">
            <input
              type="checkbox"
              id={friend.email}
              value={friend.email}
              onChange={handleFriendChange}
              checked={selectedFriends.includes(friend.email)}
            />
            <label htmlFor={friend.email}>{friend.name}</label>
          </div>
        ))}
      </div>
      <div className="list">
        <h2>Groups</h2>
        {groups.map((group) => (
          <div key={group._id} className="checkbox-container">
            <input
              type="checkbox"
              id={group._id}
              value={group._id}
              onChange={handleGroupChange}
              checked={selectedGroups.includes(group._id)}
            />
            <label htmlFor={group._id}>{group.name}</label>
          </div>
        ))}
      </div>
    
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      
    </div>
  );
}

export default ExpenseSelection;
