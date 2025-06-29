const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middleware/verifyToken");

// Get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ message: "Error fetching products" });
	}
});

// Add a new product
router.post("/", verifyToken, async (req, res) => {
	try {
		const { title, description, price, image, inStock } = req.body;
		const newProduct = new Product({
			title,
			description,
			price,
			image,
			inStock,
		});
		await newProduct.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).json({ message: "Failed to add product" });
	}
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) return res.status(404).json({ message: "Product not found" });
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
