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
        console.log(e);
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
    setSelectedGroups((prev) =>
      checked ? [...prev, value] : prev.filter((group) => group !== value)
    );
  };

  const handleSubmit = () => {
    navigate("/addexpense", { state: { email, selectedFriends, selectedGroups } });
  };

  return (
    <div className="container">
      <h1>Select Friends and Groups</h1>
      <div className="list">
        <h2>Friends</h2>
        {friends.map((friend) => (
          <div key={friend.email}>
            <input
              type="checkbox"
              id={friend.email}
              value={friend.email}
              onChange={handleFriendChange}
            />
            <label htmlFor={friend.email}>{friend.name}</label>
          </div>
        ))}
      </div>
      <div className="list">
        <h2>Groups</h2>
        {groups.map((group) => (
          <div key={group._id}>
            <input
              type="checkbox"
              id={group._id}
              value={group._id}
              onChange={handleGroupChange}
            />
            <label htmlFor={group._id}>{group.name}</label>
          </div>
        ))}
      </div>
      <button className="fab" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default ExpenseSelection;
