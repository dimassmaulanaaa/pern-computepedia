import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

const { ARCJET_KEY } = process.env;

export const aj = arcjet({
	key: ARCJET_KEY,
	characteristics: ["ip.src"],
	rules: [
		shield({ mode: "LIVE" }),
		detectBot({
			mode: "LIVE",
			allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:TOOL"],
		}),
		tokenBucket({
			mode: "LIVE",
			refillRate: 15,
			interval: 10,
			capacity: 20,
		}),
	],
});
