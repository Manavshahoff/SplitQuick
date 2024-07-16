const express = require("express");
const cors = require("cors");
const { User, Group } = require("./Mongo");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({ status: "exist", name: user.name });
    } else {
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.json("exist");
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.json("notexist");
    }
  } catch (e) {
    console.error(e);
    res.json("fail");
  }
});

app.post("/addFriend", async (req, res) => {
  const { userEmail, friendName, friendNumber, friendEmail } = req.body;
  console.log("Received add friend request:", req.body);

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.log(`User not found: ${userEmail}`);
      return res.json("user_not_found");
    }

    const friend = await User.findOne({ email: friendEmail });
    if (!friend) {
      console.log(`Friend not found: ${friendEmail}`);
      return res.json("friend_not_found");
    }

    await User.updateOne(
      { email: userEmail },
      { $addToSet: { friends: { name: friendName, number: friendNumber, email: friendEmail } } }
    );
    res.json("success");
  } catch (e) {
    console.error(e);
    res.json("error");
  }
});

app.post("/getFriends", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    res.json({ friends: user?.friends || [] });
  } catch (e) {
    console.error(e);
    res.json({ friends: [] });
  }
});

app.post("/createGroup", async (req, res) => {
  const { groupName, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.json("user_not_found");
    }

    const newGroup = new Group({ name: groupName, createdBy: email, members: [{ name: user.name, email: email }] });
    await newGroup.save();
    res.json("success");
  } catch (e) {
    console.error(e);
    res.json("error");
  }
});

app.post("/addMemberToGroup", async (req, res) => {
  const { userEmail, groupName, memberEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    const member = await User.findOne({ email: memberEmail });
    const group = await Group.findOne({ name: groupName, createdBy: userEmail });

    if (!user) {
      return res.json("user_not_found");
    }
    if (!member) {
      return res.json("member_not_found");
    }
    if (!group) {
      return res.json("group_not_found");
    }

    const isMemberAlreadyInGroup = group.members.some(m => m.email === memberEmail);
    if (isMemberAlreadyInGroup) {
      return res.json("member_already_in_group");
    }

    await Group.updateOne(
      { name: groupName, createdBy: userEmail },
      { $addToSet: { members: { name: member.name, email: member.email } } }
    );

    await User.updateOne(
      { email: memberEmail },
      { $addToSet: { groups: { name: groupName, members: [userEmail] } } }
    );

    res.json("success");
  } catch (e) {
    console.error(e);
    res.json("error");
  }
});

app.post("/getGroups", async (req, res) => {
  const { email } = req.body;

  try {
    const groups = await Group.find({ "members.email": email });
    res.json({ groups: groups || [] });
  } catch (e) {
    console.error(e);
    res.json({ groups: [] });
  }
});

app.post("/addExpense", async (req, res) => {
    const { email, expenseName, amount, selectedFriends, selectedGroups } = req.body;
  
    try {
      // You can modify this logic to suit how you want to store expenses
      console.log(`User: ${email} added an expense: ${expenseName} with amount: ${amount}`);
      console.log(`Friends involved: ${selectedFriends}`);
      console.log(`Groups involved: ${selectedGroups}`);
  
      // Implement the actual logic to save the expense in your database
  
      res.json("success");
    } catch (e) {
      console.error(e);
      res.json("error");
    }
  });
  

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
