import { sql } from "../config/database.js";

export const productModel = {
	async findAll() {
		const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `;
		return products;
	},

	async searchByName(searchTerm) {
		const products = await sql`
        SELECT * FROM products WHERE
        name ILIKE ${"%" + searchTerm + "%"}
        ORDER BY created_at DESC
      `;
		return products;
	},

	async findById(id) {
		const product = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;
		return product[0];
	},

	async create({ name, price, image }) {
		const createdProduct = await sql`
      INSERT INTO products (name, price, image)
      VALUES (${name}, ${price}, ${image})
      RETURNING *
    `;
		return createdProduct[0];
	},

	async update(id, { name, image, price }) {
		const updatedProduct = await sql`
      UPDATE products
      SET name = ${name}, image = ${image}, price = ${price}
      WHERE id = ${id}
      RETURNING *
    `;
		return updatedProduct[0];
	},

	async delete(id) {
		const deletedProduct = await sql`
      DELETE FROM products WHERE id = ${id} RETURNING *
    `;
		return deletedProduct[0];
	},
};
