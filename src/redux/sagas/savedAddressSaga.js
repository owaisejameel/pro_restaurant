import { put, call } from "redux-saga/effects";
import * as CONST from "../../utils/Constants";
import { COUNTRY_CODE } from "../../services/config/index.dev";
import {
  performDeleteRequest,
  performGetAddress,
  performPatchAddress,
  performPostAddress,
} from "../../services/apiService/AxiosUtils";
// import * as ACTIONS_CONST from "../actions/UserActions";

//create user address API---------------------------------------------------------------------
export const createUserAddress = function* createUserAddressSaga(action) {
  console.log("createUserAddress saga run", action);
  yield put({ type: CONST.LOADER });

  let userId = JSON.parse(localStorage.getItem("userId"));
  // let userId = 4;
  let complete_address = action.payload.area;
  let flatNo = action.payload.flatNo;
  let address_type = action.payload.addressType;
  let default_address = true;
  let receiver_name = action.payload.fullName;
  let receiver_phone = COUNTRY_CODE + action.payload.phoneNuber;
  let receiver_city = action.payload.city;
  let receiver_pin_code = action.payload.pincode;
  let receiver_state = action.payload.state;

  // let userId = 4;
  // let complete_address = "jairampur";
  // let flatNo = 5;
  // let address_type = "home";
  // let default_address = true;
  // let receiver_name = "owais";
  // let receiver_phone = 919827360080;
  // let receiver_city = "indore";
  // let receiver_pin_code = "452016";
  // let receiver_state = "mp";

  let path = `users/addresses?user_id=${userId}&complete_address=${complete_address}&colony&floor=${flatNo}&address_type=${address_type}
  &default_address=${default_address}&receiver_name=${receiver_name}&receiver_phone=${receiver_phone}&receiver_city=${receiver_city}&receiver_pin_code=${receiver_pin_code}&receiver_state=${receiver_state}`;

  try {
    const res = yield call(performPostAddress, path);
    console.log("userProfile response ------>", res);
    if (res !== undefined && res.status === 200) {
      yield action.close(false);
      yield put({
        type: CONST.GET_USER_ADDRESSESS,
        succesCallback: action.succesCallback,
      });
      yield put({ type: CONST.LOADER_CLOSE });
      yield put({
        type: "SHOW_TOAST",
        payload: {
          severity: "success",
          message: res?.data?.message,
        },
      });
    }
  } catch (error) {
    console.log("@@@ userAddressess API error ========", error);
    yield put({ type: CONST.LOADER_CLOSE });
  }
};

//Get user addressess API---------------------------------------------------------------------
export const userAddressess = function* userAddressessSaga(action) {
  console.log("userAddressess saga run", action);
  yield put({ type: CONST.LOADER });

  let userId = JSON.parse(localStorage.getItem("userId"));
  let path = `users/addresses?user_id=${userId}`;

  try {
    const res = yield call(performGetAddress, path);
    console.log("userAddressess response ------>", res);
    if (res !== undefined && res.status === 200) {
      yield action.succesCallback(res);
      yield put({ type: CONST.LOADER_CLOSE });
    }
  } catch (error) {
    console.log("@@@ userAddressess API error ========", error);
    yield put({ type: CONST.LOADER_CLOSE });
  }
};

//update or Edit user address API---------------------------------------------------------------------
export const editAddress = function* editAddressSaga(action) {
  console.log("editAddress saga run", action);
  yield put({ type: CONST.LOADER });

  let userId = JSON.parse(localStorage.getItem("userId"));
  let id = action.payload.id;
  let address = action.payload.area;
  //   let path = `  users/addresses/:id?user_id=10&default_address=true&complete_address=protonshub2`;
  let path = `users/addresses/${id}?user_id=${userId}&default_address=true&complete_address=${address}`;

  try {
    const res = yield call(performPatchAddress, path);
    console.log("editAddress response ------>", res);
    if (res !== undefined && res.status === 200) {
      yield action.close(false);
      yield put({
        type: "SHOW_TOAST",
        payload: {
          severity: "success",
          message: res?.data?.message,
        },
      });
      yield put({
        type: CONST.GET_USER_ADDRESSESS,
        succesCallback: action.succesCallback,
      });
    }
  } catch (error) {
    console.log("@@@ editAddress API error ========", error);
    yield put({ type: CONST.LOADER_CLOSE });
  }
};

//Delete user address API---------------------------------------------------------------------
export const deleteAddress = function* deleteAddressSaga(action) {
  console.log("deleteAddress saga run", action);
  yield put({ type: CONST.LOADER });

  let id = action.itemId;
  let path = `users/addresses/${id}`;

  try {
    const res = yield call(performDeleteRequest, path);
    console.log("deleteAddress response ------>", res);
    if (res !== undefined && res.status === 200) {
      yield put({
        type: CONST.GET_USER_ADDRESSESS,
        succesCallback: action.succesCallback,
      });
    }
  } catch (error) {
    console.log("@@@ deleteAddress API error ========", error);
    yield put({ type: CONST.LOADER_CLOSE });
  }
};
