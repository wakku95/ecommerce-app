import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminProductList() {
	const { token } = useContext(AuthContext);
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	// Move fetchProducts outside so it can be reused
	const fetchProducts = async () => {
		try {
			const res = await axios.get("/api/products");
			const data = res.data;
			setProducts(Array.isArray(data) ? data : data.products);
		} catch (err) {
			console.error("Failed to fetch products");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm("Delete this product?")) {
			try {
				await axios.delete(`/api/products/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				fetchProducts();
			} catch (err) {
				alert("Failed to delete product");
			}
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h2 className="text-xl font-semibold mb-4">Product List</h2>
			{Array.isArray(products) && products.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2">
					{products.map((p) => (
						<div
							key={p._id}
							className="p-4 border rounded bg-gray-50 shadow-sm"
						>
							<img
								src={p.image}
								alt={p.title}
								className="w-full h-40 object-cover rounded mb-2"
							/>
							<h3 className="font-bold">{p.title}</h3>
							<p className="text-sm">{p.description}</p>
							<p className="mt-1 font-semibold">Price: ${p.price}</p>
							<p className="text-xs text-gray-500 mb-2">
								{p.inStock ? "In Stock" : "Out of Stock"} | {p.category}
							</p>
							<div className="flex gap-2">
								<button
									onClick={() => navigate(`/admin/edit-product/${p._id}`)}
									className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(p._id)}
									className="px-3 py-1 bg-red-500 text-white text-sm rounded"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No products available.</p>
			)}
		</div>
	);
}
