import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SplitMethodProvider } from './Components/SplitMethodContext';
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
import SelectSplitMethod from './Components/SelectSplitMethod';
import MultipleSplitOptions from './Components/MultipleSplitOptions';
import Profile from './Components/Profile';
import Activity from './Components/Activity';
import ActivityDetails from "./Components/ActivityDetails";
import CustomSplit from './Components/CustomSplit';
import SelectPayer from './Components/SelectPayer';
import './App.css';

function App() {
  return (
    <Router>
      <SplitMethodProvider>
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
        <Route path="/selectsplitmethod" element={<SelectSplitMethod />} />
        <Route path="/multiplesplitoptions" element={<MultipleSplitOptions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activitydetails" element={<ActivityDetails />}/>
        <Route path="/customsplit" element={<CustomSplit/>}/>
        <Route path="/selectpayer" element={<SelectPayer/>}/>
      </Routes>
      </SplitMethodProvider>
    </Router>
  );
}

export default App;
