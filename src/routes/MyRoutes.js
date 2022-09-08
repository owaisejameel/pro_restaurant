import Login from "../screens/Login/Login";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../screens/LandingPage/Header";
import Landing from "../screens/LandingPage/Landing";
import SignUp from "../screens/SignUp/SignUp";
import Cart from "../screens/Cart/Cart";
import PageNotFound from "./PageNotFound";
import { Navigate } from "react-router-dom";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      {/* <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes> */}

      {/* <Routes>
          <Route path="/" element={<Login />} />
          <Route path="header" element={<Header />} />

        </Routes> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="header" element={<Header />}>
          <Route index element={<Landing />} />
          <Route path="cart/:id" element={<Cart />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="/*" element={<Navigate to="/header" />}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
