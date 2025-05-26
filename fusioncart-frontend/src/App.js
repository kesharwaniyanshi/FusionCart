import './App.css';

import Header from "./components/header/header"
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import DetailView from './components/details/DetailView';
import Footer from './components/footer/footer';
import Cart from './components/cart/Cart';
import PriceProvider from './context/PriceProvider';
import AdminLayout from './components/admin/dashboard';
import { Error } from './components/home/error';
function App() {


  return (
    <DataProvider>
      <PriceProvider>
        <BrowserRouter>
          <Header />
          <Box style={{ marginTop: 54 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:product_id' element={<DetailView />} />
              <Route path='/cart' element={<Cart />} />
              {/* <Route path='/admin' element={<AdminLayout />} />
              <Route path="*" element={<Error />} /> */}
            </Routes>
          </Box>
          <Footer />
        </BrowserRouter>
      </PriceProvider>
    </DataProvider>
    // <div className='App'>
    // <div>
    // <h1> Welcome to my Login Page</h1>
    //     {Object.keys(user).length === 0 && <h3>Login with your Google Account</h3>}
    //     {Object.keys(user).length !== 0 && <h3>My Profile</h3>}
    // </div>
    //   <div id="signInDiv" style={{
    //     display: "flex",
    //     justifyContent: "center",

    //   }}></div>

    //   {
    //     user &&
    //     <div>
    //       <img src={user.picture} />
    //       <h3>{user.name}</h3>
    //     </div>
    //   }{
    //     Object.keys(user).length !== 0 &&
    //     <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
    //   }
    // </div>
  );
}

export default App;
