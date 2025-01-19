const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "snacks", "dinner"],
    required: true,
  },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
