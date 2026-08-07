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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found"
    });
    }
    const isMatch = await bcrypt.compare(
    password,
    user.password
    );
    if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid password"
    });
    }
    const token = jwt.sign(
    {
        id: user._id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });

});
