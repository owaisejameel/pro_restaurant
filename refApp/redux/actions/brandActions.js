import * as USER_CONST from "../../utils/Constants";


export const getBrandList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_BRAND_LIST,
        payload: {
            successCallBack, 
            failureCallBack,
            data
        }
    }
}

export const getBrandListSuccess = (data) => {
    return {
        type: USER_CONST.GET_BRAND_LIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getBrandListFailure = () => {
    return {
        type: USER_CONST.GET_BRAND_LIST_FAILURE,
    }
}

export const getTagList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_TAG_LIST,
        payload: {
            successCallBack, 
            failureCallBack,
            data
        }
    }
}

export const getTagListSuccess = (data) => {
    return {
        type: USER_CONST.GET_TAG_LIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getTagListFailure = () => {
    return {
        type: USER_CONST.GET_TAG_LIST_FAILURE,
    }
}

