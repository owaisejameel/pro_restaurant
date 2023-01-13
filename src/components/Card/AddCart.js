import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import * as cartActions from "../../redux/actions/cartActions";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as wishlistAction from "../../redux/actions/wishlistAction";
import { createAction } from "@reduxjs/toolkit";
const useStyles = makeStyles((theme) => ({
  browserImg: {
    height: "auto",
    // width: width,
    padding: "10px 16px",
    backgroundColor: "hsla(0,0%,100%,.66)",
    border: "1px solid #dfe3e6",
    boxShadow: "rgb(33 33 33 / 6%)",
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "rgb(33 33 33 / 6%) 0px 3px 4px, rgb(33 33 33 / 4%) 0px 3px 3px, rgb(33 33 33 / 8%) 0px 1px 8px",
    },
  },
  itemCardbtn: {
    border: "1px solid #f47779",
    color: "#f47779",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#f47779",
      border: "1px solid #f47779",
      color: "#fff",
    },
    margin: "auto",
  },
  browser_name: {
    textAlign: "left",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
  },
  brower_price: {
    fontSize: "14px",
    color: "#f47779",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
  },
  addCartBtn: {
    "&.css-y7gai-MuiButtonBase-root-MuiButton-root": {
      width: "130px",
      border: "1px solid #f47779",
      borderRadius: "8px",
    },
  },
}));

