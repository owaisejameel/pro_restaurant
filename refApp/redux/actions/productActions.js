import * as USER_CONST from "../../utils/Constants";


export const getProductDescription = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_PRODUCT_DESCRIPTION_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const notifyMeAboutProduct = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.NOTIFY_ME_ABOUT_PRODUCT,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const notifyMeAboutVariantProduct = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.NOTIFY_ME_ABOUT_VARIANT_PRODUCT,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const checkProductAvailability = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CHECK_PRODUCT_AVAILABILITY,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getReviewList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_REVIEW_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}