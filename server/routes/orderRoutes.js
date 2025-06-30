const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyToken = require("../middleware/verifyToken");

const verifyAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403).json({ message: "Admin access only" });
	}
};

// GET /api/orders - Admin only
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		res.status(200).json(orders);
	} catch (err) {
		console.error("Fetch Orders Error:", err);
		res.status(500).json({ error: "Failed to fetch orders" });
	}
});

// GET /api/orders/my?email=user@example.com
router.get("/my", verifyToken, async (req, res) => {
	try {
		const { email } = req.query;
		if (!email) return res.status(400).json({ error: "Email required" });

		const orders = await Order.find({ email }).sort({ createdAt: -1 });
		res.json(orders);
	} catch (err) {
		console.error("Fetch Orders Error:", err);
		res.status(500).json({ error: "Failed to fetch orders" });
	}
});

// POST /api/orders - Public route for customers
router.post("/", async (req, res) => {
	try {
		const { name, email, address, items, total } = req.body;
		const order = new Order({ name, email, address, items, total });
		await order.save();
		res.status(201).json({ message: "Order placed", orderId: order._id });
	} catch (err) {
		console.error("Order Error:", err);
		res.status(500).json({ error: "Failed to place order" });
	}
});

module.exports = router;
