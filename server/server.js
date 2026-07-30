const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json())
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
// Register Route
app.post("/register", async (req, res) => {
    console.log("REGISTER ROUTE HIT");
    console.log("Received data:", req.body);

    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        console.log("User object created:", newUser);

        const savedUser = await newUser.save();

        console.log("USER SAVED:", savedUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("ERROR SAVING USER:", error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});