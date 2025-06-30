import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
	//const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const { user, logout } = useContext(AuthContext);

	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
	// 		setUser(currentUser);
	// 	});
	// 	return () => unsubscribe();
	// }, []);

	const handleLogout = async () => {
		logout();
		// await signOut(auth);
		navigate("/login");
	};

	return (
		<nav className="bg-gray-800 text-white shadow-md">
			<div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
				<Link to="/" className="text-xl font-bold hover:text-yellow-300">
					MyStore
				</Link>

				<div className="space-x-4 text-sm">
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
								<Link to="/admin" className="hover:text-yellow-400">
									Admin
								</Link>
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
		</nav>
	);
}

export default Navbar;
