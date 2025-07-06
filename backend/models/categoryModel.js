import { sql } from "../config/database.js";

export const categoryModel = {
	async findAll() {
		const categories = await sql`
      SELECT * FROM categories
    `;
		return categories;
	},

	async create({ name }) {
		const createdCategory = await sql`
      INSERT INTO categories (name)
      VALUES (${name})
      RETURNING *
    `;
		return createdCategory[0];
	},

	async delete(id) {
		const deletedCategory = await sql`
    DELETE FROM categories WHERE id = ${id} RETURNING *
    `;
		return deletedCategory[0];
	},
};
