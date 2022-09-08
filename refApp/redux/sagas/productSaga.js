/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
    call, put
  } from 'redux-saga/effects';
  import * as API_SERVICE from '../../services/apiService/AxioUtils';
  import * as commonActions from '../actions/commonActions';
  import * as homeActions from '../actions/homeActions';
  import * as Sentry from '@sentry/react-native';

  // Define Worker Sagas
  
    //*> GET PRODUCT DESCRIPTION SAGA
    export function* getProductDescription(action) {
        let path = `products/${action.payload.data.productId}?uuid=${action.payload.data.uuid}`;
        try {
            if(!action.payload.data.shouldShowLoader){
                yield put(commonActions.startSpinner());
            }
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Get Product Description List Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            yield put(homeActions.getRecommendedProductListFailure());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get Product Description List error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
                yield put(homeActions.getRecommendedProductListFailure());
            }
        }
      }

    //*> NOTIFY ME ABOUT PRODUCT SAGA
    export function* notifyMeAboutProduct(action) {
        let path = `products/${action.payload.data.productId}/notify_product?uuid=${action.payload.data.uuid}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path);
        console.log('@@@ Notify Me about product Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            yield put(homeActions.getProductListFailure());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Notify Me about product error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(homeActions.getProductListFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(homeActions.getProductListFailure());
            }
        }
    }

    //*> NOTIFY ME ABOUT PRODUCT SAGA
    export function* notifyMeAboutVariantProduct(action) {
        let path = `products/${action.payload.data.productId}/notify_product_variant?uuid=${action.payload.data.uuid}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Notify Me about variant product Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            yield put(homeActions.getProductListFailure());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Notify Me about variant product error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(homeActions.getProductListFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(homeActions.getProductListFailure());
            }
        }
    }

    //*> CHECK PRODUCT AVAILABILITY SAGA
    export function* checkProductAvailability(action) {
        let path = `products/${action.payload.data.productId}/check_product_avaibility?zipcode=${action.payload.data.zipcode}&uuid=${action.payload.data.uuid}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Check Product Availability Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            yield put(homeActions.getProductListFailure());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Check Product Availability error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(homeActions.getProductListFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(homeActions.getProductListFailure());
            }
        }
    }

    //*> GET PRODUCT REVIEW LIST SAGA
    export function* getReviewList(action) {
        let path = `users/${action.payload.data.userID}/reviews/get_product_reviews?product_id=${action.payload.data.productId}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Get Product Reviews Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            yield put(homeActions.getProductListFailure());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get Product Reviews error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(homeActions.getProductListFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(homeActions.getProductListFailure());
            }
        }
    }