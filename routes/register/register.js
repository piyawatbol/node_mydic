const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const {first_name, last_name, email, password,login_type,user_img} = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);
  
    const check_email = await Users.findOne({email: email,login_type: login_type});
    


    if(check_email){
      return res.status(401).send("Email has already been used");
    } 
    const user = await Users.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      user_img: "",
      login_type: login_type
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "3d" }
    );

    user.token = token;
    console.log(user);
    
    res.status(201).json({data : user});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
