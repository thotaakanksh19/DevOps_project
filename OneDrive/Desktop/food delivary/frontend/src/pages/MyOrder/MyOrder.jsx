import React, { useContext, useEffect, useState } from 'react';
import './MyOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import assets from '../../assets/assets';

const MyOrders = () => {
    // Bring in backend URL and the user's token from Context
    const { url, token } = useContext(StoreContext);
    
    // State to store the user's order history data
    const [data, setData] = useState([]);

    // Load the user's orders automatically if they are logged in (have a token)
    useEffect(() => {
        const fetchOrders = async () => {
            // We pass an empty object {} for the body since it's a POST request but only needs the token header
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            // Store the returned array of orders into the data state
            setData(response.data.data);
        };
        
        if (token) {
            fetchOrders();
        }
    }, [token, url]);

    // Function to manually refresh orders (called by Track Order button)
    const refreshOrders = async () => {
        if (token) {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        }
    };

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            {/* Parcel icon for each order block */}
                            <img src={assets.parcel_icon} alt="" />
                            
                            {/* Map through the items array inside the order to display product names and quantities */}
                            <p>
                                {order.items.map((item, index) => {
                                    // If it's the last item in the array, don't append a comma at the end
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        // If there are more items, add a comma and space
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            
                            {/* Display order total amount */}
                            <p>${order.amount}.00</p>
                            
                            {/* Display total number of individual items in the order */}
                            <p>Items: {order.items.length}</p>
                            
                            {/* Order Status with a visual bullet point */}
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            
                            {/* Manually triggers the fetch API to update order statuses dynamically without refreshing the page */}
                            <button onClick={refreshOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MyOrders;


