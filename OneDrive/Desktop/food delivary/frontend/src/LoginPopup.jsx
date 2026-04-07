import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import assets from './assets/assets';
import { StoreContext } from './context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    // Bring in the backend URL and setToken function from Context API
    const { url, setToken } = useContext(StoreContext);

    // Toggle between "Login" and "Sign Up" forms
    const [currentState, setCurrentState] = useState("Sign Up");
    
    // Store user input data
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Update state dynamically when user types in input fields
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    // Handle form submission for both Login and Registration
    const onLogin = async (event) => {
        event.preventDefault();
        
        // Determine the correct API endpoint based on the current state
        let newUrl = url;
        if (currentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        // Send POST request to backend with user data
        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            // If successful, save token to context state and local storage
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            // Close the popup overlay
            setShowLogin(false);
        } else {
            // If error (like invalid email or wrong password), alert user
            alert(response.data.message);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    {/* Clicking the cross icon triggers the function passed from App.jsx to hide the popup */}
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                
                <div className="login-popup-inputs">
                    {/* Hide the Name field if the user is logging in */}
                    {currentState === "Login" 
                        ? <></> 
                        : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                
                <button type="submit">{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                
                {/* Toggle text to switch between form states */}
                {currentState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
}

export default LoginPopup;



