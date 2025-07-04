import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useThemeStore } from "./store/useThemeStore";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EditProductPage from "./pages/EditProductPage";

function App() {
	const { theme } = useThemeStore();
	return (
		<div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/product/:id" element={<EditProductPage />} />
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;
