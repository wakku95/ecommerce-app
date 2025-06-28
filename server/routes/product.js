const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

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
router.post("/", async (req, res) => {
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

module.exports = router;
