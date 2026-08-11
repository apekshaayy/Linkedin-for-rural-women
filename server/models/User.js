const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },

    skills: {
        type: [String],
        default: []
    },

    location: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    }

});

const User = mongoose.model("User", userSchema);

module.exports = User;