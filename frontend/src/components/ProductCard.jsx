import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";

function ProductCard({ product }) {
	return (
		<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
			{/* PRODUCT IMAGE */}
			<figure className="relative pt-[75%]">
				<img
					src={product.image}
					alt={product.name}
					className="absolute top-0 left-0 w-full h-full object-cover"
				/>
			</figure>

			<div className="card-body">
				{/* PRODUCT INFO */}
				<h2 className="card-title text-xl font-semibold text-primary">{product.name}</h2>
				<p className="text-xl font-bold">
					{new Intl.NumberFormat("id-ID", {
						style: "currency",
						currency: "IDR",
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					}).format(Number(product.price))}
				</p>

				{/* CARD ACTIONS */}
				<div className="card-actions justify-end mt-4">
					<Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
						<EditIcon className="size-4" />
					</Link>

					<button className="btn btn-sm btn-error  btn-outline">
						<Trash2Icon className="size-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
export default ProductCard;
