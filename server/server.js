const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoute = require("./routes/product");
const uploadRoute = require("./routes/uploadRoute");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api", uploadRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB Connected"))
	.catch((err) => console.error("❌ DB Error:", err));

// Routes placeholder
app.get("/", (req, res) => {
	res.send("Ecommerce API running");
});

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
