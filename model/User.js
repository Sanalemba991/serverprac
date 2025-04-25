const mongoose = require("mongoose");

// Define the User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Create the User model
const UserModel = mongoose.model("User", UserSchema);  // Use "User" as the model name

// Export the model
module.exports = UserModel;
