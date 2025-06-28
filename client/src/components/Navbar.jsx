import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		await signOut(auth);
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

					{user ? (
						<>
							<Link to="/admin" className="hover:text-yellow-400">
								Admin
							</Link>
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
