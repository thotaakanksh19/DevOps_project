import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';

// 1. App Config
const app = express();
const port = 4000;

// 2. Middlewares
// express.json() allows the server to parse incoming JSON data from the frontend
app.use(express.json());
// cors() gives permission for your frontend to connect with this backend server
app.use(cors());

// 3. Database Connection
connectDB();

// 4. API Endpoints
// Mounts the routers to their respective base paths
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Exposes the "uploads" folder so the frontend can access images via the /images path
app.use("/images", express.static('uploads'));

// Basic GET route to test if the server is running properly
app.get("/", (req, res) => {
    res.send("API working");
});

// 5. Run the Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


