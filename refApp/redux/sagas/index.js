import {
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import * as CONST from '../../utils/Constants'
import { onLoginUser, onLoginUserWithOtp, onSignUpUser, createGuestUser, onSocialLogin, onLogoutUser, resetPassword, sendLink, sendPincode, verifyOTP, confirmAccount, resendConfirmAccountToken, getNotificationList, deleteNotification, readNotification, readAllNotification, sendDeviceToken, } from './userSaga';
import { getCategoryList, getSubCategoryList } from './categorySaga';
import { getProductList, getAllProductList, getRecommendedProductList, getHomeProductList, getFilterProductList, getHomeBannerList } from './homeSaga';
import { notifyMeAboutProduct, notifyMeAboutVariantProduct, getProductDescription, checkProductAvailability, getReviewList } from './productSaga';
import { getBrandList, getTagList } from './brandsSaga';
import { searchProduct, saveSearchDetails, getRecentSearchList } from './searchSaga';
import { addToCart, removeFromCart, createCart, updateQuantiyInCart, cartHasProduct, showCartData, applyCoupon, removeCoupon, checkOrderItemAvailability, checkZipcodeAvailability, releaseMyBlockQuantity, addAddressForOrder, calculateShippingChargeAddress, buyCalculateShippingChargeAddress, releaseShippingChargeAddress, placeOrder, myOrderList, getTrackIdDetails, buyProduct, cancelOrder, submitOrderReview, getLogisticTrackIdDetails, paytmPayment, confirmPaytmPayment, getSubscriptionOrders, extendSubscription, create_razorpays_payment, varify_razorpay_signature, getAvailableCoupons, getDeliverySlotList } from './cartSaga';
import { getProfileData, updateProfileData, changePassword, getAddressList, createAddress, updateAddress, deleteAddress, getHelpCenterDetails, saveContactUs, getSocialMediaAccountDetails, addSocialMediaAccountDetails, removeSocialMediaAccountDetails, getFAQList, sendPhoneNoOTP, verifyPhoneNo, sendDeliveryPhoneNoOTP, verifyDeliveryPhoneNo } from './profileSaga';
import { getWishlistData, addToWishlist, removeFromWishlist } from './wishlistSaga';


const watchLogin = function* watchLogin() {
  //* USER_CALLS *//
  yield takeEvery(CONST.LOGIN_USER, onLoginUser);
  yield takeEvery(CONST.LOGIN_USER_WITH_OTP, onLoginUserWithOtp);
  yield takeEvery(CONST.SEND_TOKEN, sendDeviceToken);
  yield takeEvery(CONST.SOCIAL_LOGIN_USER, onSocialLogin);
  yield takeEvery(CONST.SIGNUP_USER, onSignUpUser);
  yield takeEvery(CONST.CREATE_GUEST_USER, createGuestUser);
  yield takeEvery(CONST.LOGOUT_USER, onLogoutUser);
  yield takeEvery(CONST.RESET_PASSWORD, resetPassword);
  yield takeEvery(CONST.SEND_LINK, sendLink);
  yield takeEvery(CONST.SEND_PINCODE, sendPincode);
  yield takeEvery(CONST.VERIFY_OTP, verifyOTP);
  yield takeEvery(CONST.CONFIRM_ACCOUNT, confirmAccount);
  yield takeEvery(CONST.VERIFY_PHONE_NO, verifyPhoneNo);
  yield takeEvery(CONST.SEND_PHONE_NO_OTP, sendPhoneNoOTP);
  yield takeEvery(CONST.SEND_DELIVERY_PHONE_NO, sendDeliveryPhoneNoOTP);
  yield takeEvery(CONST.VERIFY_DELIVERY_PHONE_NO, verifyDeliveryPhoneNo);
  yield takeEvery(CONST.RESEND_CONFIRM_ACCOUNT_TOKEN, resendConfirmAccountToken);
  yield takeEvery(CONST.GET_NOTIFICATION_LIST, getNotificationList);
  yield takeEvery(CONST.DELETE_NOTIFICATION, deleteNotification);
  yield takeEvery(CONST.READ_NOTIFICATION, readNotification);
  yield takeEvery(CONST.READ_ALL_NOTIFICATION, readAllNotification);
  yield takeEvery(CONST.GET_CATEGORY_LIST, getCategoryList);
  yield takeEvery(CONST.GET_SUB_CATEGORY_LIST, getSubCategoryList);
  yield takeEvery(CONST.GET_BRAND_LIST, getBrandList);
  yield takeEvery(CONST.GET_TAG_LIST, getTagList);
  yield takeEvery(CONST.GET_PRODUCT_LIST, getProductList);
  yield takeEvery(CONST.GET_HOME_PRODUCT_LIST, getHomeProductList);
  yield takeEvery(CONST.GET_FILTER_PRODUCT_LIST, getFilterProductList);
  yield takeEvery(CONST.GET_HOME_BANNER_LIST, getHomeBannerList);
  yield takeEvery(CONST.GET_ALL_PRODUCT_LIST, getAllProductList);
  yield takeEvery(CONST.GET_RECOMMENDED_PRODUCT_LIST, getRecommendedProductList);
  yield takeEvery(CONST.GET_PRODUCT_DESCRIPTION_LIST, getProductDescription);
  yield takeEvery(CONST.NOTIFY_ME_ABOUT_PRODUCT, notifyMeAboutProduct);
  yield takeEvery(CONST.NOTIFY_ME_ABOUT_VARIANT_PRODUCT, notifyMeAboutVariantProduct);
  yield takeEvery(CONST.CHECK_PRODUCT_AVAILABILITY, checkProductAvailability);
  yield takeEvery(CONST.SEARCH_PRODUCT, searchProduct);
  yield takeEvery(CONST.SAVE_SEARCH_DETAILS, saveSearchDetails);
  yield takeEvery(CONST.GET_RECENT_SEARCH, getRecentSearchList);
  yield takeEvery(CONST.CREATE_CART, createCart);
  yield takeEvery(CONST.ADD_TO_CART, addToCart);
  yield takeEvery(CONST.REMOVE_FROM_CART, removeFromCart);
  yield takeEvery(CONST.CART_HAS_PRODUCT, cartHasProduct);
  yield takeEvery(CONST.UPDATE_QUANTITY_IN_CART, updateQuantiyInCart);
  yield takeEvery(CONST.SHOW_CART_DATA, showCartData);
  yield takeEvery(CONST.APPLY_COUPON, applyCoupon);
  yield takeEvery(CONST.REMOVE_COUPON, removeCoupon);
  yield takeEvery(CONST.GET_AVAILABLE_COUPONS, getAvailableCoupons);
  yield takeEvery(CONST.GET_LOGISTIC_TRACK_ID_DETAILS, getLogisticTrackIdDetails);
  yield takeEvery(CONST.CHECK_ORDER_ITEM_AVAILABILITY, checkOrderItemAvailability);
  yield takeEvery(CONST.CHECK_ZIPCODE_AVAILABILITY, checkZipcodeAvailability);
  yield takeEvery(CONST.RELEASE_MY_BLOCK_QUANTITY, releaseMyBlockQuantity);
  yield takeEvery(CONST.PAYTM_PAYMENT, paytmPayment);
  yield takeEvery(CONST.CONFIRM_PAYTM_PAYMENT, confirmPaytmPayment);
  yield takeEvery(CONST.GET_WISHLIST, getWishlistData);
  yield takeEvery(CONST.ADD_TO_WISHLIST, addToWishlist);
  yield takeEvery(CONST.REMOVE_FROM_WISHLIST, removeFromWishlist);
  yield takeEvery(CONST.GET_PROFILE_DATA, getProfileData);
  yield takeEvery(CONST.UDPATE_PROFILE_DATA, updateProfileData);
  yield takeEvery(CONST.CHANGE_PASSWORD, changePassword);
  yield takeEvery(CONST.GET_ADDRESS_LIST, getAddressList);
  yield takeEvery(CONST.CREATE_ADDRESS, createAddress);
  yield takeEvery(CONST.UPDATE_ADDRESS, updateAddress);
  yield takeEvery(CONST.DELETE_ADDRESS, deleteAddress);
  yield takeEvery(CONST.GET_HELP_CENTER_DETAILS, getHelpCenterDetails);
  yield takeEvery(CONST.ADD_ADDRESS_TO_ORDER, addAddressForOrder);
  yield takeEvery(CONST.CALCULATE_SHIPPING_CHARGE_ADDRESS, calculateShippingChargeAddress);
  yield takeEvery(CONST.BUY_CALCULATE_SHIPPING_CHARGE_ADDRESS, buyCalculateShippingChargeAddress);
  yield takeEvery(CONST.RELEASE_SHIPPING_CHARGE_ADDRESS, releaseShippingChargeAddress);
  yield takeEvery(CONST.PLACE_ORDER, placeOrder);
  yield takeEvery(CONST.MY_ORDER_LIST, myOrderList);
  yield takeEvery(CONST.GET_TRACK_ID_DETAILS, getTrackIdDetails);
  yield takeEvery(CONST.BUY_PRODUCT, buyProduct);
  yield takeEvery(CONST.CANCEL_ORDER, cancelOrder);
  yield takeEvery(CONST.SUBMIT_ORDER_REVIEW, submitOrderReview);
  yield takeEvery(CONST.GET_REVIEW_LIST, getReviewList);
  yield takeEvery(CONST.SAVE_CONTACT_US_DETAILS, saveContactUs);
  yield takeEvery(CONST.GET_SOCIAL_MEDIA_ACCOUNT_DETAILS, getSocialMediaAccountDetails);
  yield takeEvery(CONST.ADD_SOCIAL_MEDIA_ACCOUNT_DETAILS, addSocialMediaAccountDetails);
  yield takeEvery(CONST.REMOVE_SOCIAL_MEDIA_ACCOUNT_DETAILS, removeSocialMediaAccountDetails);
  yield takeEvery(CONST.GET_FAQ_LIST, getFAQList);
  yield takeEvery(CONST.GET_SUBSCRIPTION_ORDERS, getSubscriptionOrders);
  yield takeEvery(CONST.EXTEND_DELIVERY, extendSubscription);
  yield takeEvery(CONST.CREATE_RAZORPAY_PAYMENTS, create_razorpays_payment);
  yield takeEvery(CONST.VERIFY_RAZORPAY_PAYMENTS, varify_razorpay_signature);
  yield takeEvery(CONST.GET_DELIVERY_SLOT, getDeliverySlotList);
};

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
const Sagas = function* mySagas() {
  yield watchLogin();
};
/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default Sagas;
