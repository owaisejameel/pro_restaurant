import * as USER_CONST from "../../utils/Constants";


export const getProfileData = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_PROFILE_DATA,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getProfileDataSuccess = (data) => {
    return {
        type: USER_CONST.GET_PROFILE_DATA_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getProfileDataFailure = () => {
    return {
        type: USER_CONST.GET_PROFILE_DATA_FAILURE,
    }
}


export const updateProfileData = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.UDPATE_PROFILE_DATA,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const changePassword = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CHANGE_PASSWORD,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getAddressList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_ADDRESS_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const createAddress = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CREATE_ADDRESS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const updateAddress = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.UPDATE_ADDRESS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const deleteAddress = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.DELETE_ADDRESS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getHelpCenterDetails = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_HELP_CENTER_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const saveContactUs = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SAVE_CONTACT_US_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getSocialMediaAccountDetails = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_SOCIAL_MEDIA_ACCOUNT_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const addSocialMediaAccountDetails = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.ADD_SOCIAL_MEDIA_ACCOUNT_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const removeSocialMediaAccountDetails = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.REMOVE_SOCIAL_MEDIA_ACCOUNT_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}


export const getFAQList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_FAQ_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const sendPhoneNoOTP = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SEND_PHONE_NO_OTP,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const verifyPhoneNo = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.VERIFY_PHONE_NO,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}


export const sendDeliveryPhoneNoOTP = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SEND_DELIVERY_PHONE_NO,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const verifyDeliveryPhoneNo = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.VERIFY_DELIVERY_PHONE_NO,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

