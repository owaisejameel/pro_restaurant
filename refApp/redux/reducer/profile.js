import * as USER_CONST from "../../utils/Constants";

const initialState = {
    profileData: null,
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONST.GET_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                profileData: action.payload.data
            };
        case USER_CONST.GET_PROFILE_DATA_FAILURE:
            return {
                ...state,
                profileData: null
            };
        default: {
            return state;
        }
    }
}

export default profile
