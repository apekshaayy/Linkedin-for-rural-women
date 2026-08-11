const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", auth, getProfile);
//debug
console.log("auth:", typeof auth);
console.log("updateProfile:", typeof updateProfile);
router.put("/profile", auth, updateProfile);
module.exports = router;