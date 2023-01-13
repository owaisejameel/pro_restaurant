import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./style.css";
import RecommendSlider from "../../components/Recommended/RecommendSlider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { makeStyles } from "@mui/styles";
import Rating from "@mui/material/Rating";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useLocation } from "react-router-dom";
import {
  AddOutlined,
  DeleteForeverOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { connect, useSelector } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import * as wishlistAction from "../../redux/actions/wishlistAction";
import { useDispatch } from "react-redux";

function SingleProduct({
  createCart,
  addToCart,
  getCartItems,
  increaseCartItem,
  reduceCartItem,
  addToWishlist,
  removeFromWishlist,
  getWishlist
}) {
  const { state } = useLocation();
  const data = state.data;
  const added = state.added;
  const cart_id = state.cart_id;

  const classes = useStyles();
  const [value, setValue] = useState({ quantity: 0, cart_id: 0 });
  const [incart, setIncart] = useState();
  const dispatch = useDispatch();
  const [updateTotal, setUpdateTotal] = useState(false);
  const cartValues = useSelector(
    (state) => state.cartReducer.getCartitems.cart_items
  );

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
          item_id: data.item.id,
        };
        console.log("input data for add to cart", inputData);
        // res.map((item) => {
        //   setValue(item.quantity);
        // });

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
        setValue({ quantity: res.data.quantity, cart_id: res.data.id });
        GetCartItems();

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
  const GetCartItems = async (local) => {
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
          res?.cart_items
        );
        // res.cart_items.map((item) => {

        //   setValue({
        //     quantity: item.cart_quantity,
        //     cart_id: item.cart_item_id,
        //   });
        // });
        // res.cart_items_id &&
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
        cartValues.map((item) => {
          item.cart_item_id &&
            setValue({ quantity: res.data.quantity, cart_id: value.cart_id });
        });
        setUpdateTotal(!updateTotal);
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

  const increaseCarQuantity = (id) => {
    // alert(id);
    let data = {
      id: id,
    };
    increaseCartItem(
      data,
      (res) => increaseCartItemSuccessCallback(res),
      (err) => increaseCartItemFailureCallBack(err)
    );
  };
  const increaseCartItemSuccessCallback = (res) => {
    
    try {
      if (res.success == true) {
        setUpdateTotal(!updateTotal);
        GetCartItems();
        cartValues.map((item) => {
          item.cart_item_id &&
            setValue({ quantity: res.data.quantity, cart_id: value.cart_id });
        });

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "success",
            message: res.message,
          },
        });
        // setValue(value + 1);
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
  useEffect(() => {
    GetCartItems();
    cartValues &&
      cartValues.map((item) => {
        if (item.cart_item_id === cart_id) {
          
          return setValue({
            quantity: item.cart_quantity,
            cart_id: item.cart_item_id,
          });
        } else if (value.quantity > 0) {
          return value;
        }
      });
  }, [setValue, cartValues.length]);

  const handleFav = async(item_id) => {
    if (state.data.added_in_wishlist) {
      let data = {
        item_id: item_id,
        favourite_id: state.favourite_id,
        // user_id: userID,
      };
      removeFromWishlist(
        data,
        (res) => addToWishlistSuccessCallback(res),
        (err) => addToWishListFailureCallback(err)
      );
    } else {
      // onAddToWishlist(id);
      let userID = await localStorage.getItem("userId");
      let data = {
        item_id: item_id,
        user_id: userID,
      };

      addToWishlist(
        data,
        (res) => addToWishlistSuccessCallback(res),
        (err) => addToWishListFailureCallback(err)
      );
    }
  }

  const addToWishlistSuccessCallback = (res) => {
    
    if(res.status == 200 || res.success) {
      data.added_in_wishlist = !data.added_in_wishlist;

      setUpdateTotal(!updateTotal);
      getWishlistData()
    }
  }

  const addToWishListFailureCallback = (err) => {

  }

  const getWishlistData = async() => {
    let userID = await localStorage.getItem("userId");
    let data = {
      user_id: userID,
      // favourite_id: 1
    };

      getWishlist(
        data,
        (res) => {},
        (err) => {}
      );
  }

  return (
    <Grid
      container
      className={classes.mainDivMiddle}
      justifyContent="center"
      alignContent="flex-start"
    >
      <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
        <Box>
          <Typography variant="h5" sx={{ ml: 2.5 }}>
            Product Details
          </Typography>
          <Grid container sx={{ mt: 2, mb: 3 }}>
            <Grid item md={5} sx={{ p: 2 }}>
              <Box style={{ width: "50%" }}>
                <img src={data.item_image} width={350} alt="broken_image" />
              </Box>
            </Grid>
            <Grid item md={7} sx={{ px: 5, py: 3 }}>
              <Box style={{ display: "flex", flexDirection: 'row' }}>
                <Typography variant="h5" sx={{ mt: 1 }}>{data.item.name} </Typography>
                <IconButton
                  onClick={() => handleFav(data.item.id)}
                  aria-label="add to favorites"
                  style={{ alignItems: 'center' }}
                  sx={{ ml: 2, mt: 0.5 }}
                >
                  {data.added_in_wishlist ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon sx={{ color: "red" }} />}
                </IconButton>
              </Box>

              {/* <Box sx={{ mt: 2 }}>
                <Rating
                  name="simple-controlled"
                  // value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box> */}

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{data.item.price}</Typography>
                <Box style={{ display: "flex" }}>
                  <Typography sx={{ color: "#f47779", fontSize: "18px" }}>
                    ₹ {data.item.price - (data.item.price % 10)}
                  </Typography>
                  <Typography sx={{ color: "#8897a2", fontSize: "18px" }}>
                    &nbsp; &nbsp;<del>₹ {data.item.price}</del>
                  </Typography>
                  {/* <Typography style={{ marginLeft: "10px", display: "flex" }}>
                    <CheckCircleOutlineIcon />
                    &nbsp;
                    <span>verify In Stock Online</span>
                  </Typography> */}
                </Box>
              </Box>

              <Box style={{ display: "flex", marginTop: "1rem" }}>
                {value.quantity > 0 ? (
                  <IconButton
                    aria-label="share"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "unset !important",
                      },
                    }}
                  >
                    <RemoveOutlined
                      onClick={() => {
                        reduceCarQuantity(value.cart_id);
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
                          // cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "unset !important",
                            color: "#fff",
                          },
                        }}
                      // disabled
                      >
                        {value.quantity}
                      </Button>
                      <AddOutlined
                        onClick={() => {
                          increaseCarQuantity(value.cart_id);
                          // console.log(item);
                        }}
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
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Description:-</Typography>
                <Typography>
                  <ReactReadMoreReadLess
                    charLimit={300}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                    readMoreClassName="read-more-less--more"
                    readLessClassName="read-more-less--less"
                  >
                    {data.item.description
                      .replace("<p>", "")
                      .replace("</p>", "")}
                  </ReactReadMoreReadLess>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Typography variant="h5" sx={{ px: 3, my: 2.5 }}>
          Similar Products
        </Typography>
        <RecommendSlider />
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCart: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.addToCartAction(data, successCallBack, failureCallBack)
      ),
    getCartItems: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.getCartItems(data, successCallBack, failureCallBack)
      ),
    reduceCartItem: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.reduceCartItem(data, successCallBack, failureCallBack)
      ),
    increaseCartItem: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.increaseCartItem(data, successCallBack, failureCallBack)
      ),
    addToWishlist: (data, addToWishlistSuccessCallback, addToWishListFailureCallback) =>
      dispatch(
        wishlistAction.addToWishList(
          data,
          addToWishlistSuccessCallback,
          addToWishListFailureCallback
        )
      ),
    removeFromWishlist: (data, removeFromWishlistSuccessCallback, removeFromWishlistFailureCallback) =>
      dispatch(
        wishlistAction.removeFromWishList(
          data,
          removeFromWishlistSuccessCallback,
          removeFromWishlistFailureCallback
        )
      ),
      getWishlist: (data, successCallBack, failureCallBack) =>
        dispatch(
          wishlistAction.getWishlist(data, successCallBack, failureCallBack)
        ),
  };
};
export default connect(null, mapDispatchToProps)(SingleProduct);

const useStyles = makeStyles((theme) => ({
  mainDivMiddle: {
    minHeight: "calc(100vh - 320px)",
    backgroundColor: "#FCFCFC",
    padding: 5,
    zIndex: -1,
    marginTop: "20px",
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
  },
  buyNowBtn: {
    margin: "0 1rem",
    padding: "0 2rem",
    backgroundColor: "#f47779",
    border: "1px solid #f47779",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#f47779",
      border: "1px solid #f47779",
      color: "#fff",
    },
  },
}));
