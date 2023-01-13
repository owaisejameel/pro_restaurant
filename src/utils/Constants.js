/**
 * PRO RESTAURANT
 */
/**
 * All the app constants comes here
 */

//App Placeholders
export const PHONE_EMAIL_PLACEHOLDER = "Email or Phone Number";
export const PASSWORD_PLACEHOLDER = "Password";
export const NEW_PASSWORD_PLACEHOLDER = "New Password";
export const FULLNAME_PLACEHOLDER = "Full Name";
export const EMAIL_PLACEHOLDER = "Email";
export const PHONE_PLACEHOLDER = "Phone";
export const CONFIRM_PASSWORD_PLACEHOLDER = "Confirm Password";
export const CONFIRM_NEW_PASSWORD_PLACEHOLDER = "Confirm New Password";

//App static text
export const FORGOT_PASSWORD_PAGE_HEADING =
  "Enter your registered Email / Phone Number and we’ll sent you OTP to reset your password.";
export const FORGOT_PASSWORD = "Forgot Password?";
export const ALREADY_HAVE_ACCOUNT = "Already have an account?";
export const CREATE_AN_ACCOUNT = "Create an account";
export const TERMS_N_SERVICE = "Terms of Service";
export const PRIVACY_POLICY = "Privacy Policy";
export const I_AGREE = "I agree to Pro Restaurant's";
export const CONTENT_POLICY = "Content Policies";
export const LOGIN = "Login";
export const NEW_USER = "New User?";

//OTP constants
export const ONE_TIME_PASSWORD = "One Time Password";
export const SET_NEW_PASSWORD = "Set New Password";
export const ENTER_OTP = "Enter OTP";
export const ONE_TIME_PASSWORD_MESSAGE =
  "One Time Password has been sent to your registered Phone/Email.";

//Field's Error text Constants
export const ERROR_TEXT_PHONE_EMAIL_REQ = "Email / Phone Number is required";
export const ERROR_TEXT_PASSWORD_REQ = "Password required";
export const ERROR_TEXT_NAME = "Please enter a name";
export const ERROR_TEXT_PHONE = "Please enter phone number";
export const ERROR_TEXT_PHONE_MUST_10 = "Phone must be 10 Digits";
export const ERROR_TEXT_EMAIL = "please enter email";
export const ERROR_TEXT_EMAIL_INVALID = "invalid email";

export const ERROR_TEXT_PASSWORD = "please enter a password";
export const ERROR_TEXT_PASSWORD_CONTAIN =
  "Password must contain minimum 8 characters, atleast a capital letter, a lowercase letter, a number and a special character. Eg : Abc@1234";
export const ERROR_TEXT_CONFIRM_PASSWORD = "Confirm password in necessary";
export const ERROR_TEXT_CONFIRM_PASSWORD_MATCH =
  "confirm password must match passsword";
export const ERROR_TEXT_NEW_PASSWORD = "New password required";
export const ERROR_TEXT_CONFIRM_NEW_PASSWORD = "Confirm new password required";
export const ERROR_TEXT_CONFIRM_NEW_PASSWORD_MATCH =
  "Confirm new password must match new password";

//Button Constants
export const CREATE_ACCOUNT = "Create account";
export const SUBMIT = "Submit";
export const CONTINUE = "Continue";
export const CONTINUE_GOOGLE = "Continue with Google";
export const LOGIN_OTP = "Login throught OTP";

//Actions Constants
export const USER_SIGNUP_ACTION = "USER_SIGNUP_ACTION";
export const USER_LOGIN_ACTION = "USER_LOGIN_ACTION";
export const USER_FORGOT_ACTION = "USER_FORGOT_ACTION";
export const VERIFIED_OTP_ACTION = "VERIFIED_OTP_ACTION";
export const USER_CHANGED_PASSWORD = "USER_CHANGED_PASSWORD";

//SAGA actions constants
export const USER_LOGIN_SAGA = "USER_LOGIN_SAGA";
export const USER_SIGNUP_SAGA = "USER_SIGNUP_SAGA";
export const USER_FORGOT_SAGA = "USER_FORGOT_SAGA";
export const VERIFY_OTP_SAGA = "VERIFY_OTP_SAGA";
export const CHANGE_PASSWORD_SAGA = "CHANGE_PASSWORD_SAGA";

export const TERMS_N_CONDITION_SAGA = "TERMS_N_CONDITION_SAGA";

export const CREATE_USER_ADDRESS = "CREATE_USER_ADDRESS";
export const GET_USER_ADDRESSESS = "GET_USER_ADDRESSESS";
export const SHOW_ADDRESSES = "SHOW_ADDRESSES";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";

//loader on and off
export const LOADER = "LOADER";
export const LOADER_CLOSE = "LOADER_CLOSE";

//FontSize Constants
export const FONT_SIZE_12 = "12px";
export const FONT_SIZE_14 = "14px";
export const FONT_SIZE_16 = "16px";
export const FONT_SIZE_18 = "18px";
export const FONT_SIZE_20 = "20px";
export const FONT_SIZE_22 = "22px";
export const FONT_SIZE_30 = "30px";

//Color constants
export const primaryColor = "#FFAA33";

//Cart constant
export const CREATE_CART_REQUESTED = "CREATE_CART_REQUESTED";
export const CREATE_CART_SUCCESS = "CREATE_CART_SUCCESS";
export const CREATE_CART_FAILED = "CREATE_CART_FAILED";

export const ADD_TO_CART_REQUESTED = "ADD_TO_CART_REQUESTED";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILED = "ADD_TO_CART_FAILED";

export const GET_CART_ITEMS_REQUESTED = "GET_CART_ITEMS_REQUESTED";
export const GET_CART_ITEMS_SUCCESS = "GET_CART_ITEMS_SUCCESS";
export const GET_CART_ITEMS_FAILED = "GET_CART_ITEMS_FAILED";

export const REDUCE_CART_QUANTITY_REQUESTED = "REDUCE_CART_QUANTITY_REQUESTED";
export const REDUCE_CART_QUANTITY_SUCCESS = "REDUCE_CART_QUANTITY_SUCCESS";
export const REDUCE_CART_QUANTITY_FAILED = "REDUCE_CART_QUANTITY_FAILED";

export const INCREASE_CART_QUANTITY_REQUESTED =
  "INCREASE_CART_QUANTITY_REQUESTED";
export const INCREASE_CART_QUANTITY_SUCCESS = "INCREASE_CART_QUANTITY_SUCCESS";
export const INCREASE_CART_QUANTITY_FAILED = "INCREASE_CART_QUANTITY_FAILED";

export const REMOVE_FROM_CART_REQUESTED = "REMOVE_FROM_CART_REQUESTED";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAILED = "REMOVE_FROM_CART_FAILED";

export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const GET_FAVORITE = "GET_FAVORITE";
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE";

//order
export const PLACE_ORDER = "PLACE_ORDER";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILED = "PLACE_ORDER_FAILED";
export const ORDER_LIST = "ORDER_LIST";
export const ORDER_LIST_SUCCESS = "ORDER_LIST_SUCCESS";
export const ORDER_LIST_FAILED = "ORDER_LIST_FAILED";
