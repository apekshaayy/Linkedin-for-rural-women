const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(express.json())
const PORT = 3000;

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
//Register Route
app.post("/register", async (req, res) => {
    console.log("REGISTER ROUTE HIT");
    console.log("Received data:", req.body);

    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        console.log("USER SAVED:", savedUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


