const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password, login_type } = req.body;
  if (email == null) {
    return res.status(401).send("Insert Email");
  } else if (password == null) {
    return res.status(401).send("Insert Password");
  } else if (login_type == null) {
    return res.status(401).send("Insert login_type");
  }
  try {
    if (login_type == "email_password") {
      const user = await Users.findOne({
        email: email,
        login_type: login_type,
      });
      if (!user) {
        return res.status(401).send("Email not found");
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "3d" }
        );
        user.token = token;
        res.status(201).send({ data: user });
      } else {
        return res.status(401).send("Password incorrect");
      }
    } else if(login_type == "google") {
      const { uid, first_name, last_name, phone, email, login_type } = req.body;
      const user = await Users.findOne({
        uid: uid,
        login_type: login_type,
      });
      if (!user) {
        const user = await Users.create({
          uid: uid,
          first_name: first_name,
          last_name: last_name,
          id_card: "",
          phone: phone,
          email: email,
          user_img: "",
          login_type: login_type,
        });

        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "3d" }
        );

        user.token = token;
        console.log(user);
        res.status(201).send({ data: user });
      } else {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "3d" }
        );
        user.token = token;
        res.status(201).send({ data: user });
      }
    }else{
        res.status(400).send('login_type wrong');
    }

    
    
  } catch (err) {
    console.log(err);
  }
});

router.get("/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await Users.findOne({ uid: uid });
    if (!user) {
      return res.status(201).json("not have");
    }
    res.json([{ data: user }]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
