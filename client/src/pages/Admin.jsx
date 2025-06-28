import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const res = await axios.get("http://localhost:5000/api/products");
		setProducts(res.data);
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);

		try {
			const res = await axios.post(
				"http://localhost:5000/api/upload",
				formData
			);
			setImage(res.data.url);
		} catch (err) {
			console.error("Upload failed:", err);
			alert("Image upload failed");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:5000/api/products", {
				title,
				description,
				price,
				image,
			});

			setTitle("");
			setDescription("");
			setPrice("");
			setImage("");

			fetchProducts();
		} catch (err) {
			console.error(err);
			alert("Failed to add product");
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

			<form
				onSubmit={handleSubmit}
				className="space-y-4 bg-white p-4 rounded shadow"
			>
				<input
					type="text"
					placeholder="Title"
					className="w-full p-2 border rounded"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<textarea
					placeholder="Description"
					className="w-full p-2 border rounded"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Price"
					className="w-full p-2 border rounded"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<input
					type="file"
					accept="image/*"
					className="w-full p-2 border rounded"
					onChange={handleImageUpload}
					required
				/>

				{image && (
					<img
						src={
							image || "https://placehold.co/150x150?text=No+Image&font=roboto"
						}
						alt="Preview"
						className="w-32 h-32 object-cover rounded mx-auto"
					/>
				)}

				<button
					type="submit"
					className="bg-green-600 text-white px-4 py-2 rounded w-full"
				>
					Add Product
				</button>
			</form>

			<h3 className="text-xl mt-8 font-semibold">All Products</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
				{products.map((p) => (
					<div key={p._id} className="border rounded p-4 shadow bg-gray-50">
						{p.image ? (
							<img
								src={
									p.image ||
									"https://placehold.co/150x150?text=No+Image&font=roboto"
								}
								alt={p.title}
								className="w-full h-40 object-cover rounded mb-2"
							/>
						) : null}
						<h4 className="text-lg font-bold">{p.title}</h4>
						<p>{p.description}</p>
						<p className="text-blue-700 font-bold mt-1">${p.price}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Admin;
