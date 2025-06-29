import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await axios.get(`http://localhost:5000/api/products/${id}`);
				setProduct(res.data);
			} catch (err) {
				console.error("Product not found");
			}
		};
		fetchProduct();
	}, [id]);

	if (!product) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="max-w-4xl mx-auto p-6">
			<img
				src={product.image}
				alt={product.title}
				className="w-full h-64 object-cover rounded mb-4"
			/>
			<h2 className="text-2xl font-bold mb-2">{product.title}</h2>
			<p className="text-gray-700 mb-4">{product.description}</p>
			<p className="text-lg font-semibold mb-6">${product.price}</p>

			<button
				onClick={() => addToCart(product)}
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
			>
				Add to Cart
			</button>
		</div>
	);
}

export default ProductDetail;
