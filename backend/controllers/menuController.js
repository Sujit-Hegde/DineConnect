const { uploadImage } = require("../config/cloudanry");
const MenuItem = require("../models/menuItemSchema");

// Get all menu items by category
const getMenuItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ["breakfast", "lunch", "snacks", "dinner"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const items = await MenuItem.find({ category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// Add a new menu item
const addMenuItem = async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Process image file
    const imageUrl = await uploadImage(imageFile);

    req.body.imageUrl = imageUrl;

    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to add menu item" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item deleted successfully",
      deletedItem,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to delete order", details: error.message });
  }
};

module.exports = { getMenuItemsByCategory, addMenuItem, deleteOrder };