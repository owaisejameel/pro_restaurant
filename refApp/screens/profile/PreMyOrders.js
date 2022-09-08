import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  BackHandler,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import { initialRatingList } from '../../theme/constants';
import GreenButton from '../../components/GreenButton';
import styles from './PreMyOrdersStyle';
import { verticalScale } from '../../utils/Scale';
import R from '../../R';
import { connect } from 'react-redux';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import LoadingImage from 'react-native-image-progress';
import * as USER_CONST from "../../utils/Constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as UserActions from '../../redux/actions/userActions';
import * as profileActions from '../../redux/actions/profileActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as filterActions from '../../redux/actions/filterActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import scale from '../../utils/Scale';
import * as Sentry from '@sentry/react-native';

class PreMyOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myOrderList: [],
      productItems: [],
      noProductFound: false,
      isFetchingData: true,
      showCancelOrderModal: false,
      showSubmitReviewModal: false,
      ratingList: initialRatingList,
      reviewText: '',
      isInvalidReview: false,
      selectedOrderData: null,
      cancelData: null,
      isCancelLoadig: false,
      pageCount: 1,
      limit: 10,
      pageLoader: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      notFinalLoad: false
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setNavigationHeaderConfiguration();
      // this.refreshCart();
      try {
        this.getMyOrderListData();
      } catch (err) {
        Sentry.captureException(err);
      }
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  getMyOrderListData = async (showSpinner = true) => {
    try {
      console.log('@@@ Get My Order ===================', showSpinner);
      if (showSpinner) this.props.startSpinner();
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        pageCount: this.state.pageCount
      }
      this.props.myOrderList(data, (res) => this.myOrderListSuccessCallBack(res), (error) => this.myOrderListFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  myOrderListSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Get My Order List Data Success CallBack ===================', res);
      if (this.state.pageCount == 1) {
        this.setState({
          myOrderList: res.data.order,
          pageLoader: false,
          lastLoadCount: res.data.order.length,
          onEndReachedCalledDuringMomentum: res.data.order.length >= this.state.limit
            ? true
            : false,
          notFinalLoad: res.data.order.length >= this.state.limit
            ? true
            : false,
        }, () => {
          if (this.state.myOrderList.length === 0) {
            this.setState({ noProductFound: true, isFetchingData: false });
          } else {
            this.setState({ isFetchingData: false });
          }
        })
      } else {
        this.setState({
          myOrderList: this.state.myOrderList.concat(res.data.order),
          pageLoader: false,
          lastLoadCount: this.state.myOrderList.concat(res.data.order).length,
          onEndReachedCalledDuringMomentum: this.state.myOrderList.concat(res.data.order).length >= this.state.limit
            ? true
            : false,
          notFinalLoad: this.state.myOrderList.concat(res.data.order).length >= this.state.limit
            ? true
            : false,
        }, () => {
          if (this.state.myOrderList.length === 0) {
            this.setState({ noProductFound: true, isFetchingData: false });
          } else {
            this.setState({ isFetchingData: false });
          }
        })
      }
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
      }
      this.props.createCart(data, (res) => this.createCartSuccessCallBack(res), (error) => this.createCartFailureCallBack(error));
      this.refreshCart();
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  myOrderListFailureCallBack = (error) => {
    try {
      this.props.stopSpinner();
      if (error) {
        setTimeout(() => {
          this.setState({ noProductFound: true });
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

  createCartSuccessCallBack = (res) => {
    console.log('@@@ Create Cart Success CallBack ===================', res, this.props.cartData);
  }

  createCartFailureCallBack = (error) => {
    try {
      console.log('@@@ Create Cart Failure CallBack ===================');
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
          // order_id: this.state.selectedOrderData.id,
          order_item_id: this.state.selectedOrderData.id,
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
      console.log('@@@ Submit Order Review Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('Review submitted successfully.', false);
      }, 0);
      this.resetStar();
      this.getMyOrderListData(false);
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


  handleBackButtonClick = () => {
    try {
      if (this.props.route.params && this.props.route.params.isFromOrderPlaced) {
        this.props.navigation.navigate('Home');
        return true;
      } else {
        this.props.navigation.goBack();
        return true;
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setNavigationHeaderConfiguration = () => {
    const { cartHasProductFlag, cartCount } = this.props;
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>My Orders</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.onPressBackButton()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
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

  onPressBackButton = () => {
    try {
      if (this.props.route.params && this.props.route.params.isFromOrderPlaced) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.goBack();
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

  cancelOrder = async () => {
    try {
      this.setState({ isCancleLoading: true, showCancelOrderModal: false })
      // this.props.showSpinner();
      let userID = await AsyncStorage.getItem('USER_ID');
      let myOrderList = this.state.cancelData;
      let formData = new FormData();
      formData.append('item_id[]', myOrderList.id)

      let data = {
        userID: userID,
        itemId: myOrderList.id,
        formData: formData,
        cartId: this.props.cartData.order.id,
        isFromMyOrder: true,
      }
      console.log('@@@ Cancel =========', formData, data);
      this.props.cancelOrder(data, (res) => this.cancelOrderSuccessCallBack(res), (error) => this.cancelOrderFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cancelOrderSuccessCallBack = (res) => {
    try {
      console.log('@@@ Cancel Order Success CallBack ===================', res);
      this.props.stopSpinner();
      this.setState({ pageCount: 1, isCancleLoading: false, showCancelOrderModal: false });
      setTimeout(() => {
        this.props.showErrorModal('Order cancelled successfully.', false);
      }, 0);
      this.getMyOrderListData(true);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cancelOrderFailureCallBack = (error) => {
    try {
      console.log('@@@ Cancel Order Failure Callback ===================', error);
      this.setState({ isCancleLoading: false, showCancelOrderModal: false });
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

  onEndReached = async () => {
    try {
      const { lastLoadCount, notFinalLoad, pageCount, limit, onEndReachedCalledDuringMomentum } = this.state;
      console.log('@@@ On End Reached ==============', onEndReachedCalledDuringMomentum, lastLoadCount, limit, notFinalLoad)
      if (!onEndReachedCalledDuringMomentum) {
        this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
          setTimeout(() => {
            if (
              lastLoadCount >= limit && notFinalLoad
            ) {
              this.setState(
                {
                  pageCount: this.state.pageCount + 1,
                  pageLoader: true
                },
                async () => {
                  this.props.startSpinner()
                  let userID = await AsyncStorage.getItem('USER_ID');
                  let data = {
                    userID: userID,
                    uuid: DeviceInfo.getUniqueId(),
                    pageCount: this.state.pageCount
                  }
                  this.props.myOrderList(
                    data,
                    (res) => this.myOrderListSuccessCallBack(res),
                    (error) => this.myOrderListFailureCallBack(error)
                  );
                })
            }
          }, 1500);
        });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });

  // Footer loader for Pagination  
  _renderSearchResultsFooter = () => {
    return this.state.pageLoader ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={'#000000'} />
      </View>
    ) : null;
  };


  renderEmptyAddressView = () => {
    return (
      <View style={styles.emtpyAddressContainer}>
        <View>
          <Image source={IMG_CONST.EMPTY_MY_ORDERS} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>No any order</Text>
          <Text style={styles.youhave}>You haven’t order any items, Browse items and order it</Text>
        </View>
        <GreenButton
          title="BROWSE PRODUCTS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
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

  renderProductItemListCell = (item, index, orderItem) => {
    console.log('@@@ item =============', item);
    if (item) {
      let isProductVarient = false;
      if (item.product_variant) {
        isProductVarient = true
      }
      let product_varient_images = item.product_variant;
      let productImage = '';

      if (
        product_varient_images &&
        product_varient_images.images.length > 0
      ) {
        productImage = item.product_variant.images[0].image;
      } else {
        productImage = item.product_images[0].image;
      }

      return (
        <View style={styles.rowContainer}>
          {orderItem.logistics_ship_rocket_enabled ? (orderItem.ship_rocket_status === 'delivered' || orderItem.ship_rocket_status === 'returned') && !orderItem.is_review_present && !orderItem.order_cancelled && <TouchableOpacity onPress={() => this.setState({ isInvalidReview: false, selectedOrderData: orderItem, showSubmitReviewModal: true })}>
            <Text style={styles.writeReview}>Write a Review</Text>
          </TouchableOpacity> : (item.status === 'delivered' || item.status === 'returned') && !item.is_review_present && !item.order_cancelled && <TouchableOpacity onPress={() => this.setState({ isInvalidReview: false, selectedOrderData: item, showSubmitReviewModal: true })}>
            <Text style={styles.writeReview}>Write a Review</Text>
          </TouchableOpacity>}
          {item.subscription_package && (
            <View style={styles.labelSticker}>
              <Text style={styles.stickerText}>SUBSCRIPTION</Text>
            </View>)}
          <View style={styles.row}>
            <Image source={{ uri: productImage }} style={styles.productImage} />
            <View style={styles.middleInfo}>
              <Text style={styles.productName}>{item.product_name}</Text>
              {isProductVarient && (
                <View style={styles.changeRow}>
                  <Text style={styles.periodText}>
                    {this.getVarientString(
                      item.product_variant.product_variant_properties,
                    )}
                  </Text>
                </View>
              )}
              <View style={styles.dateRow}>
                <Text style={styles.orderText}>Ordered on</Text>
                <Text style={styles.date}>{orderItem.order_date}</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={styles.priceValue}>₹ {item.unit_price_including_tax}</Text>
                {!item.subscription_package && <View style={styles.placedRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.placedText}>{orderItem.logistics_ship_rocket_enabled ? orderItem.ship_rocket_status === 'new' ? 'confirmed' : orderItem.ship_rocket_status : item.status}</Text>
                </View>}
                {item.subscription_package && <View style={styles.placedRow}>
                  <Text style={styles.package}>{item.preferred_delivery_slot ? this.getSlotString(item.preferred_delivery_slot) + ` ${item.preferred_delivery_slot} | ` : ""}</Text>
                  <Text style={styles.period}>{item.subscription_package.charAt(0).toUpperCase() +
                    item.subscription_package.slice(1)} for {item.subscription_period} Month</Text>
                </View>}
              </View>
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.quantity}>Quantity : {item.subscription_package ? item.subscription_quantity : item.quantity}</Text>
            </View>
          </View>
          {item.subscription_package && <Text style={styles.subscriptionPriceValue}>Subscription Amount: ₹ {item.total_price}</Text>}
          <View style={styles.line} />
        </View>
      )
    }
  }

  getSlotString = (slot) => {
    if (slot.includes("AM") || slot.includes("am")) return "Morning";
    return "Evening"
  }

  showBottomButton = (orderItem) => {
    switch (orderItem.status) {
      case "returned":
        return null
      case "refunded":
        return null
      case "delivered":
        return null;
      case "cancelled":
        return <TouchableOpacity disabled={true} style={styles.cancelContainer}>
          <Text style={styles.cancelOrder}>Cancelled</Text>
        </TouchableOpacity>
      default:
        return <TouchableOpacity
          onPress={() => this.setState({ cancelData: orderItem, showCancelOrderModal: true })}
          style={styles.cancelContainer}>
          <Text style={styles.cancelOrder}>Cancel Order From PreMyorderes</Text>
        </TouchableOpacity>;
    }
  }
  ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#dbdbdb',
        }}
      />
    );
  };
  // renderMyOrderCell = (orderItem, index) => {
  //   return (
  //     <View style={styles.cellContainer}>
  //       <View style={styles.orderRow}>
  //         <Text style={styles.orderNumber}>Order Number : {orderItem.order_number}</Text>
  //         {/* {orderItem.logistics_ship_rocket_enabled ? (orderItem.ship_rocket_status === 'delivered' || orderItem.ship_rocket_status === 'returned') && !orderItem.is_review_present && !orderItem.order_cancelled && <TouchableOpacity onPress={() => this.setState({ isInvalidReview: false, selectedOrderData: orderItem, showSubmitReviewModal: true })}>
  //           <Text style={styles.writeReview}>Write a Review</Text>
  //         </TouchableOpacity> : (orderItem.status === 'delivered' || orderItem.status === 'returned') && !orderItem.is_review_present && !orderItem.order_cancelled && <TouchableOpacity onPress={() => this.setState({ isInvalidReview: false, selectedOrderData: orderItem, showSubmitReviewModal: true })}>
  //           <Text style={styles.writeReview}>Write a Review</Text>
  //         </TouchableOpacity>} */}
  //       </View>
  //       {orderItem.order_items.map((item, index) => {
  //         return (
  //           <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrderDetails', { orderData: item, mainOrderData: orderItem })} style={styles.insideContainer}>
  //             {this.renderProductItemListCell(item, index, orderItem)}
  //           </TouchableOpacity>
  //         )
  //       })}
  //       <View style={styles.totalAmountContainer}>
  //         <Text style={styles.totalAmountText}>Total Amount: ₹ {orderItem.total}</Text>
  //       </View>
  //       {this.showBottomButton(orderItem)}
  //       {/* {
  //         orderItem.status !== 'delivered' && <TouchableOpacity
  //           disabled={orderItem.order_cancelled}
  //           onPress={() => this.setState({
  //             cancelData: orderItem,
  //             showCancelOrderModal: true
  //           })}
  //           style={styles.cancelContainer}>
  //           <Text
  //             style={styles.cancelOrder}
  //           >{!orderItem.order_cancelled
  //             ? 'Cancel Order'
  //             : 'Cancelled'
  //             }</Text>
  //         </TouchableOpacity>
  //       } */}
  //     </View>
  //   )
  // }  
  renderMyOrderCell = (orderItem, index) => {
    return (
      <View style={{ padding: 10 }}>
        {/* {orderItem.order_items.map((item, index) => {
            return ( */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrders'
          , { mainOrderData: orderItem, isFromPreMyOrders: true }
        )}
          key={index + 'orderItem'}
          style={styles.cellContainer}>

          <View style={styles.orderRow}>
            <Text style={styles.orderNumber}>Order Number : {orderItem.order_number}</Text>
            <View style={styles.placedRow}>
              <View style={styles.greenDot} />
              <Text style={styles.placedText}>{orderItem.logistics_ship_rocket_enabled ? orderItem.ship_rocket_status === 'new' ? 'confirmed' : orderItem.ship_rocket_status : orderItem.status}</Text>
            </View>
          </View>

          <View style={styles.totalAmountContainer}>
            <Text style={styles.orderedOnTitle}>Ordered On:
              <Text style={styles.orderedOnText}> {orderItem.order_date}</Text>
            </Text>
            <Text style={styles.totalAmountTitle}>Total Amount:
              <Text style={styles.totalAmountText}> ₹{orderItem.total}</Text>
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: verticalScale(8.2) }}>
            <Text style={styles.orderedOnTitle}>Delivery Time Slot : </Text>
            <Text style={[styles.orderedOnText]}>{orderItem.delivery_slot}</Text>
          </View>
        </TouchableOpacity>

        {/* // <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrderDetails', 
              // { orderData: item, mainOrderData: orderItem })}>
              //     <View style={{flexDirection:'row', marginBottom:10}}>
              //         <Text style={{marginRight:5,  color:'#5a6068'}}>Order Number :</Text>
              //         <Text style={{ color:'#5a6068'}}>{orderItem.order_number}</Text>
              //     </View> 
              //     <View style={{flexDirection:'row'}}>
              //       <View style={{flexDirection:'row' }}>
              //         <Text style={{color:'#a3a3a3'}}>Ordered On:</Text>
              //         <Text style={{marginRight:3, color:'#5a6068'}}>{orderItem.order_date}</Text>
              //       </View>
              //       <View style={{flexDirection:'row'}}>
              //         <Text style={{color:'#a3a3a3'}}>Total Amount: ₹ </Text>
              //         <Text style={{color:'#5a6068'}}>{orderItem.total}</Text>
              //       </View>
              //     </View> 
              // </TouchableOpacity> */}
        {/* //   )
          // })} */}
      </View>
    )

  }
  renderMyOrderList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.myOrderList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderMyOrderCell(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ItemSeparatorView}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.onEndReached()}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
        // ListFooterComponent={() => this._renderSearchResultsFooter()}
        />
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
            <View style={styles.bottomPopupView}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showCancelOrderModal: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity disabled={this.state.isCancleLoading} style={{ flex: 1, alignItems: 'center' }} onPress={() => this.cancelOrder()}>
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
                placeholderTextColor={COLOR_CONST.greyTextColor}
                underlineColorAndroid='transparent'
                returnKeyType={'done'}
                onChangeText={(text) => this.setState({ reviewText: text, isInvalidReview: false, })}
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
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={'#ffffff'} isFocused={true} />
        {!this.state.noProductFound && !this.state.isFetchingData && this.renderMyOrderList()}
        {this.state.noProductFound && this.renderEmptyAddressView()}
        {this.renderCancelOrderModal()}
        {this.renderSubmitReviewModal()}
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
    profileData: state.profile.profileData,
    cartData: state.cart.cartData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    myOrderList: (data, successCallBack, failureCallBack) => dispatch(cartActions.myOrderList(data, successCallBack, failureCallBack)),
    submitOrderReview: (data, successCallBack, failureCallBack) => dispatch(cartActions.submitOrderReview(data, successCallBack, failureCallBack)),
    createCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    cancelOrder: (data, successCallBack, failureCallBack) => dispatch(cartActions.cancelOrder(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreMyOrders);
