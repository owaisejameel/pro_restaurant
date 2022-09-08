import * as USER_CONST from "../../utils/Constants";


export const setFilterData = (data) => {
    return {
        type: USER_CONST.SET_FILTER_DATA,
        payload: {
            data
        }
    }
}

export const removeFilterData = () => {
    return {
        type: USER_CONST.REMOVE_FILTER_DATA,
    }
}
