import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/api/auth/register", {
				name,
				email,
				password,
			});
			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (err) {
			console.error(err);
			setError("Registration failed. Try another email.");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
			<h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
			<form onSubmit={handleRegister} className="space-y-4">
				<input
					type="text"
					placeholder="Full Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
				>
					Register
				</button>
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</form>
		</div>
	);
}

export default Register;
