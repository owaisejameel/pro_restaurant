import * as USER_CONST from "../../utils/Constants";

import {SELECTED_ATTRIBUTES} from '../../utils/Constants'
export const getProductList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_PRODUCT_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getFilterProductList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_FILTER_PRODUCT_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getHomeProductList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_HOME_PRODUCT_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getProductListSuccess = (data) => {
    return {
        type: USER_CONST.GET_PRODUCT_LIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getProductListFailure = () => {
    return {
        type: USER_CONST.GET_PRODUCT_LIST_FAILURE,
    }
}

export const getAllProductList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_ALL_PRODUCT_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getAllProductListSuccess = (data) => {
    return {
        type: USER_CONST.GET_ALL_PRODUCT_LIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getAllProductListFailure = () => {
    return {
        type: USER_CONST.GET_ALL_PRODUCT_LIST_FAILURE,
    }
}

export const getRecommendedProductList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_RECOMMENDED_PRODUCT_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getRecommendedProductListSuccess = (data) => {
    return {
        type: USER_CONST.GET_RECOMMENDED_PRODUCT_LIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getRecommendedProductListFailure = () => {
    return {
        type: USER_CONST.GET_RECOMMENDED_PRODUCT_LIST_FAILURE,
    }
}

export const getHomeBannerList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_HOME_BANNER_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const setSelectedAttributes = (data) => {
    return {
        type: SELECTED_ATTRIBUTES,
        payload: {
            data
        }
    }
}
