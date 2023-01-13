import * as CONST from "../../utils/Constants";
import * as ACTIONS_CONST from "../actions/wishlistAction";
import { put, call } from "redux-saga/effects";
// import * as Sentry from '@sentry/react-native';
import {
  performPostRequestAddToWhishlist,
  performGetRequestWishlist,
  performPostRequestRemoveFromWhishlist,
} from "../../services/apiService/AxiosUtils";

export function* addToWishlist(action) {
  let path = `api/v1/favourites/add`;
  try {
    // yield put(commonActions.startSpinner());
    const res = yield call(
      performPostRequestAddToWhishlist,
      path,
      action.payload.data
    );
    console.log("@@@ ADD to Wishlist Response =======", res);
    if (res !== undefined) {
      //   yield put(commonActions.stopSpinner());
      yield put({
        type: "SHOW_TOAST",
        payload: { severity: "success", message: "Item add in favorite" },
      });
      action.payload.successCallBack(res);
    } else {
      // yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    // Sentry.captureException(error);
    console.log("@@@ ADD to Wishlist error ========", error);
    // yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* getWishlist(action) {
  let path = `api/v1/favourites/list?user_id=${action.payload.data.user_id}`;

  console.log("PATH ==>", action);
  try {
    const res = yield call(performGetRequestWishlist, path);

    console.log("@@@ get Wishlist Response =======", res);
    if (res !== undefined) {
      yield put({ type: "ADD_FAVORITE_LIST_REDUX", res });
      action.payload.successCallBack(res);
    } else {
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    // Sentry.captureException(error);
    console.log("@@@ get Wishlist error ========", error);
    // yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

export function* removeWishlist(action) {
  let path = `api/v1/favourites/remove`;
  try {
    // yield put(commonActions.startSpinner());
    const res = yield call(
      performPostRequestRemoveFromWhishlist,
      path,
      action.payload.data
    );

    console.log("@@@ remove Wishlist Response =======", res.status);
    if (res !== undefined) {
      //   yield put(commonActions.stopSpinner());
      yield put({
        type: "SHOW_TOAST",
        payload: { severity: "success", message: "Item remove from favorite" },
      });
      action.payload.successCallBack(res.data);
    } else {
      // yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    // Sentry.captureException(error);
    console.log("@@@ get Wishlist error ========", error);
    // yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}
