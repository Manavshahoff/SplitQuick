import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CustomSplit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, selectedFriends, selectedGroups, customShares } = location.state || {};
  const [deselectedParticipants, setDeselectedParticipants] = useState([]);
  const [customShareValues, setCustomShareValues] = useState(
    customShares || selectedFriends.reduce((acc, friend) => ({ ...acc, [friend.email]: 1 }), {})
  );
  const [activeTab, setActiveTab] = useState('deselect');

  const handleDeselectChange = (e) => {
    const { value, checked } = e.target;
    setDeselectedParticipants((prev) =>
      checked ? prev.filter((participant) => participant !== value) : [...prev, value]
    );
  };

  const handleCustomShareChange = (e, friendEmail) => {
    const { value } = e.target;
    setCustomShareValues((prev) => ({ ...prev, [friendEmail]: Number(value) }));
  };

  const handleSave = () => {
    const filteredShares = Object.fromEntries(Object.entries(customShareValues).filter(([key]) => !deselectedParticipants.includes(key)));
    navigate("/addexpense", {
      state: {
        email,
        selectedFriends: selectedFriends.filter(friend => !deselectedParticipants.includes(friend.email)),
        selectedGroups,
        customShares: filteredShares,
      },
    });
  };

  return (
    <div className="form-container">
      <h1>Custom Split</h1>
      <button onClick={handleSave} style={{ marginBottom: '20px' }}>Back</button>
      <div className="tabs">
        <button className={`tab ${activeTab === 'deselect' ? 'active' : ''}`} onClick={() => setActiveTab('deselect')}>Deselect Participants</button>
        <button className={`tab ${activeTab === 'customShares' ? 'active' : ''}`} onClick={() => setActiveTab('customShares')}>Custom Share Values</button>
      </div>
      {activeTab === 'deselect' && (
        <div className="tab-content">
          <h2>Deselect Participants</h2>
          {selectedFriends.map((friend) => (
            <div key={friend.email} className="checkbox-container">
              <input
                type="checkbox"
                id={`deselect-${friend.email}`}
                value={friend.email}
                onChange={handleDeselectChange}
                checked={!deselectedParticipants.includes(friend.email)}
              />
              <label htmlFor={`deselect-${friend.email}`}>{friend.name}</label>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'customShares' && (
        <div className="tab-content">
          <h2>Custom Share Values</h2>
          {selectedFriends.map((friend) => (
            <div key={friend.email} className="form-group">
              <label htmlFor={`share-${friend.email}`}>{friend.name}</label>
              <input
                type="number"
                id={`share-${friend.email}`}
                value={customShareValues[friend.email]}
                onChange={(e) => handleCustomShareChange(e, friend.email)}
                min="0"
                step="1"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSplit;
