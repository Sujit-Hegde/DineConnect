const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true }, // Table number for the order
  menu_title: { type: String, required: true },
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  }, // Reference to MenuItem
  quantity: { type: Number, required: true, min: 1 }, // Quantity of the item in the order
  totalPrice: { type: Number, required: true }, // Total price of the order
  orderDate: { type: Date, default: Date.now }, // Date and time of the order
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending", // Current status of the order
  },
});

module.exports = mongoose.model("Order", orderSchema);
