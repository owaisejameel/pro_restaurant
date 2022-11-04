import * as CONST from "../../utils/Constants";

export const userSignUpAction = (data) => {
  return {
    type: CONST.USER_SIGNUP_ACTION,
    payload: data,
  };
};

export const userLoginAction = (data) => {
  return {
    type: CONST.USER_LOGIN_ACTION,
    payload: data,
  };
};

export const userForgotAction = (data) => {
  return {
    type: CONST.USER_FORGOT_ACTION,
    paylaod: data,
  };
};

export const verifiedOtpAction = (data) => {
  return {
    type: CONST.VERIFIED_OTP_ACTION,
    payload: data,
  };
};

export const userChangedPassword = (data) => {
  return {
    type: CONST.USER_CHANGED_PASSWORD,
    payload: data,
  };
};

export const userTermsAndCondition = (data) => {
  return {
    type: "TERMS_N_CONDITION_ACTION",
    payload: data,
  };
};


export const userProfileAction = () => {
  return {
      type : "USER_PROFILE_ACTION"
  }
}

export const userResetPassAction = () => {
  return {
      type : "USER_RESET_PASS_ACTION"
  }
}