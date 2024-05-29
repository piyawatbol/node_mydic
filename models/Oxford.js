const mongoose = require("mongoose");

const Oxford = new mongoose.Schema({
    word: String,
    mean: String,
    remember: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Oxford", Oxford);
