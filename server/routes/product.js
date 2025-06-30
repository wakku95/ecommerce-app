const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middleware/verifyToken");

const verifyAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403).json({ message: "Admin access only" });
	}
};

// GET /api/products
router.get("/", async (req, res) => {
	try {
		const { keyword, category, minPrice, maxPrice, sort } = req.query;

		let filter = {};

		// Keyword search in title or description
		if (keyword) {
			filter.$or = [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			];
		}

		if (category) {
			filter.category = category;
		}

		if (minPrice || maxPrice) {
			filter.price = {};
			if (minPrice) filter.price.$gte = Number(minPrice);
			if (maxPrice) filter.price.$lte = Number(maxPrice);
		}

		let query = Product.find(filter);

		// Optional sorting
		if (sort === "price-asc") query = query.sort({ price: 1 });
		if (sort === "price-desc") query = query.sort({ price: -1 });

		const products = await query.exec();
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

// Add a new product
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
	try {
		const { title, description, category, price, image, inStock } = req.body;
		const newProduct = new Product({
			title,
			description,
			category,
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
