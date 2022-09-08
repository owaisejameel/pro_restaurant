import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, SafeAreaView, ScrollView, Modal, Share, BackHandler } from 'react-native';
import COLOR_CONST, { FONTS } from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import styles from './ProfileStyle';
import R from '../../R';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import LoadingImage from 'react-native-image-progress';
import * as USER_CONST from "../../utils/Constants";
import * as UserActions from '../../redux/actions/userActions';
import * as profileActions from '../../redux/actions/profileActions';
import * as filterActions from '../../redux/actions/filterActions';
import * as cartActions from '../../redux/actions/cartActions';
import DeviceInfo from 'react-native-device-info';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import scale from '../../utils/Scale';
import { fcmService } from '../../services/notifications/FCMService';
import CachedImage from '../../components/CachedImage';
import * as Sentry from '@sentry/react-native';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      profileImage: '',
      showProfileImage: false,
      showLogoutModal: false,
      isNotificationOn: true,
      helpCenterData: null,
      profileImageData: null,
      showGuestModal: false,
      showPickerModal: false,
    }
  }

  componentDidMount() {
    console.log('@@@ Profile ==============', this.props.profileData)
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      try {
        this.getHelpCenterData();
        this.refreshCart();
      } catch (err) {
        Sentry.captureException(err);
      }
      this.setNavigationHeaderConfiguration();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }
  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.profileIcon} />)
          : (
            <Image source={IMG_CONST.LOGO_ICON} style={styles.profileIcon} />
            // <Text>{progress * 100}</Text>
          )}
      </View>
    )
  }

  setNavigationHeaderConfiguration = () => {
    const { cartHasProductFlag, cartCount } = this.props;
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white, shadowColor: 'transparent', elevation: 0 },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Profile</Text></View>),
      headerRight: () => (
        <View />
        // <TouchableOpacity
        //   onPress={() => this.props.navigation.navigate('Cart')}>
        //   <Image source={IMG_CONST.CART_BLACK_ICON} style={styles.cartIcon} />
        //   {cartHasProductFlag && (
        //     <View
        //       style={{
        //         height: scale(20),
        //         width: scale(20),
        //         borderRadius: scale(30),
        //         backgroundColor: COLOR_CONST.primaryThemeGradient,
        //         borderColor: 'white',
        //         borderWidth: 0.9,
        //         position: 'absolute',
        //         top: scale(-10),
        //         end: scale(15),
        //         justifyContent: 'center',
        //         alignItems: 'center'
        //       }}
        //       ><Text style={{ fontSize: scale(10), color: COLOR_CONST.white, fontFamily: FONTS.GTWalsheimProRegular}}>{cartCount}</Text></View>
        //   )}
        // </TouchableOpacity>
      ),
    });
  };

  getHelpCenterData = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
      }
      this.props.getProfileData(data, (res) => this.getProfileDataSuccessCallBack(res), (error) => { });
      this.props.getHelpCenterDetails(data, (res) => this.getHelpCenterDetailsSuccessCallBack(res), (error) => this.getHelpCenterDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getProfileDataSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Profile Data success callback ===========', res);
      this.setState({ isNotificationOn: res.data.is_notification_enabled });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHelpCenterDetailsSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Help Center Data Success CallBack ===================', res);
      this.setState({ helpCenterData: res.data.help_centers })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHelpCenterDetailsFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Help Center Data Failure CallBack ===================', error);
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

  toggleSwitch = () => {
    try {
      this.setState({ isNotificationOn: !this.state.isNotificationOn }, () => {
        this.updateProfileNotification();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  // onPressCameraUploadImage = () => {
  //   try {
  //           ImagePicker.openCamera({
  //             mediaType: 'photo',
  //             compressImageQuality: 0.3,
  //             includeBase64: true,
  //             cropping: true,
  //           }).then(async image => {
  //               console.log('@@@ Selected Image Item =============', image);
  //               const source = { uri: image.path };
  //                   this.setState({ showProfileImage: true, profileImage: source, profileImageData: image }, () => this.updateProfileData());
  //           });
  //   } catch (e) {
  //       console.log('@@@ Error opening camera ==========', e);
  //   }
  // }

  onPressCameraUploadImage = () => {
    this.setState({ showPickerModal: true });

  }

  onPressCamera = () => {
    try {
      ImagePicker.openCamera({
        mediaType: 'photo',
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async (image) => {
        console.log('@@@ Selected Image Item =============', image);
        const source = { uri: image.path };
        this.setState(
          {
            showProfileImage: true,
            profileImage: source,
            profileImageData: image,
            showPickerModal: false,
          },
          () => this.updateProfileData(),
        );
      });
    } catch (e) {
      Sentry.captureException(e);
      console.log('@@@ Error opening camera ==========', e);
    }
  }

  onPressPickImage = () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async (image) => {
        console.log('@@@ Selected Image Item =============', image);
        const source = { uri: image.path };
        this.setState(
          {
            showProfileImage: true,
            profileImage: source,
            profileImageData: image,
            showPickerModal: false,
          },
          () => this.updateProfileData(),
        );
      });
    } catch (e) {
      Sentry.captureException(e);
      console.log('@@@ Error opening image picker ==========', e)
    }
  }

  renderImagePickerModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPickerModal}
        onRequestClose={() => {
          this.setState({ showPickerModal: false })
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.transparentBg} />
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => this.setState({ showPickerModal: false })}>
              <Image
                source={IMG_CONST.CROSS_ICONS}
                style={styles.crossIcon}
              />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => this.onPressCamera()} style={styles.leftButton}>
                <Image
                  source={IMG_CONST.CAMERA_ICONS}
                  style={styles.cameraIcon}
                />
                <Text style={styles.takePictureText}>{`TAKE PICTURE\nFROM CAMERA`}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressPickImage()} style={styles.rightButton}>
                <Image
                  source={IMG_CONST.GALLERY_ICON}
                  style={styles.cameraIcon}
                />
                <Text style={styles.takePictureText}>{`ADD FROM\nGALLERY`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  updateProfileNotification = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let formData = new FormData();
      formData.append("is_notification_enabled", this.state.isNotificationOn)
      let data = {
        profileData: formData,
        userID: userID,
      }
      console.log('@@@ Update Profile Data Notifications ==========', data);
      this.props.updateProfileData(data, (res) => this.updateProfileNotificationDataSuccessCallBack(res), (error) => this.updateProfileNotificationDataFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateProfileNotificationDataSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Update profile Data Notifications Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateProfileNotificationDataFailureCallBack = (error) => {
    try {
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

  updateProfileData = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let formData = new FormData();
      if (
        this.state.profileImageData.data &&
        !this.state.profileImageData.data.includes('https')
      ) {
        formData.append('is_base_64', true);
        formData.append(
          'profile_picture',
          'data:image/jpeg;base64,' + this.state.profileImageData.data,
        );
      }
      let data = {
        profileData: formData,
        userID: userID,
      };
      console.log('@@@ Update Profile Data ==========', data);
      this.props.updateProfileData(
        data,
        (res) => {
          return this.updateProfileDataSuccessCallBack(res);
        },
        (error) => {
          return this.updateProfileDataFailureCallBack(error);
        },
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateProfileDataSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Update profile Data Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('Your profile has been updated Successfully !', false);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateProfileDataFailureCallBack = (error) => {
    try {
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

  _signOut = async () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data)
        LoginManager.logOut();
    })
    //Remove user session from the device.
    try {
      const userInfo = await GoogleSignin.isSignedIn();
      if (userInfo)
        await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      Sentry.captureException(error);
      console.error('@@@ Error Logout =========', error);
    }
  };

  onPressLogout = async () => {
    try {
      this._signOut();
      let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
      let userToken = await AsyncStorage.getItem('USER_TOKEN');
      let data = {
        device_token: fcmToken,
        token: userToken
      }
      // this.props.startSpinner();
      this.setState({ showLogoutModal: false });
      this.props.onLogoutUser(data, (res) => this.onLogoutUserSuccessCallBack(res), (err) => this.onLogoutUserFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onLogoutUserSuccessCallBack = async () => {
    try {
      this.props.startSpinner();
      this.props.removeFilterData();
      fcmService.unRegister();
      console.log('@@@ Logout Success CallBack ===================');
      setTimeout(async () => {
        this.props.stopSpinner();
        await AsyncStorage.removeItem('USER_TOKEN');
        await AsyncStorage.removeItem('USER_ID');
        await AsyncStorage.removeItem('LOCATION_ACCESS');
        await AsyncStorage.removeItem('NOTIFICATION_ACCESS');
        this.props.navigation.replace('AuthNavigator');
        this.props.getProfileDataFailure();
      }, 2000);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onLogoutUserFailureCallBack = (error) => {
    try {
      console.log('@@@ Logout Failure CallBack ===================', error);
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.navigation.replace('AuthNavigator');
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=com.builder.ikyamart',
        // url: this.state.productData.product.deep_link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Sentry.captureException(error);
      alert(error.message);
    }
  }

  renderHeaderView = () => {
    let userData = this.props.profileData;
    // if(!userData)
    // return;
    // const sourceProfile = `data:image/jpeg;base64,${userData.base_64_profile_picture}`;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.leftRow}>
          <TouchableOpacity activeOpacity={1} onPress={() => userData && this.onPressCameraUploadImage()} style={styles.carmeraButton}>
            {/* <CachedImage
                  resizeMode={"contain"}
                  source={
                    userData ? userData.profile_picture?
                    userData.profile_picture :
                    IMG_CONST.CAMERA_ICON : IMG_CONST.CAMERA_ICON 
                  }
                  renderError={(error)=>console.log(error)}
                  renderIndicator={this.renderIndicator}
                  style={userData ? userData.profile_picture ? 
                    styles.profileIcon : styles.cameraIcon1 : styles.cameraIcon1}
                /> */}
            <LoadingImage
              resizeMode={"contain"}
              source={userData ? userData.profile_picture ?
                { uri: userData.profile_picture }
                : IMG_CONST.CAMERA_ICON : IMG_CONST.CAMERA_ICON}
              renderError={(error) => console.log(error)}
              renderIndicator={this.renderIndicator}
              style={userData ? userData.profile_picture ?
                styles.profileIcon : styles.cameraIcon1 : styles.cameraIcon1}

            />
            {/* <LoadingImage 
            source={userData ? userData.profile_picture ? 
            {uri: userData.profile_picture } 
            : IMG_CONST.CAMERA_ICON : IMG_CONST.CAMERA_ICON} 
            style={ userData ? userData.profile_picture ? 
            styles.profileIcon : styles.cameraIcon1 : styles.cameraIcon1} /> */}

          </TouchableOpacity>
          <View style={styles.propfileData}>
            <Text numberOfLines={1} style={styles.profileName}>{userData ? userData.name : 'Guest User'}</Text>
            <Text numberOfLines={1} style={styles.profileEmail}>{userData ? userData.email : ''}</Text>
          </View>
        </View>
        {userData && <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>}
      </View>
    )
  }

  renderListItems = () => {
    let userData = this.props.profileData;
    // if(!userData)
    // return;
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Wishlist')} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.WISHLIST_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Wishlist</Text>
          {userData && userData.wishlists_count !== 0 &&
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{userData ? userData.wishlists_count : 0}</Text>
            </View>}
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => userData ? this.props.navigation.navigate('PreMyOrders') : this.setState({ showGuestModal: true })} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.MYORDERS_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>My Orders</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => userData ? this.props.navigation.navigate('SavedAddresses') : this.setState({ showGuestModal: true })} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.SAVED_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Saved Addresses</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => this.onShare()} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.INVITE_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Share with Friend</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('PaymentInformationScreen')} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.CREDITCARD_ICON} style={styles.paymentIcon} />
          <Text style={styles.wishList}>Payment Information</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} /> */}
        <TouchableOpacity onPress={() => userData ? this.props.navigation.navigate('ConnectedAccounts') : this.setState({ showGuestModal: true })} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.CONNECTED_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Connected Accounts</Text>
        </TouchableOpacity>
        {/* {userData && !userData.is_socal_login && (
          <>
            <View style={styles.horizontalLine} />
            <TouchableOpacity onPress={() => userData ? this.props.navigation.navigate('ChangePassword') : this.setState({ showGuestModal: true })} style={styles.rowItemContainer}>
              <Image source={R.images.password} style={styles.leftIcon} />
              <Text style={styles.wishList}>Change Password</Text>
              </TouchableOpacity>
          </>
        )} */}
      </View>
    )
  }

  renderListBottomView = () => {
    let userData = this.props.profileData;
    return (
      <View style={styles.bottomListContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SaveContactUsScreen', { helpCenterData: this.state.helpCenterData, userData: this.props.profileData })} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.CONTACT_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Contact Us</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpCenter', { helpCenterData: this.state.helpCenterData })} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.HELP_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>Help Center</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileFAQ', { helpCenterData: this.state.helpCenterData })} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.FAQ_ICON} style={styles.leftIcon} />
          <Text style={styles.wishList}>FAQs</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity style={styles.rowItemContainer}>
          <Image source={IMG_CONST.NOTIFICATIONS_PROFILE_ICON} style={styles.notificationIcon} />
          <Text style={styles.wishList}>Notifications</Text>
          <TouchableOpacity onPress={() => userData ? this.toggleSwitch() : this.setState({ showGuestModal: true })}>
            <Image source={this.state.isNotificationOn ? IMG_CONST.NOTIF_ON_ICON : IMG_CONST.NOTIF_OFF_ICON} style={styles.notifIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => userData ? this.setState({ showLogoutModal: true }) : this.props.navigation.replace('AuthNavigator')} style={styles.rowItemContainer}>
          <Image source={IMG_CONST.LOGOUT_ICON} style={styles.logoutIcon} />
          <Text style={styles.wishList}>{userData ? 'Logout' : 'Log In'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderLogoutModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showLogoutModal}
        onRequestClose={() => {
          this.setState({ showLogoutModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => { }} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Logout</Text>
            <Text style={styles.areYouSure}>Are you sure you want to logout from IkyaMart?</Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showLogoutModal: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.onPressLogout()}>
                <Text style={styles.yesDelete}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  renderGuestModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => { }} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Please Sign Up/Log In first</Text>
            <Text style={styles.areYouSure}>You need an account to perform this action.</Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showGuestModal: false })}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showGuestModal: false }, () => this.props.navigation.replace('AuthNavigator'))}>
                <Text style={styles.yesDelete}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar statusBarTranslucent barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        <ScrollView>
          {this.renderHeaderView()}
          {this.renderListItems()}
          {this.renderListBottomView()}
          {this.renderLogoutModal()}
          {this.renderGuestModal()}
          {this.renderImagePickerModal()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
    profileData: state.profile.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    removeFilterData: () => dispatch(filterActions.removeFilterData()),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    onLogoutUser: (data, successCallBack, failureCallBack) => dispatch(UserActions.onLogoutUser(data, successCallBack, failureCallBack)),
    changePassword: (data, successCallBack, failureCallBack) => dispatch(profileActions.changePassword(data, successCallBack, failureCallBack)),
    getHelpCenterDetails: (data, successCallBack, failureCallBack) => dispatch(profileActions.getHelpCenterDetails(data, successCallBack, failureCallBack)),
    getProfileData: (data, successCallBack, failureCallBack) => dispatch(profileActions.getProfileData(data, successCallBack, failureCallBack)),
    getProfileDataFailure: () => dispatch(profileActions.getProfileDataFailure()),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    updateProfileData: (data, successCallBack, failureCallBack) => dispatch(profileActions.updateProfileData(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
