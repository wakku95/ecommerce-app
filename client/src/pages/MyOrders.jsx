import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function MyOrders() {
	const { user, token } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user?.email) return;

		const fetchOrders = async () => {
			try {
				const res = await axios.get(`/api/orders/my?email=${user.email}`, {
					headers: {
						Authorization: `Bearer ${token}`, // token from context
					},
				});
				setOrders(res.data);
			} catch (err) {
				console.error("Error fetching orders:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [user]);

	if (loading) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="max-w-3xl mx-auto p-4 mt-6">
			<h2 className="text-2xl font-bold mb-4">My Orders</h2>
			{orders.length === 0 ? (
				<p>No orders found.</p>
			) : (
				<ul className="space-y-4">
					{orders.map((order) => (
						<li
							key={order._id}
							className="border p-4 rounded shadow-sm bg-white"
						>
							<div className="flex justify-between items-center mb-2">
								<p className="text-sm text-gray-600">
									<strong>Date:</strong>{" "}
									{new Date(order.createdAt).toLocaleString()}
								</p>
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

							<p className="mb-1">
								<strong>Total:</strong> ${order.total}
							</p>
							<p className="mb-2">
								<strong>Address:</strong> {order.address}
							</p>

							<ul className="mt-2 pl-4 list-disc text-sm text-gray-700">
								{order.items.map((item, idx) => (
									<li key={idx}>
										{item.title} — ${item.price}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default MyOrders;
