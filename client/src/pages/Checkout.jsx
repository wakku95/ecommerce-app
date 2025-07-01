import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Checkout() {
	const { cart, clearCart } = useContext(CartContext);
	const { user } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email] = useState(user?.email || "");
	const [address, setAddress] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const orderData = {
			name,
			email: user.email,
			address,
			items: cart.map((item) => ({
				productId: item._id,
				title: item.title,
				quantity: item.quantity,
				price: item.price,
			})),
			total,
		};

		try {
			await axios.post("/api/orders", orderData);
			clearCart();
			setSubmitted(true);
		} catch (err) {
			console.error("Order error", err);
			alert("Something went wrong while placing your order.");
		}
	};

	if (submitted) {
		return (
			<div className="max-w-xl mx-auto mt-10 text-center">
				<h2 className="text-2xl font-bold mb-4">🎉 Order Confirmed!</h2>
				<p>Thank you for your purchase, {name}.</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-6">Checkout</h2>

			<form onSubmit={handleSubmit} className="grid gap-4 mb-6">
				<input
					type="text"
					placeholder="Name"
					className="p-2 border rounded"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<textarea
					placeholder="Shipping Address"
					className="p-2 border rounded"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				/>
				<button
					type="submit"
					className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
				>
					Place Order
				</button>
			</form>

			<div className="border-t pt-4">
				<h3 className="text-xl font-semibold mb-2">Order Summary</h3>
				<ul className="space-y-2">
					{cart.map((item) => (
						<li key={item._id} className="text-gray-700">
							{item.title} × {item.quantity} = $
							{(item.price * item.quantity).toFixed(2)}
						</li>
					))}
				</ul>
				<p className="mt-3 font-bold">Total: ${total.toFixed(2)}</p>
			</div>
		</div>
	);
}

export default Checkout;
