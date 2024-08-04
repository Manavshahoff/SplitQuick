import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function MultipleSplitOptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFriends, selectedGroups, setSplitMethod } = location.state || {};
  const [customAmounts, setCustomAmounts] = useState({});

  const handleCustomAmountChange = (email, amount) => {
    setCustomAmounts({ ...customAmounts, [email]: amount });
  };

  const handleSubmit = () => {
    setSplitMethod('Custom split amounts');
    navigate(-1); // Go back to the previous page (AddExpense)
  };

  return (
    <div className="form-container">
      <h1>Custom Split Amounts</h1>
      <div className="list">
        {selectedFriends.map((friend) => (
          <div key={friend.email} className="form-group">
            <label>{friend.name}</label>
            <input
              type="number"
              value={customAmounts[friend.email] || ''}
              onChange={(e) => handleCustomAmountChange(friend.email, e.target.value)}
              placeholder="Amount"
            />
          </div>
        ))}
        {selectedGroups.map((group) => (
          group.members.map((member) => (
            <div key={member.email} className="form-group">
              <label>{member.name}</label>
              <input
                type="number"
                value={customAmounts[member.email] || ''}
                onChange={(e) => handleCustomAmountChange(member.email, e.target.value)}
                placeholder="Amount"
              />
            </div>
          ))
        ))}
      </div>
      <button type="submit" onClick={handleSubmit}>Save Split</button>
    </div>
  );
}

export default MultipleSplitOptions;
