import { create } from "zustand";
import toast from "react-hot-toast";

import apiClient from "../lib/axios";

import { useAuthStore } from "./useAuthStore";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
	products: [],
	currentProduct: null,

	categories: [],

	loading: false,
	error: null,

	formData: {
		name: "",
		price: "",
		stock: "",
		description: "",
		image: "",
		category_id: "",
	},

	setFormData: (formData) => set({ formData }),
	resetForm: () =>
		set({
			formData: {
				name: "",
				price: "",
				stock: "",
				description: "",
				image: "",
				category_id: "",
			},
		}),

	// PRODUCTS
	fetchProducts: async (searchTerm = "") => {
		set({ loading: true });
		try {
			const url = searchTerm ? `${BASE_URL}/api/products?search=${searchTerm}` : `${BASE_URL}/api/products`;
			const response = await apiClient.get(url);
			set({ products: response.data.data, error: null });
			get().resetForm();
		} catch (error) {
			set({ error: error.response.data.message, products: [] });
		} finally {
			set({ loading: false });
		}
	},

	fetchProduct: async (id) => {
		set({ loading: true });
		try {
			const response = await apiClient.get(`${BASE_URL}/api/products/${id}`);
			set({
				currentProduct: response.data.data,
				formData: response.data.data,
				error: null,
			});
		} catch (error) {
			set({ error: error.response.data.message, currentProduct: null });
		} finally {
			set({ loading: false });
		}
	},

	addProduct: async (e) => {
		e.preventDefault();
		set({ loading: true });
		try {
			const { formData } = get();
			const { user } = useAuthStore.getState();
			const productPayload = {
				...formData,
				user_id: user.id,
			};
			await apiClient.post(`${BASE_URL}/api/products`, productPayload);
			document.getElementById("add-product-modal").close();
			await get().fetchProducts();
			get().resetForm();
			toast.success("Product added successfully");
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ loading: false });
		}
	},

	updateProduct: async (id) => {
		set({ loading: true });
		try {
			const { formData } = get();
			const { user } = useAuthStore.getState();
			const productPayload = {
				...formData,
				user_id: user.id,
			};
			const response = await apiClient.put(`${BASE_URL}/api/products/${id}`, productPayload);
			set({ currentProduct: response.data.data });
			toast.success("Product updated successfully");
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ loading: false });
		}
	},

	deleteProduct: async (id) => {
		set({ loading: true });
		try {
			await apiClient.delete(`${BASE_URL}/api/products/${id}`);
			set((prev) => ({
				products: prev.products.filter((product) => product.id !== id),
			}));
			get().resetForm();
			toast.success("Product deleted successfully");
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ loading: false });
		}
	},

	// CATEGORIES
	fetchCategories: async () => {
		set({ loading: true });

		try {
			const response = await apiClient.get(`${BASE_URL}/api/categories`);
			set({ categories: response.data.data, error: null });
		} catch (error) {
			set({ error: error.response.data.message, categories: [] });
		} finally {
			set({ loading: false });
		}
	},

	addCategory: async (e) => {
		e.preventDefault();
		set({ loading: true });

		try {
			const { formData } = get();
			await apiClient.post(`${BASE_URL}/api/categories`, formData);
			document.getElementById("add-category-modal").close();
			await get().fetchCategories();
			get().resetForm();
			toast.success("Category added successfully");
		} catch (error) {
			document.getElementById("add-category-modal").close();
			get().resetForm();
			toast.error(error.response.data.message);
		} finally {
			set({ loading: false });
		}
	},

	deleteCategory: async (id) => {
		set({ loading: true });
		try {
			await apiClient.delete(`${BASE_URL}/api/categories/${id}`);
			set((prev) => ({
				categories: prev.categories.filter((category) => category.id !== id),
			}));
			get().resetForm();
			document.getElementById("add-category-modal").close();
			toast.success("Category deleted successfully");
		} catch (error) {
			document.getElementById("add-category-modal").close();
			toast.error(error.response.data.message);
		} finally {
			set({ loading: false });
		}
	},
}));
