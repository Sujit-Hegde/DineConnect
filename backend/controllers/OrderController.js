const MenuItem = require("../models/menuItemSchema");
const Order = require("../models/orderSchema");

// Place a New Order
const placeOrder = async (req, res) => {
  try {
    const { tableNumber, menuItemId, quantity } = req.body;

    // Validate input
    if (!tableNumber || !menuItemId || !quantity) {
      return res
        .status(400)
        .json({ message: "Table number, menuItemId, and quantity are required" });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Fetch the menu item to validate its existence and calculate the price
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Calculate total price
    const totalPrice = menuItem.price * quantity;

    // Create the order
    const order = new Order({
      tableNumber,
      menu_title: menuItem.title,
      menuItemId,
      quantity,
      totalPrice,
    });

    // Save the order in the database
    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Order Details
const getPendingOrders = async (req, res) => {
  try {
    // Find all orders with status "pending" and populate menu item details
    const pendingOrders = await Order.find({ status: "pending" }).populate("menuItemId");

    if (!pendingOrders || pendingOrders.length === 0) {
      return res.status(404).json({ message: "No pending orders found" });
    }

    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Complete and Delete Order
const completeAndDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status to "completed" and delete the order
    order.status = "completed";
    await order.save();
    await Order.findByIdAndDelete(id);

    res.status(200).json({
      message: "Order marked as completed and deleted successfully",
    });
  } catch (error) {
    console.error("Error completing and deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  placeOrder,
  getPendingOrders,
  completeAndDeleteOrder,
};
