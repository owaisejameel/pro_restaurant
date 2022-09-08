import * as USER_CONST from "../../utils/Constants";

const initialState = {
    categoryList: [],
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.GET_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                categoryList: action.payload.data
            };
        case USER_CONST.GET_CATEGORY_LIST_FAILURE:
            return {
                ...state,
                categoryList: []
            };
        default: {
            return state;
        }
    }
}

export default category
