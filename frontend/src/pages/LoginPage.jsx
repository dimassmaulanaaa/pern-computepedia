import { useNavigate, Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

function LoginPage() {
	const { loading, formData, setFormData, resetForm, userLogin } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await userLogin();
		if (success) {
			navigate("/");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-200">
			<div className="card w-full max-w-sm bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title justify-center text-2xl">Login</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder="Enter your username"
								className="input input-bordered"
								value={formData.username}
								onChange={(e) => setFormData({ ...formData, username: e.target.value })}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Enter your password"
								className="input input-bordered"
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
						</div>
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary" disabled={loading}>
								{loading ? <span className="loading loading-spinner"></span> : "Login"}
							</button>
						</div>
					</form>
					<p className="text-center text-sm mt-4">
						Don't have an account?{" "}
						<Link to="/register" onClick={resetForm} className="link link-primary">
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
