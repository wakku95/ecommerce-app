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
	const [image, setImage] = useState("");
	const [price, setPrice] = useState("");
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

	const addProduct = async (e) => {
		e.preventDefault();

		try {
			// 1. Upload image to /upload route
			const formData = new FormData();
			formData.append("image", imageFile);

			const uploadRes = await fetch("http://localhost:5000/api/upload", {
				method: "POST",
				body: formData,
			});

			const uploadData = await uploadRes.json();
			const imageUrl = uploadData.url;

			// 2. Add product with image URL
			const product = { title, description, price, inStock, image: imageUrl };

			const res = await fetch("http://localhost:5000/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // if using protected route
				},
				body: JSON.stringify(product),
			});

			if (!res.ok) throw new Error("Failed to add product");

			const savedProduct = await res.json();
			console.log("Product saved:", savedProduct);

			setTitle("");
			setDescription("");
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
			const res = await axios.get("http://localhost:5000/api/products");
			setProducts(res.data);
		} catch (err) {
			console.error("Failed to fetch products");
		}
	};

	const fetchOrders = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/orders", {
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

			{/* Add Product */}
			<div className="bg-white p-4 rounded shadow mb-10">
				<h2 className="text-xl font-semibold mb-4">Add Product</h2>
				<form onSubmit={addProduct} className="space-y-3">
					<input
						type="text"
						placeholder="Title"
						className="w-full p-2 border rounded"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<textarea
						placeholder="Description"
						className="w-full p-2 border rounded"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<input
						type="file"
						className="w-full p-2 border rounded"
						onChange={(e) => setImageFile(e.target.files[0])}
						required
					/>
					<input
						type="number"
						placeholder="Price"
						className="w-full p-2 border rounded"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
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
					<button className="bg-green-600 text-white px-4 py-2 rounded">
						Add Product
					</button>
				</form>
			</div>

			{/* Product List */}
			<div className="mb-10">
				<h2 className="text-xl font-semibold mb-4">All Products</h2>
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
							<p className="text-xs text-gray-500">
								{p.inStock ? "In Stock" : "Out of Stock"}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Order List */}
			<div>
				<h2 className="text-xl font-semibold mb-4">All Orders</h2>
				<ul className="space-y-4">
					{orders.map((order) => (
						<li
							key={order._id}
							className="p-4 border rounded bg-white shadow-sm"
						>
							<h3 className="font-bold">{order.name}</h3>
							<p>Email: {order.email}</p>
							<p>Address: {order.address}</p>
							<p>Total: ${order.total}</p>
							<p className="text-sm text-gray-500">
								Ordered on: {new Date(order.createdAt).toLocaleString()}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Admin;
