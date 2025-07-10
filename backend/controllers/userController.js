import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

export const registerUser = async (req, res) => {
	const { username, name, password } = req.body;
	const userPayload = {
		username: username.trim(),
		name: name.trim(),
		password: password,
	};

	if (!username.trim() || !name.trim() || !password) {
		return res.status(400).json({ success: false, message: "All fields cannot be empty" });
	}

	try {
		const userExists = await UserModel.findByUsername(username.trim());

		if (userExists) {
			return res.status(409).json({ success: false, message: "Username already exists" });
		}

		const createdUser = await UserModel.create(userPayload);
		res.status(201).json({ success: true, data: createdUser });
	} catch (error) {
		console.log("Error registerUser", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		const userExists = await UserModel.findByUsername(username);

		if (!userExists) {
			return res.status(401).json({ success: false, message: "Username or password wrong" });
		}

		const passwordMatch = await bcrypt.compare(password, userExists.password);

		if (!passwordMatch) {
			return res.status(401).json({ success: false, message: "Username or password wrong" });
		}

		const payload = {
			id: userExists.id,
			username: userExists.username,
			role: userExists.role,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(200).json({
			success: true,
			data: {
				token: token,
			},
		});
	} catch (error) {
		console.log("Error loginUser", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const logoutUser = async (_, res) => {
	try {
		res.status(200).json({
			success: true,
			message: "User logged out successfully",
		});
	} catch (error) {
		console.log("Error logoutUser", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
