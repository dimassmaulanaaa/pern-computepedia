import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

import Navbar from "../components/Navbar";

function ProtectedLayout() {
	const { isAuthenticated } = useAuthStore();
	const { theme } = useThemeStore();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			<div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
				<Navbar />
				<Outlet />;
			</div>
		</>
	);
}

export default ProtectedLayout;
