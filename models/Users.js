const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  uid: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  user_img: String,
  token: String,
  login_type: String,
},{timestamps : true});

module.exports = mongoose.model("Users", Users);