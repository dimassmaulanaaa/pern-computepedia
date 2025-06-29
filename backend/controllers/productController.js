import { sql } from "../config/database.js";

export const getProducts = async (req, res) => {
	try {
		const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error getProducts", error);

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getProduct = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await sql`
      SELECT * FROM products WHERE id=${id}
    `;

		if (product.length === 0) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: product[0] });
	} catch (error) {
		console.log("Error getProduct", error);

		res.send(500).json({ success: false, message: "Internal server error" });
	}
};

export const createProduct = async (req, res) => {
	const { name, price, image } = req.body;

	if (!name || !price || !image) {
		return res.status(400).json({ success: false, message: "All fields are required" });
	}

	try {
		const createdProduct = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *
    `;

		res.status(201).json({ success: true, data: createdProduct[0] });
	} catch (error) {
		console.log("Error createProduct", error);

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, image, price } = req.body;

	try {
		const updateProduct = await sql`
      UPDATE products
      SET name=${name}, image=${image}, price=${price}
      WHERE id=${id}
      RETURNING *
    `;

		if (updateProduct.length === 0) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: updateProduct[0] });
	} catch (error) {
		console.log("Error updateProduct", error);

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		const deleteProduct = await sql`
      DELETE FROM products WHERE id=${id} RETURNING *
    `;

		if (deleteProduct.length === 0) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: deleteProduct[0] });
	} catch (error) {
		console.log("Error deleteProduct", error);

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
