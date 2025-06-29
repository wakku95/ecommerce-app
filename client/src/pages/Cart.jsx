import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
	const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
		useContext(CartContext);

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	if (cart.length === 0) {
		return (
			<div className="text-center mt-10 text-xl">🛒 Your cart is empty.</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-6">Your Cart</h2>

			<ul className="space-y-4">
				{cart.map((item) => (
					<li
						key={item._id}
						className="p-4 border rounded shadow flex items-center justify-between"
					>
						<div>
							<h3 className="text-lg font-semibold">{item.title}</h3>
							<p className="text-gray-600">
								Price: ${item.price} × {item.quantity}
							</p>
							<p className="font-bold">
								Subtotal: ${(item.price * item.quantity).toFixed(2)}
							</p>
							<div className="flex items-center space-x-2 mt-2">
								<button
									onClick={() => decreaseQty(item._id)}
									className="px-2 bg-gray-300 rounded hover:bg-gray-400"
								>
									–
								</button>
								<span className="px-3">{item.quantity}</span>
								<button
									onClick={() => increaseQty(item._id)}
									className="px-2 bg-gray-300 rounded hover:bg-gray-400"
								>
									+
								</button>
							</div>
						</div>
						<button
							onClick={() => removeFromCart(item._id)}
							className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
						>
							Remove
						</button>
					</li>
				))}
			</ul>

			<div className="text-right mt-6 flex-col flex">
				<p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
				<Link to="/checkout">
					<button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
						Proceed to Checkout
					</button>
				</Link>
				<button
					onClick={clearCart}
					className="mt-3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
				>
					Clear Cart
				</button>
			</div>
		</div>
	);
}

export default Cart;
