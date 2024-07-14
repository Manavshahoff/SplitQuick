const express = require("express");
const cors = require("cors");
const User = require("./Mongo"); // Ensure this path is correct
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
    res.json("fail");
  }
});

app.post("/addFriend", async (req, res) => {
  const { userEmail, friendName, friendNumber, friendEmail } = req.body;
  console.log("Received add friend request:", req.body)

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
    if (user && user.friends) {
      res.json({ friends: user.friends });
    } else {
      res.json({ friends: [] });
    }
  } catch (e) {
    console.error(e);
    res.json("error");
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
