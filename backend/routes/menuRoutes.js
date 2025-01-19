const express = require("express");
const router = express.Router();
const {
  getMenuItemsByCategory,
  addMenuItem,
  deleteOrder,
} = require("../controllers/menuController");
const {
  completeAndDeleteOrder,
  getPendingOrders,
  placeOrder,
} = require("../controllers/OrderController");
const upload = require("../config/multer");

router.get("/:category", getMenuItemsByCategory);
router.post("/", upload.single("imageFile"), addMenuItem);
router.delete("/:id", deleteOrder);
router.post("/order", placeOrder);

// Route to get order details
router.get("/order/pending", getPendingOrders);

// Route to complete and delete an order
router.delete("/order/:id/complete", completeAndDeleteOrder);

module.exports = router;
