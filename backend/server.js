import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { aj } from "./lib/arcjet.js";
import { initializeDatabase } from "./config/database.js";
import publicApiRouter from "./routes/publicApiRoutes.js";
import protectedApiRouter from "./routes/protectedApiRoutes.js";

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

		if (decision.isDenied()) {
			if (decision.reason.isRateLimit()) {
				res.status(429).json({ message: "Too many request" });
			} else if (decision.reason.isBot()) {
				res.status(403).json({ message: "Bot access denied" });
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
			return;
		}

		if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
			res.status(403).json({ message: "Spoofed bot detected" });
			return;
		}

		next();
	} catch (error) {
		console.log("Arcjet error", error);

		next(error);
	}
});

app.use(publicApiRouter);
app.use(protectedApiRouter);

initializeDatabase().then(() => {
	app.listen(PORT, HOST, () => {
		console.log(`Server running at http://${HOST}:${PORT}`);
	});
});
