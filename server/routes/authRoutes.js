const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // ❗ Replace with env variable in production

// POST /api/auth/register
router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ error: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({ name, email, password: hashedPassword });
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

		res.json({
			token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
