import React from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
// import { useParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NoCartItemIcon from "../../assets/no-cart.png";
// import {
//   AddOutlined,
//   Favorite,
//   FavoriteOutlined,
//   RemoveOutlined,
//   ResetTvRounded,
// } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  increment,
  decrement,
  removeCartProduct,
  addToCart,
} from "../../redux/actions/cartActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  AddOutlined,
  Favorite,
  FavoriteOutlined,
  RemoveOutlined,
  ResetTvRounded,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Payment from "../Payment/Payment";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";

const Cart = ({
  getCartItems,
  reduceCartItem,
  increaseCartItem,
  removeCartItem,
}) => {
  const classes = useStyles();
  const params = useParams();
  console.log("prama", params);
  const dispatch = useDispatch();
  const user_id = useSelector(
    (state) => state?.userReducer?.userProfileData?.data?.data?.id
  );
  const theme = useTheme();

  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const cartCount = useSelector((state) => state.cartReducer.cartCount);
  // const totalAmount = useSelector((state) => state.cartReducer.totalAmount);
  const total = [];
  const [amount, setAmount] = useState(0);
  const productSummary = [
    {
      id: 1,
      description: "product desctription",
      quantity: 3,
      amount: 200,
    },
    {
      id: 2,
      description: "product desctription",
      quantity: 2,
      amount: 200,
    },
    {
      id: 3,
      description: "product desctription",
      quantity: 5,
      amount: 1000,
    },
  ];
  const [cartData, setCartData] = useState();
  const [updateTotal, setUpdateTotal] = useState(false);

  console.log(cartProducts && cartProducts);
  const totalValue = (value) => {
    setAmount(value.reduce((a, b) => a + b, 0));
    return amount;
  };

  const navigate = useNavigate();
  useEffect(() => {
    totalValue(total);
  }, [total]);
  useEffect(() => {
    GetCartItems();
  }, [updateTotal]);

  let cart_items_price = 0;
  cart_items_price = cartData?.cart_items.map(
    (item, index) => item.item_price * item.cart_quantity + cart_items_price
  );

  const totalAmount = cart_items_price?.reduce((index, value) => {
    return index + value;
  }, 0);

  // const handleAddCart = async (id) => {
  //   // setAdded(added + 1);

  //   try {
  //     // if (added <= 0)

  //     let add_to_cart = await axios.post(
  //       `https://gentle-dusk-70757.herokuapp.com/api/v1/line_items?cart_id=${user_id + 1
  //       }&item_id=${id}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json; charset=utf-8",
  //         },
  //       }
  //     );
  //     console.log(add_to_cart.data);
  //     // setAdded(add_to_cart.data.data.quantity);
  //     // setRemove(add_to_cart.data.data.id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
        // setItemsIncart(res.cart_items.length);
        setCartData(res);
        dispatch({ type: "LOADER_CLOSE" });
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
    console.log("increase cart item Successcall Back @@@@@@@@@@@ ----->", res);
    try {
      if (res.success == true) {
        setUpdateTotal(!updateTotal);
        GetCartItems();
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

  const deleteCartItem = (id) => {
    // alert(id);
    let data = {
      id: id,
    };
    removeCartItem(
      data,
      (res) => removeCartItemSuccessCallback(res),
      (err) => removeCartItemFailureCallBack(err)
    );
  };
  const removeCartItemSuccessCallback = (res) => {
    console.log("remove cart item Successcall Back @@@@@@@@@@@ ----->", res);
    try {
      if (res.success == true) {
        setUpdateTotal(!updateTotal);
        GetCartItems();
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            severity: "success",
            message: res.message,
          },
        });
      } else {
        // let message = res.message;
        // WToast.show({ data: 'Something went wrong' });
      }
    } catch (err) {
      //   Sentry.captureException(err);
      console.log("Error", err);
    }
  };

  const removeCartItemFailureCallBack = (error) => {
    console.log("remove cart item failurecalll back--------------->", error);
  };
  return (
    <Grid
      container
      className={classes.mainDivMiddle}
      justifyContent="center"
      alignItems="flex-start"
    >
      {cartData?.cart_items?.length !== 0 ? (
        <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
          <Grid container>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={7} sx={{ px: 1 }}>
              <Grid container className={classes.boxStyle}>
                {cartData &&
                  cartData?.cart_items?.map((item, i) => {
                    return (
                      <Grid
                        container
                        alignItems="flex-start"
                        className={classes.cartProductBox}
                      >
                        <Grid
                          item
                          xs={5}
                          sm={5}
                          md={3}
                          sx={{ borderRadius: 1, p: 2 }}
                          className={classes.imgProduct}
                        >
                          <Box
                            component="img"
                            src={item.item_images}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} sx={{ pl: 3 }}>
                          <Typography
                            variant="h4"
                            className={classes.fontSize16}
                          >
                            {item.item_name}
                          </Typography>
                          <Box sx={{ pt: 3 }}>
                            <Typography color="gray">Price</Typography>
                            <Typography>
                              ₹ {item.item_price * item.cart_quantity}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={4}
                          className={classes.moveToWishListBox}
                          container
                          flexWrap="nowrap"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <Typography sx={{ fontSize: 15 }} color="gray">
                            Remove from cart
                          </Typography>
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ mx: 2 }}
                          />
                          <Button
                            startIcon={<DeleteOutlineIcon />}
                            className={classes.removeBtn}
                            onClick={() => {
                              deleteCartItem(item.cart_item_id);
                              // console.log(item);
                            }}
                          ></Button>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          container
                          flexWrap="nowrap"
                          alignItems="center"
                          justifyContent="flex-end"
                          className={classes.productBtnIncDec}
                        >
                          {/* <Button
                            disabled={item.itemCount <= 1}
                            // disabled={true}
                            variant="contained"
                            onClick={() => {
                              dispatch(decrement(item));
                            }}
                          >
                          </Button> */}
                          <Button
                            onClick={() =>
                              item.cart_quantity > 1
                                ? reduceCarQuantity(item.cart_item_id)
                                : {}
                            }
                          >
                            <RemoveOutlined
                              sx={{
                                mr: 3,
                                color: "orange",
                              }}
                            />
                          </Button>

                          <Button
                            // variant="contained"
                            sx={{
                              color: "teal",
                              backgroundColor: "orange",
                            }}
                            // onClick={() => {
                            //   handleAddCart(item.cart_item_id);
                            // }}
                          >
                            {item.cart_quantity}
                          </Button>
                          <Button
                            onClick={() =>
                              increaseCarQuantity(item.cart_item_id)
                            }
                          >
                            <AddOutlined
                              sx={{
                                ml: 3,
                                color: "orange",
                              }}
                            />
                          </Button>

                          {console.log(
                            total.push(item.cart_quantity * item.item_price)
                          )}
                        </Grid>
                      </Grid>
                    );
                  })}
                {/* <Box style={{ marginLeft: "50%" }}>
                  <Button variant="contained">Checkout</Button>
                  <Button variant="outlined" style={{ marginLeft: "10px" }}>
                    Total Amount = {'₹'}{totalAmount}
                  </Button>
                </Box> */}
                {/* <Payment value={totalAmount.toString()} /> */}
              </Grid>
            </Grid>
            {/*   order summary ui else chages you can dis card accordingly of merge connflicts in this push */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={5} sx={{ px: 1 }}>
              <Grid container className={classes.boxStyle}>
                <Grid item xs={12}>
                  <Typography variant="h6">Order Summary</Typography>
                </Grid>
                <Grid item container sx={{ py: 2 }}>
                  <Grid item xs={6} md={6}>
                    <Typography sx={{ fontSize: 18 }} color="GrayText">
                      Product
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Typography
                      sx={{ fontSize: 18 }}
                      align="center"
                      color="GrayText"
                    >
                      Quantity
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Typography
                      sx={{ fontSize: 18 }}
                      align="end"
                      color="GrayText"
                    >
                      Amount
                    </Typography>
                  </Grid>
                </Grid>
                {cartData?.cart_items?.map((product) => {
                  return (
                    <Grid item container key={product.id}>
                      <Grid item xs={6} sx={{ pb: 1 }}>
                        <Typography>{product.item_name}</Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ pb: 1 }}>
                        <Typography align="center">
                          {product.cart_quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ pb: 1 }}>
                        <Typography align="end">
                          {"₹"} {product.item_price * product.cart_quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}

                <Grid
                  item
                  xs={12}
                  container
                  sx={{
                    borderTop: "1px solid #e6e6e6",
                    borderBottom: "1px solid #e6e6e6 ",
                    py: 1,
                    my: 1,
                  }}
                >
                  <Grid item xs={9}>
                    <Typography>Sub Total</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="end">
                      {"₹"}
                      {totalAmount}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  sx={{
                    borderBottom: "1px solid #e6e6e6 ",
                    py: 3,
                  }}
                >
                  <Grid item xs={9}>
                    <Typography>Delivery Charges</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="end">{"₹"}30</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} container sx={{ py: 3 }}>
                  <Grid item xs={9}>
                    <Typography variant="h6">Total Amount</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="end" variant="h6">
                      {"₹"}
                      {totalAmount + 30}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2 }}>
                <Button
                  onClick={() => navigate("/home/check-out/")}
                  fullWidth
                  className={classes.btncontainedPrimary}
                >
                  Proceed
                </Button>
              </Grid>
            </Grid>
            {/*  order summary ui else chages you can dis card accordingly  */}
          </Grid>
        </Grid>
      ) : (
        <Grid
          className={classes.boxStyle}
          style={{ margin: "auto" }}
          item
          xs={8}
          sm={8}
          md={6}
          lg={5}
          xl={4}
          container
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: "16px" }}
          >
            <Box
              component="img"
              style={{ width: "200px", height: "200px" }}
              src={NoCartItemIcon}
            />
            <Typography variant="h4" color="primary">
              Your cart is empty
            </Typography>
            <Typography>
              Looks like you haven’t added anything to your cart yet !
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/home");
              }}
              className={classes.btncontainedPrimary}
            >
              Browse Products
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  mainDivMiddle: {
    // minHeight: "100vh",
    minHeight: "calc(100vh - 320px)",
    backgroundColor: "#FCFCFC",
    // padding: 5,
    zIndex: -1,
    marginTop: "4px",
  },
  boxStyle: {
    marginTop: "20px",
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  btncontainedPrimary: {
    fontSize: "16px",
    color: "#fff",
    background: theme.palette.primary.main,
    textTransform: "none",
    borderRadius: "24px",
    boxShadow: "none",
    letterSpacing: "1px",
    "&:hover": {
      boxShadow: "none",
      background: theme.palette.primary.main,
    },
  },
  cartProductBox: {
    position: "relative",
    borderBottom: "2px solid #e6e6e6",
    padding: "0px 0px 16px 0px",
    marginBottom: "24px",
  },
  removeBtn: {
    textTransform: "none",
  },
  productBtnIncDec: {
    position: "absolute",
    margin: "16px",
    right: 0,
    bottom: "1px",
    padding: "10px",
  },
  imgProduct: {
    border: "1px solid #e6e6e6 ",
  },
  [theme.breakpoints.down("md")]: {
    moveToWishListBox: {
      order: "-1",
      justifyContent: "flex-start",
      margin: "12px 0px",
    },
    fontSize16: {
      fontSize: "12px",
      fontWeight: 500,
    },
  },
  [theme.breakpoints.down("sm")]: {
    imgProduct: {
      width: "120px",
      height: "140px",
    },
  },
  [theme.breakpoints.between("sm", "md")]: {
    productBtnIncDec: {
      justifyContent: "flex-start",
      background: "khaki",
    },
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {
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
    removeCartItem: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.removeCartItem(data, successCallBack, failureCallBack)
      ),
  };
};

export default connect(null, mapDispatchToProps)(Cart);
