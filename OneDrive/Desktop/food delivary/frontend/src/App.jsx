import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Card from './pages/Card/Card';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrder/MyOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from './context/StoreContext';

const App = () => {
  // Get showLogin from context
  const { showLogin, setShowLogin } = React.useContext(StoreContext);

  return (
    <>
      {/* ToastContainer allows toast notifications (like "Food Added" or "Error") to pop up anywhere in the app */}
      <ToastContainer />
      
      {/* Conditionally render the Login popup based on the showLogin state */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      {/* Main App container restricts width to 80% and centers the content */}
      <div className='app'>
        {/* Pass the state setter to Navbar so the "Sign in" button can trigger the popup */}
        <Navbar setShowLogin={setShowLogin} />
        
        {/* React Router setup for all the individual pages */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Card />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      
      {/* Footer is placed outside the .app div so its background color stretches fully across the screen */}
      <Footer />
    </>
  );
}

export default App;


