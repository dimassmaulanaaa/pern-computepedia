import { useNavigate, Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

function RegisterPage() {
	const { loading, formData, setFormData, resetForm, userRegister } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await userRegister();
		if (success) {
			navigate("/login");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-200">
			<div className="card w-full max-w-sm bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title justify-center text-2xl">Register</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Full Name</span>
							</label>
							<input
								type="text"
								placeholder="Your full name"
								className="input input-bordered"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder="Choose a username"
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
								placeholder="Choose a password"
								className="input input-bordered"
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
						</div>
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary" disabled={loading}>
								{loading ? <span className="loading loading-spinner"></span> : "Register"}
							</button>
						</div>
					</form>
					<p className="text-center text-sm mt-4">
						Already have an account?{" "}
						<Link to="/login" onClick={resetForm} className="link link-primary">
							Login here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
