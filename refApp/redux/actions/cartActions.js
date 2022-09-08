import * as USER_CONST from "../../utils/Constants";


export const createCart = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CREATE_CART,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const createCartSuccess = (data) => {
    return {
        type: USER_CONST.CREATE_CART_SUCCESS,
        payload: {
            data,
        }
    }
}

export const createCartFailure = () => {
    return {
        type: USER_CONST.CREATE_CART_FAILURE,
    }
}


export const addToCart = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.ADD_TO_CART,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const updateQuantiyInCart = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.UPDATE_QUANTITY_IN_CART,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const addAddressForOrder = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.ADD_ADDRESS_TO_ORDER,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const calculateShippingChargeAddress = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CALCULATE_SHIPPING_CHARGE_ADDRESS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const buyCalculateShippingChargeAddress = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.BUY_CALCULATE_SHIPPING_CHARGE_ADDRESS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const releaseShippingChargeAddress = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.RELEASE_SHIPPING_CHARGE_ADDRESS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const removeFromCart = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.REMOVE_FROM_CART,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const cartHasProduct = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CART_HAS_PRODUCT,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const cartHasProductSuccess = (data) => {
    return {
        type: USER_CONST.CART_HAS_PRODUCT_SUCCESS,
        payload: {
            data,
        }
    }
}

export const cartHasProductFailure = () => {
    return {
        type: USER_CONST.CART_HAS_PRODUCT_FAILURE,
    }
}

export const showCartData = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SHOW_CART_DATA,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const applyCoupon = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.APPLY_COUPON,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const removeCoupon = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.REMOVE_COUPON,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const checkOrderItemAvailability = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CHECK_ORDER_ITEM_AVAILABILITY,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const checkZipcodeAvailability = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CHECK_ZIPCODE_AVAILABILITY,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const releaseMyBlockQuantity = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.RELEASE_MY_BLOCK_QUANTITY,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const paytmPayment = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.PAYTM_PAYMENT,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const placeOrder = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.PLACE_ORDER,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const myOrderList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.MY_ORDER_LIST,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getTrackIdDetails = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_TRACK_ID_DETAILS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const buyProduct = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.BUY_PRODUCT,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const cancelOrder = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CANCEL_ORDER,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const submitOrderReview = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.SUBMIT_ORDER_REVIEW,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const getLogisticTrackIdDetails = (data, successCallBack, failureCallBack) => {
    return {
      type: USER_CONST.GET_LOGISTIC_TRACK_ID_DETAILS,
      payload: {
        successCallBack,
        failureCallBack,
        data,
      },
    };
  };

export const updateCart = (data) => {
  return {
    type: USER_CONST.UPDATE_CART_DATA,
    payload: data,
  };
};

export const confirmPaytmPayment = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CONFIRM_PAYTM_PAYMENT,
        payload: {
            successCallBack,
            failureCallBack,
            data,
        },
  };
};

export const getSubcriptionOrders = (data, successCallBack, failureCallBack) => {
    return{
        type: USER_CONST.GET_SUBSCRIPTION_ORDERS,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const extendDelivery = (data, successCallBack, failureCallBack) => {
    return{
        type: USER_CONST.EXTEND_DELIVERY,
        payload: {
            successCallBack,
            failureCallBack,
            data
        }
    }
}

export const create_razorpays_payment = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.CREATE_RAZORPAY_PAYMENTS,
        payload: {
            successCallBack,
            failureCallBack,
            data,
        },
    };
};

export const varify_razorpay_signature = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.VERIFY_RAZORPAY_PAYMENTS,
        payload: {
            successCallBack,
            failureCallBack,
            data,
        },
    };
};

export const getDeliverySlotList = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_DELIVERY_SLOT,
        payload: {
            successCallBack,
            failureCallBack,
            data,
        },
    };
};

export const getAvailableCoupons = (data, successCallBack, failureCallBack) => {
    return {
        type: USER_CONST.GET_AVAILABLE_COUPONS,
        payload: {
            successCallBack,
            failureCallBack,
            data,
        },
    };
};
