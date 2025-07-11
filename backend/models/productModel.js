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

	async create({ name, price, stock, description, image, user_id, category_id }) {
		const createdProduct = await sql`
      INSERT INTO products (name, price, stock, description, image, user_id, category_id)
      VALUES (${name}, ${price}, ${stock}, ${description}, ${image}, ${user_id}, ${category_id})
      RETURNING *
    `;
		return createdProduct[0];
	},

	async update(id, { name, price, stock, description, image, user_id, category_id }) {
		const updatedProduct = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, stock = ${stock}, description = ${description}, image = ${image}, user_id=${user_id}, category_id = ${category_id}
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
