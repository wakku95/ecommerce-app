import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilterBar from "./SearchFilterBar";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async (filters = {}) => {
		try {
			const queryParams = new URLSearchParams(filters).toString();
			const res = await fetch(`/api/products?${queryParams}`);
			const data = await res.json();

			// Make sure to extract the correct array
			if (Array.isArray(data)) {
				setProducts(data);
			} else if (Array.isArray(data.products)) {
				setProducts(data.products);
			} else {
				setProducts([]); // fallback to empty array
			}
		} catch (err) {
			console.error("Failed to fetch products:", err);
			setProducts([]); // fallback on error
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<SearchFilterBar onSearch={fetchProducts} />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{Array.isArray(products) &&
					products.map((product) => (
						<div
							key={product._id}
							className="bg-white p-4 rounded shadow hover:shadow-lg transition"
						>
							<Link to={`/product/${product._id}`}>
								{product.image ? (
									<img
										src={
											product.image ||
											"https://placehold.co/150x150?text=No+Image&font=roboto"
										}
										alt={product.title}
										className="h-48 w-full object-cover rounded"
									/>
								) : null}
								<h3 className="text-lg font-semibold mt-2">{product.title}</h3>
							</Link>
							<p className="text-sm text-gray-600">{product.description}</p>
							<p className="text-sm text-gray-700">${product.price}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default ProductList;
