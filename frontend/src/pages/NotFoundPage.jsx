import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

import { useThemeStore } from "../store/useThemeStore";

function NotFoundPage() {
	const { theme } = useThemeStore();

	return (
		<main
			className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4 transition-colors duration-300"
			data-theme={theme}
		>
			<h1 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
				404
			</h1>

			<p className="text-2xl md:text-3xl font-semibold mt-4">Page Not Found</p>

			<p className="text-base-content/70 mt-2 mb-8 max-w-md">
				Oops! The page you are looking for does not exist. It might have been moved or deleted.
			</p>

			<Link to="/" className="btn btn-primary">
				Go Back to Homepage
			</Link>
		</main>
	);
}

export default NotFoundPage;
