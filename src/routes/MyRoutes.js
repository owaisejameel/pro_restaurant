import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../screens/Login/Login";
import HomePage from "../screens/HomePage/HomePage";

import SignUp from "../screens/SignUp/SignUp";
import Cart from "../screens/Cart/Cart";
import PageNotFound from "./PageNotFound";
import OneTimePassword from "../screens/OTP_Screen/OtpPage";
import ContactUs from "../screens/ContactUs/ContactUs";
import AboutUs from "../screens/ContactUs/AboutUs";
import Shops from "../screens/Shops/Shops";
import NewArrivals from "../screens/NewArrivals/NewArrivals";
import Profile from "../screens/Profile/Profile";
import UserProfile from "../screens/Profile/UserProfile";
import WishList from "../screens/Profile/WishList";
import MyOrder from "../screens/Profile/MyOrder";
import SavedAddress from "../screens/Profile/SavedAddress";
import Notification from "../screens/Profile/Notification";
import HelpCenter from "../screens/HelpCenter/HelpCenter";
import PrivacyPolicy from "../screens/HelpCenter/PrivacyPolicy";
import TermsCondition from "../screens/HelpCenter/TermsCondition";
import OthersHelpCenter from "../screens/HelpCenter/OthersHelpCenter";
import Landing from "../screens/LandingPage/Landing";
import SingleProduct from "../screens/HomePage/SingleProduct";
import CheckOut from "../screens/Checkout/CheckOut";

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
        <Route path="onetimepassword" element={<OneTimePassword />} />
        <Route path="home" element={<HomePage />}>
          <Route index element={<Landing />} />
          <Route path="product-detail" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="check-out" element={<CheckOut />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="shops" element={<Shops />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="help-center" element={<HelpCenter />}>
            <Route index element={<PrivacyPolicy />} />
            <Route path="terms-condition" element={<TermsCondition />} />
            <Route path="others" element={<OthersHelpCenter />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<UserProfile />} />
            <Route path="wish-list" element={<WishList />} />
            <Route path="my-order" element={<MyOrder />} />
            <Route path="addressess" element={<SavedAddress />} />
            <Route path="notification" element={<Notification />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="/*" element={<Navigate to="/header" />}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
