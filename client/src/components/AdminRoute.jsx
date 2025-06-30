import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <div>Loading...</div>;
	if (!user || !user.isAdmin) return <Navigate to="/login" />;

	return children;
}

export default AdminRoute;
