import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState({
		title: "",
		description: "",
		price: 0,
		image: "",
		category: "",
		inStock: true,
	});

	useEffect(() => {
		fetch(`http://localhost:5000/api/products/${id}`)
			.then((res) => res.json())
			.then((data) => setProduct(data));
	}, [id]);
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setProduct((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch(`http://localhost:5000/api/products/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`, // if required
			},
			body: JSON.stringify(product),
		});
		navigate("/admin"); // back to admin page
	};

	return (
		<div className="p-6 max-w-xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Edit Product</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					name="title"
					value={product.title}
					onChange={handleChange}
					placeholder="Title"
					className="w-full p-2 border rounded"
				/>
				<input
					type="text"
					name="description"
					value={product.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full p-2 border rounded"
				/>
				<input
					type="number"
					name="price"
					value={product.price}
					onChange={handleChange}
					placeholder="Price"
					className="w-full p-2 border rounded"
				/>
				<input
					type="text"
					name="image"
					value={product.image}
					onChange={handleChange}
					placeholder="Image URL"
					className="w-full p-2 border rounded"
				/>
				<select
					name="category"
					value={product.category}
					onChange={handleChange}
					className="w-full p-2 border rounded"
				>
					<option value="">Select Category</option>
					<option value="shoes">Shoes</option>
					<option value="clothing">Clothing</option>
					<option value="electronics">Electronics</option>
					<option value="kids">Kids</option>
				</select>
				<label className="block">
					<input
						type="checkbox"
						name="inStock"
						checked={product.inStock}
						onChange={handleChange}
						className="mr-2"
					/>
					In Stock
				</label>
				<button
					type="submit"
					className="bg-green-600 text-white px-4 py-2 rounded"
				>
					Update Product
				</button>
			</form>
		</div>
	);
}

export default EditProduct;
