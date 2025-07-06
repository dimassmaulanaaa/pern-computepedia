import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { aj } from "./lib/arcjet.js";
import { initializeDatabase } from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const { HOST, PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(async (req, res, next) => {
	try {
		const decision = await aj.protect(req, {
			requested: 1,
		});

		if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
			res.status(403).json({ error: "Spoofed bot detected" });
			return;
		}

		next();
	} catch (error) {
		console.log("Arcjet error", error);

		next(error);
	}
});

app.use("/api/products", productRoutes);

initializeDatabase().then(() => {
	app.listen(PORT, HOST, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
});
