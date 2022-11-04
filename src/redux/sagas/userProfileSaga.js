import {
  performGetRequestProfile,
  performPatchRequest,
  performPostRequest,
  performPatchRequestEditProfile
} from "../../services/apiService/AxiosUtils";
import { put, call } from "redux-saga/effects";
import * as CONST from "../../utils/Constants";
import { COUNTRY_CODE } from "../../services/config/index.dev";
// import * as ACTIONS_CONST from "../actions/UserActions";

//Get userProfile Details API---------------------------------------------------------------------
export const userProfile = function* userProfileSaga(action) {
  console.log("userProfile saga run", action);
  yield put({ type: CONST.LOADER });

  let id = 1;
  // let id = action.payload.id
  let path = `api/v1/user_details/${id}`;

  try {
    const res = yield call(performGetRequestProfile, path);
    console.log("userProfile response ------>", res);
    if (res !== undefined && res.status === 200) {
      // yield put(ACTIONS_CONST.verifiedOtpAction(res.data));

      yield put({ type: "USER_PROFILE_ACTION", payload: res.data });
      yield put({ type: CONST.LOADER_CLOSE });
    }
  } catch (error) {
    console.log("@@@ userProfile API error ========", error);
    yield put({ type: CONST.LOADER_CLOSE });

  }
};

//Change Password API integration---------------------------------------------------------------------
export const userResetPassword = function* userResetPasswordSaga(action) {
  console.log("reset password saga run", action);

  yield put({type : "LOADER"})
  let id = action.payload.id;
  let path = `api/v1/user_details/${id}/change_password`;
  let body = {
    user: {
      current_password: action.payload.currentPassword,
      new_password: action.payload.newPassword,
    },
  };

  try {
    const res = yield call(performPatchRequest, path, body);

    if (res !== undefined && res.status === 200) {
      if (res.data.success === false) {
        yield put({
          type: "SHOW_TOAST",
          payload: { severity: "error", message: res?.data?.message },
        });
        yield put({ type: "LOADER_CLOSE" });
      } else {
        console.log("inside res @@@@@@@");
        // yield put(ACTIONS_CONST.userChangedPassword(res));
        yield put({ type: "USER_RESET_PASS_ACTION", payload: res.data });
        yield action.close(false)
        yield put({ type: "LOADER_CLOSE" });
        yield put({
          type: "SHOW_TOAST",
          payload: { severity: "success", message: res?.data?.message },
        });
      }
    }
  } catch (er) {
    console.log("@@@ VERIFIED_OTP API error ========", er);
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: er?.response?.data?.message },
    });
  }
  yield put({ type: "LOADER_CLOSE" });
};

// Generate OTP for phone--------------------------------------------------------------------------------
export const generateOtpPhone = function* generateOtpPhoneSaga(action) {
  console.log("generateOtpPhone saga run", action);
  // yield put({ type: "LOADER" });

  let id = action.payload.id;

  let path = `api/v1/user_details/${id}/generate_otp`;
  let body = {
    user: {
      full_phone_number: COUNTRY_CODE + action.payload.phone,
      update_type: "phone_update",
    },
  };
  yield put({
    type: "EDIT_PROFILE_DATA",
    payload: { email_Phone: action.payload.phone, otpType: "phone_update" },
  });
  try {
    const res = yield call(performPostRequest, path, body);

    if (res !== undefined && res.status === 200) {
      console.log("inside res @@@@@@@");
      yield put({ type: "OPEN_OTP_BOX" });
    }
  } catch (er) {
    console.log("@@@ generateOtpPhoneAPI error ========", er);
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: "Connection Error" },
    });
  }
};

// Generate OTP for email----------------------------------------------------------------------------------
export const generateOtpEmail = function* generateOtpEmailSaga(action) {
  console.log("generateOtpEmail saga run", action);
  // yield put({ type: "LOADER" });
  let id = action.payload.id;
  let path = `api/v1/user_details/${id}/generate_otp`;
  let body = {
    user: {
      email: action.payload.email,
      update_type: "email_update",
    },
  };
  yield put({
    type: "EDIT_PROFILE_DATA",
    payload: { email_Phone: action.payload.email, otpType: "email_update" },
  });
  try {
    const res = yield call(performPostRequest, path, body);

    if (res !== undefined && res.status === 200) {
      yield put({ type: "OPEN_OTP_BOX" });
       
    }
  } catch (er) {
    console.log("@@@ generateOtpEmail API error ========", er);
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: "Connection Error" },
    });
  }
};

// verifyOtpEmailPhone-----------------------------------------------------------------------------------

