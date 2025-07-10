import { productModel } from "../models/productModel.js";

export const getProducts = async (req, res) => {
	try {
		const { search } = req.query;
		let products = [];

		if (search) {
			products = await productModel.searchByName(search);
		} else {
			products = await productModel.findAll();
		}

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
	const { name, price, stock, description, image, category_id } = req.body;
	const productPayload = {
		name: name.trim(),
		price: price,
		stock: stock,
		description: description.trim(),
		image: image.trim(),
		category_id: category_id,
	};

	if (!name.trim() || !price || !stock || !description.trim() || !image.trim() || !category_id) {
		return res.status(400).json({ success: false, message: "All fields cannot be empty" });
	}

	try {
		const createdProduct = await productModel.create(productPayload);
		res.status(201).json({ success: true, data: createdProduct });
	} catch (error) {
		console.log("Error createProduct", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, price, stock, description, image, category_id } = req.body;
	const productPayload = {
		name: name.trim(),
		price: price,
		stock: stock,
		description: description.trim(),
		image: image.trim(),
		category_id: category_id,
	};

	if (!name.trim() || !price || !stock || !description.trim() || !image.trim() || !category_id) {
		return res.status(400).json({ success: false, message: "All fields cannot be empty" });
	}

	try {
		const updatedProduct = await productModel.update(id, productPayload);

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
