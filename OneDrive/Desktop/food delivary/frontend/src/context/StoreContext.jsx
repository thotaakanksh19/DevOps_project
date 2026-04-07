import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Initialize the Context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Global State Variables
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    // Add item to cart and sync with backend database if logged in
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        // Backend API call
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Remove item from cart and sync with backend database if logged in
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        // Backend API call
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Calculate the total monetary amount of the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Fetch the list of all available foods from the database
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    // Fetch the user's saved cart data from the database
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    // Load data when the component first mounts
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            // Check if the user is already logged in via localStorage
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    // Bundle all states and functions to pass down to child components
    const contextValue = {
        foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    // Provide the context value to the application
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;


