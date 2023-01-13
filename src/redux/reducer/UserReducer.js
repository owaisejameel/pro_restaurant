import * as ACTIONS_CONST from "../../utils/Constants";
import { editAddress } from "../sagas/savedAddressSaga";

const initialState = {
  userId: "",
  sigupData: {},
  forgotData: {
    data: {},
    otp_data: {},
  },
  verifiedOtpData: {
    data: {},
    message: "",
  },
  passwordChangeData: {
    data: {},
  },

  userProfileData: {
    data: {},
  },
  otpVerifyPhone_Email: [],
  EditProfileData: {},
  editAddress: {
    open: false,
  },
};

export const userReducer = (state = initialState, action) => {
  console.log("action ", action);
  switch (action.type) {
    case ACTIONS_CONST.USER_SIGNUP_ACTION:
      return {
        ...state,
        userId: action.id,
      };

    case ACTIONS_CONST.USER_LOGIN_ACTION:
      return {
        ...state,
        userId: action.id,
      };

    case ACTIONS_CONST.USER_FORGOT_ACTION:
      return {
        ...state,
        forgotData: {
          ...state.forgotData,
          data: action.payload.data.data,
          otp_data: action.payload.data.otp_data,
        },
      };

    case ACTIONS_CONST.VERIFIED_OTP_ACTION:
      return {
        ...state,
        verifiedOtpData: {
          ...state.verifiedOtpData,
          data: action.payload.data,
          message: action.payload.message,
        },
      };

    case ACTIONS_CONST.USER_CHANGED_PASSWORD:
      return {
        ...state,
        passwordChangeDatas: {
          ...state.changedPassword,
          data: action.payload.data,
        },
      };

    case "USER_PROFILE_ACTION":
      return {
        ...state,
        userProfileData: {
          ...state.userProfileData,
          data: action.payload,
        },
      };

    case "GEN_OTP_PHONE_ACTION":
      return {
        ...state,
        otpVerifyPhone_Email: [
          ...state.otpVerifyPhone_Email,
          ...action.payload.otp,
        ],
      };

    case "EDIT_PROFILE_DATA":
      return {
        ...state,
        EditProfileData: {
          data: action.payload,
        },
      };

    // case "EDIT_ADDRESS_ACTION":
    //   return {
    //     ...state,
    //     editAddress: {
    //       ...action.data,
    //       open: true,
    //     },
    //   };

    // case "CLOSE_EDIT_BOX":
    //   return {
    //     ...state,
    //     editAddress: {
    //       open: false,
    //     },
    //   };
    default:
      return state;
  }
};

// const initialStateLogin = {
//   message: "unlogin",
// };

// const initialStateSignUp = {
//   user: [],
// };

// const initialStateFogot = {
//   data: {},
//   otp_data: {},
// };

// const initialStateVerifiedOtp = {

// }

// export const userLoginReducer = (state = initialStateLogin, action) => {
//   console.log("from reducer===========>>>>>>", action);
//   switch (action.type) {
//     case "USER_SIGNUP_ACTION":
//       return {
//         ...state,
//         message: action.payload.status.message,
//       };
//     default:
//       return state;
//   }
// };

// export const userSignUpReducer = (state = initialStateSignUp, action) => {
//   switch (action.type) {
//     case "USER_LOGIN_ACTION":
//       return {
//         ...state,
//         user: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const userForgotReducer = (state = initialStateFogot, action) => {
//   console.log("USER_FORGOT_ACTION", action);
//   switch (action.type) {
//     case "USER_FORGOT_ACTION":
//       return {
//         ...state,
//         data: action.payload.data.data,
//         otp_data: action.payload.data.otp_data,
//       };
//     default:
//       return state;
//   }
// };

// export const verifiedOtpReducer = (state  = initialStateVerifiedOtp, action) => {
//   switch(action.type){
//     case "VERIFIED_OTP_ACTION" :
//       return {
//         ...state,
//       }

//   }

// }
