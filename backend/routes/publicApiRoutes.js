import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const publicApiRouter = express.Router();

publicApiRouter.post("/api/users", registerUser);
publicApiRouter.post("/api/users/login", loginUser);

export default publicApiRouter;
