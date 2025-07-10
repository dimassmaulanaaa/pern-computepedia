import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./pages/PublicLayout";
import ProtectedLayout from "./pages/ProtectedLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EditProductPage from "./pages/EditProductPage";

function App() {
	return (
		<>
			<Routes>
				{/* PUBLIC ROUTES */}
				<Route element={<PublicLayout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>

				{/* PROTECTED ROUTES */}
				<Route element={<ProtectedLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/product/:id" element={<EditProductPage />} />
				</Route>
			</Routes>

			<Toaster />
		</>
	);
}

export default App;
