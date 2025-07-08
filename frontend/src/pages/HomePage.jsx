import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { PlusCircleIcon, PackageIcon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
import AddCategoryModal from "../components/AddCategoryModal";

function HomePage() {
	const { products, loading, error, fetchProducts } = useProductStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

	useEffect(() => {
		document.title = "Home | Computepedia";
	}, []);

	useEffect(() => {
		fetchProducts(debouncedSearchTerm);
	}, [fetchProducts, debouncedSearchTerm]);

	return (
		<main className="max-w-6xl mx-auto px-4 py-8">
			<div className="md:flex md:justify-between md:items-center mb-8">
				<input
					type="search"
					placeholder="Search products..."
					className="input input-bordered w-full md:max-w-sm mb-3 md:mb-0"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className="flex justify-center items-center gap-3">
					<button
						className="btn btn-primary"
						onClick={() => document.getElementById("add-product-modal").showModal()}
					>
						<PlusCircleIcon className="size-5" />
						Add Product
					</button>
					<button
						className="btn btn-primary"
						onClick={() => document.getElementById("add-category-modal").showModal()}
					>
						<PlusCircleIcon className="size-5" />
						Add Category
					</button>
				</div>
			</div>

			<AddProductModal />

			<AddCategoryModal />

			{error && <ErrorAlert />}

			{products.length === 0 && !loading && !error && (
				<div className="flex flex-col justify-center items-center h-96 space-y-4">
					<div className="bg-base-100 rounded-full p-3">
						<PackageIcon className="size-12 text-primary" />
					</div>
					<div className="text-center space-y-2">
						<h3 className="text-2xl font-semibold">No products found</h3>
						<p className="text-gray-500 max-w-sm">Get started by adding your first product to the inventory</p>
					</div>
				</div>
			)}

			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</main>
	);
}

export default HomePage;
