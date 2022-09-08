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
  
    //*> SEARCH PRODUCT SAGA
    export function* searchProduct(action) {
        let path = `search?query=${action.payload.data.searchData}&uuid=${action.payload.data.uuid}`;
        try {
        //   yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Search Product Data Response =======', res);
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
            console.log('@@@ Search Product Data error ========', error);
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

    //*> SAVE SEARCH DETAILS SAGA
    export function* saveSearchDetails(action) {
        let path = `search/fetch_search_records?class_name=${action.payload.data.class_name}&class_id=${action.payload.data.class_id}&query=${action.payload.data.query}&results_count=${action.payload.data.results_count}&uuid=${action.payload.data.uuid}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Save Search Details Response =======', res);
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
            console.log('@@@ Save Search Details error ========', error);
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

    //*> GET RECENT SEARCH LIST SAGA
    export function* getRecentSearchList(action) {
        let path = `search/recent_search?uuid=${action.payload.data.uuid}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Get Recent Search List Response =======', res);
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
            console.log('@@@ Get Recent Search List error ========', error);
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