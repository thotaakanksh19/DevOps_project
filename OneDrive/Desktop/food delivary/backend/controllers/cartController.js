import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user by ID (which is decoded from the JWT token by the auth middleware)
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // If the item doesn't exist in the cart, add it with a quantity of 1
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            // If it already exists, increment the quantity by 1
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // If the item quantity is greater than 0, decrement it by 1
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        
        // Return the user's cart data
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };


