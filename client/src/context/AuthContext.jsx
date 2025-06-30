import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (token) {
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
		}
		setLoading(false);
	}, [token]);

	const login = async (email, password) => {
		const res = await axios.post("http://localhost:5000/api/auth/login", {
			email,
			password,
		});

		localStorage.setItem("token", res.data.token);
		localStorage.setItem("user", JSON.stringify(res.data.user));
		setToken(res.data.token);
		setUser(res.data.user);
	};

	const register = async (name, email, password) => {
		await axios.post("http://localhost:5000/api/auth/register", {
			name,
			email,
			password,
		});
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				register,
				logout,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
