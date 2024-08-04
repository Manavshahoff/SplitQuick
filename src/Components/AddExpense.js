import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddExpense() {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [splitMethod, setSplitMethod] = useState('Paid by you and split equally');
  const location = useLocation();
  const navigate = useNavigate();
  const { email, selectedFriends, selectedGroups, customShares, friendsData } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Selected Friends:", selectedFriends); // Debugging: log selected friends
      await axios.post("http://localhost:8000/addExpense", {
        email,
        expenseName,
        amount,
        selectedFriends: selectedFriends.map((friend) => friend), // Pass the email array
        selectedGroups,
        splitMethod,
        customShares,
      });
      alert("Expense added successfully");
      navigate("/activity", { state: { email } });
    } catch (e) {
      console.error(e);
      alert("Error adding expense");
    }
  };
  

  const handleSplitMethodChange = () => {
    if (selectedFriends.length > 1 || selectedGroups.length > 0) {
      navigate("/customsplit", { state: { email, selectedFriends, selectedGroups, customShares, friendsData } });
    } else {
      setSplitMethod("Paid by you and split equally");
    }
  };

  return (
    <div className="form-container">
      <h1>Add Expense</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Expense Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            step="0.01"
            required
          />
        </div>
        <div className="split-method" onClick={handleSplitMethodChange}>
          {splitMethod}
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
