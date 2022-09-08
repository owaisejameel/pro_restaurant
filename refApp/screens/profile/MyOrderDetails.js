import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import COLOR_CONST, { FONTS } from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import { HelpCenterList } from '../../theme/constants';
import { initialRatingList } from '../../theme/constants';
import GreenButton from '../../components/GreenButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './MyOrderDetailsStyle';
import { verticalScale } from '../../utils/Scale';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import R from '../../R';
import { connect } from 'react-redux';
import * as cartActions from '../../redux/actions/cartActions';
import * as commonActions from '../../redux/actions/commonActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import scale from '../../utils/Scale';
import { getLocalDate } from '../../utils/Time';
import { capitalize } from '../../utils/Utils';
import LoadingImage from 'react-native-image-progress';
import CachedImage from '../../components/CachedImage';
import * as Sentry from '@sentry/react-native';

class MyOrderDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myOrderList: [1, 2, 3, 4, 5],
      shippingAddressData: null,
      showCancelOrderModal: false,
      ratingList: initialRatingList,
      showSubmitReviewModal: false,
      trackingDetails: null,
      orderDetails: null,
      productDetails: null,
      reviewText: '',
      isInvalidReview: false,
      isFetchingData: true,
      subscriptionOrders: [],
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setNavigationHeaderConfiguration();
      try {
        this.refreshCart();
        if (this.props.route.params && this.props.route.params.mainOrderData.logistics_ship_rocket_enabled) {
          this.getLogisticTrackIdDetails();
        } else {
          this.getTrackIdDetails();
        }
        this.getSubscrptionOrders();
      } catch (err) {
        Sentry.captureException(err);
      }
    });
  }

  setNavigationHeaderConfiguration = () => {
    const { cartHasProductFlag, cartCount } = this.props;
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>My Orders</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Cart')}>
          <Image source={IMG_CONST.CART_BLACK_ICON} style={styles.cartIcon} />
          {cartHasProductFlag && (
            <View
              style={{
                height: scale(20),
                width: scale(20),
                borderRadius: scale(30),
                backgroundColor: COLOR_CONST.primaryThemeGradient,
                borderColor: 'white',
                borderWidth: 0.9,
                position: 'absolute',
                top: scale(-10),
                end: scale(15),
                justifyContent: 'center',
                alignItems: 'center'
              }}
            ><Text style={{ fontSize: scale(10), color: COLOR_CONST.white, fontFamily: FONTS.GTWalsheimProRegular }}>{cartCount}</Text></View>
          )}
        </TouchableOpacity>
      ),
    })
  }

  getTrackIdDetails = async () => {
    try {
      const orderData = this.props.route.params.orderData;
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        id: orderData.id,
        track: 'order_item'
      }
      this.props.getTrackIdDetails(data, (res) => this.getTrackIdDetailsSuccessCallBack(res), (error) => this.getTrackIdDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getTrackIdDetailsSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Track ID Details Success CallBack ===================', res.data.order_item_detail);
      this.setState({
        trackingDetails: res.data.tracking_detail,
        orderDetails: res.data.order_item_detail,
        productDetails: res.data.order_item_detail.product,
        isFetchingData: false,
        shippingAddressData: res.data.order_item_detail.delivery_address
      }, () => {
        // let localAddressIndex = this.state.orderDetails.delivery_addresses.findIndex((item) => (item.address_for === 'shipping') || (item.address_for === 'billing and shipping'));
        // console.log('@@@ order =========', this.state.orderDetails, localAddressIndex)
        // if(localAddressIndex >= 0)
        //   this.setState({ shippingAddressData: this.state.orderDetails.delivery_address });
      })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getTrackIdDetailsFailureCallBack = (error) => {
    try {
      // this.setState({ isFetchingData: false, })
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getLogisticTrackIdDetails = async () => {
    try {
      const mainOrderData = this.props.route.params.mainOrderData;
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        id: mainOrderData.id,
      }
      this.props.getLogisticTrackIdDetails(data, (res) => this.getLogisticTrackIdDetailsSuccessCallBack(res), (error) => this.getLogisticTrackIdDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  getLogisticTrackIdDetailsSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Logistic Track ID Details Success CallBack ===================', res);
      let trackingDetails = {};
      let trackingResponse = res.data.tracking;
      trackingDetails['status'] = trackingResponse.status;
      trackingDetails['msg'] = trackingResponse.msg;
      trackingDetails['order_datetime'] = trackingResponse.order_datetime;
      trackingDetails['tracking_number'] = trackingResponse.tracking_number;
      trackingDetails['order_date'] = trackingResponse.order_date;
      let orderDetails = {};
      orderDetails['id'] = this.props.route.params.orderData.id;
      orderDetails['product_name'] = this.props.route.params.orderData.product_name;
      orderDetails['quantity'] = this.props.route.params.orderData.quantity;
      orderDetails['unit_price_including_tax'] = this.props.route.params.orderData.unit_price_including_tax;
      orderDetails['is_review_present'] = this.props.route.params.orderData.is_review_present;
      orderDetails['is_item_cancelled'] = this.props.route.params.orderData.is_item_cancelled;
      orderDetails['order_number'] = trackingResponse.order_number;
      orderDetails['status'] = trackingResponse.status;
      orderDetails['order_date'] = trackingResponse.order_date;
      let shippingAddressData = {};
      shippingAddressData['name'] = trackingResponse.name;
      shippingAddressData['address'] = trackingResponse.address;
      shippingAddressData['phone_number'] = trackingResponse.phone_number;
      let productDetails = {
        images: [
          {
            image: this.props.route.params.orderData.product_image
          }
        ]
      };
      this.setState({
        trackingDetails: [trackingDetails],
        orderDetails: orderDetails,
        shippingAddressData: shippingAddressData,
        productDetails: productDetails,
        isFetchingData: false
      }, () => {
      })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getLogisticTrackIdDetailsFailureCallBack = (error) => {
    try {
      // this.setState({ isFetchingData: false, })
      if (error) {
        setTimeout(() => {
          if (error !== 'Shipment Not Found.')
            this.props.showErrorModal(error);
          else {
            let productDetails = {
              images: [
                {
                  image: this.props.route.params.orderData.product_image
                }
              ]
            };
            let orderDetails = {};
            let trackingDetails = {};
            orderDetails['id'] = this.props.route.params.orderData.id;
            orderDetails['product_name'] = this.props.route.params.orderData.product_name;
            orderDetails['quantity'] = this.props.route.params.orderData.quantity;
            orderDetails['unit_price'] = this.props.route.params.orderData.unit_price;
            orderDetails['is_review_present'] = this.props.route.params.orderData.is_review_present;
            orderDetails['is_item_cancelled'] = this.props.route.params.orderData.is_item_cancelled;
            orderDetails['order_number'] = this.props.route.params.mainOrderData.order_number;
            orderDetails['order_date'] = this.props.route.params.mainOrderData.order_date;
            trackingDetails['status'] = 'Placed';
            trackingDetails['msg'] = 'Your order is placed';
            trackingDetails['order_datetime'] = this.props.route.params.mainOrderData.order_date;
            trackingDetails['tracking_number'] = '';
            trackingDetails['order_date'] = this.props.route.params.mainOrderData.order_date;
            this.setState({ orderDetails: orderDetails, productDetails: productDetails, trackingDetails: [trackingDetails], isFetchingData: false });
          }
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscrptionOrders = async () => {
    try {
      const orderData = this.props.route.params.orderData;
      if (orderData.subscription_package) {
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
          id: orderData.id,
          page: 1
        }
        console.log('Subscription order');
        this.props.getSubscrptionOrders(data, (res) => this.getSubscrptionOrdersSuccess(res), (error) => this.getSubscrptionOrdersFailure(error))
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscrptionOrdersSuccess = (res, obj) => {
    try {
      console.log("Subscription order details responce: ", res);
      console.log("Subscription order meta pegination: ", obj);
      this.setState({ subscriptionOrders: res })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscrptionOrdersFailure = (error) => {
    try {
      console.log("@@@ Get subscription order failure : ", err);
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  submitOrderReview = async () => {
    try {
      if (this.state.reviewText.trim().length === 0) {
        this.setState({ isInvalidReview: true });
        return;
      }
      this.setState({ showSubmitReviewModal: false }, async () => {
        let count = 0;
        this.state.ratingList.map((item) => {
          if (item.isSelected)
            count = count + 1;
        });

        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
          order_item_id: this.state.orderDetails.id,
          // order_id: this.props.route.params.mainOrderData.id,
          rating: count,
          comment: this.state.reviewText
        }
        this.props.submitOrderReview(data, (res) => this.submitOrderReviewSuccessCallBack(res), (error) => this.submitOrderReviewFailureCallBack(error));
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  submitOrderReviewSuccessCallBack = (res) => {
    try {
      this.resetStar();
      setTimeout(() => {
        this.props.showErrorModal('Review submitted successfully.', false);
      }, 0);
      this.props.navigation.goBack();
      console.log('@@@ Submit Order Review Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  submitOrderReviewFailureCallBack = (error) => {
    try {
      this.resetStar();
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cancelOrder = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let formData = new FormData();
      formData.append('item_id[]', this.state.orderDetails.id)
      let data = {
        userID: userID,
        itemId: this.props.route.params.mainOrderData.id,
        productItemId: this.state.orderDetails.id,
        formData: formData,
        isFromMyOrder: false,
      }
      this.props.cancelOrder(data, (res) => this.cancelOrderSuccessCallBack(res), (error) => this.cancelOrderFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cancelOrderSuccessCallBack = (res) => {
    try {
      console.log('@@@ Submit Order Review Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('Order item cancelled successfully.', false);
      }, 0);
      this.props.navigation.goBack();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cancelOrderFailureCallBack = (error) => {
    try {
      this.resetStar();
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressStar = (item) => {
    try {
      // if(item.id === 1)
      //   return;
      let localRating = this.state.ratingList;
      let selectedRatingIndex = localRating.findIndex((ratItem) => ratItem.id === item.id);
      localRating.map((ratingItem, index) => {
        if (index <= selectedRatingIndex) {
          return ratingItem.isSelected = true;
        } else {
          return ratingItem.isSelected = false;
        }
      });
      this.setState({ ratingList: localRating });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  resetStar = () => {
    try {
      let localRating = this.state.ratingList;
      localtRating = localRating.map((ratingItem, index) => {
        if (ratingItem.id !== 1)
          ratingItem.isSelected = false
      });
      this.setState({ ratingList: localRating, reviewText: '' }, () => {
        console.log('@@@ Updated Rating ========', this.state.ratingList)
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getVarientString = (properties) => {
    try {
      console.log('@@@ Prop =============', properties);
      let varientString = '';
      if (properties) {
        properties.map((property, index) => {
          varientString = `${varientString}${property.variant_name}: ${property.property_name}`;
          if (!(index === properties.length - 1)) {
            varientString += `,${'\n'}`;
          }
        });
      }
      return varientString;
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.productImage} />)
          : (<Text>{progress * 100}</Text>)}
      </View>
    )
  }
  renderMyOrderCell = (item) => {
    const productDetails = this.state.productDetails;
    const orderDetails = this.state.orderDetails;
    const trackingDetails = this.state.trackingDetails;
    const { subscriptionOrders } = this.state;
    const orderData = this.props.route.params.orderData;
    const mainOrderData = this.props.route.params.mainOrderData;
    console.log('@@@ order =========', orderDetails)
    let isProductVarient = false;
    if (orderDetails.product_variant) {
      isProductVarient = true
    }
    let product_varient_images = orderDetails.product_variant;
    let productImage = '';
    if (
      product_varient_images &&
      product_varient_images.images.length > 0
    ) {
      productImage = orderDetails.product_variant.images[0].image;
    } else {
      productImage = productDetails.images[0].image;
    }

    if (!trackingDetails && !productDetails && !orderDetails)
      return;
    return (
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <CachedImage
            resizeMode={"contain"}
            source={productImage}
            renderError={(error) => console.log(error)}
            renderIndicator={this.renderIndicator}
            style={styles.productImage}
          />
          {/* <LoadingImage
                  resizeMode={"contain"}
                  source={{uri: productImage }}
                  renderError={(error)=>console.log(error)}
                  renderIndicator={this.renderIndicator}
                  style={styles.productImage} 
                
                /> */}
          {/* <Image source={{ uri: productImage }}style={styles.productImage} /> */}
          <View style={styles.middleInfo}>
            <View style={styles.productRow}>
              <Text style={styles.productName}>{orderDetails.product_name}</Text>
              <Text style={styles.quantity}>Quantity : {orderDetails.subscription_package ? orderDetails.subscription_quantity : orderDetails.quantity}</Text>
            </View>
            {isProductVarient && (
              <View style={styles.changeRow}>
                <Text style={styles.periodText}>
                  {this.getVarientString(
                    orderDetails.product_variant.product_variant_properties,
                  )}
                </Text>
              </View>
            )}
            {/* <View style={styles.productRow}>
                          <Text style={styles.orderText}>Ordered on: </Text>
                          <Text style={styles.date}>{orderDetails.order_date.split(",")[1]}</Text>
                      </View> */}
            {mainOrderData.delivery_slot && <View style={[styles.productRow, { width: '80%', flexWrap: "wrap" }]}>
              <Text style={styles.orderText}>Delivery Time Slot: </Text>
              <Text style={styles.date}>{mainOrderData.delivery_slot}</Text>
            </View>}
            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>₹ {orderDetails.unit_price_including_tax}</Text>
              {!subscriptionOrders.length > 0 && <View style={styles.placedRow}>
                <View style={styles.greenDot} />
                <Text style={styles.placedText}>{trackingDetails[0] && trackingDetails[0].status === 'new' ? 'confirmed' : trackingDetails[0] && trackingDetails[0].status ? trackingDetails[0].status : ""}</Text>
              </View>}
              {
                subscriptionOrders.length > 0 && <View style={styles.placedRow}>
                  <Text style={styles.package}>{orderData.preferred_delivery_slot ? this.getSlotString(orderData.preferred_delivery_slot) + ` ${orderData.preferred_delivery_slot} | ` : ""}</Text>
                  <Text style={styles.period}>{orderData.subscription_package.charAt(0).toUpperCase() +
                    orderData.subscription_package.slice(1)} for {orderData.subscription_period} Month</Text>
                </View>
              }
            </View>
            <Text style={styles.subscriptionPriceValue}>Total Amount: ₹ {mainOrderData.total}</Text>
            {orderDetails.subscription_package && <Text style={styles.subscriptionPriceValue}>Subscription Amount: ₹ {orderDetails.total_price}</Text>}
            <Text style={styles.trackingID}>Tracking ID: {trackingDetails[0] && trackingDetails[0].tracking_number ? trackingDetails[0].tracking_number : ""} </Text>
          </View>
        </View>
        {/* {(orderDetails.status === 'delivered' || orderDetails.status === 'returned') && <View style={styles.line} />} */}
        <View style={styles.bottomPopupView}>
          {/* {(orderDetails.status === 'delivered' || orderDetails.status === 'returned') && !orderDetails.is_item_cancelled && <TouchableOpacity disabled={orderDetails.is_review_present} style={{flex: 1, alignItems: 'center'}} onPress={() => this.setState({ isInvalidReview: false, showSubmitReviewModal: true })}>
                    <Text style={styles.cancelText}>{orderDetails.is_review_present ? 'Review Submitted': 'Write a Product Review'}</Text>
                  </TouchableOpacity>} */}
          {/* {(orderDetails.status === 'delivered' || orderDetails.status === 'returned') && !orderDetails.is_item_cancelled && <View style={styles.verticalLine1} />} */}
          {/* <TouchableOpacity disabled={orderDetails.is_item_cancelled} style={{flex: 1, alignItems: 'center'}} onPress={() => this.setState({ showCancelOrderModal: true })}>
                    <Text style={styles.cancelText}>{!orderDetails.is_item_cancelled ? 'Cancel this Order Item' : 'Cancelled'}</Text>
                  </TouchableOpacity> */}
        </View>
      </View>
    )
  }

  getSlotString = (slot) => {
    if (slot.includes("AM") || slot.includes("am")) return "Morning";
    return "Evening"
  }

  renderMyOrderDetailView = () => {
    const orderData = this.state.orderDetails;
    if (!orderData)
      return;
    return (
      <View style={styles.myOrderDetailViewContainer}>
        <View style={styles.upperRow}>
          <View style={styles.leftItem}>
            <Text style={styles.orderNoText}>Order Number</Text>
            <Text style={styles.orderValue}>{orderData.order_number}</Text>
          </View>
          <View style={styles.rightItem}>
            <Text style={styles.orderNoText}>Order Date</Text>
            <Text style={styles.orderValue}>{orderData.order_date}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderOrderStatusView = () => {
    const { subscriptionOrders, trackingDetails } = this.state;
    const orderData = this.props.route.params.orderData;
    if (orderData.subscription_package) {
      if (subscriptionOrders.length > 0) {
        return this.renderSubsctionOrdersView();
      }

    } else {
      {/*if(!trackingDetails)
        return;
          return (
            <View style={styles.renderOrderStatusView}>
                <Text style={styles.orderStatus}>Order Status</Text>
                <View style={styles.statusView}>
                    <View style={styles.tickView}>
                      <Image source={IMG_CONST.TICK_ICON} style={styles.tickIcon} />
                      <View style={styles.verticalLine} />
                    </View>
                    <View style={styles.rightInfo}>
                        <Text style={styles.placed}>{trackingDetails[0].status === 'new' ? 'confirmed' : trackingDetails[0].status}  <Text style={styles.dateText}>{trackingDetails[0].order_date}</Text></Text>
                        <Text style={styles.orderPlaced}>{trackingDetails[0].msg}</Text>
                        <Text style={styles.orderPlaced}>{trackingDetails[0].order_datetime}</Text>
                    </View>
                </View>
            </View>
          )*/}
      return this.renderCompleteOrderStatusView();
    }
  }

  renderSubsctionOrdersView = () => {
    const { subscriptionOrders, productDetails } = this.state;
    const orderData = this.props.route.params.orderData;

    let product_varient_images = orderData.product_variant;
    let productImage = '';
    if (
      product_varient_images &&
      product_varient_images.images.length > 0
    ) {
      productImage = orderData.product_variant.images[0].image;
    } else {
      productImage = productDetails.images[0].image;
    }

    return (
      <View style={styles.renderOrderStatusView}>
        <Text style={styles.orderStatus}>Order Status</Text>
        {subscriptionOrders.map((item, index) => (
          <View style={styles.statusView}>
            <View style={styles.OrderTickView}>
              <Image source={item.status === 'delivered' ? IMG_CONST.TICK_ICON : IMG_CONST.DOT_ICON} style={styles.tickIcon} />
              <View style={styles.orderStatusVerticalLine} />
            </View>
            <View style={styles.orderRightInfo}>
              <View style={styles.rowContent}>
                <View style={styles.statusRow}>
                  <Text style={styles.statusHeading}>{item.delivery_date.split(",")[1]}</Text>
                  {item.status === 'delivered' ? <Image source={IMG_CONST.DELIVERED} style={styles.deliveredIcon} /> : <Image source={IMG_CONST.PENDING} style={styles.pendingIcon} />}
                </View>
                <View style={styles.placedRow}>
                  <View style={styles.greenDot} />
                  <Text tyle={styles.statusText}> {item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
                </View>
              </View>
              <View style={styles.orderProduct}>
                <Image source={{ uri: productImage }} style={styles.orderImage} />
                <View>
                  <Text style={styles.orderProductName}>{orderData.product_name}</Text>
                  <Text style={styles.package}>{orderData.preferred_delivery_slot ? this.getSlotString(orderData.preferred_delivery_slot) + ` ${orderData.preferred_delivery_slot} | ` : ""}
                    <Text style={styles.period}>{orderData.subscription_package.charAt(0).toUpperCase() +
                      orderData.subscription_package.slice(1)} for {orderData.subscription_period} Month</Text>
                  </Text>
                </View>
                <Text style={styles.orderQty}>Quantity : {orderData.subscription_package ? orderData.subscription_quantity : orderData.quantity}</Text>
              </View>
              <View style={styles.statusBottom}>
                <Text style={styles.orderQty}>Your order is {item.status}</Text>
                {item.status === 'pending' && <TouchableOpacity onPress={() => this.onPressCancelDelivery(item.id)}>
                  <Text style={styles.orderCancel}>Cancel order</Text>
                </TouchableOpacity>}
              </View>
            </View>
          </View>
        ))}
        {subscriptionOrders.length > 9 && <TouchableOpacity onPress={() => this.props.navigation.navigate('SubscriptionOrderList', { orderData: orderData })}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>}
      </View>
    )
  }

  onPressCancelDelivery = (subscriptionOrderId) => {
    Alert.alert(
      'Cancel delivery',
      'Are you sure to cancel this order delivery ?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.onCancelDelivery(subscriptionOrderId) },
      ],
      { cancelable: false },
    );
  }

  onCancelDelivery = async (subscriptionOrderId) => {
    const orderData = this.props.route.params.orderData;
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      userID: userID,
      id: orderData.id,
      subscriptionId: subscriptionOrderId
    }
    this.props.extendDelivery(data, (res) => this.cancelOrderSuccess(res), (err) => this.cancelOrderFailure(err))
  }

  cancelOrderSuccess = (res) => {
    console.log("@@@ Extend order success :", res);
    this.getSubscrptionOrders();
  }

  cancelOrderFailure = (error) => {
    console.log("@@@ Extend order failure : ", err);
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  }

  renderOrderShippingAddressView = () => {
    if (!this.state.shippingAddressData)
      return;
    const { name, address, phone_number, flat_no, city, state } = this.state.shippingAddressData;
    const isLogisiticEnabled = this.props.route.params.mainOrderData.logistics_ship_rocket_enabled;
    return (
      <View style={styles.renderOrderStatusView}>
        <Text style={styles.orderStatus}>Shipping Address</Text>
        <View style={styles.addressView}>
          <Text style={styles.home}>{name}</Text>
          <>{isLogisiticEnabled ?
            <Text style={styles.address}>{address}</Text> :
            <Text style={styles.address}>{flat_no} {address}, {city} ({state})</Text>
          }</>
          <Text style={styles.phoneNo}>Phone Number: {phone_number}</Text>
        </View>
      </View>
    )
  }
  renderStatusItem = ({ item, index }) => {
    console.log("@@@ tracking render item ", item);
    const { status, order_date, order_datetime, msg } = item;
    /*let local_date = getLocalDate({
      date: order_date,
      fromFormat: "ddd, Do MMMM YY",
      toFormat: "ddd, Do MMMM YY"
    });
    let local_datetime = getLocalDate({
      date: order_datetime,
      fromFormat: "ddd, Do MMMM YYYY - hh:mm A",
      toFormat: "ddd, Do MMMM YYYY - hh:mm A"
    });*/
    const trackingDetails = this.state.trackingDetails;
    let showBottomView = index != trackingDetails.length - 1;
    return (
      <View style={styles.statusView}>
        <View style={styles.tickView}>
          {index == 0
            ? <Image source={IMG_CONST.TICK_ICON} style={styles.tickIcon} />
            : <View style={[styles.tickIcon, {
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLOR_CONST.greenThemeColor,
              borderRadius: scale(8)
            }]}>
              <View style={{
                height: scale(8),
                width: scale(8),
                borderRadius: scale(4),
                backgroundColor: COLOR_CONST.greenThemeColor
              }} />
            </View>
          }
          <View style={{
            width: 1,
            flex: 1,
            backgroundColor: COLOR_CONST.lightGreyText,
          }} />
        </View>

        <View style={styles.rightInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.placed}>
              {
                status === 'new'
                  ? 'Confirmed'
                  : capitalize(status.trim())
              }
            </Text>
            <Text style={styles.dateText}>
              {order_date}
            </Text>
          </View>
          <Text style={styles.orderPlaced}>{msg}</Text>
          <Text style={styles.orderPlaced}>{order_datetime}</Text>
          {showBottomView
            ? <View style={{ height: scale(10) }} />
            : null
          }
        </View>
      </View>
    )
  }

  renderCompleteOrderStatusView = () => {
    const trackingDetails = this.state.trackingDetails;
    console.log("@@@ tracking details Order status", trackingDetails);
    if (!trackingDetails) {
      return;
    }
    console.log("@@@ tracking details  2");
    return (
      <View style={styles.renderOrderStatusView}>
        <Text style={styles.orderStatus}>Order Status</Text>
        <View style={{
          flexDirection: 'row',
          backgroundColor: "#fff",
          borderRadius: scale(4),
          paddingVertical: verticalScale(20),
          paddingHorizontal: scale(10),
          marginHorizontal: scale(10),
          marginTop: verticalScale(10),
        }}>
          {/**TICK VIEW */}
          {/* <View style={{ alignItems: "center" }}>
            <Image
              source={IMG_CONST.TICK_ICON}
              style={{
                height: scale(16),
                aspectRatio: 1,
                borderRadius: scale(8),
                backgroundColor: "#fff"
              }} />
            <View
              style={{
                width: 1,
                borderStartColor: 'red',
                flex: 1,
                backgroundColor: "#000"
              }}
            />
          </View> */}
          {/**Order Info */}
          {console.log("@@@ tracking details 4")}
          <FlatList
            data={trackingDetails}
            renderItem={this.renderStatusItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  }

  renderCancelOrderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCancelOrderModal}
        onRequestClose={() => {
          this.setState({ showCancelOrderModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => { }} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Cancel Order</Text>
            <Text style={styles.areYouSure}>Are you sure you want to cancel order ?</Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showCancelOrderModal: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showCancelOrderModal: false }, () => this.cancelOrder())}>
                <Text style={styles.yesDelete}>Yes, Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  renderSubmitReviewModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showSubmitReviewModal}
        onRequestClose={() => {
          this.setState({ showSubmitReviewModal: false })
        }}
      >
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <TouchableOpacity activeOpacity={1} onPress={() => { }} style={styles.modalContainer}>
            <View style={styles.reviewPopup}>
              <Text style={styles.deleteAddress}>Rate and Review</Text>
              <Text style={styles.areYouSure}>Rate our Product</Text>
              <View style={styles.starContainer}>
                {this.state.ratingList.map((item) => {
                  return (
                    <TouchableOpacity onPress={() => this.onPressStar(item)}>
                      <Image source={item.isSelected ? item.selectedStar : item.unSelectedStar} style={styles.star} />
                    </TouchableOpacity>
                  )
                })}
              </View>
              <TextInput
                style={styles.ratingInput}
                multiline={true}
                textAlignVertical={'top'}
                secureTextEntry={false}
                value={this.state.reviewText}
                placeholder="Write detailed review for product .."
                placeholderTextColor={COLOR_CONST.coolGreyTwo}
                underlineColorAndroid='transparent'
                returnKeyType={'done'}
                onChangeText={(text) => this.setState({ reviewText: text })}
              />
              {this.state.isInvalidReview && <Text style={styles.emptyText}>Review cannot be empty.</Text>}
              <View style={styles.bottomPopupViewReview}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showSubmitReviewModal: false })}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.submitOrderReview()}>
                  <Text style={styles.yesDelete}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
  refreshCart = async () => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
    }
    this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });
  };

  render() {
    const orderData = this.state.productDetails;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#ffffff'} isFocused={true} />
        <View style={styles.container}>
          {!this.state.isFetchingData && <>
            {this.renderMyOrderDetailView()}
            {this.renderMyOrderCell(orderData)}
            <View style={styles.horizontalLine} />
            {this.renderOrderStatusView()}
            <View style={styles.horizontalLine} />

            {this.renderOrderShippingAddressView()}
          </>}
          {this.renderCancelOrderModal()}
          {this.renderSubmitReviewModal()}
        </View>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
    profileData: state.user.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getTrackIdDetails: (data, successCallBack, failureCallBack) => dispatch(cartActions.getTrackIdDetails(data, successCallBack, failureCallBack)),
    getLogisticTrackIdDetails: (data, successCallBack, failureCallBack) => dispatch(cartActions.getLogisticTrackIdDetails(data, successCallBack, failureCallBack)),
    submitOrderReview: (data, successCallBack, failureCallBack) => dispatch(cartActions.submitOrderReview(data, successCallBack, failureCallBack)),
    cancelOrder: (data, successCallBack, failureCallBack) => dispatch(cartActions.cancelOrder(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    getSubscrptionOrders: (data, successCallBack, failureCallBack) => dispatch(cartActions.getSubcriptionOrders(data, successCallBack, failureCallBack)),
    extendDelivery: (data, successCallBack, failureCallBack) => dispatch(cartActions.extendDelivery(data, successCallBack, failureCallBack))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderDetails);