/**
 * @UserSaga will listen for the requests of user related stuffs, call a api using apiService and return back to corresponding reducer
 */

import {
    call, put
  } from 'redux-saga/effects';
  import * as API_SERVICE from '../../services/apiService/AxioUtils';
  import * as commonActions from '../actions/commonActions';
  import * as profileActions from '../actions/profileActions';
  import * as Sentry from '@sentry/react-native';

  // Define Worker Sagas
  
    //*> GET PROFILE SAGA
    export function* getProfileData(action) {
        let path = `users/${action.payload.data.userID}`;
        try {
        //   yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Get Profile Response =======', res);
          if (res !== undefined && res.status === 200) {
            //   yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
              yield put(profileActions.getProfileDataSuccess(res.data.data));
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get Profile error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(profileActions.getProfileDataFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(profileActions.getProfileDataFailure());
            }
        }
    }

    //*> UPDATE PROFILE SAGA
    export function* updateProfileData(action) {
        let path = `users/${action.payload.data.userID}`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPutRequestImage, path, action.payload.data.profileData);
          console.log('@@@ Update Profile Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
              yield put(profileActions.getProfileDataSuccess(res.data.data));
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Update Profile error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> CHANGE USER PROFILE PASSWORD SAGA
    export function* changePassword(action) {
        let path = `users/${action.payload.data.userID}/update_password`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
          console.log('@@@ Change Profile Password Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Change Profile Password error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> GET ADDRESS LIST PASSWORD SAGA
    export function* getAddressList(action) {
        let path = `users/${action.payload.data.userID}/addresses`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Get Address List Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get Address List error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }
    //*> CREATE ADDRESS SAGA
    export function* createAddress(action) {
        let path = `users/${action.payload.data.userID}/addresses`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
          console.log('@@@ Create Address Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Create Address error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> SAVE CONTACT US SAGA
    export function* saveContactUs(action) {
        let path = `users/${action.payload.data.userID}/save_contact_us?uuid=${action.payload.data.uuid}`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
          console.log('@@@ Save Contact Us Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Save Contact Us error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> UPDATE ADDRESS SAGA
    export function* updateAddress(action) {
        let path = `users/${action.payload.data.userID}/addresses/${action.payload.data.addressId}`;
        try {
        //   yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
          console.log('@@@ Update Address Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Update Address error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> DELETE ADDRESS SAGA
    export function* deleteAddress(action) {
        let path = `users/${action.payload.data.userID}/addresses/${action.payload.data.addressId}`;
        try {
        //   yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performDeleteRequest, path, action.payload.data);
          console.log('@@@ Delete Address Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Delete Address error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> GET HELP CENTER DETAILS SAGA
    export function* getHelpCenterDetails(action) {
        let path = `static_pages/help_center_details`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequestGlobal, path);
          console.log('@@@ Get Help Center Details Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get Help Center Details error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> GET SOCIAL MEDIA ACCOUNT DETAILS SAGA
    export function* getSocialMediaAccountDetails(action) {
        let path = `users/${action.payload.data.userID}/social_auths`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Get Social Media Account Details Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get Social Media Account Details error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> ADD SOCIAL MEDIA ACCOUNT SAGA
    export function* addSocialMediaAccountDetails(action) {
        let path = `users/${action.payload.data.userID}/social_auths/connect`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
          console.log('@@@ Add Social Media Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Add Social Media error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> REMOVE SOCIAL MEDIA ACCOUNT SAGA
    export function* removeSocialMediaAccountDetails(action) {
        let path = `users/${action.payload.data.userID}/social_auths/${action.payload.data.socialId}`;
        try {
        //   yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performDeleteRequest, path, action.payload.data);
          console.log('@@@ Remove Social Media Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Remove Social Media error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

     //*> GET FAQ LIST SAGA
     export function* getFAQList(action) {
        let path = `static_pages/faqs_list?uuid=${action.payload.data.uuid}`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequestGlobal, path);
          console.log('@@@ Get FAQ List Details Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Get FAQ List Details error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }


     //*> SEND PHONE NO OTP
     export function* sendPhoneNoOTP(action) {
        let path = `users/${action.payload.data.userID}/send_phone_number_token`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data.profileData);
          console.log('@@@ Send Phone No OTP Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Send Phone No OTP error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

     //*> VERIFY PHONE NO SAGA
     export function* verifyPhoneNo(action) {
        let path = `users/${action.payload.data.userID}/verify_phone_number?phone_number_otp=${action.payload.data.otp}&phone_number=${action.payload.data.phoneNumber}`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Verify Phone no Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Verify Phone no error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

     //*> SEND PHONE NO OTP
     export function* sendDeliveryPhoneNoOTP(action) {
        let path = `users/${action.payload.data.userID}/addresses/send_phone_number_otp`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data.profileData);
          console.log('@@@ Send Delivery Phone No OTP Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Send Delivery Phone No OTP error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

     //*> VERIFY PHONE NO SAGA
     export function* verifyDeliveryPhoneNo(action) {
        let path = `users/${action.payload.data.userID}/addresses/verify_phone_number?phone_number_otp=${action.payload.data.otp}&phone_number=${action.payload.data.phoneNumber}`;
        try {
          yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performGetRequest, path);
          console.log('@@@ Verify Delivery Phone no Response =======', res);
          if (res !== undefined && res.status === 200) {
              yield put(commonActions.stopSpinner());
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Verify Delivery Phone no error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

