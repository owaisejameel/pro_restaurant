/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
  call, put
} from 'redux-saga/effects';
import * as API_SERVICE from '../../services/apiService/AxioUtils';
import * as commonActions from '../actions/commonActions';
import * as Sentry from '@sentry/react-native';

// Define Worker Sagas

//*> LOGIN USER SAGA
export function* onLoginUser(action) {
  let path = `oauth/token?uuid=${action.payload.data.uuid}`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Login Response =======', res);
    if (res !== undefined && res.status === 200) {
        yield put(commonActions.stopSpinner());
        action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Login error ========', error);
    yield put(commonActions.stopSpinner());
    if(error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> LOGIN USER WITH OTP SAGA
export function* onLoginUserWithOtp(action) {
  let path = `users/send_phone_number_otp`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Login Response =======', res);
    if (res !== undefined && res.status === 200) {
        yield put(commonActions.stopSpinner());
        action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Login error ========', error);
    yield put(commonActions.stopSpinner());
    if(error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> LOGIN USER SAGA
export function* onSocialLogin(action) {
  let path = 'oauth/token';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Login Response =======', res);
    if (res !== undefined && res.status === 200) {
        yield put(commonActions.stopSpinner());
        action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Login error ========', error);
    yield put(commonActions.stopSpinner());
    if(error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> SIGNUP USER SAGA
export function* onSignUpUser(action) {
  let path = 'users';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ SignUp Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
      console.log('@@@ SignUp error ========', error);
      yield put(commonActions.stopSpinner());
      if(error.request._response && error.request.status !== 0) {
        let response = JSON.parse(error.request._response);
        action.payload.failureCallBack(response.error);
      } else {
        action.payload.failureCallBack(null);
      }
  }
}

//*> CREATE GUEST USER SAGA
export function* createGuestUser(action) {
  let path = 'users/create_guest_user';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Create Guest User Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
      console.log('@@@ Create Guest User error ========', error);
      yield put(commonActions.stopSpinner());
      if(error.request._response && error.request.status !== 0) {
        let response = JSON.parse(error.request._response);
        action.payload.failureCallBack(response.error);
      } else {
        action.payload.failureCallBack(null);
      }
  }
}

//*> SIGNOUT USER SAGA
export function* onLogoutUser(action) {
  let path = 'oauth/revoke';
  try {
    // yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Logout Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      // yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
      console.log('@@@ Logout error ========', error);
      // yield put(commonActions.stopSpinner());
      if(error.request._response && error.request.status !== 0) {
        let response = JSON.parse(error.request._response);
        action.payload.failureCallBack(response.error);
      } else {
        action.payload.failureCallBack(null);
      }
  }
}

//*> RESET PASSWORD USER SAGA
export function* resetPassword(action) {
  let path = 'users/password';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
    console.log('@@@ Reset Password Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
      console.log('@@@  Reset Password error ========', error);
      yield put(commonActions.stopSpinner());
      if(error.request._response && error.request.status !== 0) {
        let response = JSON.parse(error.request._response);
        action.payload.failureCallBack(response.error);
      } else {
        action.payload.failureCallBack(null);
      }
  }
}

//*> SEND LINK USER SAGA
export function* sendLink(action) {
  let path = 'users/password';
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Reset Password Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
      console.log('@@@  Reset Password error ========', error);
      yield put(commonActions.stopSpinner());
      if(error.request._response && error.request.status !== 0) {
        let response = JSON.parse(error.request._response);
        action.payload.failureCallBack(response.error);
      } else {
        action.payload.failureCallBack(null);
      }
  }
}

//*> SEND PINCODE USER SAGA
export function* sendPincode(action) {
  // let path = 'users/check_zipcode_available';
  // try {
  //   yield put(commonActions.startSpinner());
  //   const res = yield call(API_SERVICE.performGetRequest, path, action.payload.data);
  //   console.log('@@@ Verify Pincode Response =======', res);
  //   if (res !== undefined && res.status === 200) {
  //     yield put(commonActions.stopSpinner());
  //     action.payload.successCallBack(res);
  //   } else {
  //     yield put(commonActions.stopSpinner());
  //     action.payload.failureCallBack(null);
  //   }
  // } catch (error) {
  //     console.log('@@@ Verify Pincode error ========', error);
  //     yield put(commonActions.stopSpinner());
  //     if(error.request._response && error.request.status !== 0) {
  //       let response = JSON.parse(error.request._response);
  //       action.payload.failureCallBack(response.error);
  //     } else {
  //       action.payload.failureCallBack(null);
  //     }
  // }

  let path = `users/check_zipcode_available?zipcode=${action.payload.data.zipcode}`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ Verify Pincode Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Verify Pincode error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> VERIFY OTP USER SAGA
export function* verifyOTP(action) {
  let path = `users/verify_otp?otp=${action.payload.data.otp}`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path, action.payload.data);
    console.log('@@@ Verify OTP Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
      console.log('@@@  Verify OTP error ========', error);
      yield put(commonActions.stopSpinner());
      if(error.request._response && error.request.status !== 0) {
        let response = JSON.parse(error.request._response);
        action.payload.failureCallBack(response.error);
      } else {
        action.payload.failureCallBack(null);
      }
  }
}

//*> CONFIRM ACCOUNT SAGA
export function* confirmAccount(action) {
  console.log(action);
  let path = `users/confirm_account`;
  console.log(path);
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPutRequest,
      path,
      action.payload.data,
    );
    console.log('@@@ Confirm Account Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@  Confirm Account error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> RESEND CONFIRM ACCOUNT TOKEN SAGA
export function* resendConfirmAccountToken(action) {
  console.log(action);
  let path = `users/resend_confirmation_token`;
  console.log(path);
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPutRequest,
      path,
      action.payload.data,
    );
    console.log('@@@ Rsend Confirm Token Account Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@  Rsend Confirm Token Account error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> GET NOTIFICATION LIST SAGA
export function* getNotificationList(action) {
  let path = `users/${action.payload.data.userID}/notifications?page=${action.payload.data.pageCount}&per_page=10`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ Get Notification List Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Get Notification List error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> DELETE NOTIFICATION SAGA
export function* deleteNotification(action) {
  let path = `users/${action.payload.data.userID}/notifications/${action.payload.data.notificationId}`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performDeleteRequest,
      path,
      action.payload.data,
    );
    console.log('@@@ Delete Notification Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Delete Notification error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> READ NOTIFICATION SAGA
export function* readNotification(action) {
  let path = `users/${action.payload.data.userID}/notifications/read_notification`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPutRequest,
      path,
      action.payload.data,
    );
    console.log('@@@ Read Notification Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Read Notification error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> READ ALL NOTIFICATION SAGA
export function* readAllNotification(action) {
  let path = `users/${action.payload.data.userID}/notifications/read_notification`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(
      API_SERVICE.performPutRequest,
      path,
      action.payload.data,
    );
    console.log('@@@ Read all Notification Response =======', res);
    if (res !== undefined && res.status === 200) {
      yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res.data);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Read all Notification error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}

//*> SEND DEVICE TOKEN
export function* sendDeviceToken(action) {
  let path = `save_device_token`;
  try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Send Device Token Response =======', res);
    if (res !== undefined && res.status === 200) {
      // yield put(commonActions.stopSpinner());
      action.payload.successCallBack(res);
    } else {
      yield put(commonActions.stopSpinner());
      action.payload.failureCallBack(null);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log('@@@ Send Device Token error ========', error);
    yield put(commonActions.stopSpinner());
    if (error.request._response && error.request.status !== 0) {
      let response = JSON.parse(error.request._response);
      action.payload.failureCallBack(response.error);
    } else {
      action.payload.failureCallBack(null);
    }
  }
}
