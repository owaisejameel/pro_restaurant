import * as USER_CONST from "../../utils/Constants";

const initialState = {
    filterData: {
        filterBrands: [],
        filterTags: [],
        filterCategories: [],
        filterSubCategories: [],
        filterDiscountedItems: false,
        filterLowRange: 0,
        filterHighRange: 5000,
        lastCategoryValue: 0,
    }
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.SET_FILTER_DATA:
            return {
                ...state,
                filterData: action.payload.data
            };
        case USER_CONST.REMOVE_FILTER_DATA:
            return {
                ...state,
                filterData: {
                    filterBrands: [],
                    filterTags: [],
                    filterCategories: [],
                    filterSubCategories: [],
                    filterDiscountedItems: false,
                    filterLowRange: 0,
                    filterHighRange: 5000,
                }
            };
        default: {
            return state;
        }
    }
}

export default filters
