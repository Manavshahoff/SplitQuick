import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddExpense() {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const selectedFriends = location.state?.selectedFriends || [];
  const selectedGroups = location.state?.selectedGroups || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/addExpense", {
        email,
        expenseName,
        amount,
        selectedFriends,
        selectedGroups
      });
      alert("Expense added successfully!");
      navigate("/friends", { state: { email } });
    } catch (e) {
      console.error(e);
      alert("Error adding expense");
    }
  };

  return (
    <div className="container">
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="expenseName">Expense Name</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
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
            required
          />
        </div>
        <button type="submit" className="fab">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
