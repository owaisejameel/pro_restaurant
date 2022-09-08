/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
    call, put
  } from 'redux-saga/effects';
  import * as API_SERVICE from '../../services/apiService/AxioUtils';
  import * as commonActions from '../actions/commonActions';
  import * as homeActions from '../actions/homeActions';
  import * as cartActions from '../actions/cartActions';
  import * as Sentry from '@sentry/react-native';
  // Define Worker Sagas
  
    //*> GET WISHLIST DATA SAGA
    export function* getWishlistData(action) {
        let path = `users/${action.payload.data.userID}/wishlists?page=${action.payload.data.pageCount}&per_page=15&uuid=${action.payload.data.uuid}`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ GET Wishlist List Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ GET Wishlist List error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> ADD TO WISHLIST DATA SAGA
    export function* addToWishlist(action) {
        let path = `users/${action.payload.data.userID}/wishlists?uuid=${action.payload.data.uuid}`;
        try {
          // yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
          console.log('@@@ ADD to Wishlist Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ ADD to Wishlist error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> REMOVE FROM WISHLIST DATA SAGA
    export function* removeFromWishlist(action) {
        let path = `users/${action.payload.data.userID}/wishlists?&uuid=${action.payload.data.uuid}&product_id=${action.payload.data.product_id}`;
        try {
          // yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performDeleteRequest, path, action.payload.data);
          console.log('@@@ Remove From Wishlist Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Remove From Wishlist error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }
