import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Friends from './Components/Friends';
import Groups from './Components/Groups';
import GroupDetails from './Components/GroupDetails';
import AddFriend from './Components/AddFriend';
import CreateGroup from './Components/CreateGroup';
import AddMembersToGroup from './Components/AddMembersToGroup';
import ExpenseSelection from './Components/ExpenseSelection';
import AddExpense from './Components/AddExpense';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groupdetails" element={<GroupDetails />} />
        <Route path="/addfriend" element={<AddFriend />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/addmemberstogroup" element={<AddMembersToGroup />} />
        <Route path="/expenseselection" element={<ExpenseSelection />} />
        <Route path="/addexpense" element={<AddExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
