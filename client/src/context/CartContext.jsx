import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	// Load from localStorage on first load
	useEffect(() => {
		const saved = localStorage.getItem("cart");
		if (saved) setCart(JSON.parse(saved));
	}, []);

	// Save to localStorage on cart change
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const increaseQty = (id) => {
		setCart((prev) =>
			prev.map((item) =>
				item._id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	const decreaseQty = (id) => {
		setCart((prev) =>
			prev.map((item) =>
				item._id === id
					? { ...item, quantity: Math.max(item.quantity - 1, 1) }
					: item
			)
		);
	};
	const addToCart = (product) => {
		setCart((prev) => {
			const exists = prev.find((item) => item._id === product._id);
			if (exists) {
				return prev.map((item) =>
					item._id === product._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prev, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((item) => item._id !== id));
	};

	const clearCart = () => setCart([]);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				increaseQty,
				decreaseQty,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
