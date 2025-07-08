import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { logoutUser } from "../controllers/userController.js";
import {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController.js";
import { getCategories, createCategory, deleteCategory } from "../controllers/categoryController.js";

const protectedApiRouter = express.Router();

protectedApiRouter.use(authMiddleware);

protectedApiRouter.post("/api/users/logout", logoutUser);

protectedApiRouter.get("/api/products", getProducts);
protectedApiRouter.get("/api/products/:id", getProduct);
protectedApiRouter.post("/api/products", createProduct);
protectedApiRouter.put("/api/products/:id", updateProduct);
protectedApiRouter.delete("/api/products/:id", deleteProduct);

protectedApiRouter.get("/api/categories", getCategories);
protectedApiRouter.post("/api/categories", createCategory);
protectedApiRouter.delete("/api/categories/:id", deleteCategory);

export default protectedApiRouter;
