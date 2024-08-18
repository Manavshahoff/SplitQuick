import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SelectPayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, selectedFriends, payer } = location.state || {};

  // Initialize selectedPayer with the payer if provided, else default to 'You'
  const [selectedPayer, setSelectedPayer] = useState(payer || { name: 'You', email: email });

  const handlePayerChange = (e) => {
    const payerEmail = e.target.value;
    const selectedFriend = selectedFriends.find((friend) => friend.email === payerEmail);
    
    // Set selectedPayer to the selected friend's data or default to 'You'
    setSelectedPayer(selectedFriend ? { name: selectedFriend.name, email: selectedFriend.email } : { name: 'You', email: email });
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate("/addexpense", { state: { email, selectedFriends, payer: selectedPayer } });
  };

  return (
    <div className="form-container">
      <h1>Select Payer</h1>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="payer">Choose the payer:</label>
          <select
            id="payer"
            value={selectedPayer.email} // Use email to match the selected option
            onChange={handlePayerChange}
          >
            <option value={email}>You</option> {/* Ensure 'You' defaults to the user's email */}
            {selectedFriends.map((friend) => (
              <option key={friend.email} value={friend.email}>
                {selectedFriends.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default SelectPayer;
