const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
const URI = process.env.DATABASE_URL;
mongoose.connect(URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


// Define schema and model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    roll_number: String,
    college_name: String,
    branch: String,
    address: String,
    graduation_year: Number,
});

const User = mongoose.model("User", UserSchema);

// Routes
app.post('/submit', async (req, res) => {
    try {
        const { name, email, roll_number, college_name, branch, address, graduation_year } = req.body;

        // Validate fields (optional additional backend validation)
        // if (!name || !email || !roll_number || !college_name || !branch || !address || !graduation_year) {
        //     return res.status(400).json({ success: false, message: "All fields are required!" });
        // }
        console.log("Problem");
        // Save user to database
        const user = new User({ name, email, roll_number, college_name, branch, address, graduation_year });
        await user.save();
        res.status(201).json({ success: true, message: "Registration successful!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

// Define a route to get all registrations
app.get('/registrations', async (req, res) => {
    try {
        const registrations = await User.find({});
        res.status(200).json({ success: true, registrations });
    } catch (err) {
        console.error("Error fetching registrations:", err);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});


// Start server
const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
});
