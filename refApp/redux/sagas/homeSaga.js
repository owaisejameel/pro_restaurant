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
  
  //*> GET PRODUCT LIST SAGA
  export function* getProductList(action) {
    let path = `categories/${action.payload.data.id}/get_products?page=${action.payload.data.pageCount}&per_page=15&uuid=${action.payload.data.uuid}${action.payload.data.subcategoryParam}`;
    console.log('@@@ getProductList URL **** ', path);
    try {
      if(action.payload.data.pageCount === 1) 
      yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Product List Response =======', res);
      if (res !== undefined && res.status === 200) {
          yield put(commonActions.stopSpinner());
          yield put(homeActions.getProductListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(homeActions.getProductListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Product List error ========', error);
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

  //*> GET FILTER PRODUCT LIST SAGA
  export function* getFilterProductList(action) {
    let path = `products/filter?page=${action.payload.data.pageCount}&per_page=15&uuid=${action.payload.data.uuid}&${action.payload.data.filterQueryParams}`;
    try {
      if(action.payload.data.pageCount === 1) 
        yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Filter Product List Response =======', res);
      if (res !== undefined && res.status === 200) {
          yield put(commonActions.stopSpinner());
          yield put(homeActions.getProductListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(homeActions.getProductListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Filter Product List error ========', error);
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

  //*> GET PRODUCT LIST SAGA
  export function* getHomeProductList(action) {
    let path = `products?uuid=${action.payload.data.uuid}`;
    try {
      if(action.payload.data.showLoader) {
        yield put(commonActions.startSpinner());
      }
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Home Product List Response =======', res);
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
        console.log('@@@ Get Home Product List error ========', error);
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

  //*> GET ALL PRODUCT LIST SAGA
  export function* getAllProductList(action) {
    let path = `products/get_all_products?page=${action.payload.data.pageCount}&per_page=15&uuid=${action.payload.data.uuid}`;
    try {
      if(action.payload.data.pageCount === 1) 
      yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get All Product List Response =======', res);
      if (res !== undefined && res.status === 200) {
          yield put(commonActions.stopSpinner());
          yield put(homeActions.getAllProductListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(homeActions.getAllProductListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get All Product List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
            yield put(homeActions.getAllProductListFailure());
        } else {
            action.payload.failureCallBack(null);
            yield put(homeActions.getAllProductListFailure());
        }
    }
  }

  //*> GET RECOMMENDED PRODUCT LIST SAGA
  export function* getRecommendedProductList(action) {
    let path = `products?uuid=${action.payload.data.uuid}`;
    try {
      yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Recommended Product List Response =======', res);
      if (res !== undefined && res.status === 200) {
          yield put(commonActions.stopSpinner());
          yield put(homeActions.getRecommendedProductListSuccess(res.data.data));
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(homeActions.getRecommendedProductListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Recommended Product List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
            yield put(homeActions.getRecommendedProductListFailure());
        } else {
            action.payload.failureCallBack(null);
            yield put(homeActions.getRecommendedProductListFailure());
        }
    }
  }

  //*> GET PRODUCT DESCRIPTION SAGA
  export function* getProductDescription(action) {
    let path = `products/${action.payload.data.productId}?uuid=${action.payload.data.uuid}`;
    try {
      yield put(commonActions.startSpinner());
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

  //*> GET HOME BANNER LIST SAGA
  export function* getHomeBannerList(action) {
    let path = `products/banners_list?uuid=${action.payload.data.uuid}`;
    try {
      // yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Banner List Response =======', res);
      if (res !== undefined && res.status === 200) {
          // yield put(commonActions.stopSpinner());
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        yield put(homeActions.getRecommendedProductListFailure());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        Sentry.captureException(error);
        console.log('@@@ Get Banner List error ========', error);
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