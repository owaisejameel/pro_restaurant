
import * as USER_CONST from '../../utils/Constants';

export const addToCart = (data) => {
  console.log("add to cart", data);

  return {
    type: "ADD_ITEMS",
    data: data,
  };
};
export const cartData = (data) => {
  console.log("cart data fetch", data);

  return {
    type: "CART_DATA",
    data: data,
  };
};

export const increment = (data) => {
  console.log("increment", data);
  return {
    type: "INC",
    data: data,
  };
};

export const decrement = (data) => {
  console.log("decrement", data);
  return {
    type: "DEC",
    data: data,
  };
};

export const removeCartProduct = (data) => {
  console.log();
  return {
    type: "REMOVE",
    data: data,
  };
};

export const createCart = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.CREATE_CART_REQUESTED,
    payload: {
      successCallBack,
      failureCallBack,
      data
    }
  }
}

export const addToCartAction = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.ADD_TO_CART_REQUESTED,
    payload: {
      successCallBack,
      failureCallBack,
      data
    }
  }
}

export const getCartItems = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.GET_CART_ITEMS_REQUESTED,
    payload: {
      successCallBack,
      failureCallBack,
      data
    }
  }
}
export const reduceCartItem = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.REDUCE_CART_QUANTITY_REQUESTED,
    payload: {
      successCallBack,
      failureCallBack,
      data
    }
  }
}
export const increaseCartItem = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.INCREASE_CART_QUANTITY_REQUESTED,
    payload: {
      successCallBack,
      failureCallBack,
      data
    }
  }
}

export const removeCartItem = (data, successCallBack, failureCallBack) => {
  return {
    type: USER_CONST.REMOVE_FROM_CART_REQUESTED,
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
    type: USER_CONST.ORDER_LIST,
    payload: {
      successCallBack,
      failureCallBack,
      data
    }
  }
}