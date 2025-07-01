import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Admin() {
	const { user, login, logout, token } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Product fields
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [inStock, setInStock] = useState(true);

	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
	const [imageFile, setImageFile] = useState(null);

	useEffect(() => {
		if (user) {
			fetchProducts();
			fetchOrders();
		}
	}, [user]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (err) {
			alert("Login failed");
		}
	};

	const handleLogout = () => {
		logout();
	};
	const updateOrderStatus = async (orderId, status) => {
		try {
			await fetch(`/api/orders/${orderId}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ status }),
			});
			fetchOrders(); // Refresh list
		} catch (err) {
			alert("Failed to update order status");
		}
	};

	const addProduct = async (e) => {
		e.preventDefault();

		try {
			// 1. Upload image to /upload route
			const formData = new FormData();
			formData.append("image", imageFile);

			const uploadRes = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const uploadData = await uploadRes.json();
			const imageUrl = uploadData.url;

			// 2. Add product with image URL
			const product = {
				title,
				description,
				category,
				price,
				inStock,
				image: imageUrl,
			};

			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // if using protected route
				},
				body: JSON.stringify(product),
			});

			if (!res.ok) throw new Error("Failed to add product");

			const savedProduct = await res.json();

			setTitle("");
			setDescription("");
			setCategory("");
			setPrice("");
			setInStock(true);
			setImageFile(null);
			fetchProducts();
		} catch (err) {
			console.error("Error:", err);
			alert("Failed to add product");
		}
	};

	const fetchProducts = async () => {
		try {
			const res = await axios.get("/api/products");
			//setProducts(res.data);
			const data = res.data;
			// Handle both: plain array OR paginated object
			if (Array.isArray(data)) {
				setProducts(data);
			} else {
				setProducts(data.products); // paginated format
			}
		} catch (err) {
			console.error("Failed to fetch products");
		}
	};

	const fetchOrders = async () => {
		try {
			const res = await axios.get("/api/orders", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setOrders(res.data);
		} catch (err) {
			console.error("Failed to fetch orders");
		}
	};

	if (!user) {
		return (
			<div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
				<h2 className="text-xl font-bold mb-4">Admin Login</h2>
				<form onSubmit={handleLogin} className="space-y-3">
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 border rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 border rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="w-full bg-blue-600 text-white py-2 rounded">
						Login
					</button>
				</form>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Admin Panel</h1>
				<button
					onClick={handleLogout}
					className="text-red-500 font-semibold hover:underline"
				>
					Logout
				</button>
			</div>
			<div className="max-w-md mx-auto p-4 bg-white rounded shadow">
				<h2 className="text-xl font-semibold mb-4">Add Product</h2>
				<form onSubmit={addProduct} className="space-y-3">
					<input
						type="text"
						required
						placeholder="Title"
						className="w-full p-2 border rounded"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						required
						placeholder="Description"
						className="w-full p-2 border rounded"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<select
						value={category}
						required
						onChange={(e) => setCategory(e.target.value)}
						className="w-full p-2 border rounded"
					>
						<option value="">Select Category</option>
						<option value="shoes">Shoes</option>
						<option value="clothing">Clothing</option>
						<option value="electronics">Electronics</option>
						<option value="kids">Kids</option>
					</select>
					<input
						type="file"
						required
						className="w-full p-2 border rounded"
						onChange={(e) => setImageFile(e.target.files[0])}
					/>
					<input
						type="number"
						required
						placeholder="Price"
						className="w-full p-2 border rounded"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<label className="block">
						<input
							type="checkbox"
							checked={inStock}
							onChange={(e) => setInStock(e.target.checked)}
							className="mr-2"
						/>
						In Stock
					</label>
					<button className="w-full bg-green-600 text-white px-4 py-2 rounded">
						Add Product
					</button>
				</form>
			</div>
		</div>
	);
}

export default Admin;
