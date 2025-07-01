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
		status: {
			type: String,
			enum: ["Pending", "Shipped", "Completed"],
			default: "Pending",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
