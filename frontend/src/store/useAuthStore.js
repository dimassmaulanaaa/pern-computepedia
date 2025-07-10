import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import apiClient from "../lib/axios";

export const useAuthStore = create(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			loading: false,
			error: null,

			formData: {
				name: "",
				username: "",
				password: "",
			},

			setFormData: (formData) => set({ formData }),
			resetForm: () =>
				set({
					formData: {
						name: "",
						username: "",
						password: "",
					},
				}),

			userRegister: async () => {
				set({ loading: true });
				try {
					const { formData } = get();
					await apiClient.post("/api/users", formData);
					get().resetForm();
					toast.success("Registration successfully");
					return true;
				} catch (error) {
					toast.error(error.response.data.message);
					return false;
				} finally {
					set({ loading: false });
				}
			},

			userLogin: async () => {
				set({ loading: true });
				try {
					const { formData } = get();
					const response = await apiClient.post("/api/users/login", formData);
					get().resetForm();
					const { token } = response.data.data;
					const userPayload = jwtDecode(token);
					set({ token, user: userPayload, isAuthenticated: true });
					return true;
				} catch (error) {
					set({ isAuthenticated: false });
					toast.error(error.response.data.message);
					return false;
				} finally {
					set({ loading: false });
				}
			},

			userLogout: async (e) => {
				e.preventDefault();
				set({ loading: true });
				try {
					await apiClient.post("/api/users/logout");
					get().resetForm();
					set({ token: null, user: null, isAuthenticated: false, loading: false, error: null });
				} catch (error) {
					toast.error(error.response.data.message);
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
