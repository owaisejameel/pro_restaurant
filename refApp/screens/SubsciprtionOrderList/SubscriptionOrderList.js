import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Alert
} from 'react-native';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import styles from './SubscriptionOrderListStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import * as cartActions from '../../redux/actions/cartActions';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';
import * as Sentry from '@sentry/react-native';

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].id === a[j].id)
        a.splice(j--, 1);
    }
  }

  return a;
};

class SubscriptionOrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subscriptionOrders: [],
      page: 1,
      per_page: 10,
      meta: undefined,
      onEndReachedCalledDuringMomentum: true,
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      try {
        this.getSubcriptionData();
      } catch (err) {
        Sentry.captureException(err);
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  getSubcriptionData = async () => {
    try {
      const orderData = this.props.route.params.orderData;
      if (orderData.subscription_package) {
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
          id: orderData.id,
          page: this.state.page,
        }
        console.log('Subscription order');
        this.props.getSubscrptionOrders(data, (res, meta) => this.getSubscrptionOrdersSuccess(res, meta), (error) => this.getSubscrptionOrdersFailure(error))
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscrptionOrdersSuccess = (res, meta) => {
    try {
      console.log("Subscription order details responce: ", meta);
      console.log("Subscription meta end reached 3 if true", meta);
      const updatedArray = this.state.subscriptionOrders.concat(res).unique();
      // const updatedSet = new Set(updatedArray);
      // const finalArray = Array.from(updatedSet)
      // const state = meta.next_page
      this.setState({ subscriptionOrders: updatedArray, meta: meta, onEndReachedCalledDuringMomentum: meta.next_page ? false : true });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscrptionOrdersFailure = (error) => {
    try {
      console.log("@@@ Get subscription order failure : ", err);
      console.log("Subscription meta end reached 3 if true", err);
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

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Subscription Orders</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  onEndReached = () => {
    try {
      console.log("Subscription meta end reached", this.state.meta, this.state.onEndReachedCalledDuringMomentum);
      const { meta } = this.state;
      if (!this.state.onEndReachedCalledDuringMomentum) {
        this.setState({ onEndReachedCalledDuringMomentum: true })
        console.log("Subscription meta end reached 1 if true", meta);
        if (meta.next_page && this.state.page <= meta.total_pages) {
          console.log("Subscription meta end reached 2 if true",);
          this.setState((prevState) => ({ page: prevState.page + 1 }), () => this.getSubcriptionData())
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });

  renderSubscriptionCell = (item, index) => {
    const orderData = this.props.route.params.orderData;
    let productImage = orderData.product_image;
    return (
      <View style={styles.statusView}>
        <View style={styles.tickView}>
          <Image source={item.status === 'delivered' ? IMG_CONST.TICK_ICON : IMG_CONST.DOT_ICON} style={styles.tickIcon} />
          <View style={styles.orderStatusVerticalLine} />
        </View>
        <View style={styles.rightInfo}>
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
    )
  }

  getSlotString = (slot) => {
    if (slot.includes("AM") || slot.includes("am")) return "Morning";
    return "Evening"
  }

  onPressCancelDelivery = (subscriptionOrderId) => {
    try {
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
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onCancelDelivery = async (subscriptionOrderId) => {
    try {
      const orderData = this.props.route.params.orderData;
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        id: orderData.id,
        subscriptionId: subscriptionOrderId
      }
      this.props.extendDelivery(data, (res) => this.cancelOrderSuccess(res), (err) => this.cancelOrderFailure(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cancelOrderSuccess = (res) => {
    try {
      console.log("@@@ Extend order success :", res);
      this.setState({ subscriptionOrders: [], page: 1, meta: undefined, onEndReachedCalledDuringMomentum: true }, () => this.getSubcriptionData())
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  renderSubscriptionList = () => {
    return (
      <View style={styles.reviewListContainer}>
        <FlatList
          data={this.state.subscriptionOrders}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderSubscriptionCell(item, index)}
          onEndReached={() => this.onEndReached()}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
          onEndReachedThreshold={0.01}
        />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {this.renderSubscriptionList()}
      </SafeAreaView>
    );
  }
};

const mapStateToProps = state => {
  return {
    cartHasProductFlag: state.cart.cartHasProduct,
    profileData: state.profile.profileData,
    cartData: state.cart.cartData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getSubscrptionOrders: (data, successCallBack, failureCallBack) => dispatch(cartActions.getSubcriptionOrders(data, successCallBack, failureCallBack)),
    extendDelivery: (data, successCallBack, failureCallBack) => dispatch(cartActions.extendDelivery(data, successCallBack, failureCallBack))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionOrderList);