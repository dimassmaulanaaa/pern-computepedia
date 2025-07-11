import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SaveIcon, Trash2Icon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

import ErrorAlert from "./ErrorAlert";
import LoadingSpinner from "./LoadingSpinner";

function EditProductCard() {
	const {
		currentProduct,
		categories,
		loading,
		error,
		formData,
		setFormData,
		fetchProduct,
		updateProduct,
		deleteProduct,
		fetchCategories,
	} = useProductStore();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		fetchProduct(id);
	}, [fetchProduct, id]);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			await deleteProduct(id);
			navigate("/");
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorAlert />;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
			{/* PRODUCT IMAGE */}
			<div className="overflow-hidden shadow-lg bg-base-100 rounded-box aspect-square">
				<img src={currentProduct?.image} alt={currentProduct?.name} className="size-full object-cover" />
			</div>

			{/* PRODUCT FORM */}
			<div className="card bg-base-100 shadow-lg">
				<div className="card-body">
					<h2 className="card-title text-2xl mb-3">Edit Product</h2>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							updateProduct(id);
						}}
						className="space-y-5"
					>
						{/* PRODUCT NAME INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Product Name</span>
							</label>
							<input
								type="text"
								placeholder="Enter product name"
								className="input input-bordered w-full"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							/>
						</div>

						{/* PRODUCT PRICE INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Price</span>
							</label>
							<input
								type="number"
								min="1"
								placeholder="1000000"
								className="input input-bordered w-full"
								value={formData.price}
								onChange={(e) => setFormData({ ...formData, price: e.target.value })}
							/>
						</div>

						{/* PRODUCT STOCK INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Stock</span>
							</label>
							<input
								type="number"
								min="1"
								placeholder="99"
								className="input input-bordered w-full"
								value={formData.stock}
								onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
							/>
						</div>

						{/* PRODUCT DESCRIPTION INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Description</span>
							</label>
							<textarea
								type="text"
								placeholder="Enter product description"
								rows={9}
								className="textarea textarea-bordered w-full"
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							></textarea>
						</div>

						{/* PRODUCT IMAGE URL INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Image URL</span>
							</label>
							<input
								type="text"
								placeholder="https://example.com/image.jpg"
								className="input input-bordered w-full"
								value={formData.image}
								onChange={(e) => setFormData({ ...formData, image: e.target.value })}
							/>
						</div>

						{/* PRODUCT CATEGORY INPUT*/}
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base font-medium">Category</span>
							</label>
							<select
								className="select select-bordered w-full"
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

						{/* FORM ACTIONS */}
						<div className="flex justify-end gap-3">
							<button type="button" onClick={handleDelete} className="btn btn-error">
								<Trash2Icon className="size-4 mr-2" />
								Delete Product
							</button>

							<button
								type="submit"
								className="btn btn-primary"
								disabled={loading || !formData.name || !formData.price || !formData.image}
							>
								<SaveIcon className="size-4 mr-2" />
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EditProductCard;
