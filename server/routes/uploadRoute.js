const express = require("express");
const router = express.Router();
const multer = require("multer");
const { cloudinary } = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "ecommerce-products",
		allowed_formats: ["jpg", "png", "jpeg"],
	},
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}
	res.json({ url: req.file.path });
});

module.exports = router;
