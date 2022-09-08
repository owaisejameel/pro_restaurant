import * as USER_CONST from "../../utils/Constants";


export const onLoginUser = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.LOGIN_USER,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const onLoginUserWithOtp = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.LOGIN_USER_WITH_OTP,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const onSocialLogin = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SOCIAL_LOGIN_USER,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const onSignUpUser = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SIGNUP_USER,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const createGuestUser = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CREATE_GUEST_USER,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const onLogoutUser = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.LOGOUT_USER,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const resetPassword = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.RESET_PASSWORD,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const sendLink = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SEND_LINK,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const sendPincode = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SEND_PINCODE,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const verifyOTP = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.VERIFY_OTP,
        payload: {
            data,
            successCallBack, 
            failureCallBack
        }
    }
}

export const confirmAccount = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.CONFIRM_ACCOUNT,
      payload: {
        successCallBack,
        failureCallBack,
        data,
      },
    };
  };

export const resendConfirmAccountToken = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.RESEND_CONFIRM_ACCOUNT_TOKEN,
        payload: {
            successCallBack,
            failureCallBack,
            data,
        },
    };
};

export const getNotificationList = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.GET_NOTIFICATION_LIST,
      payload: {
        successCallBack,
        failureCallBack,
        data,
      },
    };
  };
  
  export const readNotification = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.READ_NOTIFICATION,
      payload: {
        successCallBack,
        failureCallBack,
        data,
      },
    };
  };
  
  export const readAllNotification = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.READ_ALL_NOTIFICATION,
      payload: {
        successCallBack,
        failureCallBack,
        data,
      },
    };
  };
  
  export const deleteNotification = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.DELETE_NOTIFICATION,
      payload: {
        successCallBack,
        failureCallBack,
        data,
      },
    };
  };

  export const sendDeviceToken = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.SEND_TOKEN,
      payload: {
        data,
        successCallBack,
        failureCallBack,
      },
    };
  };
  
