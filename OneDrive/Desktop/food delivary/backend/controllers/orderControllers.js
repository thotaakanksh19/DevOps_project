import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Initialize Stripe with the secret key from your .env file
let stripe = null;

const getStripe = () => {
    if (!stripe) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripe;
};

// Placing user order from frontend
const placeOrder = async (req, res) => {
    // The URL where your frontend is running (update port if yours differs, e.g., 5174)
    const frontend_url = "http://localhost:5175";

    try {
        // 1. Create the new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // 3. Format the cart items for the Stripe payment session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr", // Use your preferred currency (e.g., 'usd')
                product_data: {
                    name: item.name
                },
                // Stripe requires amounts in cents/paise. Multiplying by 80 converts from standard dummy $ to INR
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));

        // 4. Push the delivery charges as an additional line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80 // $2 delivery fee converted
            },
            quantity: 1
        });

        // 5. Create the Stripe checkout session
        const session = await getStripe().checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // 6. Return the session URL to redirect the user to the Stripe payment page
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Verifying order payment status
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            // Payment was successful: mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            const order = await orderModel.findById(orderId);
            await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
            res.json({ success: true, message: "Paid" });
        } else {
            // Payment failed or was canceled: delete the pending order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        // Find all orders that match the user's ID
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Listing all orders for admin panel
const listOrders = async (req, res) => {
    try {
        // Find all orders in the database
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// API for updating order status from the admin panel
const updateStatus = async (req, res) => {
    try {
        // Find the order by ID and update the 'status' property
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };


    