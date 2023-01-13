import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  Select,
  Dialog,
  DialogTitle,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PinIcon from "@mui/icons-material/Pin";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import HouseIcon from "@mui/icons-material/House";
import BusinessIcon from "@mui/icons-material/Business";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import * as CONST from "../../utils/Constants";
import * as VALIDATORS from "../../utils/Validators";

import { Field } from "../../components/StyledComponents/StyledComponents ";

import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { State, City } from "country-state-city";

import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import AlertDialog from "../../components/Dialogue/AlertDialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useRazorpay from "react-razorpay";

const RAZORPAY_KEY_ID = {
  api_key: "rzp_test_uVZMHUnUEITtyq", //rzp_test_EdEbmtYymvGMIQ
  secret_key: "RN7gHLothBwpMPjGMbABFGbT",
};

const CheckOut = ({ getCartItems, placeOrder }) => {
  const classes = useStyles();
  const params = useParams();
  // console.log("prama", params);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const cartCount = useSelector((state) => state.cartReducer.cartCount);
  // const totalAmount = useSelector((state) => state.cartReducer.totalAmount);
  const [cartData, setCartData] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  //state for storing get data
  const [userAddresses, setUserAddresses] = useState([]);

  const succesCallback = (res) => {
    setUserAddresses(res?.data?.data);
  };

  useEffect(() => {
    GetCartItems();
    dispatch({ type: CONST.GET_USER_ADDRESSESS, succesCallback });
  }, []);
  console.log(cartProducts);

  //state to openAddress dialog
  const [openAddress, setOpenAddress] = useState(false);

  //state to store Checkout screen address details
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    state: "Select State",
    city: "Select City",
    flatNo: "",
    area: "",
    addressType: "",
    id: "",
  });

  //state to handle Error
  const [nameReqErr, setNameReqErr] = useState(false);
  const [phoneReqErr, setPhoneReqErr] = useState(false);
  const [pinReqErr, setPinReqErr] = useState(false);
  const [stateReqErr, setStateReqErr] = useState(false);
  const [cityReqErr, setCityReqErr] = useState(false);
  const [flatReqErr, setFlatReqErr] = useState(false);
  const [areaReqErr, setAreaReqErr] = useState(false);

  const [invalidPhoneErr, setInvalidPhoneErr] = useState(false);
  const Razorpay = useRazorpay();

  //variable for state and cities
  let indianStates = State.getStatesOfCountry("IN");
  const stateObj = indianStates.filter(
    (state) => state.name === addressDetails?.state
  );
  const cities = City.getCitiesOfState("IN", stateObj[0]?.isoCode);

  //function to handle onchage field events
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  // function on cliking add address
  const onAddressAdd = () => {
    const {
      fullName,
      phoneNumber,
      pincode,
      state,
      city,
      flatNo,
      area,
      addressType,
    } = addressDetails;

    if (VALIDATORS.checkLength(fullName)) {
      setNameReqErr(true);
    }

    if (VALIDATORS.checkLength(phoneNumber)) {
      setPhoneReqErr(true);
    } else if (!VALIDATORS.isMobile(phoneNumber)) {
      setInvalidPhoneErr(true);
    }

    if (VALIDATORS.checkLength(pincode)) {
      setPinReqErr(true);
    }

    if (state === "Select State") {
      setStateReqErr(true);
    }

    if (city === "Select City") {
      setCityReqErr(true);
    }

    if (VALIDATORS.checkLength(flatNo)) {
      setFlatReqErr(true);
    }

    if (VALIDATORS.checkLength(area)) {
      setAreaReqErr(true);
    } else if (
      !VALIDATORS.checkLength(fullName) &&
      !VALIDATORS.checkLength(flatNo) &&
      VALIDATORS.isMobile(phoneNumber) &&
      !VALIDATORS.checkLength(pincode) &&
      city !== "Select City" &&
      state !== "Select State"
    ) {
      dispatch({
        type: CONST.CREATE_USER_ADDRESS,
        payload: addressDetails,
        close: setOpenAddress,
        succesCallback: succesCallback,
      });
    }
  };

  const {
    fullName,
    phoneNumber,
    pincode,
    state,
    city,
    flatNo,
    area,
    addressType,
  } = addressDetails;

  //static array for product summary listing
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
          res.cart_items
        );
        // setItemsIncart(res.cart_items.length);
        setCartData(res);
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
  console.log(cartProducts);

  const handleChange = (e) => {
    console.log(e.target.value);
    setPaymentType(e.target.value);
  };

  const checkValidations = () => {
    // console.log(paymentType);
    if (paymentType) {
      // alert('Hi', paymentType)
      console.log("Before", paymentType);
      if (paymentType) {
        setConfirmationModal(true);
      }
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          severity: "error",
          message: "please select payment method",
        },
      });
    }
  };

  let cart_items_price = 0;
  cart_items_price = cartData?.cart_items.map(
    (item, index) => item.item_price * item.cart_quantity + cart_items_price
  );

  const totalAmount = cart_items_price?.reduce((index, value) => {
    return index + value;
  }, 0);

  const createOrder = () => {
    // alert('Hi')
    let data = {
      total: totalAmount + 30,
      delivery_charges: 30,
      // deliveryOption: deliveryOption,
      // delivery_addreess: deliveryOption == 'home' ? defaultAddress : ''
    };

    setTimeout(() => {
      setConfirmationModal(false);
    }, 1000);

    setTimeout(() => {
      if (paymentType == "net_banking") {
        // callRazorPay(data.total);
        callRazorPay(data.total);
      } else if (paymentType == "cash") {
        let data = {
          razorpay_payment_id: "cash",
        };
        verifyRazorPay(data);
      }
    }, 1500);

    // if (paymentType) {
    //   placeOrder(data)
    //   dispatch({
    //     type: "SHOW_TOAST",
    //     payload: {
    //       severity: "scuess",
    //       message: "Order Place Successfully",
    //     },
    //   });
    //   WToast.show({ data: "Order Place Successfully" });
    //   // props.emptyCart(),
    //   navigate('/home/profile/my-order')

    // }
  };

  const callRazorPay = async (total) => {
    // const { email, full_name, full_phone_number } = props.profileData;
    // console.log('props.profileData',props.profileData)
    // const options1 = {
    //   key: "rzp_test_EdEbmtYymvGMIQ",
    //   amount: value * 100,
    //   currency: "INR",
    //   name: "Acme Corp",
    //   description: "Test Transaction",
    //   image: "https://example.com/your_logo",
    //   // order_id: 12,
    //   handler: (res) => {
    //     console.log("sdjkfhkf", res);
    //   },
    //   prefill: {
    //     name: "Piyush Garg",
    //     email: "youremail@example.com",
    //     contact: "9999999999",
    //   },
    //   notes: {
    //     address: "Razorpay Corporate Office",
    //   },
    //   theme: {
    //     color: "#3399cc",
    //   },
    // };
    var options = {
      description: "Amount Payable (inclusive of all taxes)",
      //   image: 'https://i.imgur.com/3g7nmJC.png', // optional
      currency: "INR", // might take from api
      key: "rzp_test_EdEbmtYymvGMIQ", // Your api key
      amount: total * 100, // add amount from api
      name: "Protonshub",
      handler: (res) => {
        console.log("razorPay response", res);
        verifyRazorPay(res);
      },
      prefill: {
        // optional
        email: "Test@test.com",
        contact: "911234567890",
        name: "Test",
      },
      theme: { color: "#FFAA33" },
    };
    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response) {
      console.log(response.error);
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    const result = await rzpay.open();
    console.log("payment result ", result);
    // rzpay.open(options).then((data) => {
    //   // handle success
    //   console.log("razorpaysuccess", data)
    //   verifyRazorPay(data);
    // }).catch((error) => {
    //   // handle failure
    //   //   this.releaseMyBlockQuantity();
    //   console.log(`Error: ${error.code} | ${error.description}`);
    // });
  };

  const verifyRazorPay = async (razorpay_data) => {
    // alert(razorpay_data);
    // let data = {
    //     product: props.cartList,
    //     // total: props.total + 19 + 14 + props.delivery_tip,
    //     total: 50,
    //     delivery_tip: props.delivery_tip,
    //     deliveryOption: deliveryOption,
    //     delivery_addreess: deliveryOption == 'home' ? defaultAddress : ''
    // }
    const user_id = await JSON.parse(localStorage.getItem("userId"));
    let data = {
      amount: totalAmount + 30,
      currency: "INR",
      receipt: razorpay_data?.razorpay_payment_id,
      user_id: user_id,
    };

    placeOrder(
      data,
      (res) => successCallBack(res),
      (err) => failureCallBack(err)
    );
  };
  const successCallBack = (res) => {
    console.log("RES PLACE ORDER ==>", res);
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        severity: "success",
        message: "Order Place Successfully",
      },
    });
    // WToast.show({ data: "Order Place Successfully" });
    // props.emptyCart(),

    // setTimeout(() => {
    //   // handleDisplayNotification()
    // }, 2000);
    navigate("/home/profile/my-order");
  };
  const failureCallBack = (err) => {};

  return (
    <Grid
      container
      className={classes.mainDivMiddle}
      justifyContent="center"
      alignItems="flex-start"
    >
      {/* when proced to checkout rending ui now */}

      <Grid item xs={12} sm={12} md={12} lg={11} xl={11}>
        <Grid container>
          <Grid item xs={12} sm={12} md={7} lg={8} xl={7} sx={{ px: 1 }}>
            <Grid container className={classes.boxStyle}>
              {/* //select payment mehtod container */}

              <Grid item xs={12} container sx={{ px: 2, py: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Payment method
                  </Typography>
                </Grid>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={handleChange}
                  value={paymentType}
                >
                  <FormControlLabel
                    value="net_banking"
                    control={<Radio />}
                    label="UPI / Card / Net Banking"
                  />
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h6">Addresses</Typography>
              </Grid>

              <Grid item xs={12} container>
                {userAddresses ? (
                  userAddresses?.map((item) => (
                    <Grid item className={classes.savedAddCard} key={item.id}>
                      <Grid container flexWrap="nowrap" alignItems="center">
                        <LocationOnIcon sx={{ mr: 1, fontSize: 40 }} />
                        <Typography>
                          {item?.floor} {item?.complete_address}{" "}
                          {item?.receiver_city} {item?.receiver_state}
                        </Typography>
                        <Checkbox
                          onClick={() => {
                            console.log("checked");
                          }}
                          disableRipple
                          className={classes.checkbx}
                        />
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <Grid
                    item
                    xs={12}
                    container
                    className={classes.savedAddCard}
                    direction="column"
                    alignItems="center"
                    sx={{ gap: 3 }}
                  >
                    <Typography>
                      No existing address is available right now.
                    </Typography>
                    <Button
                      variant="contained"
                      className={classes.btnOutlinedPrimary}
                      onClick={() => setOpenAddress(true)}
                    >
                      Add New Address
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* Order summary container */}
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
                onClick={
                  () => checkValidations()
                  // navigate("/home/check-out/")
                }
                fullWidth
                className={classes.btncontainedPrimary}
              >
                Proceed
              </Button>
              {confirmationModal && (
                <div>
                  <Dialog
                    open={confirmationModal}
                    // onClose={setConfirmationModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    {/* {props.title && (
                    <>
                      {" "} */}
                    <DialogTitle
                      id="alert-dialog-title"
                      sx={{ textAlign: "center" }}
                    >
                      {/* {props.title} */}
                      {"Confirmation!"}
                    </DialogTitle>
                    <Divider />
                    {/* </>
                  )} */}

                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {/* {props.description} */}
                        Are you sure want to place the order?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="outlined"
                        className={classes.btnOutlinedPrimary}
                        onClick={() => setConfirmationModal(false)}
                      >
                        {"Cancel"}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btncontainedPrimary}
                        // onClick={handleClose}
                        onClick={() => {
                          createOrder();
                          //   if (props.actionLogOut === "Delete") {
                          //     dispatch({
                          //       type: CONST.DELETE_ADDRESS,
                          //       itemId: props.itemId,
                          //       succesCallback: props.succesCallback,
                          //     });
                          //     props.dialogFun();
                          //   } else {
                          //     localStorage.removeItem("userId");
                          //     navigate("/");
                          //   }
                        }}
                      >
                        {"Confirm"}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Add address Dialog */}
      {openAddress && (
        <Dialog
          open={openAddress}
          onClose={() => {
            // setAddressType("");
            setOpenAddress(false);
          }}
        >
          <CloseIcon
            onClick={() => setOpenAddress(false)}
            className={classes.closeIconStyle}
          />
          <DialogTitle>Add address</DialogTitle>
          <Divider />
          <Grid
            container
            style={{ padding: "32px 40px", gap: "16px" }}
            // sx={{ px: 5, py: 4 }}
            // direction="column"
            // rowGap={2}
          >
            <Grid item xs={12}>
              <Field
                fullWidth
                name="fullName"
                placeholder="Full Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleOnChange}
              />
              {nameReqErr && fullName.length === 0 && (
                <Typography className={classes.ErrorText}>
                  Name Required!
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Field
                sx={{ borderRadius: 2 }}
                fullWidth
                type="number"
                name="phoneNumber"
                placeholder="Phone number"
                onFocus={() => setInvalidPhoneErr(false)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleOnChange}
              />
              {phoneReqErr && phoneNumber.length === 0 && (
                <Typography className={classes.ErrorText}>
                  Phone Required!
                </Typography>
              )}
              {invalidPhoneErr && (
                <Typography className={classes.ErrorText}>
                  Invalid phone number!
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6}>
                  <Field
                    style={{ display: "inline-flex" }}
                    // fullWidth
                    name="pincode"
                    placeholder="Pincode"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PinIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleOnChange}
                  />
                  {pinReqErr && pincode.length === 0 && (
                    <Typography className={classes.ErrorText}>
                      Pin Required!
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    className={classes.btnOutlinedPrimary}
                    startIcon={<GpsFixedIcon />}
                  >
                    Use my location
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Select
                    className={classes.seletctMuiStyle}
                    value={addressDetails.state}
                    IconComponent={KeyboardArrowDownIcon}
                    onChange={handleOnChange}
                    name="state"
                    // onChange={(e) => {
                    //   console.log("select event", e.target.value);
                    //   setAddressDetails({
                    //     ...addressDetails,
                    //     state: e.target.value,
                    //   });
                    // }}
                  >
                    <MenuItem value="Select State" disabled>
                      Select State
                    </MenuItem>
                    {indianStates.map((state) => (
                      <MenuItem value={state.name}>{state.name}</MenuItem>
                    ))}
                  </Select>
                  {stateReqErr && state === "Select State" && (
                    <Typography className={classes.ErrorText}>
                      Select state
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Select
                    className={classes.seletctMuiStyle}
                    IconComponent={KeyboardArrowDownIcon}
                    name="city"
                    value={addressDetails.city}
                    onChange={handleOnChange}
                  >
                    <MenuItem value="Select City" disabled>
                      Select City
                    </MenuItem>
                    {cities.map((city) => (
                      <MenuItem value={city.name}>{city.name}</MenuItem>
                    ))}
                    {/* <MenuItem value="Indore">Indore</MenuItem>
                      <MenuItem value="Bhopal">Bhopal</MenuItem> */}
                  </Select>
                  {cityReqErr && city === "Select City" && (
                    <Typography className={classes.ErrorText}>
                      Select city
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Field
                sx={{ borderRadius: 2 }}
                fullWidth
                name="flatNo"
                placeholder="Flat No. / House No. / Appartment No."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleOnChange}
              />
              {flatReqErr && flatNo.length === 0 && (
                <Typography className={classes.ErrorText}>
                  Flat No. / House No. Requiured!
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Field
                sx={{ borderRadius: 2 }}
                fullWidth
                name="area"
                placeholder="Road name, Area, Colony"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleOnChange}
              />
              {areaReqErr && area.length === 0 && (
                <Typography className={classes.ErrorText}>
                  Area Requiured!
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} container ml={1} rowGap={1}>
              <Grid item xs={12}>
                <Typography>Type of Address</Typography>
              </Grid>

              <Grid container columnGap={2}>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={2}
                  lg={2}
                  xl={2}
                  container
                  alignItems="center"
                  className={classes.chipStyle}
                  onClick={() =>
                    setAddressDetails({
                      ...addressDetails,
                      addressType: "home",
                    })
                  }
                  // onClick={handleOnChange("home")}
                  style={{
                    background:
                      addressDetails.addressType == "home" &&
                      CONST.primaryColor,
                    color: addressDetails.addressType == "home" && "#fff",
                  }}
                >
                  <HouseIcon />
                  <Typography>Home</Typography>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={2}
                  lg={2}
                  xl={2}
                  container
                  alignItems="center"
                  className={classes.chipStyle}
                  onClick={() =>
                    setAddressDetails({
                      ...addressDetails,
                      addressType: "work",
                    })
                  }
                  style={{
                    background:
                      addressDetails.addressType == "work" &&
                      CONST.primaryColor,
                    color: addressDetails.addressType == "work" && "#fff",
                  }}
                >
                  <BusinessIcon />
                  <Typography>Work</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Button
                variant="contained"
                className={classes.btncontainedPrimary}
                fullWidth
                onClick={onAddressAdd}
              >
                Add address
              </Button>
            </Grid>
          </Grid>
        </Dialog>
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
  btnOutlinedPrimary: {
    fontSize: "16px",
    color: "#000",
    // background: "#fff",
    background: "	#f8f8ff",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    textTransform: "none",

    "&:hover": {
      boxShadow: "none",
      background: "#f8f8ff",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  selectAddress: {
    textDecoration: "underLine",
    cursor: "pointer",
    "&:hover": {
      fontWeight: 500,
    },
  },
  addressCheckOutFields: {
    width: "100%",
    padding: "4px 10px",
    margin: "10px 0px",
    border: "1px solid #e6e6e6",
    borderRadius: "4px",
  },
  fieldDiv: {
    padding: "8px 16px",
  },
  seletctMuiStyle: {
    width: "100%",
    padding: "0px 10px",
    margin: "10px 0px",
    border: "1px solid #e6e6e6",
    borderRadius: "4px",
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused": {
      border: "1px solid #e6e6e6",
      color: "#000",
    },
    "&:hover": {
      // border: "1px solid grey",
    },
    "& .MuiSelect-select": {
      padding: "12px",
      color: "#8e8e8e",
    },
  },
  closeIconStyle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
  savedAddCard: {
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  checkbx: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  },

  [theme.breakpoints.down("md")]: {
    fontSize16: {
      fontSize: "12px",
      fontWeight: 500,
    },
  },

  [theme.breakpoints.between("sm", "md")]: {
    productBtnIncDec: {
      justifyContent: "flex-start",
      //   background: "khaki",
    },
  },
}));
const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.getCartItems(data, successCallBack, failureCallBack)
      ),
    placeOrder: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.placeOrder(data, successCallBack, failureCallBack)),
  };
};
export default connect(null, mapDispatchToProps)(CheckOut);
