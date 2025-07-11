import { Outlet } from "react-router-dom";

import { useThemeStore } from "../store/useThemeStore";

function PublicLayout() {
	const { theme } = useThemeStore();

	return (
		<div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
			<Outlet />
		</div>
	);
}

export default PublicLayout;
