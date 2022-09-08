import * as USER_CONST from "../../utils/Constants";

const initialState = {
    productList: [],
    allProductList: [],
    recommendedProductList: [],
    selectedAttributes:null
}

const home = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.GET_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                productList: action.payload.data
            };
        case USER_CONST.GET_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                productList: []
            };
        case USER_CONST.GET_ALL_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                allProductList: action.payload.data
            };
        case USER_CONST.GET_ALL_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                allProductList: []
            };
        case USER_CONST.GET_RECOMMENDED_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                recommendedProductList: action.payload.data
            };
        case USER_CONST.GET_RECOMMENDED_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                recommendedProductList: []
            };
        case USER_CONST.SELECTED_ATTRIBUTES:
            return{
                ...state, selectedAttributes:action.payload.data
            }
        default: {
            return state;
        }
    }
}

export default home
