import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/admin"
					element={
						<PrivateRoute>
							<Admin />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default App;
