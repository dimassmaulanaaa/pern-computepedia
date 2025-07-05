import { productModel } from "../models/productModel.js";

export const getProducts = async (_req, res) => {
	try {
		const products = await productModel.findAll();
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error getProducts", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await productModel.findById(id);

		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: product });
	} catch (error) {
		console.log("Error getProduct", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const createProduct = async (req, res) => {
	const { name, price, image } = req.body;

	if (!name || !price || !image) {
		return res.status(400).json({ success: false, message: "All fields are required" });
	}

	try {
		const newProduct = await productModel.create({ name, price, image });
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.log("Error createProduct", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, image, price } = req.body;

	try {
		const updatedProduct = await productModel.update(id, { name, image, price });

		if (!updatedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.log("Error updateProduct", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedProduct = await productModel.delete(id);

		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: deletedProduct });
	} catch (error) {
		console.log("Error deleteProduct", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
