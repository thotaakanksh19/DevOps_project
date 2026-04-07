import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post("/add", authMiddleware, addToCart);

// Route to remove an item from the cart
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Route to fetch the user's cart data
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;


