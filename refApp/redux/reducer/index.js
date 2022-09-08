import { combineReducers } from 'redux';
import user from './user';
import common from './common';
import category from './category';
import brands from './brands';
import home from './home';
import filters from './filters';
import profile from './profile';
import cart from './cart';
import setOTP from './setotp'

const appReducer = combineReducers({
//   RootStackReducer,
  user,
  common,
  category,
  brands,
  home,
  filters,
  profile,
  cart,
  setOTP
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;