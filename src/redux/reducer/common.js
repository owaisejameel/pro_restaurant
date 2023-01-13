const initialState = {
  isLoader: false,
  snackbar: {
    isOpen: false,
    severity: "",
    message: "",
  },
  isOtpBoxOpen: false,
  editedEmail_Phone : "",
  otp_type : "",
  enableResendBtn: false
  };

export const loaderReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case "LOADER":
      return {
        ...state,
        isLoader: true,
      };

    case "LOADER_CLOSE":
      return {
        ...state,
        isLoader: false,
      };

    case "SHOW_TOAST":
      return {
        ...state,
        snackbar: {
          isOpen: true,
          severity: action.payload.severity,
          message: action.payload.message,
        },
      };

    case "TOAST_CLOSE":
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          isOpen: false,
        },
      };

    case "OPEN_OTP_BOX":
      return {
        ...state,
        isOtpBoxOpen: true,
      };

    case "CLOSE_OTP_BOX":
      return {
        ...state,
        isOtpBoxOpen: false,
      };

    case "ENABLE_RESEND":
      return {
        ...state,
        enableResendBtn: true,
        
      };

    case "DISABLE_RESEND":
      return {
        ...state,
        enableResendBtn: false,
       
      };

    case "EDIT_PROFILE_DATA" :
      return {
      ...state,
     editedEmail_Phone : action.payload.email_Phone,
     otp_type : action.payload.otpType
    }

    default:
      return {
        ...state,
      };
  }
};
