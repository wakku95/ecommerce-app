import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		// 👇 Change this if your backend is deployed
		axios
			.get("http://localhost:5000/api/products")
			.then((res) => setProducts(res.data))
			.catch((err) => console.error("Error fetching products:", err));
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
			{products.map((product) => (
				<div
					key={product._id}
					className="bg-white p-4 rounded shadow hover:shadow-lg transition"
				>
					{product.image ? (
						<img
							src={product.image || "https://placehold.co/150x150?text=No+Image&font=roboto"}
							alt={product.title}
							className="w-full h-40 object-cover rounded mb-2"
						/>
					) : null}
					<h3 className="text-lg font-bold">{product.title}</h3>
					<p className="text-sm text-gray-600">{product.description}</p>
					<p className="text-blue-600 font-semibold mt-1">${product.price}</p>
				</div>
			))}
		</div>
	);
};

export default ProductList;
