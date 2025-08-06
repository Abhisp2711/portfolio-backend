const express = require("express");
const cors = require("cors");
const { exp } = require("three/tsl");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");
const connectDB = require("./config/db");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Connect MongoDB
connectDB();

//api testing
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the api");
});

// Routes
app.use("/api", contactRoutes);

//Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runninng on port http://localhost:${PORT}`);
});
