const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	image: String,
	price: {
		type: Number,
		required: true,
	},
	inStock: {
		type: Boolean,
		default: true,
	},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
