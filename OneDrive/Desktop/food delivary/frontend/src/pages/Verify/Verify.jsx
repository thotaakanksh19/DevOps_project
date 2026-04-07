import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    // Extract the success and orderId parameters from the URL
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    // Bring in global backend URL and initialize router navigation
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    // Verify the payment status with the backend
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        
        // If the backend confirms payment was successful, redirect to My Orders
        if (response.data.success) {
            navigate("/myorders");
        } else {
            // If the payment failed or was canceled, send the user back to the homepage
            navigate("/");
        }
    };

    // Run the verification function as soon as this page loads
    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            {/* Display a CSS loading spinner while the API call finishes */}
            <div className="spinner"></div>
        </div>
    );
}

export default Verify;


