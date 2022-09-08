import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import COLOR_CONST from "../../../app/theme/ColorConstants";
import * as IMG_CONST from "../../theme/ImageConstants";
import { HelpCenterList } from "../../theme/constants";
import GreenButton from "../../components/GreenButton";
import styles from "./ConfirmOrderScreenStyle";
import * as Animatable from "react-native-animatable";
import { verticalScale } from "../../utils/Scale";
import R from "../../R";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import * as commonActions from "../../redux/actions/commonActions";
import * as profileActions from "../../redux/actions/profileActions";
import * as cartActions from "../../redux/actions/cartActions";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";
import RazorpayCheckout from "react-native-razorpay";
import LinearGradient from "react-native-linear-gradient";
import { NativeModules } from "react-native";
import scale from "../../utils/Scale";
import LoadingImage from "react-native-image-progress";
import CachedImage from "../../components/CachedImage";
// const AllInOneSDKManager = NativeModules.AllInOneSDKManager;
const RAZORPAY_KEY_ID = "rzp_live_sq8uX7xOFexexb";
// const RAZORPAY_KEY_ID = 'rzp_test_8aMzYqhFlbaHYA';

// const delivery_slots = [
//   {
//     id: 1,
//     date: "5 May 2021",
//     slot: [
//       { time: "6 AM - 9 AM", active: true },
//       { time: "9 AM - 12 PM", active: true },
//       { time: "12 PM - 3 PM", active: false },
//       { time: "3 PM - 6 PM", active: true },
//       { time: "6 PM - 9 PM", active: true },
//     ],
//   },
//   {
//     id: 4,
//     date: "6 May 2021",
//     slot: [{ time: "6 AM - 9 AM", active: true }],
//   },
// ];
class ConfirmOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myOrderList: [],
      productList: [],
      addressList: [],
      showCouponCodeModal: false,
      noProductFound: false,
      isFetchingData: true,
      cartQuantity: [],
      cartData: null,
      codeValue: "",
      isCouponApplied: false,
      isValidCoupon: false,
      finalAmount: 0,
      discountValue: 0,
      applyingCoupon: false,
      couponData: null,
      isPaymentOption1Selected: true,
      isPaymentOption2Selected: false,
      isPaymentOption3Selected: false,
      shippingAddressData: null,
      billingAddressData: null,
      shippingAddressSelected: false,
      billingAddressSelected: false,
      pincode: "",
      showModalForTimeslot: false,
      AvailableDeliverySlots: [],
      selectedDateForDelivery: [],
      selectedSlot: [],
      preselectedDateForDelivery: [],
      preselectedSlot: [],
    };
  }

  async componentDidMount() {
    let pincode = await AsyncStorage.getItem("pincode");
    if (pincode) {
      this.setState({
        pincode: pincode,
      });
    }

    this.setNavigationHeaderConfiguration();
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getCartData();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // });
    this.getAddressData();
    this.getDeliverySlotData();
    console.log(
      "@@@ CHECKOUT ==========",
      this.props.route.params.checkoutData
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  setModalVisible = (visible) => {
    this.setState({ showModalForTimeslot: visible });
  };

  getSlotDateContainerStyle = (data) => {
    if (data.date == this.state.preselectedDateForDelivery.date) {
      return styles.selecteddateContainerStyle;
    } else {
      return styles.unselecteddateContainerStyle;
    }
  };

  getSlotDateStyle = (data) => {
    if (data.date == this.state.preselectedDateForDelivery.date) {
      return styles.selecteddateTitleStyle;
    } else {
      return styles.unSelecteddateTitleStyle;
    }
  };

  getSlotTimeContainerStyle = (data) => {
    if (data.active == false) {
      return styles.disabledTimeslotContainerStyle;
    }
    if (data.time == this.state.preselectedSlot.time) {
      return styles.selectedTimeslotContainerStyle;
    } else {
      return styles.unselectedTimeslotContainerStyle;
    }
  };

  getSlotTimeStyle = (data) => {
    if (data.active == false) {
      return styles.disabledTimeslotTextStyle;
    }
    if (data.time == this.state.preselectedSlot.time) {
      return styles.selectedTimeslotTextStyle;
    } else {
      return styles.unselectedTimeslotTextStyle;
    }
  };

  resetTimeSlot = () => {
    this.setState({
      // preselectedDateForDelivery: this.state.AvailableDeliverySlots[0] ? this.state.AvailableDeliverySlots[0] : [],
      //     preselectedSlot: this.state.AvailableDeliverySlots[0] && this.state.AvailableDeliverySlots[0].slot.length != undefined
      //   && this.state.AvailableDeliverySlots[0].slot.length != 0 && this.state.AvailableDeliverySlots[0].slot[0] ? this.state.AvailableDeliverySlots[0].slot[0] : [],
      // selectedDateForDelivery: [],
      // selectedSlot: [],
    });
  };

  renderTimeslotModal = () => {
    const { showModalForTimeslot } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalForTimeslot}
        onRequestClose={() => {
          this.setModalVisible(!showModalForTimeslot);
        }}
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              top: Platform.OS === "ios" ? "38%" : "40%",
              flex: 1,
            }}
          >
            <View
              style={{
                height: Platform.OS === "ios" ? "62%" : "58%",
              }}
            >
              <Text style={styles.timeslotTitleStyle}>
                Select Delivery Slot
              </Text>

              <ScrollView
                style={{
                  flexDirection: "row",
                  maxHeight: scale(50),
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: COLOR_CONST.lightGreyText,
                }}
                horizontal
              >
                {this.state.AvailableDeliverySlots.map((data, i) => {
                  return (
                    <TouchableOpacity
                      key={i + "date"}
                      onPress={() => {
                        if (
                          data.date !=
                          this.state.preselectedDateForDelivery.date
                        )
                          this.setState({
                            preselectedDateForDelivery: data,
                            preselectedSlot: [],
                          });
                      }}
                      style={this.getSlotDateContainerStyle(data)}
                    >
                      <Text style={this.getSlotDateStyle(data)}>
                        {data.date}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: scale(10),
                  paddingLeft: scale(20),
                }}
              >
                {this.state.preselectedDateForDelivery &&
                  this.state.preselectedDateForDelivery.slot &&
                  this.state.preselectedDateForDelivery.slot.map((slot, i) => {
                    return (
                      <TouchableOpacity
                        key={i + "time"}
                        onPress={() => {
                          if (slot.active) {
                            this.setState({
                              preselectedSlot: slot,
                            });
                          }
                        }}
                        style={this.getSlotTimeContainerStyle(slot)}
                      >
                        <Text style={this.getSlotTimeStyle(slot)}>
                          {slot.time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>

              <View
                style={{
                  position: "absolute",
                  bottom: scale(10),
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.preselectedSlot.time == undefined) {
                      this.props.showErrorModal("Please select time!");
                      return;
                    }
                    this.setState({
                      selectedDateForDelivery: this.state
                        .preselectedDateForDelivery,
                      selectedSlot: this.state.preselectedSlot,
                    });
                    this.setModalVisible(!showModalForTimeslot);
                  }}
                >
                  <LinearGradient
                    colors={[
                      COLOR_CONST.primaryThemeGradient,
                      COLOR_CONST.secondaryThemeGradient,
                    ]}
                    style={[
                      styles.buttonStyle,
                      styles.loginButton,
                      {
                        opacity:
                          this.state.isPaymentOption1Selected ||
                          this.state.isPaymentOption2Selected
                            ? 1
                            : 0.5,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text style={[{ color: R.colors.white }, styles.loginText]}>
                      SELECT
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    this.resetTimeSlot();
                    this.setModalVisible(!showModalForTimeslot);
                  }}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  onPressBackButton = () => {
    this.releaseShippingChargeAddress();
  };

  getDeliverySlotData = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      userID: userID,
    };
    this.props.getDeliverySlotList(
      data,
      (res) => this.getDeliverySlotSuccessCallBack(res),
      (error) => this.getDeliverySlotFailureCallBack(error)
    );
  };

  getDeliverySlotSuccessCallBack = (res) => {
    if (
      res.data &&
      res.data.delivery_slots.length != undefined &&
      res.data.delivery_slots.length != 0
    ) {
      this.setState({
        AvailableDeliverySlots: res.data.delivery_slots,
        preselectedDateForDelivery: res.data.delivery_slots[0]
          ? res.data.delivery_slots[0]
          : [],
        // preselectedSlot: res.data.delivery_slots[0] && res.data.delivery_slots[0].slot.length != undefined
        // && res.data.delivery_slots[0].slot.length!=0 && res.data.delivery_slots[0].slot[0] ? res.data.delivery_slots[0].slot[0] : [],
      });
    }
    console.log(
      "@@@ Get Delivery Slot Success CallBack ===================",
      res.data
    );
  };

  getDeliverySlotFailureCallBack = (error) => {
    this.setState({ isFetchingData: false });
    console.log("@@@ Get Delivery Slot Failure CallBack ===================");
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  getAddressData = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      userID: userID,
    };
    this.props.getAddressList(
      data,
      (res) => this.getAddressListSuccessCallBack(res),
      (error) => this.getAddressListFailureCallBack(error)
    );
  };

  getAddressListSuccessCallBack = (res) => {
    let addressData = null;
    this.setState(
      {
        addressList: res.data.length === 0 ? [] : res.data,
      },
      () => {
        let localAddressList = this.state.addressList;
        let selectedAddressIndex = localAddressList.findIndex(
          (item) => item.is_default === true
        );
        if (selectedAddressIndex !== -1)
          addressData = localAddressList[selectedAddressIndex];
        this.setState(
          { shippingAddressData: addressData, billingAddressData: addressData },
          () => {
            this.calculateShippingChargeAddress(addressData);
          }
        );
      }
    );
    console.log(
      "@@@ Get Address List Success CallBack ===================",
      addressData
    );
  };

  getAddressListFailureCallBack = (error) => {
    this.setState({ isFetchingData: false });
    console.log("@@@ Get Address List Failure CallBack ===================");
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  saveAddress = async () => {
    if (!this.state.shippingAddressData) {
      this.props.showErrorModal("Please select shipping address!");
      return;
    }
    if (!this.state.billingAddressData) {
      this.props.showErrorModal("Please select billing address!");
      return;
    }

    if (
      !this.state.selectedDateForDelivery.date ||
      !this.state.selectedSlot.time
    ) {
      this.props.showErrorModal("Please select delivery slot!");
      return;
    }

    if (this.state.shippingAddressData.zip_code != this.state.pincode) {
      this.props.showErrorModal(
        "Order will be shipped to this pincode: " +
          this.state.shippingAddressData.zip_code,
        false
      );
      // setTimeout(async() => {
      //   this.props.hideErrorModal();
      // }, 2000);
    }

    let userID = await AsyncStorage.getItem("USER_ID");
    let finalData = {
      delivery_address_id: this.state.shippingAddressData.id,
      billing_address_id: this.state.billingAddressData.id,
      userID: userID,
      cartId: this.props.cartData.order.id,
      billing_same_as_shipping: false,
    };
    this.props.addAddressForOrder(
      finalData,
      (res) => this.addAddressForOrderSuccessCallBack(res, finalData),
      (error) => this.addAddressForOrderFailureCallBack(error)
    );
  };

  addAddressForOrderSuccessCallBack = (res, finalData) => {
    console.log(
      "@@@ Add Address To Order Success CallBack ===================",
      res
    );
    this.checkZipcodeAvailability();
  };

  addAddressForOrderFailureCallBack = (error) => {
    console.log(
      "@@@ Add Address To Order Failure CallBack ==================="
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  handleBackButtonClick = () => {
    // this.props.navigation.goBack();
    this.releaseShippingChargeAddress();
    return true;
  };

  getCartData = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    this.props.showCartData(
      data,
      (res) => this.showCartDataSuccessCallBack(res),
      (error) => this.showCartDataFailureCallBack(error)
    );
  };

  showCartDataSuccessCallBack = (res) => {
    let localCartValue = [];
    console.log("@@@ Show Cart Data Success CallBack ===================", res);
    let cartData = res.order;
    this.setState(
      {
        myOrderList: cartData.order_items,
        cartData: cartData,
        finalAmount: cartData.total,
      },
      () => {
        if (cartData.coupon) {
          this.setState({
            couponData: cartData.coupon,
            isCouponApplied: true,
            isValidCoupon: true,
            codeValue: cartData.coupon.code,
            discountValue: cartData.applied_discount,
          });
        }
        this.state.myOrderList.map((item) => {
          localCartValue.push({
            id: item.id,
            quantity: item.quantity,
          });
        });
        this.setState({ cartQuantity: localCartValue });
        if (this.state.myOrderList.length === 0) {
          this.setState({ noProductFound: true });
        } else {
          this.setState({ isFetchingData: false });
        }
      }
    );
  };

  showCartDataFailureCallBack = (error) => {
    console.log(
      "@@@ Show Cart Data Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.setState({ noProductFound: true });
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  onUpdateCartValue = (isAdd, index, item) => {
    let localCarts = this.state.cartQuantity;
    let selectedCart = localCarts.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    let value = localCarts[selectedCart].quantity;
    if (isAdd) {
      value = value + 1;
      localCarts[selectedCart].quantity = value;
      this.setState({ cartQuantity: localCarts });
      this.onChangeCartValue(value, item, isAdd);
    } else {
      value = value - 1;
      if (value < 0) {
        return;
      }
      localCarts[selectedCart].quantity = value;
      this.setState({ cartQuantity: localCarts });
      this.onChangeCartValue(value, item, isAdd);
    }
  };

  onChangeCartValue = (value, item, isAdd) => {
    if (isAdd) {
      if (item.quantity) {
        this.updateQuantiyInCart(value, item);
      } else {
        this.onAddToCart(value, item);
      }
    } else {
      if (value === 0) {
        this.onRemoveFromCart(value, item);
      } else {
        this.updateQuantiyInCart(value, item);
      }
    }
  };

  onAddToCart = async (value, item) => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.product.id,
      quantity: value,
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    console.log("@@@ onAdd Data ==========", data);
    this.props.addToCart(
      data,
      (res) => this.addToCartSuccessCallBack(res),
      (error) => this.addToCartFailureCallBack(error)
    );
  };

  addToCartSuccessCallBack = (res) => {
    console.log("@@@ Add to Cart Success CallBack ===================", res);
    this.getCartData();
  };

  addToCartFailureCallBack = (error) => {
    this.getCartData();
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  onRemoveFromCart = async (value, item) => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.product.id,
      quantity: value,
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    console.log("@@@ onRemove Data ==========", data);
    this.props.removeFromCart(
      data,
      (res) => this.removeFromCartSuccessCallBack(res),
      (error) => this.removeFromCartFailureCallBack(error)
    );
  };

  removeFromCartSuccessCallBack = (res) => {
    console.log("@@@ Remove From Cart Success CallBack ===================");
    this.getCartData();
  };

  removeFromCartFailureCallBack = (error) => {
    this.getCartData();
    if (error) {
      setTimeout(() => {
        // this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  updateQuantiyInCart = async (value, item) => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.product.id,
      quantity: value,
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    console.log("@@@ onUpdateQuantity Data ==========", data);
    this.props.updateQuantiyInCart(
      data,
      (res) => this.updateQuantiyInCartSuccessCallBack(res),
      (error) => this.updateQuantiyInCartFailureCallBack(error)
    );
  };

  updateQuantiyInCartSuccessCallBack = (res) => {
    console.log(
      "@@@ Update quantity in Cart Success CallBack ==================="
    );
    this.getCartData();
  };

  updateQuantiyInCartFailureCallBack = (error) => {
    this.getCartData();
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  onChangeCoupon = () => {
    console.log("@@@ state ========", this.state.cartData);
    this.setState({
      finalAmount: this.state.cartData.total,
      discountValue: 0,
      isCouponApplied: false,
      isValidCoupon: false,
    });
  };

  applyCoupon = () => {
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      cart_value: this.state.cartData.sub_total,
      code: this.state.codeValue,
      cart_id: this.props.cartData.order.id,
    };
    this.setState({ applyingCoupon: true });
    console.log("@@@ apply Coupon Data ==========", data);
    this.props.applyCoupon(
      data,
      (res) => this.applyCouponSuccessCallBack(res),
      (error) => this.applyCouponFailureCallBack(error)
    );
  };

  applyCouponSuccessCallBack = (res) => {
    console.log(
      "@@@ Apply Coupon Cart Success CallBack ===================",
      res
    );
    let couponData = res.data;
    this.setState(
      { isCouponApplied: true, isValidCoupon: true, applyingCoupon: false },
      () => {
        setTimeout(() => {
          this.setState({ showCouponCodeModal: false }, async () => {
            let userID = await AsyncStorage.getItem("USER_ID");
            let data = {
              uuid: DeviceInfo.getUniqueId(),
              userID: userID,
              cartId: this.props.cartData.order.id,
            };
            this.props.showCartData(
              data,
              (res) => this.showCartDataSuccessCallBack(res),
              (error) => this.showCartDataFailureCallBack(error)
            );
          });
        }, 2000);
      }
    );
  };

  applyCouponFailureCallBack = (error) => {
    console.log("@@@ Apply Coupon Cart Failure CallBack ===================");
    if (error) {
      this.setState({ applyingCoupon: false });
      this.setState({
        isValidCoupon: false,
        isCouponApplied: true,
        finalAmount: this.state.cartData.sub_total,
      });
    } else {
      setTimeout(() => {
        this.setState({ applyingCoupon: false });
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  checkOrderItemAvailability = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      cartId: this.props.cartData.order.id,
      userID: userID,
    };
    this.props.checkOrderItemAvailability(
      data,
      (res) => this.checkOrderItemAvailabilitySuccessCallBack(res),
      (error) => this.checkOrderItemAvailabilityFailureCallBack(error)
    );
  };

  checkOrderItemAvailabilitySuccessCallBack = (res) => {
    this.placeOrder();
    console.log(
      "@@@ Check Product Availability Success CallBack ===================",
      res
    );
    // this.onConfirmingOrder();
  };

  checkOrderItemAvailabilityFailureCallBack = (error) => {
    console.log(
      "@@@ Check Product Availability Failure CallBack ==================="
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  checkZipcodeAvailability = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
      zipcode: this.state.shippingAddressData.zip_code,
    };
    this.props.checkZipcodeAvailability(
      data,
      (res) => this.checkZipcodeAvailabilitySuccessCallBack(res),
      (error) => this.checkZipcodeAvailabilityFailureCallBack(error)
    );
  };

  checkZipcodeAvailabilitySuccessCallBack = (res) => {
    this.onConfirmingOrder();
    // this.checkOrderItemAvailability();
    console.log(
      "@@@ Check Product Availability Success CallBack ===================",
      res
    );
  };

  checkZipcodeAvailabilityFailureCallBack = (error) => {
    console.log(
      "@@@ Check Product Availability Failure CallBack ==================="
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  releaseMyBlockQuantity = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      cartId: this.props.cartData.order.id,
      userID: userID,
    };
    this.props.releaseMyBlockQuantity(
      data,
      (res) => this.releaseMyBlockQuantitySuccessCallBack(res),
      (error) => this.releaseMyBlockQuantityFailureCallBack(error)
    );
  };

  releaseMyBlockQuantitySuccessCallBack = (res) => {
    console.log(
      "@@@ Release My Block Quantity Success CallBack ===================",
      res
    );
  };

  releaseMyBlockQuantityFailureCallBack = (error) => {
    console.log(
      "@@@ Release My Block Quantity Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  confirmPaytmPayment = (orderId) => {
    let data = {
      order_id: orderId,
    };
    this.props.confirmPaytmPayment(
      data,
      (res) => this.confirmPaytmPaymentSuccessCallBack(res),
      (error) => this.confirmPaytmPaymentFailureCallBack(error)
    );
  };

  confirmPaytmPaymentSuccessCallBack = (res) => {
    this.props.navigation.replace("NewCardScreen", {
      orderSuccess: true,
      orderData: res.data,
    });
    console.log(
      "@@@ Confirm Paytm Payment Success CallBack ===================",
      res
    );
  };

  confirmPaytmPaymentFailureCallBack = (error) => {
    console.log(
      "@@@ Confirm Paytm Payment Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  onPayTmResponse = (resp, orderId) => {
    console.log("@@@ ON PAYTM RESPONSE ==============", resp);
    if (resp === "onBackPressedCancelTransaction") {
      setTimeout(() => {
        this.props.showErrorModal("Transaction Cancelled.");
        setTimeout(() => {
          this.props.hideErrorModal();
          this.releaseMyBlockQuantity();
        }, 3000);
      }, 0);
      return;
    } else if (resp === "networkNotAvailable") {
      setTimeout(() => {
        this.props.showErrorModal("Network Not Available.");
        setTimeout(() => {
          this.props.hideErrorModal();
          this.releaseMyBlockQuantity();
        }, 3000);
      }, 0);
      return;
    }

    let status = "";
    const response = resp;
    if (resp.includes("STATUS=TXN_SUCCESS")) {
      status = "TXN_SUCCESS";
    } else {
      status = "TXN_FAILURE";
    }
    console.log("@@@ PAYTM STATUS =============", status);
    if (Platform.OS === "ios") {
      if (status && status === "TXN_SUCCESS") {
        // Payment succeed!
        this.confirmPaytmPayment(orderId);
      } else if (status && status === "TXN_FAILURE") {
        // Payment failure!
        setTimeout(() => {
          this.props.showErrorModal("Transaction Failed");
          setTimeout(() => {
            this.props.hideErrorModal();
            this.releaseMyBlockQuantity();
          }, 3000);
        }, 0);
      }
    } else {
      if (status && status === "TXN_SUCCESS") {
        // Payment succeed!
        this.confirmPaytmPayment(orderId);
      } else if (status && status === "TXN_FAILURE") {
        // Payment failure!
        setTimeout(() => {
          this.props.showErrorModal("Transaction Failed");
          setTimeout(() => {
            this.props.hideErrorModal();
            this.releaseMyBlockQuantity();
          }, 3000);
        }, 0);
      }
    }
  };

  runTransaction(paytmData, profileData) {
    console.log("@@@ Paytm Data ==========", paytmData);
    try {
      AllInOneSDKManager.startTransaction(
        paytmData.orderId,
        paytmData.mid,
        paytmData.txnToken,
        paytmData.amount,
        paytmData.callbackUrl,
        true,
        (res) => this.onPayTmResponse(res, paytmData.orderId)
      );
    } catch (error) {
      console.log("@@@ Paytm Error ==============", error);
    }
  }

  onConfirmingOrder = () => {
    Alert.alert(
      "Order Confirmation",
      "Are you sure want to place the order?",
      [
        {
          text: "Cancel",
          onPress: () => {
            // this.releaseMyBlockQuantity()
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.props.hideErrorModal();
            this.checkOrderItemAvailability();
            // this.placeOrder();
          },
        },
      ],
      { cancelable: false }
    );
  };

  paytmPayment = () => {
    let data = {
      cart_id: this.props.cartData.order.id,
      is_gift: false,
      schedule_time: "",
    };
    this.props.paytmPayment(
      data,
      (res) => this.paytmPaymentSuccessCallBack(res),
      (error) => this.paytmPaymentFailureCallBack(error)
    );
  };

  paytmPaymentSuccessCallBack = (res) => {
    console.log("@@@ Paytm Payment Success CallBack ===================", res);
    let paytmData = res.data.response;
    let profileData = this.props.profileData;
    try {
      setTimeout(() => {
        this.runTransaction(paytmData, profileData);
      }, 1000);
    } catch (error) {
      console.log("@@@ Paytm Error ========", error);
    }
  };

  paytmPaymentFailureCallBack = (error) => {
    console.log(
      "@@@ Paytm Payment Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  placeOrder = () => {
    if (this.state.isPaymentOption1Selected) {
      let data = {
        cart_id: this.props.cartData.order.id,
        is_gift: false,
        schedule_time: "",
        delivery_slot: `${this.state.selectedDateForDelivery.date} | ${this.state.selectedSlot.time}`,
        delivery_timing_id: this.state.selectedSlot.delivery_timing_id
      };
      this.props.placeOrder(
        data,
        (res) => this.placeOrderSuccessCallBack(res),
        (error) => this.placeOrderFailureCallBack(error)
      );
    } else {
      const id = this.props.cartData.order.id;
      let orderData = new FormData();
      orderData.append("order_id", id);
      orderData.append("delivery_slot", `${this.state.selectedDateForDelivery.date} | ${this.state.selectedSlot.time}`,);
      orderData.append("delivery_timing_id", this.state.selectedSlot.delivery_timing_id);
      // here
      this.props.create_razorpays_payment(
        orderData,
        (res) => this.onSuccessRazorPayCreate(res),
        (error) => this.onFailureRazorPayCreate(error)
      );
    }
  };

  onSuccessRazorPayCreate = (res) => {
    const { total, razorpay_order_id } = res.data.order;
    console.log("@@@ Razorpay Create Success CallBack ============", res);
    this.callRazorPay(total, razorpay_order_id);
  };

  onFailureRazorPayCreate = (error) => {
    console.log("@@@ Razorpay Create Failure CallBack ============", error);
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  callRazorPay = (total, razorpay_order_id) => {
    const { email, name, phone_number } = this.props.profileData;
    let options = {
      description: "Amount Payable (inclusive of all taxes)",
      // image: 'https://i.imgur.com/3g7nmJC.png', // optional
      currency: `INR`, // might take from api
      key: RAZORPAY_KEY_ID, // Your api key
      amount: total * 100, // add amount from api
      order_id: razorpay_order_id,
      name: "Online Store",
      prefill: {
        // optional
        email: email,
        contact: phone_number,
        name: name,
      },
      theme: { color: COLOR_CONST.primaryThemeGradient }, // optional
    };
    console.log('@@@ Razorpay Options ==============', options);
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log("@@@ Razorpay Success =============", options, JSON.stringify(data));
        this.verifyRazorPay(data);
      })
      .catch((error) => {
        // handle failure
        this.releaseMyBlockQuantity();
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  verifyRazorPay = (razorPay_data) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = razorPay_data;
    let razorPayData = new FormData();
    razorPayData.append("razorpay_order_id", razorpay_order_id);
    razorPayData.append("razorpay_payment_id", razorpay_payment_id);
    razorPayData.append("razorpay_signature", razorpay_signature);
    this.props.varify_razorpay_signature(
      razorPayData,
      (res) => this.onVerifyRazorpaySuccess(res),
      (err) => this.onVerifyRazorpayFailure(err)
    );
  };

  onVerifyRazorpaySuccess = (res) => {
    // Add navigation here
    this.props.navigation.replace("NewCardScreen", {
      orderSuccess: true,
      orderData: res.data,
    });
  };

  onVerifyRazorpayFailure = (err) => {
    console.log("verify failure", err);
    this.releaseMyBlockQuantity();
    if (err) {
      setTimeout(() => {
        this.props.showErrorModal(err);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  placeOrderSuccessCallBack = (res) => {
    console.log("@@@ Place Order Success CallBack ===================", res);
    this.props.navigation.replace("NewCardScreen", {
      orderSuccess: true,
      orderData: res.data,
    });
  };

  placeOrderFailureCallBack = (error) => {
    console.log("@@@ Place Order Failure CallBack ===================", error);
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitleStyle}>Confirm Order</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.onPressBackButton()}
          style={styles.backButton}
        >
          <Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NotificationScreen")}
        >
          <Image
            source={
              this.props.showNotificationDot
                ? IMG_CONST.NOTFIY_ON
                : IMG_CONST.NOTIFICATIONS_ICON
            }
            style={styles.notifIcon}
          />
        </TouchableOpacity>
      ),
    });
  };

  releaseShippingChargeAddress = async () => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    this.props.releaseShippingChargeAddress(
      data,
      (res) => this.props.navigation.goBack(),
      (error) => this.releaseShippingChargeAddressFailureCallBack(error)
    );
  };

  releaseShippingChargeAddressFailureCallBack = (error) => {
    console.log(
      "@@@ Calculate Shipping Charge Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  calculateShippingChargeAddress = async (addressData) => {
    let userID = await AsyncStorage.getItem("USER_ID");
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
      cartId: this.props.cartData.order.id,
      zipcode: addressData.zip_code,
    };
    this.props.calculateShippingChargeAddress(
      data,
      (res) => this.showCartDataSuccessCallBack(res),
      (error) => this.calculateShippingChargeAddressFailureCallBack(error)
    );
  };

  calculateShippingChargeAddressFailureCallBack = (error) => {
    console.log(
      "@@@ Calculate Shipping Charge Failure CallBack ===================",
      error
    );
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal("Network Error!");
      }, 0);
    }
  };

  onSetAddress = (isFromShipping, addressData) => {
    console.log("@@@ Set Address ============", isFromShipping, addressData);
    if (isFromShipping) {
      this.setState(
        { shippingAddressData: addressData, shippingAddressSelected: true },
        () => {
          this.calculateShippingChargeAddress(addressData);
        }
      );
    } else {
      this.setState({
        billingAddressData: addressData,
        billingAddressSelected: true,
      });
    }
  };

  onAddAddress = (isFromShipping = true) => {
    this.props.navigation.navigate("SavedAddresses", {
      isFromCheckout: true,
      onSetAddress: (addressData) =>
        this.onSetAddress(isFromShipping, addressData),
    });
  };

  renderEmptyDataView = () => {
    return (
      <View style={styles.emtpyAddressContainer}>
        <View>
          <Image
            source={IMG_CONST.CART_EMPTY_ICON}
            style={styles.emptyAddressIcon}
          />
          <Text style={styles.noAnyOrder}>Your cart is empty !</Text>
          <Text style={styles.youhave}>
            You haven’t added any items in your cart yet !
          </Text>
        </View>
        <GreenButton
          title="BROWSE PRODUCTS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  };

  getVarientString = (properties) => {
    let varientString = "";
    properties.map((property, index) => {
      varientString = `${varientString}${property.variant_name}: ${property.property_name}`;
      if (!(index === properties.length - 1)) {
        varientString += `,${"\n"}`;
      }
    });
    return varientString;
  };
  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        {indeterminate ? (
          <Image source={IMG_CONST.LOGO_ICON} style={styles.productImage} />
        ) : (
          <Text>{progress * 100}</Text>
        )}
      </View>
    );
  };
  renderMyOrderCell = (item, index) => {
    let isProductVarient = false;
    if (
      item.product.product_variants &&
      item.product.product_variants.length > 0
    ) {
      isProductVarient = true;
    }
    let productImage = "";
    if (isProductVarient) {
      item.product_variant.images.map((variant) => {
        if (variant.is_default) {
          productImage = variant.image;
          console.log("@@@ Product ==============", productImage, index);
        } else {
          productImage = item.product_variant.images[0].image;
        }
      });
    } else {
      productImage =
        item.product && item.product.images[0] && item.product.images[0].image;
    }

    if (this.state.cartQuantity.length === 0) return;
    return (
      <View style={styles.cellContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.rowContainer}>
          <View style={styles.row}>
            <CachedImage
              resizeMode={"contain"}
              source={productImage}
              renderError={(error)=>console.log(error)}
              renderIndicator={this.renderIndicator}
              style={styles.productImage}
                />
            {/* <LoadingImage
              resizeMode={"contain"}
              source={{ uri: productImage }}
              renderError={(error) => console.log(error)}
              renderIndicator={this.renderIndicator}
              style={styles.productImage}
            /> */}
            {/* <Image source={{ uri: productImage }} style={styles.productImage} /> */}
            <View style={styles.middleInfo}>
              <View style={styles.productRow}>
                <Text numberOfLines={2} style={styles.prodName}>
                  {item.product_name}
                </Text>
                <Text style={styles.quantityText}>
                  Quantity:{" "}
                  {item.subscription_package
                    ? item.subscription_quantity
                    : this.state.cartQuantity[index].quantity}
                </Text>
              </View>
              {/* <Text style={styles.orderText}>Type</Text> */}
              <View style={styles.toolRow}>
                <Text style={styles.priceValue}>
                  ₹{" "}
                  {item.product_variant && item.product_variant.variant_actual_price ? item.product_variant.variant_actual_price : ""}
                  {/* {item.subscription_package
                    ? item.product.on_sale
                      ? item.product_sale_price
                      : item.unit_price_including_tax
                    : isProductVarient
                    ? item.product_variant_on_sale
                      ? item.product_variant_sale_price
                      : item.product_variant_price
                    : item.product.on_sale
                    ? item.product.sale_price
                    : item.unit_price_including_tax} */}

                </Text>
                <Text style={styles.mrp}>MRP</Text>
                {/* <View style={styles.tools}>
                          <TouchableOpacity onPress={() => this.onUpdateCartValue(false, index, item)}>
                            <Text style={styles.minus}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.count}>{this.state.cartQuantity[index].quantity ? this.state.cartQuantity[index].quantity : '0'}</Text>
                          <TouchableOpacity onPress={() => this.onUpdateCartValue(true, index, item)}>
                            <Text style={styles.plus}>+</Text>
                          </TouchableOpacity>
                        </View> */}
                {/* <Text style={styles.excludingGST}> (Excluding GST)</Text> */}
                {item.subscription_package && (
                  <View style={styles.changeRow}>
                    <Text style={styles.periodText}>
                      {item.preferred_delivery_slot
                        ? `${this.getSlotString(
                            item.preferred_delivery_slot
                          )} | `
                        : ""}
                      <Text style={styles.packageText}>
                        {item.subscription_package.charAt(0).toUpperCase() +
                          item.subscription_package.slice(1)}{" "}
                        for {item.subscription_period} Month
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
                {isProductVarient && (
                  <View style={styles.changeRow}>
                    <Text style={styles.periodText}>
                      {this.getVarientString(
                        item.product_variant.product_variant_properties
                      )}
                    </Text>
                  </View>
                )}
            </View>
          </View>
          {item.subscription_package && (
            <View style={styles.labelSticker}>
              <Text style={styles.stickerText}>
                SUBSCRIPTION
                {Number(item.subscription_discount) > 0
                  ? `(${item.subscription_discount}%)`
                  : ""}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  };

  getSlotString = (slot) => {
    if (slot.includes("AM") || slot.includes("am")) return "Morning";
    return "Evening";
  };

  renderMyOrderList = () => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.orderSummary}>Order Summary</Text>
        <FlatList
          data={this.state.myOrderList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderMyOrderCell(item, index)}
        />
      </View>
    );
  };

  renderBottomDetails = () => {
    if (this.state.cartData) {
      return (
        <View style={styles.bottomDetails}>
          <View style={styles.headerCart}>
            <Text style={styles.yourCart}>Your Cart</Text>
            <Text style={styles.amountText}>Amount</Text>
          </View>
          {this.state.myOrderList.map((item) => {
            const isProductVarient = item.product_variant != null;
            return (
              <View style={styles.list}>
                <Text numberOfLines={3} style={styles.productName}>
                  {item.product.name}
                </Text>
                <Text style={styles.price}>
                  ₹{" "}
                  {parseFloat(item.product_variant.price_including_tax * item.quantity).toFixed(2)}
                  {/* {item.subscription_package
                    ? item.product.on_sale
                      ? parseFloat(
                          item.product_sale_price * item.subscription_days_count
                        ).toFixed(2)
                      : parseFloat(
                          item.unit_price_including_tax *
                            item.subscription_days_count
                        ).toFixed(2)
                    : isProductVarient
                    ? item.product_variant_on_sale
                      ? parseFloat(
                          item.product_variant_sale_price * item.quantity
                        ).toFixed(2)
                      : parseFloat(
                          item.product_variant_price * item.quantity
                        ).toFixed(2)
                    : item.product.on_sale
                    ? parseFloat(
                        item.product.sale_price * item.quantity
                      ).toFixed(2)
                    : parseFloat(
                        item.unit_price_including_tax * item.quantity
                      ).toFixed(2)} */}
                </Text>
              </View>
            );
          })}
          <View style={styles.horizontalLineLight} />
          {/* <View style={styles.tax}>
            <Text style={styles.productName}>Taxes</Text>
            <Text style={styles.price}>
              ₹ {parseFloat(this.state.cartData.total_tax).toFixed(2)}
            </Text>
          </View> */}
          <View>
            {/* <View style={styles.deliveryContainer}>
              <Text style={styles.productName}>Taxes</Text>
              <View style={styles.subTax}>
                <View style={styles.delivery}>
                  <Text
                    style={styles.subTaxTitle}
                  >{`CGST (${this.state.cartData.total_cgst_percent})`}</Text>
                  <Text style={styles.subTaxTitle}>
                    ₹
                    {this.state.cartData.total_cgst
                      ? this.state.cartData.total_cgst
                      : "0"}
                  </Text>
                </View>
                <View style={styles.delivery}>
                  <Text
                    style={styles.subTaxTitle}
                  >{`SGST (${this.state.cartData.total_sgst_percent})`}</Text>
                  <Text style={styles.subTaxTitle}>
                    ₹
                    {this.state.cartData.total_sgst
                      ? this.state.cartData.total_sgst
                      : "0"}
                  </Text>
                </View>
                <View style={styles.delivery}>
                  <Text
                    style={styles.subTaxTitle}
                  >{`IGST (${this.state.cartData.total_igst_percent})`}</Text>
                  <Text style={styles.subTaxTitle}>
                    ₹
                    {this.state.cartData.total_igst
                      ? this.state.cartData.total_igst
                      : "0"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.delivery}>
              <Text style={styles.productName}>Total Taxes</Text>
              <Text style={styles.price}>
                ₹{" "}
                {this.state.cartData.total_tax_amt_with_igst_sgst_cgst
                  ? this.state.cartData.total_tax_amt_with_igst_sgst_cgst
                  : "0"}
              </Text>
            </View>

            <View style={styles.horizontalLineLight} /> */}
{!this.state.isCouponApplied && (
            <View style={styles.applyCouponRow}>
              <Text style={styles.productName}>Sub Total</Text>
              <Text style={styles.subText}>₹ {parseFloat(this.state.cartData.sub_total).toFixed(2)}</Text>
            </View>
          )}
            <View style={styles.delivery}>
              <Text style={styles.productName}>Delivery Charges</Text>
              <Text style={styles.price}>
                ₹{" "}
                {this.state.cartData.shipping_charges
                  ? this.state.cartData.shipping_charges.shipping_total
                  : "0"}
              </Text>
            </View>
          </View>

          {this.state.isValidCoupon && (
            <>
              <View style={styles.horizontalLineLight} />
              <View style={styles.coupon}>
                <Text style={styles.couponText}>Coupon Applied</Text>
                <Text style={styles.couponPrice}>
                  -₹ {this.state.discountValue}
                </Text>
              </View>
            </>
          )}
          {/* {this.state.isValidCoupon && <Text style={styles.couponText}>{this.state.codeValue}</Text>} */}
          {/* {!this.state.isCouponApplied && <TouchableOpacity style={styles.applyCouponRow} onPress={() => this.setState({ showCouponCodeModal: true })}>
              <Text style={styles.applyCouponText}>{'Apply Coupon'}</Text>
              <Text style={styles.subText}>Sub Total  INR {this.state.cartData.sub_total}</Text>
            </TouchableOpacity>}
            {this.state.isValidCoupon && <TouchableOpacity onPress={() => this.setState({ showCouponCodeModal: true })}>
              <Text style={styles.changeCouponText}>Change Coupon</Text>
            </TouchableOpacity>} */}
          {this.state.isValidCoupon && (
            <View style={styles.discount}>
              <Text style={styles.productName}>Total Discount</Text>
              <Text style={styles.couponPrice}>
                ₹ {this.state.discountValue}
              </Text>
            </View>
          )}
          <View style={styles.horizontalLineLight} />

          <View style={styles.total}>
            <Text style={styles.couponText}>Total Amount</Text>
            <Text style={styles.couponPrice}>₹ {this.state.finalAmount}</Text>
          </View>
          <View style={styles.delivery}>
            <Text style={[styles.productName,{color: COLOR_CONST.cartGreen}]}>Total Savings</Text>
            <Text style={styles.couponPrice}>
              ₹ {this.state.cartData.total_savings}
            </Text>
          </View>
        </View>
      );
    }
  };

  renderShippingAddress = () => {
    if (this.state.shippingAddressData) {
      const {
        name,
        address,
        phone_number,
        flat_no,
        city,
        state,
      } = this.state.shippingAddressData;
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Shipping Address</Text>
            <TouchableOpacity onPress={() => this.onAddAddress(true)}>
              <Text style={styles.editAddress}>Edit Address</Text>
            </TouchableOpacity>
          </View>
          {this.state.shippingAddressData ? (
            <View style={styles.shippingAddressContainer}>
              <Text style={styles.shippingAddressdata}>
                {flat_no} {address}, {city} ({state})
              </Text>
            </View>
          ) : (
            <View style={styles.emtpyShipping}>
              <Text style={styles.shippingAddressdata}>
                Please add your address
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Shipping Address</Text>
            {/*<TouchableOpacity onPress={() => this.onAddAddress(true)}>
              <Text style={styles.addAddress}>Add Address</Text>
      </TouchableOpacity>*/}
          </View>
          <TouchableOpacity onPress={() => this.onAddAddress(true)}>
            <View style={styles.emtpyShipping}>
              <Text style={styles.addAddress}>Add Shipping Address</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderBillingAddress = () => {
    if (this.state.billingAddressData) {
      const {
        name,
        address,
        phone_number,
        flat_no,
        city,
        state,
      } = this.state.billingAddressData;
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Billing Address</Text>
            <TouchableOpacity onPress={() => this.onAddAddress(false)}>
              <Text style={styles.editAddress}>Edit Address</Text>
            </TouchableOpacity>
          </View>
          {this.state.billingAddressData ? (
            <View style={styles.shippingAddressContainer}>
              <Text style={styles.shippingAddressdata}>
                {flat_no} {address}, {city} ({state})
              </Text>
            </View>
          ) : (
            <View style={styles.emtpyShipping}>
              <Text style={styles.shippingAddressdata}>
                Please add your address
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Billing Address</Text>
            {/*<TouchableOpacity onPress={() => this.onAddAddress(false)}>
              <Text style={styles.addAddress}>Add Address</Text>
      </TouchableOpacity>*/}
          </View>
          <TouchableOpacity onPress={() => this.onAddAddress(false)}>
            <View style={styles.emtpyShipping}>
              <Text style={styles.addAddress}>Add Billing Address</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderShippingAddressView = () => {
    // const checkoutData = this.props.route.params.checkoutData;
    // const { name, address, phone_number, flat_no, city, state } = this.state.shippingAddressData;
    // const { name1, address1, phone_number1, flat_no1, city1, state1 } = this.state.billingAddressData;
    // console.log('@@@ Shipping ===========', this.state.shippingAddressData)
    // if (!checkoutData) {
    //   return;
    // }
    return (
      <View>
        <View style={[styles.horizontalLine, { marginTop: scale(12) }]} />

        {this.renderShippingAddress()}

        <View style={[styles.horizontalLine, { marginTop: scale(12) }]} />

        {this.renderBillingAddress()}
        {/* <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Shipping Address</Text>
            <TouchableOpacity onPress={() => this.onAddAddress()}>
              <Text style={styles.addAddress}>Add Address</Text>
            </TouchableOpacity>
          </View>
          {this.state.shippingAddressData ? <View style={styles.shippingAddressContainer}>
            <Text style={styles.shippingAddressdata}>
              {flat_no} {address}, {city} ({state})
            </Text>
          </View> : 
          <View style={styles.emtpyShipping}>
            <Text style={styles.shippingAddressdata}>Please add your address</Text>
          </View>}
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.shippingAddress}>Billing Address</Text>
          {this.state.billingAddressData ?  <View style={styles.shippingAddressContainer}>
            <Text style={styles.shippingAddressdata}>
              {flat_no1} {address1}, {city1} ({state1})
            </Text>
          </View> :
          <View style={styles.emtpyShipping}>
            <Text style={styles.shippingAddressdata}>Please add your address</Text>
          </View>}
        </View> */}

        <View style={[styles.horizontalLine, { marginTop: scale(12) }]} />

        <View style={styles.addressContainer}>
          <View style={styles.shippingContainer}>
            <Text style={styles.shippingAddress}>Preferred Time Slot</Text>
          </View>
          <TouchableOpacity
            style={[styles.timeslotContainer]}
            onPress={() => {
              if (
                this.state.selectedDateForDelivery.date &&
                this.state.selectedSlot.time
              )
                this.setState({
                  preselectedDateForDelivery: this.state
                    .selectedDateForDelivery,
                  preselectedSlot: this.state.selectedSlot,
                });
              this.setModalVisible(true);
            }}
          >
            <Text style={styles.timeslotdata}>
              {this.state.selectedDateForDelivery.date &&
              this.state.selectedSlot.time
                ? `${this.state.selectedDateForDelivery.date} | ${this.state.selectedSlot.time}`
                : "Select Delivery Slot"}
            </Text>
            <Image source={IMG_CONST.RIGHT_ARROW} style={styles.rightArrow} />
          </TouchableOpacity>
        </View>

        <View style={[styles.horizontalLine, { marginTop: scale(12) }]} />

        <View style={styles.paymentContainer}>
          <Text style={styles.shippingAddress}>Payment Option</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isPaymentOption1Selected: !this.state
                    .isPaymentOption1Selected,
                  isPaymentOption2Selected: false,
                  isPaymentOption3Selected: false,
                })
              }
              style={styles.innerRow}
            >
              <Image
                source={
                  this.state.isPaymentOption1Selected
                    ? IMG_CONST.RADIO_SELECTED
                    : IMG_CONST.RADIO_UNSELECTED
                }
                style={styles.checkbox}
              />
              <Text style={styles.paymentOption}>COD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  isPaymentOption2Selected: !this.state
                    .isPaymentOption2Selected,
                  isPaymentOption1Selected: false,
                  isPaymentOption3Selected: false,
                })
              }
              style={styles.middleRow}
            >
              <Image
                source={
                  this.state.isPaymentOption2Selected
                    ? IMG_CONST.RADIO_SELECTED
                    : IMG_CONST.RADIO_UNSELECTED
                }
                style={styles.checkbox}
              />
              <Text style={styles.paymentOption}>PAY WITH RAZORPAY</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => this.setState({ isPaymentOption3Selected: !this.state.isPaymentOption3Selected, isPaymentOption1Selected: false, isPaymentOption2Selected: false})} style={styles.innerRow}>
                <Image source={this.state.isPaymentOption3Selected ? IMG_CONST.RADIO_SELECTED : IMG_CONST.RADIO_UNSELECTED} style={styles.checkbox} />
                <Text style={styles.paymentOption}>Payment Option 1</Text>
              </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };

  renderCouponCodeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCouponCodeModal}
        onRequestClose={() => {
          this.setState({ showCouponCodeModal: false });
        }}
      >
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.popup}>
              <Text style={styles.enterCouponText}>Enter Coupon Code</Text>
              {this.state.isCouponApplied && !this.state.isValidCoupon && (
                <Text style={styles.oopsText}>
                  Oops ! Coupon Code is Not Valid
                </Text>
              )}
              {this.state.isCouponApplied && this.state.isValidCoupon && (
                <Text style={styles.validText}>
                  Great ! Coupon Code Applied
                </Text>
              )}
              <TextInput
                style={[
                  styles.couponInput,
                  {
                    marginTop:
                      this.state.isCouponApplied && !this.state.isValidCoupon
                        ? verticalScale(16)
                        : verticalScale(41),
                  },
                ]}
                placeholder="Enter your coupon code"
                placeholderTextColor="#8b8f95"
                value={this.state.codeValue}
                onChangeText={(value) =>
                  this.setState({ codeValue: value }, () => {
                    this.onChangeCoupon();
                  })
                }
              />
              {this.state.applyingCoupon && (
                <View style={{ marginTop: 10 }}>
                  <ActivityIndicator
                    size="small"
                    color={COLOR_CONST.charcoalGrey}
                  />
                </View>
              )}
              {!this.state.isValidCoupon ? (
                <>
                  {/* <GreenButton
                        title="APPLY COUPON"
                        customStyle={styles.loginButton1}
                        customTxtStyle={styles.loginText1}
                        onPress={() => {
                          this.applyCoupon();
                        }}
                      /> */}
                  <TouchableOpacity onPress={() => this.applyCoupon()}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={["#81cabf", "#29af9d", "#29af9d"]}
                      style={styles.continueShoppingButton}
                    >
                      <Text style={styles.applyText}>{"APPLY COUPON"}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState(
                        {
                          codeValue: "",
                          showCouponCodeModal: false,
                          isCouponApplied: false,
                        },
                        () => {
                          if (this.state.couponData) {
                            this.setState({
                              isCouponApplied: true,
                              isValidCoupon: true,
                              codeValue: this.state.cartData.coupon.code,
                              discountValue: this.state.cartData
                                .applied_discount,
                              finalAmount: this.state.cartData.total,
                            });
                          }
                        }
                      )
                    }
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                this.state.isValidCoupon && (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ showCouponCodeModal: false })
                    }
                  >
                    <Animatable.Image
                      animation="bounceIn"
                      duraton="1500"
                      source={IMG_CONST.COUPON_TICK}
                      style={styles.couponTick}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor="#FFF"
          isFocused={true}
        />
        {!this.state.noProductFound ? (
          <>
            <View
              style={{ flex: 1, width: "100%", paddingHorizontal: scale(5) }}
            >
              <ScrollView>
                {!this.state.isFetchingData && this.renderMyOrderList()}
                {!this.state.isFetchingData && this.renderBottomDetails()}
                {!this.state.isFetchingData && this.renderShippingAddressView()}
                {!this.state.isFetchingData && this.renderCouponCodeModal()}
                {this.renderTimeslotModal()}
              </ScrollView>
              <GreenButton
                title="Make payment"
                customStyle={[
                  styles.loginButton,
                  {
                    opacity:
                      this.state.isPaymentOption1Selected ||
                      this.state.isPaymentOption2Selected
                        ? 1
                        : 0.5,
                  },
                ]}
                customTxtStyle={styles.loginText}
                onPress={() => this.saveAddress()}
                disabled={
                  !this.state.isPaymentOption1Selected &&
                  !this.state.isPaymentOption2Selected
                }
              />
            </View>
          </>
        ) : (
          this.renderEmptyDataView()
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    showNotificationDot: state.cart.showNotificationDot,
    profileData: state.profile.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showErrorModal: (message, isShowError) =>
      dispatch(commonActions.showErrorModal(message, isShowError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    showCartData: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.showCartData(data, successCallBack, failureCallBack)
      ),
    addToCart: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.addToCart(data, successCallBack, failureCallBack)),
    updateQuantiyInCart: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.updateQuantiyInCart(data, successCallBack, failureCallBack)
      ),
    removeFromCart: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.removeFromCart(data, successCallBack, failureCallBack)
      ),
    applyCoupon: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.applyCoupon(data, successCallBack, failureCallBack)),
    checkOrderItemAvailability: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.checkOrderItemAvailability(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    placeOrder: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.placeOrder(data, successCallBack, failureCallBack)),
    checkOrderItemAvailability: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.checkOrderItemAvailability(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    checkZipcodeAvailability: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.checkZipcodeAvailability(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    releaseMyBlockQuantity: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.releaseMyBlockQuantity(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    paytmPayment: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.paytmPayment(data, successCallBack, failureCallBack)
      ),
    confirmPaytmPayment: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.confirmPaytmPayment(data, successCallBack, failureCallBack)
      ),
    getAddressList: (data, successCallBack, failureCallBack) =>
      dispatch(
        profileActions.getAddressList(data, successCallBack, failureCallBack)
      ),
    addAddressForOrder: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.addAddressForOrder(data, successCallBack, failureCallBack)
      ),
    calculateShippingChargeAddress: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.calculateShippingChargeAddress(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    releaseShippingChargeAddress: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.releaseShippingChargeAddress(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    create_razorpays_payment: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.create_razorpays_payment(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    varify_razorpay_signature: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.varify_razorpay_signature(
          data,
          successCallBack,
          failureCallBack
        )
      ),
    getDeliverySlotList: (data, successCallBack, failureCallBack) =>
      dispatch(
        cartActions.getDeliverySlotList(data, successCallBack, failureCallBack)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrderScreen);
