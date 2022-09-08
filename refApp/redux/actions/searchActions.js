import * as USER_CONST from "../../utils/Constants";


export const searchProduct = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SEARCH_PRODUCT,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const saveSearchDetails = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SAVE_SEARCH_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getRecentSearchList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_RECENT_SEARCH,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}
