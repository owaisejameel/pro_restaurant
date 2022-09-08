/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
    call, put
  } from 'redux-saga/effects';
  import * as API_SERVICE from '../../services/apiService/AxioUtils';
  import * as commonActions from '../actions/commonActions';
  import * as brandActions from '../actions/brandActions';
  import AsyncStorage from '@react-native-community/async-storage';
  import * as Sentry from '@sentry/react-native';

  // Define Worker Sagas
  
  //*> GET BRANDS LIST SAGA
  export function* getBrandList(action) {
    let path = `brands?uuid=${action.payload.data.uuid}`;
    try {
      // yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Brands List Response =======', res);
      if (res !== undefined && res.status === 200) {
          // yield put(commonActions.stopSpinner());
          yield put(brandActions.getBrandListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(brandActions.getBrandListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Brands List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
            yield put(brandActions.getBrandListFailure());
        } else {
            action.payload.failureCallBack(null);
            yield put(brandActions.getBrandListFailure());
        }
    }
  }

  //*> GET TAG LIST SAGA
  export function* getTagList(action) {
    let path = `tags?uuid=${action.payload.data.uuid}`;
    try {
      // yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Tag List Response =======', res);
      if (res !== undefined && res.status === 200) {
          // yield put(commonActions.stopSpinner());
          yield put(brandActions.getTagListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(brandActions.getTagListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Tag List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
            yield put(brandActions.getTagListFailure());
        } else {
            action.payload.failureCallBack(null);
            yield put(brandActions.getTagListFailure());
        }
    }
  }