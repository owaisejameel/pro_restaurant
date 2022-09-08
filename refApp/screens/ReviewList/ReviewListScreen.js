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
  BackHandler
} from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import R from '../../R';
import GreenButton from '../../components/GreenButton';
import styles from './ReviewListScreenStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as productActions from '../../redux/actions/productActions';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';

class ReviewList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      ratingList: [1, 1, 1, 1, 1],
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    try {
      this.getReviewData();
    } catch (err) {
      Sentry.captureException(err);
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  getReviewData = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      try {
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
          productId: this.props.route.params.productData.product.id
        }
        this.props.getReviewList(data, (res) => this.getReviewListSuccessCallBack(res), (error) => this.getReviewListFailureCallBack(error));
      } catch (err) {
        Sentry.captureException(err);
      }
    });
  }

  getReviewListSuccessCallBack = (res) => {
    try {
      this.setState({ reviewList: res.data.review })
      console.log('@@@ Get Review List Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getReviewListFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Review List Failure CallBack ===================');
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
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Product Rating</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  renderReviewCell = (item, index) => {
    return (
      <View style={styles.reviewCell}>
        <View style={styles.nameRow}>
          <Text style={styles.reviewName}>{item.user_name}</Text>
          <Text style={styles.dateText}>{item.review_date}</Text>
        </View>
        <View style={styles.starListContainer}>
          {this.state.ratingList.map((starItem, index) => {
            return (
              <TouchableOpacity>
                <Image source={index < item.rating ? IMG_CONST.SELECTED_STAR : IMG_CONST.UNSELECTED_STAR} style={styles.listStar} />
              </TouchableOpacity>
            )
          })}
        </View>
        <Text style={styles.reviewText}>{item.comment}</Text>
        <View style={styles.listHorizontalLine} />
      </View>
    )
  }

  renderReviewList = () => {
    return (
      <View style={styles.reviewListContainer}>
        <FlatList
          data={this.state.reviewList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderReviewCell(item, index)}
        />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {this.renderReviewList()}
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
    getAddressList: (data, successCallBack, failureCallBack) => dispatch(profileActions.getAddressList(data, successCallBack, failureCallBack)),
    updateAddress: (data, successCallBack, failureCallBack) => dispatch(profileActions.updateAddress(data, successCallBack, failureCallBack)),
    deleteAddress: (data, successCallBack, failureCallBack) => dispatch(profileActions.deleteAddress(data, successCallBack, failureCallBack)),
    addAddressForOrder: (data, successCallBack, failureCallBack) => dispatch(cartActions.addAddressForOrder(data, successCallBack, failureCallBack)),
    getReviewList: (data, successCallBack, failureCallBack) => dispatch(productActions.getReviewList(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);