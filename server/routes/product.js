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

// GET /api/products?page=1&limit=10
router.get("/", async (req, res) => {
	try {
		const {
			keyword,
			category,
			minPrice,
			maxPrice,
			sort,
			page = 1,
			limit = 10,
		} = req.query;

		let filter = {};

		if (keyword) {
			filter.$or = [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			];
		}
		if (category) filter.category = category;
		if (minPrice || maxPrice) {
			filter.price = {};
			if (minPrice) filter.price.$gte = Number(minPrice);
			if (maxPrice) filter.price.$lte = Number(maxPrice);
		}

		let query = Product.find(filter);

		if (sort === "price-asc") query = query.sort({ price: 1 });
		if (sort === "price-desc") query = query.sort({ price: -1 });

		const total = await Product.countDocuments(filter);
		const products = await query
			.skip((page - 1) * limit)
			.limit(parseInt(limit))
			.exec();

		res.status(200).json({
			products,
			page: parseInt(page),
			totalPages: Math.ceil(total / limit),
			totalItems: total,
		});
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

// PUT /api/products/:id
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json(updatedProduct);
	} catch (err) {
		res.status(400).json({ message: "Failed to update product" });
	}
});
// DELETE /api/products/:id
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deletedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json({ message: "Product deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete product" });
	}
});

module.exports = router;
