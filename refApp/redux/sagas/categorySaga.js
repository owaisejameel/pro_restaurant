/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
    call, put
  } from 'redux-saga/effects';
  import * as API_SERVICE from '../../services/apiService/AxioUtils';
  import * as commonActions from '../actions/commonActions';
  import * as categoryActions from '../actions/categoryActions';
  import AsyncStorage from '@react-native-community/async-storage';
  import * as Sentry from '@sentry/react-native';

  // Define Worker Sagas
  
  //*> GET CATEGORY LIST SAGA
  export function* getCategoryList(action) {
    let path = `categories?with_subcategory=true&uuid=${action.payload.data.uuid}`;
    try {
      // yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Category List Response =======', res);
      if (res !== undefined && res.status === 200) {
          // yield put(commonActions.stopSpinner());
          yield put(categoryActions.getCategoryListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(categoryActions.getCategoryListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Category List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
            yield put(categoryActions.getCategoryListFailure());
        } else {
            action.payload.failureCallBack(null);
            yield put(categoryActions.getCategoryListFailure());
        }
    }
  }

  //*> GET CATEGORY LIST SAGA
  export function* getSubCategoryList(action) {
    let path = `categories/${action.payload.data.id}/get_sub_categories?uuid=${action.payload.data.uuid}`;
    try {
      yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Sub Category List Response =======', res);
      if (res !== undefined && res.status === 200) {
          yield put(commonActions.stopSpinner());
          yield put(categoryActions.getCategoryListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(categoryActions.getCategoryListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Sub Category List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
            yield put(categoryActions.getCategoryListFailure());
        } else {
            action.payload.failureCallBack(null);
            yield put(categoryActions.getCategoryListFailure());
        }
    }
  }