export const verifyOtpEmailPhone = function* verifyOtpEmailPhoneSaga(action) {
  console.log("verifyOtpEmail saga run", action);
  // yield put({ type: "LOADER" });

  let id = action.payload.id;
  let path = `api/v1/user_details/${id}/verify_otp`;
  let objKey =
    action.payload.otp_type === "phone_update" ? "full_phone_number" : "email";
  let objKeyValue =
    action.payload.otp_type === "phone_update"
      ? "91" + action.payload.email_Phone
      : action.payload.email_Phone;

  let body = {
    user: {
      [objKey]: objKeyValue,
      otp: action.payload.otp,
    },
  };

  try {
    const res = yield call(performPostRequest, path, body);

    if (res !== undefined && res.status === 200) {
      if (res.data.success === false) {
        yield put({
          type: "SHOW_TOAST",
          payload: { severity: "error", message: res.data.message },
        });
      } else {
        console.log("inside res @@@@@@@");
              
        yield put({ type: "VERIFY_PHONE_OTP_ACTION", payload: res.data });
        debugger
        yield put({ type: "CLOSE_OTP_BOX" });
        debugger
        yield action.payload.successCallback(res)
        yield put({ type: "LOADER_CLOSE" });
        
        yield put({
          type: "SHOW_TOAST",
          payload: { severity: "success", message: res?.data?.message },
        });
        // yield window.location.reload()
      }
    }
  } catch (er) {
    console.log("@@@ verifyOtpPhone API error ========", er);
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: er?.response?.data?.message },
    });
  }
};

//update user profile--------------------------------------------------------------------------------------
export const updateUserProfile = function* updateUserProfileSaga(action) {
  console.log("update user profile saga run", action);
  // yield put({ type: "LOADER" });

  let id = action.payload.id;
  let path = `api/v1/user_details/${id}`;

  let formdata = new FormData();
  formdata.append('full_name', action.payload.name)

  let body =  formdata;
  // {
  //   user : {
  //     // avatar: "sample.png",
  //     full_name: action.payload.name,   
  //   }
   
  // };

  try {
    const res = yield call(performPatchRequestEditProfile, path, body);

    if (res !== undefined && res.status === 200) {
      if (res.data.success === false) {
        yield put({
          type: "SHOW_TOAST",
          payload: { severity: "error", message: res?.data?.message },
        });
      } else {
        console.log("inside res @@@@@@@");
        action.successcallback(res.data)

        yield put({ type: "VERIFY_PHONE_OTP_ACTION", payload: res.data });
        yield action.payload.close(false)
        yield put({ type: "CLOSE_OTP_BOX" });
        yield put({ type: "LOADER_CLOSE" });
        yield put({ type: "USER_PROFILE_ACTION", payload: res.data });
        yield put({
          type: "SHOW_TOAST",
          payload: {
            severity: "success",
            message: "fields updated successfuly",
          },
        });
        // yield window.location.reload()
      }
    }
  } catch (er) {
    console.log("@@@ update profile API error ========", er);
    yield put({
      type: "SHOW_TOAST",
      payload: { severity: "error", message: er?.response?.data?.message },
    });
  }
};

//Verify otp for phone--------------------------------------------------------------------------------------
// export const verifyOtpPhone = function* verifyOtpPhoneSaga(action) {
//   console.log("verifyOtpPhone saga run", action);
//   // yield put({ type: "LOADER" });

//   let id = action.payload.id;

//   let path = `api/v1/user_details/${id}/verify_otp`;
//   let body = {
//     user: {
//       full_phone_number: action.payload.phone,
//       otp: action.payload.otp,
//     },
//   };

//   try {
//     const res = yield call(performPostRequest, path, body);
//        if (res !== undefined && res.status === 200) {
//       if (res.data.success === false) {
//         yield put({
//           type: "SHOW_TOAST",
//           payload: { severity: "error", message: res.data.message },
//         });
//       } else {
//         console.log("inside res @@@@@@@");
//         // yield put(ACTIONS_CONST.userChangedPassword(res));
//         yield put({ type: "VERIFY_PHONE_OTP_ACTION", payload: res.data });

//         yield put({ type: "LOADER_CLOSE" });
//         yield put({
//           type: "SHOW_TOAST",
//           payload: { severity: "success", message: res.data.message },
//         });
//       }
//     }
//   } catch (er) {
//     console.log("@@@ verifyOtpPhone API error ========", er);
//     yield put({
//       type: "SHOW_TOAST",
//       payload: { severity: "error", message: "Connection Error" },
//     });
//   }
// };

//Verify otp for Email
// export const verifyOtpEmail= function* verifyOtpEmailSaga(action) {
//   console.log("verifyOtpEmail saga run", action);
//   // yield put({ type: "LOADER" });

//   let id = action.payload.id;

//   let path = `api/v1/user_details/${id}/verify_otp`;
//   let body = {
//     user: {
//       email: action.payload.email_Phone,
//       otp: action.payload.otp,
//     },
//   };

//   try {
//     const res = yield call(performPostRequest, path, body);

//     if (res !== undefined && res.status === 200) {
//       if (res.data.success === false) {
//         yield put({
//           type: "SHOW_TOAST",
//           payload: { severity: "error", message: res.data.message },
//         });
//       } else {
//         console.log("inside res @@@@@@@");
//         // yield put(ACTIONS_CONST.userChangedPassword(res));
//         yield put({ type: "VERIFY_PHONE_OTP_ACTION", payload: res.data });
//         yield put({ type: "CLOSE_OTP_BOX" })
//         yield put({ type: "LOADER_CLOSE" });

//         yield put({
//           type: "SHOW_TOAST",
//           payload: { severity: "success", message: res.data.message },
//         });
//         // yield window.location.reload()
//       }
//     }
//   } catch (er) {
//     console.log("@@@ verifyOtpPhone API error ========", er);
//     yield put({
//       type: "SHOW_TOAST",
//       payload: { severity: "error", message: "Connection Error" },
//     });
//   }
// };
