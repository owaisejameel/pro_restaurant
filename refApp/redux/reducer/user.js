/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
import { FETCH_USER_SUCCESS } from "../../utils/Constants";

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  userData: null
};

export default function (state = initialState, action) {

  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      }

    default: return state;
  }
  
}
