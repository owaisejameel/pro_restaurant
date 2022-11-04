import * as CONST from "../../utils/Constants";
import * as ACTIONS_CONST from "../actions/UserActions";
import { put, call } from "redux-saga/effects";
import {
  performPostRequestLogin,
  performPostRequestSignUp,
  performGetRequest,
  performGetRequestTerms,
  performPostRequestForgot,

} from "../../services/apiService/AxiosUtils";
import { COUNTRY_CODE } from "../../services/config/index.dev";

//-----------------------------------------------------------------------------------
export const userLogin = function* userLoginSaga(action) {
  yield put({ type: "LOADER" });
  console.log("saga aaction run on click", action);

  let Phone_Email = action.payload.typePE == "email" ? action.payload.user.login : COUNTRY_CODE + action.payload.user.login
  
  let body = {
    user: {
      login: Phone_Email,
      password: action.payload.user.password,
    },
  };

  try {
    const path = "/login";
    const res = yield call(performPostRequestLogin, path, body);
    console.log(
      "@@@ Add To Cart Response =======",
      res,
      "RES STATUS",
      // res.data.status.message
      res?.data?.message
    );
    if (res !== undefined && res.status === 200) {
      yield put({ type: CONST.USER_LOGIN_ACTION, payload: res.data });
      yield action.payload.navigation();
      yield put({
        type: "SHOW_TOAST",
        payload: { severity: "success", message: res?.data?.message },
      });
    } else {
      console.log("api does'nt run.....");
      yield put({ type: "LOADER_CLOSE" });
      
      // yield put(commonActions.stopSpinner());
      // action.payload.failureCallBack(null);
    }
  } catch (error) {
    console.log("@@@ LOGIN API error ========", error);
    yield put({type : "LOADER_CLOSE"})
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: error?.response?.data?.message},
    });  
  }
};

//-----------------------------------------------------------------------------------
export const userSignUp = function* userSignUpSaga(action) {
  console.log("saga function run on createaccount click", action);

  let body = {
    user: {
      type: "EmailSmsUser",
      full_name: action.payload.name,
      email: action.payload.email,
      full_phone_number: COUNTRY_CODE + action.payload.phone,
      password: action.payload.password,
    },
  };
  let path = "/signup";
  
  try {
    const res = yield call(performPostRequestSignUp, path, body);
       if (res !== undefined && res.status === 200) {
      //  yield put({
      //   type: CONST.USER_SIGNUP_ACTION,
      //   payload: res.data.data,
      // });
      yield action.navigation();
      yield put({
        type: "SHOW_TOAST",
        payload: { severity: "success", message: res?.data?.message },
      });
    }
  } catch (error) {
    console.log("@@@ SIGNUP API error ========", error);
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: error?.response?.data?.message},
    });
  }
};

//-----------------------------------------------------------------------------------
export const userForgot = function* userForgotSaga(action) {
  console.log("userforgot saga run", action);
  yield put({ type: "LOADER" });

  let phone_email = action.payload.type === "email" ? action.payload.email_phone : COUNTRY_CODE + action.payload.email_phone
  
  let path = "users/forgot_password";
  let body = {
    forgot: phone_email,
    otp_type: "forgot_password",
  };

  try {
    const res = yield call(performPostRequestForgot, path, body);
    console.log("userforgot Respone------>", res);
    if (res !== undefined && res.status === 200) {
      yield put({ type: CONST.USER_FORGOT_ACTION, payload: res });
      yield action.payload.navigation();
      yield put({ type: "LOADER_CLOSE" });
    }
  } catch (error) {
    console.log("@@@ FORGOT_PASSWORD API error ========", error);
    yield put({ type: "LOADER_CLOSE" });
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: error?.response?.data?.message },
    });
  }
};

//-----------------------------------------------------------------------------------
export const verifiedOtp = function* userVerifiedOtpSaga(action) {
  console.log("verified otp saga run", action);
  let email = action.payload.email;
  let otp = action.payload.otp;

  let path = `users/verify_otp?forgot=${email}&otp=${otp}`;

  try {
    // const res = yield call(performPostRequestForgot, path);
    const res = yield call(performGetRequest, path);
    console.log("verified otp response ------>", res);
    if (res !== undefined && res.status === 200) {
      yield put(ACTIONS_CONST.verifiedOtpAction(res.data));
      // yield put({ type: CONST.VERIFIED_OTP_ACTION, payload: res.data });
          }
  } catch (error) {
    console.log("@@@ VERIFIED_OTP API error ========", error);
  }
};

//-----------------------------------------------------------------------------------
export const userChangePassword = function* userChangePasswordSaga(action) {
  console.log("userChangePassword saga run", action);
  yield put({ type: "LOADER" });

  let path = "users/reset_password";
  let body = {
    forgot: action.payload.email,
    otp_token: action.payload.otpToken,
    password: action.payload.password,
  };

  try {
    const res = yield call(performPostRequestForgot, path, body);
    console.log("password changed Responese ------>", res);

    if (res !== undefined && res.status === 200) {
      console.log("inside res @@@@@@@");
      yield put(ACTIONS_CONST.userChangedPassword(res));
      // yield put({type: CONST.USER_CHANGED_PASSWORD, })
      yield action.payload.navigation();
      yield put({ type: "LOADER_CLOSE" });
      yield put({
        type: "SHOW_TOAST",
        payload: { severity: "success", message: res?.data?.message },
      });
    }
  } catch (er) {
    console.log("@@@ VERIFIED_OTP API error ========", er);
    yield put({ type: "LOADER_CLOSE" });
  }
};

//-----------------------------------------------------------------------------------
export const usertermsAndConditions = function* termsAndConditionSaga(action) {
  console.log("Saga terms and Conditon", action);
  yield put({ type: "LOADER" });

  let path = "api/v1/help_portals";
  try {
    const res = yield call(performGetRequestTerms, path);
    console.log("respone of terms and Condtion......", res);
    if (res !== undefined && res.status === 200) {
      yield put({ type: "TERMS_N_CONDITION_ACTION", payload: res?.data?.data });
      // action.navigation("/home/help-center");
      yield put({ type: "LOADER_CLOSE" });
    } 
    // else yield put({ type: "LOADER_CLOSE" });
  } catch (er) {
    console.log("@@@ TERMS AND CONDITION error ========", er);
    yield put({ type: "LOADER_CLOSE" });
  }
};

//-----------------------------------------------------------------------------------