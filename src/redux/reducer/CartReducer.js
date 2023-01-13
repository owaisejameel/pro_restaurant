import * as type from "../../utils/Constants";

const initialState = {
  products: [],
  cartCount: 0,
  totalAmount: 0,
  cartProducts: [],
  favoriteProducts: [],
  cartData: [],
  createCartResponse: [],
  addToCartResponse: [],
  getCartitems: [],
  reduceCartItem: [],
  increasCartItem: [],
  removeCartItem: [],
  placeOrder: [],
  orderList: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_DATA":
      let count = action.data.cart_items && action.data.cart_items.length;
      // let count = action.data.cart_items. && action.data.cart_items.length;

      return {
        ...state,
        cartData: action.data,
        cartCount: count,
      };

    case "PRODUCTS":
      return {
        ...state,
        products: [...action.products],
      };

    case "ADD_ITEMS": {
      let updateProduct = state.products.map((i) => {
        if (i.id === action.data.id) {
          return { ...i, itemCount: i.itemCount + 1 };
        } else return i;
      });
      let cartUpdate = updateProduct.filter((i) => i.id === action.data.id);
      return {
        ...state,
        cartCount: state.cartCount + 1,
        totalAmount: action.data + state.totalAmount,
        products: [...updateProduct],
        cartProducts: [...state.cartProducts, ...cartUpdate],
      };
    }
    case "INC": {
      let updateProduct = state.products.map((i) => {
        if (i.id === action.data.id) {
          return { ...i, itemCount: i.itemCount + 1 };
        } else return i;
      });
      let cartUpdate = state.cartProducts.map((i) => {
        if (i.id === action.data.id) {
          return { ...i, itemCount: i.itemCount + 1 };
        } else return i;
      });
      return {
        ...state,
        cartCount: state.cartCount + 1,
        totalAmount: action.data + state.totalAmount,
        products: [...updateProduct],
        cartProducts: [...cartUpdate],
      };
    }

    case "DEC": {
      let updateProduct = state.products.map((i) => {
        if (i.id === action.data.id) {
          return { ...i, itemCount: i.itemCount - 1 };
        } else return i;
      });
      let cartUpdate = state.cartProducts.map((i) => {
        if (i.id === action.data.id) {
          return { ...i, itemCount: i.itemCount - 1 };
        } else return i;
      });
      return {
        ...state,
        cartCount: state.cartCount - 1,
        totalAmount: action.data + state.totalAmount,
        products: [...updateProduct],
        cartProducts: [...cartUpdate],
      };

      // let updateProduct = state.products.map((i) => {
      //   if (i.id === action.data.id) {
      //     return { ...i, itemCount: i.itemCount - 1 };
      //   } else return i;
      // });
      // let cartUpdate = state.cartProducts.filter((i) => {
      //   if (i.id === action.data.id) {
      //     if (action.data.itemCount === 1) {
      //       return;
      //     }
      //     return { ...i, itemCount: i.itemCount - 1 };
      //   } else return i;
      // });

      // return {
      //   ...state,
      //   cartCount: state.cartCount - 1,
      //   totalAmount: action.data + state.totalAmount,
      //   products: [...updateProduct],
      //   cartProducts: [...cartUpdate],
      //   // cartProducts: state.cartProducts.filter((i) => i.id !== action.data.id),
      // };
    }

    case "REMOVE": {
      let updateProductsItem = state.products.map((i) => {
        if (i.id === action.data.id) {
          return { ...i, itemCount: 0 };
        } else return i;
      });
      return {
        ...state,
        cartProducts: state.cartProducts.filter((i) => i.id !== action.data.id),
        cartCount: state.cartCount - 1,
        products: updateProductsItem,
      };
    }

    case type.CREATE_CART_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.CREATE_CART_SUCCESS:
      return {
        ...state,
        createCartResponse: action.createCartResponse,
        loading: false,
      };
    case type.CREATE_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.ADD_TO_CART_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.ADD_TO_CART_SUCCESS:
      // console.log('items in a cart---------->', [action.addToCartResponse, ...state.getCartitems.cart_items])
      // console.log('get cart ---->', state.getCartitems.cart_items);
      return {
        ...state,
        addToCartResponse: action.addToCartResponse,
        loading: false,
      };
    case type.ADD_TO_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.GET_CART_ITEMS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_CART_ITEMS_SUCCESS:
      console.log("get cart items reducer ---->", action.getCartItemsResponse);
      return {
        ...state,
        getCartitems: action.getCartItemsResponse,
        loading: false,
      };
    case type.GET_CART_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    case type.REDUCE_CART_QUANTITY_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.REDUCE_CART_QUANTITY_SUCCESS:
      return {
        ...state,
        reduceCartItem: action.reduceCartItemResponse,
        loading: false,
      };
    case type.REDUCE_CART_QUANTITY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.INCREASE_CART_QUANTITY_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.INCREASE_CART_QUANTITY_SUCCESS:
      return {
        ...state,
        increasCartItem: action.increasCartItemResponse,
        loading: false,
      };
    case type.INCREASE_CART_QUANTITY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.REMOVE_FROM_CART_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.REMOVE_FROM_CART_SUCCESS:
      console.log("remove item count", [...state.getCartitems.cart_items]);
      return {
        ...state,
        removeCartItem: action.removeCartItemResponse,
        // addToCartResponse: [...state.getCartitems.cart_items],
        loading: false,
      };
    case type.REMOVE_FROM_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.PLACE_ORDER:
      return {
        ...state,
        loading: true,
      };
    case type.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        placeOrder: action.placeOrder,
      };
    case type.PLACE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    case type.ORDER_LIST:
      return {
        ...state,
        orderList: action.orderList,
      };
    // case type.ORDER_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     orderList: action.placeOrder
    //   }
    case type.ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: action.orderList.data,
      };
    case type.ORDER_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    case "ADD_FAVORITE_LIST_REDUX":
      return {
        ...state,
        favoriteProducts: action.res.data,
      };
    default:
      return {
        ...state,
      };
  }
};
