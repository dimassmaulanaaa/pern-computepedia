import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
	baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;
