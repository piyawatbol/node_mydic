const express = require("express");
const router = express.Router();
const Vocab = require("../models/Vocab");

router.get("/", async (req, res) => {
  try {
    const data = await Vocab.find().sort({ word: 1 });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:letter", async (req, res) => {
  const letter = req.params.letter;
  try {
    if (!letter || letter.length !== 1) {
      return res.status(400).send("Invalid letter provided");
    }

    const data = await Vocab.find({
      $and: [
        { word: { $regex: new RegExp(`^${letter}`, "i") } },
        { word: { $ne: letter } },
      ],
    }).sort({ word: 1 });

    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

router.get("/random", async (req, res) => {
  try {
    const [randomData] = await Vocab.aggregate([{ $sample: { size: 1 } }]);
    if (randomData) {
      randomData.count += 1;
      await Vocab.updateOne({ _id: randomData._id }, { $set: { count: randomData.count } });
      
      res.status(200).send(randomData);
    } else {
      res.status(404).send("No data found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { word, mean } = req.body;
  try {
    if (word == null || mean == null || word == "" || mean == "") {
      res.status(200).send("data invalid");
    } else {
      var data = await Vocab.findOne({ word: word });
      console.log(data);
      if (data) {
        data.count += 1;
        const updatedVocab = await data.save();
        console.log(updatedVocab);
        console.log(data);
        res.status(201).send({ data: "word have already" });
      } else {
        const data = await Vocab.create({
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

router.patch("/:id", async (req, res) => {
  try {
    const vocabId = req.params.id;

    const vocab = await Vocab.findById(vocabId);

    if (vocab) {
      vocab.count += 1;

      const updatedVocab = await vocab.save();

      res.status(200).send({ data: "update success" });
    } else {
      res.status(404).json({ message: "error update count" });
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const vocabId = req.params.id;

    const vocab = await Vocab.findByIdAndDelete(vocabId);
    if (!vocab) {
      return res.status(401).send("delete error");
    }
    res.status(201).send({ data: "delete success" });
  } catch (err) {
    console.error(err);
  }
});

router.post("/0/reset-count", async (req, res) => {
  try {
    await Vocab.updateMany({}, { $set: { count: 0 } });

    res.status(200).send("Count reset successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
