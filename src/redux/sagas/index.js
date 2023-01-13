import * as CONST from "../../utils/Constants";

import { all, fork, takeEvery } from "redux-saga/effects";
import {
  userLogin,
  userSignUp,
  userForgot,
  verifiedOtp,
  userChangePassword,
  usertermsAndConditions,
  googleLogin,
} from "./userSaga";

import {
  generateOtpEmail,
  generateOtpPhone,
  updateUserProfile,
  userProfile,
  userResetPassword,
  verifyOtpEmail,
  verifyOtpEmailPhone,
  updateUserImage,
  verifyOtpPhone,
} from "./userProfileSaga";
import {
  createUserAddress,
  deleteAddress,
  editAddress,
  userAddressess,
  countryData,
} from "./savedAddressSaga";
import { useEffect } from "react";

import { addToWishlist, getWishlist, removeWishlist } from "./wishlistSaga";

import { addWishList } from "./products";
import {
  addToCart,
  createCart,
  createOrder,
  getCartItems,
  increaseCartItem,
  orderList,
  reduceCartItem,
  removeCartItem,
} from "./cartSaga";

const watchUser = function* watchUser() {
  yield takeEvery(CONST.USER_LOGIN_SAGA, userLogin);
  yield takeEvery("GOOGLE_LOGIN", googleLogin);

  yield takeEvery(CONST.USER_SIGNUP_SAGA, userSignUp);
  yield takeEvery(CONST.USER_FORGOT_SAGA, userForgot);
  yield takeEvery(CONST.VERIFY_OTP_SAGA, verifiedOtp);
  yield takeEvery(CONST.CHANGE_PASSWORD_SAGA, userChangePassword);
  yield takeEvery(CONST.TERMS_N_CONDITION_SAGA, usertermsAndConditions);

  // yield takeEvery("UPDATE_NAME", userProfile);
  yield takeEvery("USER_PROFILE_SAGA", userProfile);
  yield takeEvery("USER_CHANGE_PASS_SAGA", userResetPassword);
  yield takeEvery("GEN_PHONE_OTP_SAGA", generateOtpPhone);
  // yield takeEvery("VERIFY_OTP_EMAIL_PHONE_SAGA", verifyOtpEmailPhone);

  yield takeEvery("GEN_EMAIL_OTP_SAGA", generateOtpEmail);
  // yield takeEvery("UPDATE_USER_PROFILE_SAGA", updateUserProfile);
  yield takeEvery("UPDATE_NAME", updateUserProfile);
  yield takeEvery("UPDATE_IMAGE", updateUserImage);
  yield takeEvery("VERIFY_PHONE_OTP_SAGA", verifyOtpPhone);
  yield takeEvery("VERIFY_EMAIL_OTP_SAGA", verifyOtpEmail);
  yield takeEvery(CONST.CREATE_USER_ADDRESS, createUserAddress);
  yield takeEvery(CONST.GET_USER_ADDRESSESS, userAddressess);
  // yield takeEvery(CONST.SHOW_ADDRESSES, );
  yield takeEvery(CONST.UPDATE_ADDRESS, editAddress);
  yield takeEvery(CONST.DELETE_ADDRESS, deleteAddress);
  // yield takeEvery("ADD_WISHLIST", addWishList);

  yield takeEvery(CONST.CREATE_CART_REQUESTED, createCart);
  yield takeEvery(CONST.ADD_TO_CART_REQUESTED, addToCart);
  yield takeEvery(CONST.GET_CART_ITEMS_REQUESTED, getCartItems);
  yield takeEvery(CONST.INCREASE_CART_QUANTITY_REQUESTED, increaseCartItem);
  yield takeEvery(CONST.REDUCE_CART_QUANTITY_REQUESTED, reduceCartItem);
  yield takeEvery(CONST.REMOVE_FROM_CART_REQUESTED, removeCartItem);

  yield takeEvery(CONST.PLACE_ORDER, createOrder);
  yield takeEvery(CONST.ORDER_LIST, orderList);

  yield takeEvery(CONST.ADD_TO_FAVORITE, addToWishlist);
  yield takeEvery(CONST.GET_FAVORITE, getWishlist);
  yield takeEvery(CONST.REMOVE_FROM_FAVORITE, removeWishlist);
};

const rootSaga = function* mySagas() {
  yield watchUser();
};

export default rootSaga;
