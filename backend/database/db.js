const mongoose = require("mongoose");
const connecttoDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://DINECONNECT:DINECONNECT2025@cluster0.dkexc.mongodb.net/",
    );
    console.log("MongoDB is connected");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
module.exports = connecttoDB;
