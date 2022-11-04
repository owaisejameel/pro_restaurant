import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { cartReducer } from "./CartReducer";
import { loaderReducer } from "./common";

const rootReducer = combineReducers({
 userReducer : userReducer,
 cartReducer : cartReducer,
 loaderReducer: loaderReducer
});

export default rootReducer;
