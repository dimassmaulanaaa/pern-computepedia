import { useProductStore } from "../store/useProductStore";

function ErrorAlert() {
	const { error } = useProductStore();

	return <div className="alert alert-error">{error}</div>;
}

export default ErrorAlert;
