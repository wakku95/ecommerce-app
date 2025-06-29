const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		address: String,
		items: [
			{
				productId: String,
				title: String,
				quantity: Number,
				price: Number,
			},
		],
		total: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
