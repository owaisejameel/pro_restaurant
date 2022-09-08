import * as USER_CONST from "../../utils/Constants";

const initialState = {
    brandsList: [],
    tagList: [],
}

const brands = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.GET_BRAND_LIST_SUCCESS:
            return {
                ...state,
                brandsList: action.payload.data
            };
        case USER_CONST.GET_BRAND_LIST_FAILURE:
            return {
                ...state,
                brandsList: []
            };
        case USER_CONST.GET_TAG_LIST_SUCCESS:
            return {
                ...state,
                tagList: action.payload.data
            };
        case USER_CONST.GET_TAG_LIST_FAILURE:
            return {
                ...state,
                tagList: []
            };
        default: {
            return state;
        }
    }
}

export default brands
