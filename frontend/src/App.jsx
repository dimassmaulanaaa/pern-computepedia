import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./components/PublicLayout";
import ProtectedLayout from "./components/ProtectedLayout";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EditProductPage from "./pages/EditProductPage";

function App() {
	return (
		<>
			<Routes>
				{/* PUBLIC ROUTES */}
				<Route path="/" element={<PublicLayout />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
				</Route>

				{/* PROTECTED ROUTES */}
				<Route path="/" element={<ProtectedLayout />}>
					<Route index element={<HomePage />} />
					<Route path="edit-product/:id" element={<EditProductPage />} />
				</Route>
			</Routes>

			<Toaster />
		</>
	);
}

export default App;
