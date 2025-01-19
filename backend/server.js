const express = require("express");
const connecttoDB = require("./database/db");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();
const cors = require("cors");
const { initCloudinary } = require("./config/cloudanry");

const app = express();
const port = process.env.PORT || 3000;

initCloudinary();
connecttoDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
