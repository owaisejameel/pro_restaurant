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
  
    //*> CREATE CART SAGA
    export function* createCart(action) {
        let path = `users/${action.payload.data.userID}/carts?uuid=${action.payload.data.uuid}`;
        try {
        //   yield put(commonActions.startSpinner());
          const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
          console.log('@@@ Create Cart Response =======', res);
          if (res !== undefined && res.status === 200) {
            //   yield put(commonActions.stopSpinner());
              yield put(cartActions.createCartSuccess(res.data.data));
              action.payload.successCallBack(res.data);
          } else {
            yield put(commonActions.stopSpinner());
            yield put(cartActions.createCartFailure());
            action.payload.failureCallBack(null);
          }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Create Cart error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(cartActions.createCartFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(cartActions.createCartFailure());
            }
        }
      }

    //*> ADD PRODUCT TO CART SAGA
    export function* addToCart(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/add_cart_item?uuid=${action.payload.data.uuid}`;
        try {
        // yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Add To Cart Response =======', res.data.data.order);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            yield put(cartActions.updateCart(res.data));
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Add To Cart error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
                yield put(homeActions.getProductListFailure());
            }
        }
    }

    //*> UPDATE QUANTITY IN CART SAGA
    export function* updateQuantiyInCart(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/update_cart_item?uuid=${action.payload.data.uuid}`;
        try {
        // yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
        console.log('@@@ Update Quantity In Cart Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Update Quantity In Cart error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> REMOVE PRODUCT FROM CART SAGA
    export function* removeFromCart(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/remove_cart_item?uuid=${action.payload.data.uuid}&product_id=${action.payload.data.product_id}&order_item_id=${action.payload.data.order_item_id}`;
        try {
        // yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performDeleteRequest, path, action.payload.data);
        console.log('@@@ Remove From Cart Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Remove From Cart error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }
    
    //*> APPLY COUPON SAGA
    export function* applyCoupon(action) {
        let path = `coupons/apply_coupon?uuid=${action.payload.data.uuid}`;
        try {
        // yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Apply Coupon Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(res.data.error);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Apply Coupon error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> REMOVE COUPON SAGA
    export function* removeCoupon(action) {
        let path = `coupons/remove_coupon?uuid=${action.payload.data.uuid}&cart_id=${action.payload.data.cart_id}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performDeleteRequest, path, action.payload.data);
        console.log('@@@ Remove Coupon Response =======', res);
        if (res !== undefined && res.status === 200) {
            // yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Remove Coupon error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> CART HAS PRODUCT SAGA
    export function* cartHasProduct(action) {
        let path = `users/${action.payload.data.userID}/carts/has_product?uuid=${action.payload.data.uuid}`;
        try {
        // yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Cart Has Product Response =======', res);
        if (res !== undefined && res.status === 200) {
            // yield put(commonActions.stopSpinner());
            yield put(cartActions.cartHasProductSuccess(res.data.data));
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            yield put(cartActions.cartHasProductFailure());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Cart Has Product error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
                yield put(cartActions.cartHasProductFailure());
            } else {
                action.payload.failureCallBack(null);
                yield put(cartActions.cartHasProductFailure());
            }
        }
    }

    //*> SHOW CART DATA SAGA
    export function* showCartData(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}?uuid=${action.payload.data.uuid}`;
        try {
       // yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Show Cart Data Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Show Cart Data error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> CHECK ORDER ITEM AVAILABILITY PRODUCT SAGA
    export function* checkOrderItemAvailability(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/check_availability_and_block`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path);
        console.log('@@@ Check Order Availability Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Check Order Availability error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> CHECK ZIPCODE AVAILABILITY PRODUCT SAGA
    export function* checkZipcodeAvailability(action) {
        let path = `users/${action.payload.data.userID}/addresses/check_zipcode_available?zipcode=${action.payload.data.zipcode}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Check Zipcode Availability Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Check Zipcode Availability error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> RELEASE MY BLOCK QUANTITY PRODUCT SAGA
    export function* releaseMyBlockQuantity(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/release_products`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path);
        console.log('@@@ Release My Block Quantity Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Release My Block Quantity error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> PAYTM PAYMENT PRODUCT SAGA
    export function* paytmPayment(action) {
        let path = `paytm_payment`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Paytm Payment Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Paytm Payment error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> ADD ADDRESS FOR ORDER SAGA
    export function* addAddressForOrder(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/add_address_to_order`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
        console.log('@@@ Add Address To Orders Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Add Address To Orders error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> CALCULATE SHIPPING CHARGE FOR ADDRESS SAGA
    export function* calculateShippingChargeAddress(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/calculate_shipping_charge`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
        console.log('@@@ Calculate shipping charge for address Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(res.data.error);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Calculate shipping charge for address error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> BUY NOW CALCULATE SHIPPING CHARGE FOR ADDRESS SAGA
    export function* buyCalculateShippingChargeAddress(action) {
        let path = `products/${action.payload.data.productId}/calculate_shipping_charge`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
        console.log('@@@ Buy Now Calculate shipping charge for address Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(res.data.error);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Buy Now Calculate shipping charge for address error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }
    
    //*> RELEASE SHIPPING CHARGE FOR ADDRESS SAGA
    export function* releaseShippingChargeAddress(action) {
        let path = `users/${action.payload.data.userID}/carts/${action.payload.data.cartId}/release_shipping_charge`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
        console.log('@@@ Release shipping charge for address Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(res.data.error);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Release shipping charge for address error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> ADD ADDRESS FOR ORDER SAGA
    export function* placeOrder(action) {
    let path = `order_transactions`;
    try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Place Order Response =======', res);
    if (res !== undefined && res.status === 200) {
        yield put(commonActions.stopSpinner());
        action.payload.successCallBack(res.data);
    } else {
        yield put(commonActions.stopSpinner());
        action.payload.failureCallBack(null);
    }
    } catch (error) {
        console.log('@@@ Place Order error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
    }
    
    //*> MY ORDER LIST SAGA
    export function* myOrderList(action) {
    let path = `users/${action.payload.data.userID}/my_orders?page=${action.payload.data.pageCount}&per_page=10&uuid=${action.payload.data.uuid}`;
    try {
    // yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performGetRequest, path);
    console.log('@@@ My Order List Response =======', res);
    if (res !== undefined && res.status === 200) {
        yield put(commonActions.stopSpinner());
        action.payload.successCallBack(res.data);
    } else {
        yield put(commonActions.stopSpinner());
        action.payload.failureCallBack(null);
    }
    } catch (error) {
        console.log('@@@ My Order List error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
    }

    //*> TRACK ID DETAILS SAGA
    export function* getTrackIdDetails(action) {
    let path = `users/${action.payload.data.userID}/carts/track`;
    try {
    yield put(commonActions.startSpinner());
    const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
    console.log('@@@ Get Track ID Details Response =======', res);
    if (res !== undefined && res.status === 200) {
        yield put(commonActions.stopSpinner());
        action.payload.successCallBack(res.data);
    } else {
        yield put(commonActions.stopSpinner());
        action.payload.failureCallBack(null);
    }
    } catch (error) {
        console.log('@@@ Get Track ID Details error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
    }

    //*> BUY PRODUCT ORDER SAGA
    export function* buyProduct(action) {
        let path = `products/${action.payload.data.productId}/buy_now`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Buy Product Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Buy Product error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> CANCEL PRODUCT ORDER SAGA
    export function* cancelOrder(action) {
        let path = '';
        if(action.payload.data.isFromMyOrder)
            path = `users/${action.payload.data.userID}/carts/${action.payload.data.itemId}/cancel_order`;
        else 
            path = `users/${action.payload.data.userID}/carts/${action.payload.data.itemId}/cancel_order?item_id[]=${action.payload.data.productItemId}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPutRequest, path, action.payload.data);
        console.log('@@@ Cancel Product Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Cancel Product error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> SUBMIT PRODUCT REVIEW ORDER SAGA
    export function* submitOrderReview(action) {
        let path = `users/${action.payload.data.userID}/reviews`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Submit Product Review Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
            console.log('@@@ Submit Product Review error ========', error);
            yield put(commonActions.stopSpinner());
            if(error.request._response && error.request.status !== 0) {
                let response = JSON.parse(error.request._response);
                action.payload.failureCallBack(response.error);
            } else {
                action.payload.failureCallBack(null);
            }
        }
    }

    //*> GET LOGISTIC DETAILS SAGA
    export function* getLogisticTrackIdDetails(action) {
        let path = `shipments/shipment_info?order_id=${action.payload.data.id}`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Get Logistic Track ID Details Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
        console.log('@@@ Get Logistic Track ID Details error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
        }
    }

    //*> GET LOGISTIC DETAILS SAGA
    export function* confirmPaytmPayment(action) {
        let path = `confirm_payment`;
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Confirm Paytm Payment Details Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
        console.log('@@@ Confirm Paytm Payment Details error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
        }
    }
    
    //*> GET SUBSCRIPTIOn DETAILS SAGA
    export function* getSubscriptionOrders(action) {
        let path = `/users/${action.payload.data.userID}/order_items/${action.payload.data.id}/get_subscription_orders`;
        if(action.payload.data.page){
            path += `?page=${action.payload.data.page}&per_page=10`;
        }
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Get subscription orders Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data.data.subscription_orders, res.data.meta.pagination);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
        console.log('@@@ Get subscription orders error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
        }
    }

    //*> EXTEND SUBSCRIPTION SAGA
    export function* extendSubscription(action) {
        let path = `/users/${action.payload.data.userID}/order_items/${action.payload.data.id}/subscription_orders/${action.payload.data.subscriptionId}/extend_delivery`;
        console.log("Extend path", path);
        try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path,{});
        console.log('@@@ Extend subscription delivery Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
        } catch (error) {
            Sentry.captureException(error);
        console.log('@@@ Extend subscription delivery error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
        }
    }

//*> CREATE RAZORPAY PAYMENTS
export function* create_razorpays_payment(action) {
    let path = `razorpays`;
    try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Create Razorpay Details Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
    } catch (error) {
        console.log('@@@ Create Razorpay Details error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
}

//*> GET DELIVERY SLOT 
export function* getDeliverySlotList(action) {
    let path = `/delivery_slots/get_delivery_slots`;
    try {
      yield put(commonActions.startSpinner());
      const res = yield call(API_SERVICE.performGetRequest, path);
      console.log('@@@ Get Delivery Slot Response =======', res);
      if (res !== undefined && res.status === 200) {
          yield put(commonActions.stopSpinner());
          action.payload.successCallBack(res.data);
      } else {
        yield put(commonActions.stopSpinner());
        action.payload.failureCallBack(null);
      }
    } catch (error) {
        console.log('@@@ Get Delivery Slot error ========', error);
        yield put(commonActions.stopSpinner());
        if(error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
}

//*> VERIFY RAQORPAY PAYMENTS
export function* varify_razorpay_signature(action) {
    let path = `razorpays/varify_signature`;
    try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performPostRequest, path, action.payload.data);
        console.log('@@@ Verify Razorpay Details Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
    } catch (error) {
        console.log('@@@ Verify Razorpay Details error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
}
//*> GET AVAILABLE COUPONS
export function* getAvailableCoupons(action) {
    let path = `coupons/available_coupons`;
    try {
        yield put(commonActions.startSpinner());
        const res = yield call(API_SERVICE.performGetRequest, path);
        console.log('@@@ Get Available Coupons Response =======', res);
        if (res !== undefined && res.status === 200) {
            yield put(commonActions.stopSpinner());
            action.payload.successCallBack(res.data);
        } else {
            yield put(commonActions.stopSpinner());
            action.payload.failureCallBack(null);
        }
    } catch (error) {
        console.log('@@@ Get Available Coupons error ========', error);
        yield put(commonActions.stopSpinner());
        if (error.request._response && error.request.status !== 0) {
            let response = JSON.parse(error.request._response);
            action.payload.failureCallBack(response.error);
        } else {
            action.payload.failureCallBack(null);
        }
    }
}
