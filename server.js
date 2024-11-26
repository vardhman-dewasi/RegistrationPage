const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
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
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});