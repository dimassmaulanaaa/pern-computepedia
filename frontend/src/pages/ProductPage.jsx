import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import EditProductCard from "../components/EditProductCard";

function ProductPage() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-3">
			<Link to={"/"} className="btn btn-ghost mb-3">
				<ArrowLeftIcon className="size-4 mr-2" />
				Back to Products
			</Link>

			<EditProductCard />
		</div>
	);
}

export default ProductPage;