function AddCart({
  increaseCartItem,
  reduceCartItem,
  fav,
  id,
  name,
  price,
  image,
  items,
  width,
  counts,
  user,
  createCart,
  addToCart,
  getCartItems,
  favourite_id,
  reload_product,
  ...props
}) {
  const base_url = "https://gentle-dusk-70757.herokuapp.com/";
  const product_list = "api/v1/items";
  const cartProductscount = useSelector((state) => state.cartReducer.cartCount);
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  // console.log("pppppppppppp", cartProducts);
  const [updateTotal, setUpdateTotal] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const [favProducts, setFavProducts] = useState([]);
  const [favIconColor, setFavIconColor] = useState(false);
  const navigate = useNavigate();
  const [added, setAdded] = useState({ quantity: 0, cart_id: 0 });
  const [incart, setIncart] = useState({ quant: 0, item_id: "" });
  const cartValues = useSelector(
    (state) => state.cartReducer.getCartitems.cart_items
  );

  const [remove, setRemove] = useState(0);
  // localStorage.setItem("added", added);
  const handleAddCart = async (id) => {
    // setAdded(added + 1);
    // let cart_id = user_id && user_id;

    // console.log(cart_id, typeof cart_id);
    try {
      // if (added <= 0)

      let add_to_cart = await axios.post(
        `https://gentle-dusk-70757.herokuapp.com/api/v1/line_items?cart_id=${
          user + 1
        }&item_id=${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      setAdded(add_to_cart.data.data.quantity);
      setRemove(add_to_cart.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFav = async (id) => {
    console.log("FARIT ==>", id, props, favourite_id);

    if (fav) {
      let data = {
        // uuid: DeviceInfo.getUniqueId(),
        item_id: id,
        favourite_id: favourite_id,
        // user_id: userID,
      };
      props.removeFromWishlist(
        data,
        (res) => addToWishlistSuccessCallback(res),
        (err) => addToWishListFailureCallback(err)
      );
    } else {
      // onAddToWishlist(id);
      let userID = await localStorage.getItem("userId");
      let data = {
        // uuid: DeviceInfo.getUniqueId(),
        item_id: id,
        user_id: userID,
      };

      console.log("DATA Cart==>", data, props);
      props.addToWishlist(
        data,
        (res) => addToWishlistSuccessCallback(res),
        (err) => addToWishListFailureCallback(err)
      );
    }
  };
  const addToWishlistSuccessCallback = (res) => {
    console.log(res);
    reload_product();
  };

  const addToWishListFailureCallback = (err) => {};
  useEffect(() => {
    handleAddCart();
    GetCartItems();

    counts &&
      counts.map((item) => {
        if (item.item_name === name) {
          return setAdded(item.cart_quantity);
        } else if (added > 0) {
          return added;
        }
      });
  }, []);

  const CreateCart = async () => {
    let userID = await JSON.parse(localStorage.getItem("userId"));
    let data = {
      id: userID,
    };
    createCart(
      data,
      (res) => createCartsuccessCallBack(res),
      (err) => createCartfailureCallback(err)
    );
  };

  const createCartsuccessCallBack = (res) => {
    console.log("create cart Successcall Back --->", res);
    try {
      if (res.success == true) {
        let inputData = {
          cart_id: res.data.id,
          item_id: id,
        };

        console.log("input data for add to cart", inputData);
        addToCart(
          inputData,
          (res) => addToCartsuccessCallBack(res),
          (err) => addToCartfailureCallback(err)
        );
        // WToast.show({ data: 'Added to Cart' });
        // props.navigation.navigate('EditProfile')
      } else {
        // let message = res.message;
        // WToast.show({ data: 'Something went wrong' });
      }
    } catch (err) {
      //   Sentry.captureException(err);
      console.log("Error", err);
    }
  };

  const createCartfailureCallback = (err) => {
    console.log("create cart Failure Back --->", err);
  };
  const addToCartsuccessCallBack = (res) => {
    console.log("add to cart Successcall Back --->", res);
    try {
      if (res.success == true) {
        GetCartItems();
        setAdded({
          quantity: added.quantity,
          cart_id: res?.data?.id,
        });
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "success",
            message: "Added to Cart successfuly",
          },
        });
        // WToast.show({ data: 'Added to Cart' });
        // props.navigation.navigate('EditProfile')
      } else {
        // let message = res.message;
        // WToast.show({ data: 'Something went wrong' });
      }
    } catch (err) {
      //   Sentry.captureException(err);
      console.log("Error", err);
    }
  };

  const addToCartfailureCallback = (err) => {
    console.log("add to cart Failure Back --->", err);
  };
  const GetCartItems = async () => {
    let user_id = await JSON.parse(localStorage.getItem("userId"));
    console.log("user_id ", user_id);
    let data = {
      id: user_id,
    };

    getCartItems(
      data,
      (res) => getCartItemsSuccessCallback(res),
      (err) => getCartItemsFailureCallBack(err)
    );
  };

  const getCartItemsSuccessCallback = (res) => {
    console.log("Get cart items Successcall Back @@@@@@@@@@@ ----->", res);
    try {
      if (res.success == true) {
        console.log(
          "&&&&&&&&&&&&&&&& Cat items @@@@@@@@@@@ ----->",
          res.cart_items.length
        );
      } else {
        // let message = res.message;
        // WToast.show({ data: 'Something went wrong' });
      }
    } catch (err) {
      //   Sentry.captureException(err);
      console.log("Error", err);
    }
  };

  const getCartItemsFailureCallBack = (error) => {
    console.log("get cart items failurecalll back--------------->", error);
  };

  // ADD_TO_CART
  const increaseCarQuantity = (id) => {
    // alert(id);
    let data = {
      id: id,
    };
    increaseCartItem(
      data,
      (res) => increaseCartItemSuccessCallback(res),
      // setAdded()
      (err) => increaseCartItemFailureCallBack(err)
    );
  };
  const increaseCartItemSuccessCallback = (res) => {
    console.log("increase cart item Successcall Back @@@@@@@@@@@ ----->", res);
    try {
      if (res.success == true) {
        setUpdateTotal(!updateTotal);

        GetCartItems();
        setAdded({
          quantity: added.quantity + 1,
          cart_id: added.cart_id,
        });
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "success",
            message: res.message,
          },
        });
      } else {
        // let message = res.message;

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "error",
            message: "Some thing went wrong",
          },
        });
      }
    } catch (err) {
      //   Sentry.captureException(err);
      console.log("Error", err);
    }
  };
  const increaseCartItemFailureCallBack = (error) => {
    console.log("increase cart item failurecalll back--------------->", error);
  };

  // ADD_TO_CART

  // decrease quantity
  const reduceCarQuantity = (id) => {
    let data = {
      id: id,
    };
    reduceCartItem(
      data,
      (res) => reduceCartItemSuccessCallback(res),
      (err) => reduceCartItemFailureCallBack(err)
    );
  };

  const reduceCartItemSuccessCallback = (res) => {
    console.log("Reduce cart item Successcall Back @@@@@@@@@@@ ----->", res);
    try {
      if (res.success == true) {
        GetCartItems();
        setUpdateTotal(!updateTotal);
        setAdded({
          quantity: added.quantity - 1,
          cart_id: added.cart_id,
        });
        // WToast.show({ data: res.message });
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "success",
            message: res.message,
          },
        });
      } else {
        // let message = res.message;
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "error",
            message: "Some thing went wrong",
          },
        });
      }
    } catch (err) {
      //   Sentry.captureException(err);
      console.log("Error", err);
    }
  };

  const reduceCartItemFailureCallBack = (error) => {
    console.log("reduce cart item failurecalll back--------------->", error);
  };

  // decrease quantity

  // use_Effects

  useEffect(() => {
    // handleAddCart();
    GetCartItems();

    cartValues &&
      cartValues.map((item) => {
        if (item.item_name === name) {
          console.log("counts--------------------------->", item?.cart_item_id);
          // console.log(added);
          return setAdded({
            quantity: item.cart_quantity,
            cart_id: item.cart_item_id,
          });
        } else if (added.quantity > 0) {
          return added;
        }
      });
  }, [setAdded, cartValues?.length]);
  // use_effects

  return (
    <Box style={{ margin: "20px 0" }}>
      <Box key={id} className={classes.browserImg} style={{ width: width }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => handleFav(id)}
            aria-label="add to favorites"
          >
            {fav === true ? (
              <FavoriteIcon
                sx={{
                  color: "red",
                }}
              />
            ) : (
              <FavoriteBorderIcon sx={{ color: "red" }} />
            )}
          </IconButton>
        </Box>

        {image ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 5px",
            }}
            onClick={() => {
              navigate("/home/product-detail", {
                state: {
                  data: items,
                  added: added.quantity,
                  cart_id: added.cart_id,
                  favourite_id: favourite_id,
                },
              });
            }}
          >
            <img
              src={image}
              alt="image_slider"
              height={150}
              width={150}
              style={{ borderRadius: "50%" }}
            />
          </Box>
        ) : (
          ""
        )}
        {name ? (
          <Typography className={classes.browser_name}>
            {name.substring(0, 20)}
          </Typography>
        ) : (
          ""
        )}
        <Typography className={classes.brower_price}>₹{price}</Typography>
        <Box style={{ display: "flex", marginTop: "1rem" }}>
          {added.quantity > 0 ? (
            <IconButton
              aria-label="share"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "unset !important",
                },
                margin: "auto",
              }}
            >
              <RemoveOutlined
                onClick={() => {
                  reduceCarQuantity(added.cart_id);
                  // console.log(item);
                }}
                sx={{
                  mr: 3,
                  color: "orange",
                }}
              />
              <Box>
                <Button
                  sx={{
                    padding: 0,
                    color: "teal",
                    cursor: "pointer",
                    // "&:hover": {
                    //   backgroundColor: "unset !important",
                    //   color: "teal",
                    // },
                  }}
                >
                  {added.quantity}
                </Button>
                <AddOutlined
                  onClick={() => increaseCarQuantity(added.cart_id)}
                  sx={{
                    ml: 3,
                    color: "orange",
                  }}
                />
              </Box>
            </IconButton>
          ) : (
            <Button
              className={classes.itemCardbtn}
              variant="outlined"
              onClick={() => CreateCart()}
            >
              Add to cart
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// const mapStateToProps = (state) => {
//   return {
//       cartList: state.homeReducer.addToCartResponse,
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    createCart: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.addToCartAction(data, successCallBack, failureCallBack)
      ),
    increaseCartItem: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.increaseCartItem(data, successCallBack, failureCallBack)
      ),
    reduceCartItem: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.reduceCartItem(data, successCallBack, failureCallBack)
      ),
    getCartItems: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.getCartItems(data, successCallBack, failureCallBack)
      ),

    addToWishlist: (
      data,
      addToWishlistSuccessCallback,
      addToWishListFailureCallback
    ) =>
      dispatch(
        wishlistAction.addToWishList(
          data,
          addToWishlistSuccessCallback,
          addToWishListFailureCallback
        )
      ),
    removeFromWishlist: (
      data,
      removeFromWishlistSuccessCallback,
      removeFromWishlistFailureCallback
    ) =>
      dispatch(
        wishlistAction.removeFromWishList(
          data,
          removeFromWishlistSuccessCallback,
          removeFromWishlistFailureCallback
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(AddCart);
