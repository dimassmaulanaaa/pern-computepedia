import { useEffect } from "react";
import { Package2Icon, PlusCircleIcon, Trash2Icon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

import ErrorAlert from "./ErrorAlert";
import LoadingSpinnerOnButton from "./LoadingSpinnerOnButton";

function AddCategoryModal() {
	const {
		categories,
		loading,
		error,
		formData,
		setFormData,
		resetForm,
		fetchCategories,
		addCategory,
		deleteCategory,
	} = useProductStore();

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<dialog id="add-category-modal" className="modal">
			<div className="modal-box">
				{/* CLOSE BUTTON */}
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
				</form>

				{/* MODAL HEADER */}
				<h3 className="font-bold text-xl mb-5">Add New Category</h3>

				{error ? (
					<ErrorAlert />
				) : (
					<>
						{/* LIST CATEGORY */}
						<div className="relative">
							<div className="collapse">
								<input type="checkbox" />
								<div className="collapse-title text-lg text-center font-medium bg-base-200">List Category</div>
								<div className="collapse-content">
									{/* LIST CATEGORY TABLE */}
									<div className="overflow-x-auto">
										<table className="table table-zebra table-sm">
											<tbody>
												{categories.map((category, i) => (
													<tr key={category.id}>
														<th className="w-20 pl-9">{i + 1}</th>
														<td>{category.name}</td>
														{/* TABLE ACTIONS */}
														<td className="text-right pr-9">
															<button
																className="btn btn-xs btn-error btn-outline"
																onClick={() => deleteCategory(category.id)}
															>
																<Trash2Icon className="size-4" />
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				<form onSubmit={addCategory} className="space-y-6">
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
									placeholder="Enter category name"
									className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>
						</div>
					</div>

					{/* MODAL ACTIONS */}
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-ghost" onClick={resetForm}>
								Cancel
							</button>
						</form>
						<button
							type="submit"
							className="btn btn-primary min-w-[120px]"
							disabled={!formData.name.trim() || loading}
						>
							{loading ? (
								<LoadingSpinnerOnButton />
							) : (
								<>
									<PlusCircleIcon className="size-5 mr-2" />
									Add Category
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

export default AddCategoryModal;
