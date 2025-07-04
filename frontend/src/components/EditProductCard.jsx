import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SaveIcon, Trash2Icon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

function EditProductCard() {
	const { currentProduct, loading, error, formData, setFormData, fetchProduct, updateProduct, deleteProduct } =
		useProductStore();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		fetchProduct(id);
	}, [fetchProduct, id]);

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			await deleteProduct(id);
			navigate("/");
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[75vh]">
				<div className="loading loading-spinner loading-lg" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-5xl mx-auto px-4">
				<div className="alert alert-error">{error}</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
			{/* PRODUCT IMAGE */}
			<div className="overflow-hidden shadow-lg bg-base-100 rounded-box">
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
						{/* PRODUCT NAME */}
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

						{/* PRODUCT PRICE */}
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

						{/* PRODUCT IMAGE URL */}
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
