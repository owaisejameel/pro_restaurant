import * as USER_CONST from "../../utils/Constants";

const initialState = {
    isFetching: false,
    isFetchingProduct: false,
    message: '',
    showModal: false,
    isShowError: false,
}

const common = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.START_SPINNER:
            return {
                ...state,
                isFetching: true
            };
        case USER_CONST.STOP_SPINNER:
            return {
                ...state,
                isFetching: false
            };
        case USER_CONST.START_SPINNER_FOR_PRODUCT:
            return {
                ...state,
                isFetchingProduct: true
            };
        case USER_CONST.STOP_SPINNER_FOR_PRODUCT:
            return {
                ...state,
                isFetchingProduct: false
            };
        case USER_CONST.SHOW_ERROR_MODAL:
            return {
                ...state,
                message: action.payload.message,
                isShowError: action.payload.isShowError,
                showModal: true,
            };
        case USER_CONST.HIDE_ERROR_MODAL:
            return {
                ...state,
                showModal: false
            };
        default: {
            return state;
        }
    }
}

export default common
