import React, { useContext, useState } from 'react';
import './Navbar.css';
import assets from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    // State to track which menu item is currently underlined
    const [menu, setMenu] = useState("home");

    // Access global state and functions
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    
    const navigate = useNavigate();

    // Log out functionality
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className='navbar'>
            {/* Logo links back to home */}
            <Link to='/'>
                <img src={assets.logo} alt="logo" className="logo" />
            </Link>
            
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile app")} className={menu === "mobile app" ? "active" : ""}>mobile app</a>
                <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
            </ul>
            
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="basket" />
                    </Link>
                    {/* Display a dot on the basket if the cart has items */}
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                
                {/* Conditionally render Sign In button or Profile dropdown based on token */}
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="orders" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="logout" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;


