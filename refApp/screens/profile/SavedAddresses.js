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
import styles from './SavedAddressesStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import * as cartActions from '../../redux/actions/cartActions';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import * as setOtp from '../../redux/actions/setOtp'
import * as Sentry from '@sentry/react-native';

class SavedAddresses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressList: [],
      isFetchingData: true,
      showDeleteModal: false,
      showUpdateAddressModal: false,
      selectedAddressData: '',
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    try {
      this.getAddressData();
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

  getAddressData = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', async() => {
      try {
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
        }
          this.props.getAddressList(data, (res) => this.getAddressListSuccessCallBack(res), (error) => this.getAddressListFailureCallBack(error));
      } catch (err) {
        Sentry.captureException(err);
      }
    });
  }
  
  getAddressListSuccessCallBack = (res) => {
    try {
      this.setState({
        isFetchingData: false,
        addressList: res.data.length === 0 ? [] : res.data
      })
      console.log('@@@ Get Address List Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getAddressListFailureCallBack = (error) => {
    try {
      this.setState({ isFetchingData: false });
      console.log('@@@ Get Address List Failure CallBack ===================');
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
  
  updateAddressData = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        addressId: this.state.selectedAddressData.id,
        is_default: true
      }
      this.props.updateAddress(data, (res) => this.updateAddressSuccessCallBack(res), (error) => this.updateAddressFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateAddressSuccessCallBack = (res) => {
    try {
      this.props.setOTPfunction(this.state.selectedAddressData.zip_code)
      AsyncStorage.setItem('pincode', this.state.selectedAddressData.zip_code);
      
      setTimeout( async() => {
        this.setState({
          isFetchingData: true,
        })
  
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
        }
          this.props.getAddressList(data, (res) => this.getAddressListSuccessCallBack(res), (error) => this.getAddressListFailureCallBack(error));
      }, 0);
      console.log('@@@ Update Address Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateAddressFailureCallBack = (error) => {
    try {
      this.setState({ isFetchingData: false });
      console.log('@@@ Update Address Failure CallBack ===================');
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

  deleteAddressData = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        addressId: this.state.selectedAddressData.id,
        is_default: !this.state.selectedAddressData.is_default
      }
      this.props.deleteAddress(data, (res) => this.deleteAddressSuccessCallBack(res), (error) => this.deleteAddressFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  deleteAddressSuccessCallBack = (res) => {
    try {
      setTimeout( async() => {
        this.setState({
          isFetchingData: true,
        })
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          userID: userID,
        }
          this.props.getAddressList(data, (res) => this.getAddressListSuccessCallBack(res), (error) => this.getAddressListFailureCallBack(error));
      }, 0);
      console.log('@@@ Delete Address Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  deleteAddressFailureCallBack = (error) => {
    try {
      this.setState({ isFetchingData: false });
      console.log('@@@ Delete Address Failure CallBack ===================');
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
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Saved Addresses</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  getDilveryDataAddress = async(addressData) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let reqAddressData;
      if(addressData.address_for === 'shipping') {
        reqAddressData = {
          delivery_address_id: addressData.id,
          userID: userID,
          cartId: this.props.cartData.order.id,
          address: {
          name: addressData.name,
          flat_no: addressData.flat_no,
          address: addressData.address,
          zip_code: addressData.zip_code,
          phone_number: addressData.phone_number,
          is_default: true,
          billing_address:{
            name: addressData.name,
            flat_no: addressData.flat_no,
            address: addressData.address,
            zip_code: addressData.zip_code,
            phone_number: addressData.phone_number,
            is_default: true, 
        }
        }
      } 
    } else if(addressData.address_for === 'billing') {
        reqAddressData = {
          delivery_address_id: addressData.id,
          userID: userID,
          cartId: this.props.cartData.order.id,
          address: {
          name: addressData.name,
          flat_no: addressData.flat_no,
          address: addressData.address,
          zip_code: addressData.zip_code,
          phone_number: addressData.phone_number,
          is_default: true,
          billing_address:{
            name: addressData.name,
            flat_no: addressData.flat_no,
            address: addressData.address,
            zip_code: addressData.zip_code,
            phone_number: addressData.phone_number,
            is_default: true, 
        }
        }
      }
    } else if(addressData.address_for === 'billing and shipping') {
        reqAddressData = {
          delivery_address_id: addressData.id,
          userID: userID,
          cartId: this.props.cartData.order.id,
          address: {
          name: addressData.name,
          flat_no: addressData.flat_no,
          address: addressData.address,
          zip_code: addressData.zip_code,
          phone_number: addressData.phone_number,
          is_default: true,
          billing_address:{
            name: addressData.name,
            flat_no: addressData.flat_no,
            address: addressData.address,
            zip_code: addressData.zip_code,
            phone_number: addressData.phone_number,
            is_default: true, 
        }
        }
      }
    }
    } catch (err) {
      Sentry.captureException(err);
    }
}

  saveAddress = async(addressData) => {
    // let localAddressList = this.state.addressList;
    // let selectedAddressIndex = localAddressList.findIndex((item) => item.is_default === true);
    // let addressData;
    // if(selectedAddressIndex === -1) {
    //   setTimeout(() => {
    //     this.props.showErrorModal('Please select default address!');
    // }, 0);
    //   return;
    // }
    // if(selectedAddressIndex !== -1)
    //  addressData = localAddressList[selectedAddressIndex];
    //  console.log('@@@ address ===========', addressData);
     this.props.route.params.onSetAddress(addressData);
     this.props.navigation.goBack();
    //   let userID = await AsyncStorage.getItem('USER_ID');
    //   let finalData = { 
    //     delivery_address_id: addressData.id,
    //     userID: userID,
    //     cartId: this.props.cartData.order.id,
    //     billing_same_as_shipping: true,
    //     address: {
    //     name: addressData.name,
    //     flat_no: addressData.flat_no,
    //     address: addressData.address,
    //     zip_code: addressData.zip_code,
    //     phone_number: addressData.phone_number,
    //     is_default: false,
    //     billing_address:{
    //       name: addressData.name,
    //       flat_no: addressData.flat_no,
    //       address: addressData.address,
    //       zip_code: addressData.zip_code,
    //       phone_number: addressData.phone_number,
    //       is_default: false,
    //     }
    //   }
    // } 
    //   if(this.props.route.params && this.props.route.params.isFromBuyNow) {
    //     finalData['cartId'] = this.props.route.params.buyNowResponse.data.order.id,
    //     this.props.addAddressForOrder(finalData, (res) => this.addAddressForOrderSuccessCallBack(res, finalData), (error) => this.addAddressForOrderFailureCallBack(error));
    //   } else {
    //     this.props.addAddressForOrder(finalData, (res) => this.addAddressForOrderSuccessCallBack(res, finalData), (error) => this.addAddressForOrderFailureCallBack(error));
    //   }
  }

  addAddressForOrderSuccessCallBack = (res, finalData) => {
    try {
      console.log('@@@ Add Address To Order Success CallBack ===================', res);
      if(this.props.route.params && this.props.route.params.isFromBuyNow) {
        this.props.navigation.navigate('BuyProductConfirmOrderScreen', { checkoutData: finalData, productData: this.props.route.params.productData, buyNowResponse: this.props.route.params.buyNowResponse, isFromSubscribe: this.props.route.params.isFromSubscribe });
      } else {
        this.props.navigation.navigate('ConfirmOrderScreen', { checkoutData: finalData, isFromSubscribe: this.props.route.params.isFromSubscribe });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addAddressForOrderFailureCallBack = (error) => {
    try {
      console.log('@@@ Add Address To Order Failure CallBack ===================');
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

  

  renderEmptyAddressView = () => {
    return (
      <View style={styles.emptyView}>
        <View>
          <Image source={R.images.emptyBuilding} style={styles.emptyBuilding} />
          <Text style={styles.noAddressSaved}>No addresses saved !</Text>
          <Text style={styles.noAddressDetail}>No adresses have been saved to the address list yet !</Text>
        </View>
        <GreenButton
          title="ADD AN ADDRESS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate('AddNewAddress', { isFromEdit: false })}
        />
      </View>
    )
  }

  renderAddressCell = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.props.route.params?.isFromCheckout && this.saveAddress(item)} style={styles.cellContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.locationPin}>
            <Image source={R.images.locationPin} style={styles.locationIcon} />
          </View>
          <View>
            <Text style={styles.addressName}>{item.name}</Text>
            <Text style={styles.addressText}>{item.flat_no} {item.address}, {item.city} {item.zip_code}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNewAddress', { isFromEdit: true, addressData: item, })}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine} />
          <TouchableOpacity onPress={() => this.setState({ selectedAddressData: item , showDeleteModal: true })}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.setState({ selectedAddressData: item , showUpdateAddressModal: true })} style={styles.tickStatus}>
          <Image source={!item.is_default ? IMG_CONST.BLANK_ADDRESS : IMG_CONST.TICK_ADDRESS} style={styles.tickAddress} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  renderAddressList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.addressList}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderAddressCell(item, index)}
          // ListFooterComponent={() => {
          //   return (
          //     <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNewAddress')}>
          //       <Text style={styles.addNewAddress}>Add New Address</Text>
          //     </TouchableOpacity>
          //   )
          // }}
        />
        <GreenButton 
          title="Add New Address"
          onPress={() => this.props.navigation.navigate('AddNewAddress')}
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
        />
      </View>
    )
  }

  renderDeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showDeleteModal}
        onRequestClose={() => {
          this.setState({ showDeleteModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Delete Address</Text>
            <Text style={styles.areYouSure}>Are you sure you want to delete the address ?</Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity onPress={() => this.setState({ showDeleteModal: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity onPress={() => this.setState({ showDeleteModal: false }, () => this.deleteAddressData())}>
                <Text style={styles.yesDelete}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
  
  renderUpdateAddressModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showUpdateAddressModal}
        onRequestClose={() => {
          this.setState({ showUpdateAddressModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Default Address</Text>
            <Text style={styles.areYouSure}>Are you sure you want to change your default address ?</Text>
            <Text style={styles.newDefaultAddress}>New Default Address</Text>
            <Text style={styles.defaultAddress}>{this.state.selectedAddressData.address}</Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity onPress={() => this.setState({ showUpdateAddressModal: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity onPress={() => this.setState({ showUpdateAddressModal: false }, () => this.updateAddressData() )} >
                <Text style={styles.yesDelete}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        <View style={styles.innerContainer}>
          {!this.state.isFetchingData && <>
          {this.state.addressList.length === 0 && this.renderEmptyAddressView()}
          {this.state.addressList.length !== 0 && this.renderAddressList()}
          </>}
          {/* {!this.state.isFetchingData && this.props.route.params && this.props.route.params.isFromCheckout && <GreenButton
            title="CONTINUE"
            customStyle={styles.loginButton}
            customTxtStyle={styles.loginText}
            onPress={() => this.saveAddress()}
          />} */}
        </View>
        {this.renderDeleteModal()}
        {this.renderUpdateAddressModal()}
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
    setOTPfunction: (setOtpforhome) => dispatch(setOtp.setotpfrom_verifiedOTP(setOtpforhome))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAddresses);