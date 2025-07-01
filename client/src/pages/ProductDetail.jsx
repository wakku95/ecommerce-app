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
				const res = await axios.get(`/api/products/${id}`);
				setProduct(res.data);
			} catch (err) {
				console.error("Product not found");
			}
		};
		fetchProduct();
	}, [id]);

	if (!product) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="flex flex-col md:flex-row gap-4 p-4">
			<div className="w-full md:w-1/2">
				<img
					src={product.image}
					alt={product.title}
					className="w-full rounded"
				/>
			</div>
			<div className="w-full md:w-1/2 space-y-2">
				<h2 className="text-2xl font-bold">{product.title}</h2>
				<p className="text-gray-600">{product.description}</p>
				<p className="text-lg font-semibold">${product.price}</p>

				<button
					onClick={() => addToCart(product)}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default ProductDetail;
