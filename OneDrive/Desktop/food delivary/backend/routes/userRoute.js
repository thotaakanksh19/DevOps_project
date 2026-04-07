import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Route for creating a new user account
userRouter.post("/register", registerUser);

// Route for logging in an existing user
userRouter.post("/login", loginUser);

export default userRouter;


