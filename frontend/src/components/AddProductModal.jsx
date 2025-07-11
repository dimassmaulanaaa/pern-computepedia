import { useEffect } from "react";
import { Package2Icon, Wallet, ImageIcon, PlusCircleIcon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

import LoadingSpinnerOnButton from "./LoadingSpinnerOnButton";

function AddProductModal() {
	const { categories, loading, formData, setFormData, closeModal, addProduct, fetchCategories } =
		useProductStore();

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<dialog id="add-product-modal" className="modal">
			<div className="modal-box">
				{/* CLOSE BUTTON */}
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
				</form>

				{/* MODAL HEADER */}
				<h3 className="font-bold text-xl mb-5">Add New Product</h3>

				<form onSubmit={addProduct} className="space-y-6">
					<div className="grid gap-6">
						{/* PRODUCT NAME INPUT */}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Name</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
									<Package2Icon className="size-5" />
								</div>
								<input
									type="text"
									placeholder="Enter product name"
									className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>
						</div>

						{/* PRODUCT PRICE INPUT */}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Price</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
									<Wallet className="size-5" />
								</div>
								<input
									type="number"
									min="1"
									placeholder="999999"
									className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.price}
									onChange={(e) => setFormData({ ...formData, price: e.target.value })}
								/>
							</div>
						</div>

						{/* PRODUCT STOCK INPUT */}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Stock</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
									<Wallet className="size-5" />
								</div>
								<input
									type="number"
									min="1"
									placeholder="99"
									className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.stock}
									onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
								/>
							</div>
						</div>

						{/* PRODUCT DESCRIPTION INPUT */}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Description</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
									<Package2Icon className="size-5" />
								</div>
								<textarea
									type="text"
									placeholder="Enter product description"
									className="textarea textarea-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								></textarea>
							</div>
						</div>

						{/* PRODUCT IMAGE URL INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Image URL</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
									<ImageIcon className="size-5" />
								</div>
								<input
									type="text"
									placeholder="https://example.com/image.jpg"
									className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.image}
									onChange={(e) => setFormData({ ...formData, image: e.target.value })}
								/>
							</div>
						</div>

						{/* PRODUCT CATEGORY INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Category</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
									<ImageIcon className="size-5" />
								</div>
								<select
									className="select select-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.category_id}
									onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
								>
									<option value="" disabled>
										Select a category
									</option>
									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{/* MODAL ACTIONS */}
					<div className="modal-action">
						{/* <form method="dialog"> */}
						<button
							type="button"
							className="btn btn-ghost"
							onClick={() => {
								closeModal("add-product-modal");
							}}
						>
							Cancel
						</button>
						{/* </form> */}
						<button
							type="submit"
							className="btn btn-primary min-w-[120px]"
							disabled={
								!formData.name.trim() ||
								!formData.price ||
								!formData.stock ||
								!formData.description.trim() ||
								!formData.image.trim() ||
								!formData.category_id ||
								loading
							}
						>
							{loading ? (
								<LoadingSpinnerOnButton />
							) : (
								<>
									<PlusCircleIcon className="size-5 mr-2" />
									Add Product
								</>
							)}
						</button>
					</div>
				</form>
			</div>

			{/* BACKDROP */}
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}
export default AddProductModal;
