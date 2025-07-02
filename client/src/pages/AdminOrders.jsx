import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminOrders() {
	const { token } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		try {
			const res = await axios.get(
				"https://ecommerce-app-qi50.onrender.com/api/orders",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setOrders(res.data);
		} catch (err) {
			console.error("Failed to fetch orders");
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const updateOrderStatus = async (orderId, status) => {
		try {
			await axios.patch(
				`
https://ecommerce-app-qi50.onrender.com/api/orders/${orderId}/status`,
				{ status },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			await fetchOrders(); // ✅ now this works
		} catch (err) {
			console.error("Update error:", err);
			alert("Failed to update order");
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-xl font-semibold mb-4">All Orders</h2>
			<ul className="space-y-4">
				{orders.map((order) => (
					<li key={order._id} className="p-4 border rounded shadow-sm bg-white">
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-bold">{order.name}</h3>
							<span
								className={`text-xs px-2 py-1 rounded font-semibold ${
									order.status === "Completed"
										? "bg-green-100 text-green-700"
										: order.status === "Shipped"
										? "bg-yellow-100 text-yellow-800"
										: "bg-gray-200 text-gray-800"
								}`}
							>
								{order.status || "Pending"}
							</span>
						</div>
						<p>Email: {order.email}</p>
						<p>Address: {order.address}</p>
						<p>Total: ${order.total}</p>
						<p className="text-sm text-gray-500">
							Ordered on: {new Date(order.createdAt).toLocaleString()}
						</p>
						<div className="mt-2 flex gap-2">
							{order.status !== "Shipped" && (
								<button
									onClick={() => updateOrderStatus(order._id, "Shipped")}
									className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
								>
									Mark as Shipped
								</button>
							)}
							{order.status !== "Completed" && (
								<button
									onClick={() => updateOrderStatus(order._id, "Completed")}
									className="bg-green-600 text-white px-2 py-1 rounded text-sm"
								>
									Mark as Completed
								</button>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
