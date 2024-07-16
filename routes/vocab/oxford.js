const express = require("express");
const router = express.Router();
const Oxford = require("../../models/Oxford");
const auth = require("../../middleware/auth");

router.get("/",auth, async (req, res) => {
  try {
    const data = await Oxford.find().sort({ word: 1 });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});
router.post("/",auth, async (req, res) => {
    const { word, mean } = req.body;
    try {
      if (word == null || mean == null || word == "" || mean == "") {
        res.status(200).send("data invalid");
      } else {
        var data = await Oxford.findOne({ word: word });
        console.log(data);
        if (data) {
          data.count += 1;
          const updatedOxford = await data.save();
          console.log(updatedOxford);
          console.log(data);
          res.status(201).send({ data: "word have already" });
        } else {
          const data = await Oxford.create({
            word: word,
            mean: mean,
            count: 0,
            remember: false,
          });
          res.status(200).send({ data: "add success" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
