import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate("/");
		} catch (err) {
			alert("Login failed");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
			<h2 className="text-xl font-bold mb-4">Login</h2>
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
				<button className="w-full bg-blue-600 text-white py-2 rounded">
					Login
				</button>
				<p className="text-sm mt-2">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-600 underline">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
