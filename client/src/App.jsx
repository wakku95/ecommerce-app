import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/:id" element={<ProductDetail />} />
				<Route
					path="/admin"
					element={
						<AdminRoute>
							<Admin />
						</AdminRoute>
					}
					in
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/cart" element={<Cart />} />
				<Route
					path="/checkout"
					element={
						<PrivateRoute>
							<Checkout />
						</PrivateRoute>
					}
				/>

				<Route
					path="/my-orders"
					element={
						<PrivateRoute>
							<MyOrders />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
