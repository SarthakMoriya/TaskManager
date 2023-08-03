const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./Controllers/UserController.js");
const taskController = require("./Controllers/TaskController.js");

const app = express();

//MIDDLEWARE AND ROUTERS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userController);
app.use("/task", taskController);
//Connecting DB
mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("DB connection established");
  })
  .catch(() => {
    "Error connecting DB!";
  });

//STARTING SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port 5000");
});
