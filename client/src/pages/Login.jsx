// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/admin");
		} catch (err) {
			setError("Invalid credentials");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
				<h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 border rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 border rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<button className="bg-blue-600 text-white px-4 py-2 w-full rounded">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
