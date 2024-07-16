import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import Avatar from './Avatar'; // Adjust the import path if necessary

function AddMembersToGroup() {
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const group = location.state?.group;

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

  const handleAddFriendToGroup = async (friend) => {
    try {
      const response = await axios.post("http://localhost:8000/addMemberToGroup", {
        userEmail: email,
        groupName: group.name,
        memberEmail: friend.email
      });

      if (response.data === "success") {
        alert("Friend added to group successfully");
        // Navigate back to GroupDetails page with updated group data
        const updatedGroup = {
          ...group,
          members: [...group.members, { name: friend.name, email: friend.email }]
        };
        navigate("/groupdetails", { state: { email, group: updatedGroup } });
      } else if (response.data === "member_already_in_group") {
        alert("Friend is already in the group");
      } else if (response.data === "user_not_found") {
        alert("User not found");
      } else if (response.data === "member_not_found") {
        alert("Member not found");
      } else {
        alert("Error adding friend to group");
      }
    } catch (e) {
      console.error(e);
      alert("Error adding friend to group");
    }
  };

  const renderSuggestionItem = (friend) => (
    <li key={friend.email} className="suggestion-item" onClick={() => handleAddFriendToGroup(friend)}>
      {friend.name}
    </li>
  );

  return (
    <div className="add-members-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/groupdetails", { state: { email, group } })}>
          ←
        </button>
        <h1 className="title">Add Members to {group.name}</h1>
      </div>
      <div className="content">
        <div className="search-container">
          <input
            className="search-input"
            placeholder="Search friends to add"
            value={searchInput}
            onChange={handleSearch}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((friend, index) => renderSuggestionItem(friend))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMembersToGroup;
