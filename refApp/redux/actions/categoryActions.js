import * as USER_CONST from "../../utils/Constants";


export const getCategoryList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_CATEGORY_LIST,
        payload: {
            successCallBack, 
            failureCallBack,
            data
        }
    }
}

export const getSubCategoryList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_SUB_CATEGORY_LIST,
        payload: {
            successCallBack, 
            failureCallBack,
            data
        }
    }
}

export const getCategoryListSuccess = (data) => {
    return {
        type: USER_CONST.GET_CATEGORY_LIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getCategoryListFailure = () => {
    return {
        type: USER_CONST.GET_CATEGORY_LIST_FAILURE,
    }
}

