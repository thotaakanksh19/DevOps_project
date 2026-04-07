import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

// Route for placing an order from the frontend
orderRouter.post("/place", authMiddleware, placeOrder);

// Route for verifying the Stripe payment status
orderRouter.post("/verify", verifyOrder);

// Route for fetching a specific user's order history
orderRouter.post("/userorders", authMiddleware, userOrders);

// Route for fetching all orders to display in the Admin panel
orderRouter.get("/list", listOrders);

// Route for updating the delivery status of an order from the Admin panel
orderRouter.post("/status", updateStatus);

export default orderRouter;

