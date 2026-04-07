import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    // Global backend URL passed down to components as a prop
    const url = "http://localhost:4000";

    return (
        <div>
            {/* Global toast notifications container */}
            <ToastContainer />
            
            <Navbar />
            <hr />
            
            <div className="app-content">
                <Sidebar />
                
                {/* React Router setup for the admin panel pages */}
                <Routes>
                    <Route path='/add' element={<Add url={url} />} />
                    <Route path='/list' element={<List url={url} />} />
                    <Route path='/orders' element={<Orders url={url} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;


