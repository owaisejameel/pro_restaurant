import * as USER_CONST from "../../utils/Constants";

const initialState = {
    cartData: null,
    cartHasProduct: false,
    cartCount: 0,
    showNotificationDot: false,
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.CREATE_CART_SUCCESS:
            return {
                ...state,
                cartData: action.payload.data
            };
        case USER_CONST.CREATE_CART_FAILURE:
            return {
                ...state,
                cartData: null
            };
        case USER_CONST.CART_HAS_PRODUCT_SUCCESS:
            return {
                ...state,
                cartHasProduct: action.payload.data.has_cart_product,
                cartCount: action.payload.data.total_cart_item,
                showNotificationDot: action.payload.data.new_notification_count === 0 ? false : true,
            };
        case USER_CONST.CART_HAS_PRODUCT_FAILURE:
            return {
                ...state,
                cartHasProduct: false
            };
        case USER_CONST.UPDATE_CART_DATA:
            return {
                ...state,
                cartData: action.payload.data,
            }
        default: {
            return state;
        }
    }
}

export default cart
