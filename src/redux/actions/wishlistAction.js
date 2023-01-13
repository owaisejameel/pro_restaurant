import * as USER_CONST from "../../utils/Constants";

// export const addToWishlist = (data) => {
//     console.log("DATA ==>",data)
//     return {
//         type: USER_CONST.ADD_TO_FAVORITE,
//         payload: {
//             data
//         }
//     }
// }

export const addToWishList = (data,successCallBack,failureCallBack) =>{
    console.log("DATA ==>",data)
    return {
        type: USER_CONST.ADD_TO_FAVORITE,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const removeFromWishList = (data,successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.REMOVE_FROM_FAVORITE,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getWishlist = (data, successCallBack,failureCallBack) => {
    console.log("GET WISHLIST ACTIN ==>",data)
    return {
        type: USER_CONST.GET_FAVORITE,
        payload:{
            successCallBack,
            failureCallBack,
            data
        }
    }
}