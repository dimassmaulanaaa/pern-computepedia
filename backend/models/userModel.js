import bcrypt from "bcrypt";
import { sql } from "../config/database.js";

export const UserModel = {
	async findByUsername(username) {
		const result = await sql`
      SELECT * FROM users WHERE username = ${username}
    `;
		return result[0];
	},

	async create({ username, name, password }) {
		password = await bcrypt.hash(password, 10);
		const result = await sql`
      INSERT INTO users (username, name, password)
      VALUES (${username}, ${name}, ${password})
      RETURNING *
    `;
		return result[0];
	},
};
