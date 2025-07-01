import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
	const navigate = useNavigate();
	const { user, logout } = useContext(AuthContext);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = async () => {
		logout();
		navigate("/login");
		setMenuOpen(false);
	};

	return (
		<nav className="bg-gray-800 text-white shadow-md">
			<div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
				<Link to="/" className="text-xl font-bold hover:text-yellow-300">
					MyStore
				</Link>
				{/* Hamburger for small screens */}
				<button
					className="md:hidden text-white"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* Desktop menu */}
				<div className="hidden md:flex space-x-4 text-sm">
					<Link to="/" className="hover:text-yellow-400">
						Home
					</Link>
					<Link to="/cart" className="hover:text-yellow-400">
						Cart
					</Link>
					{user && (
						<Link to="/my-orders" className="hover:text-yellow-400">
							My Orders
						</Link>
					)}

					{user ? (
						<>
							{user.isAdmin && (
								<>
									<Link to="/admin" className="hover:text-yellow-400">
										Add Products
									</Link>
									<Link to="/admin/products" className="hover:text-yellow-400">
										Edit Products
									</Link>
									<Link to="/admin/orders" className="hover:text-yellow-400">
										Update Orders
									</Link>
								</>
							)}
							<button
								onClick={handleLogout}
								className="hover:text-red-400 ml-2"
							>
								Logout
							</button>
						</>
					) : (
						<Link to="/login" className="hover:text-yellow-400">
							Login
						</Link>
					)}
				</div>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="md:hidden px-4 pb-4 space-y-2 text-sm bg-gray-800">
					<Link
						to="/"
						className="block hover:text-yellow-400"
						onClick={() => setMenuOpen(false)}
					>
						Home
					</Link>
					<Link
						to="/cart"
						className="block hover:text-yellow-400"
						onClick={() => setMenuOpen(false)}
					>
						Cart
					</Link>
					{user && (
						<Link
							to="/my-orders"
							className="block hover:text-yellow-400"
							onClick={() => setMenuOpen(false)}
						>
							My Orders
						</Link>
					)}
					{user ? (
						<>
							{user.isAdmin && (
								<>
									{" "}
									<br />
									<Link to="/admin" className="hover:text-yellow-400">
										Add Products
									</Link>
									<br />
									<Link to="/admin/products" className="hover:text-yellow-400">
										Edit Products
									</Link>
									<br />
									<Link to="/admin/orders" className="hover:text-yellow-400">
										Update Orders
									</Link>
								</>
							)}
							<button
								onClick={handleLogout}
								className="block hover:text-red-400"
							>
								Logout
							</button>
						</>
					) : (
						<Link
							to="/login"
							className="block hover:text-yellow-400"
							onClick={() => setMenuOpen(false)}
						>
							Login
						</Link>
					)}
				</div>
			)}
		</nav>
	);
}

export default Navbar;
