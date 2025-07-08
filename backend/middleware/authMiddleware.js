import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ success: false, message: "Unauthorized" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
		if (error) {
			return res.status(403).json({ success: false, message: "Invalid Token" });
		}

		req.user = user;
		next();
	});
};
