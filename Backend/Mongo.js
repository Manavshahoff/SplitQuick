const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log('failed');
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [{
    name: String,
    email: String
  }],
  groups: [{
    name: String,
    members: [String] // Array of email addresses
  }]
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  members: [{
    name: String,
    email: String
  }]
});

const User = mongoose.model("User", userSchema);
const Group = mongoose.model("Group", groupSchema);

module.exports = { User, Group };
