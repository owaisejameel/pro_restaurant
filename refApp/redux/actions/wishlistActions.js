import * as USER_CONST from "../../utils/Constants";


export const getWishlistData = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_WISHLIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getWishlistDataSuccess = (data) => {
    return {
        type: USER_CONST.GET_WISHLIST_SUCCESS,
        payload: {
            data,
        }
    }
}

export const getWishlistDataFailure = () => {
    return {
        type: USER_CONST.GET_WISHLIST_FAILURE,
    }
}

export const addToWishlist = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.ADD_TO_WISHLIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const removeFromWishlist = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.REMOVE_FROM_WISHLIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}