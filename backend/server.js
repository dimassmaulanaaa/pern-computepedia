import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { sql } from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const { HOST, PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

async function initializeDatabase() {
	try {
		await sql`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price NUMERIC(9) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
	} catch (error) {
		console.log("Error initializing database", error);
	}
}

initializeDatabase().then(() => {
	app.listen(PORT, HOST, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
});
