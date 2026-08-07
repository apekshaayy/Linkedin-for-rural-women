const User = require("./models/User");
const express = require("express");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
//console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();
const app = express();
app.use(express.json())
const PORT = 3000;

//console.log(process.env.MONGO_URI);

//Register Route
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use("/api/auth", authRoutes);