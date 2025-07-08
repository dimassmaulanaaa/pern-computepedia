import { categoryModel } from "../models/categoryModel.js";

export const getCategories = async (_, res) => {
	try {
		const categories = await categoryModel.findAll();
		res.status(200).json({ success: true, data: categories });
	} catch (error) {
		console.log("Error getcategories", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createCategory = async (req, res) => {
	const { name } = req.body;

	if (!name.trim()) {
		return res.status(400).json({
			success: false,
			message: "All fields cannot be empty",
		});
	}

	try {
		const createdCategory = await categoryModel.create({ name });
		res.status(201).json({ success: true, data: createdCategory });
	} catch (error) {
		console.log("error createCategory", error);

		if (error.code === "23505") {
			return res.status(409).json({
				success: false,
				message: `Category '${req.body.name}' already exists`,
			});
		} else {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}
};

export const deleteCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedCategory = await categoryModel.delete(id);

		if (!deletedCategory) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: deletedCategory });
	} catch (error) {
		console.log("error deleteCategory", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
