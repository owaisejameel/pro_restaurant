import React, {Component} from 'react';
import { View, TouchableOpacity, Image, Text, Modal, BackHandler } from 'react-native';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import R from '../../R';
import styles from './ConnectedAccountsStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as productActions from '../../redux/actions/productActions';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';

class ConnectedAccounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDisconnectModal: false,
      socialAccountList: [],
      selectedAccountData: null,
      selectedAccountName: '',
      isFetching: true,
      userDetails: null,
      isFromFacebook: false,
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    try {
      this.setupGoogleConfiguration();
    } catch (err) {
      Sentry.captureException(err);
    }
    this._unsubscribe = this.props.navigation.addListener('focus', async() => {
      try {
        this.getConnectedSocialMediaData();
      } catch (err) {
        Sentry.captureException(err);
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  setupGoogleConfiguration = () => {
    try {
      //initial configuration
      GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        // Repleace with your webClientId generated from Firebase console
        webClientId: '72730076378-97pr4dhbrj38omiru8ng7l5v63uik07p.apps.googleusercontent.com',
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  getConnectedSocialMediaData = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
      }
      this.props.getSocialMediaAccountDetails(data, (res) => this.getSocialMediaAccountDetailsSuccessCallBack(res), (error) => this.getSocialMediaAccountDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  getSocialMediaAccountDetailsSuccessCallBack = (res) => {
    try {
      this.setState({ socialAccountList: res.data.social_accounts, userDetails: res.data.user, isFetching: false })
      console.log('@@@ Get Connected Social Media Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSocialMediaAccountDetailsFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Connected Social Media Failure CallBack ===================');
      this.setState({ isFetching: false })
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

  addSocialMediaAccountDetails = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
      }
      this.props.addSocialMediaAccountDetails(data, (res) => this.addSocialMediaAccountDetailsSuccessCallBack(res), (error) => this.addSocialMediaAccountDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  addSocialMediaAccountDetailsSuccessCallBack = (res) => {
    try {
      this._signOut();
      console.log('@@@ Add Social Media Success CallBack ===================', res);
      this.getConnectedSocialMediaData();
      let accountName = this.state.selectedAccountName;
      let msg = '';
      if(accountName === 'Google') {
        msg = 'Google account added successfully.'
      } else if( accountName === 'Facebook') {
        msg = 'Facebook account added successfully.'
      }
      this.getConnectedSocialMediaData();
      setTimeout(() => {
        this.props.showErrorModal(msg, false);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addSocialMediaAccountDetailsFailureCallBack = (error) => {
    try {
      this._signOut();
      console.log('@@@ Add Social Media Failure CallBack ===================');
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

  removeSocialMediaAccountDetails = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        socialId: this.state.selectedAccountData.id
      }
      this.props.removeSocialMediaAccountDetails(data, (res) => this.removeSocialMediaAccountDetailsSuccessCallBack(res), (error) => this.removeSocialMediaAccountDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  removeSocialMediaAccountDetailsSuccessCallBack = (res) => {
    try {
      this._signOut();
      let accountName = this.state.selectedAccountData.provider;
      let msg = '';
      if(accountName === 'google') {
        msg = 'Google account removed successfully.'
      } else if( accountName === 'facebook') {
        msg = 'Facebook account removed successfully.'
      }
      this.getConnectedSocialMediaData();
      setTimeout(() => {
        this.props.showErrorModal(msg, false);
      }, 0);
      console.log('@@@ Remove Social Media Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeSocialMediaAccountDetailsFailureCallBack = (error) => {
    try {
      this._signOut();
      console.log('@@@ Remove Social Media Failure CallBack ===================');
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
          headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Connected Accounts</Text></View>),
          headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON}style={styles.backIcon}/></TouchableOpacity>),
      })
  }

  initUser = (token) => {
    try {
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => {
              response.json().then(async(json) => {
                  console.log('@@@ Facebook Login Response ============', json);
                  let userID = await AsyncStorage.getItem('USER_ID');
                  let data =  {
                    uid: json.id,  
                    display_name: json.name,
                    provider: 'facebook',
                    userID: userID,
                  }
                  this.setState({ selectedAccountName: 'Facebook'})
                  this.props.addSocialMediaAccountDetails(data, (res) => this.addSocialMediaAccountDetailsSuccessCallBack(res), (error) => this.addSocialMediaAccountDetailsFailureCallBack(error));
                })
          })
          .catch(() => {
              console.log('ERROR GETTING DATA FROM FACEBOOK')
          })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressLoginWithFacebook = () => {
    try {
      if (Platform.OS === "android") {
        LoginManager.setLoginBehavior("web_only")
      }
      LoginManager.logInWithPermissions(["public_profile", "email"]).then((result) => {
          console.log('@@@ Result============', result);
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              const { accessToken } = data
              console.log('@@@ Access Token ===========', accessToken);
              this.initUser(accessToken)
            })
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressGoogleSignIn = async() => {
    try {
      //Prompts a modal to let the user sign in into your application.
      try {
         await GoogleSignin.hasPlayServices({
           //Check if device has Google Play Services installed.
           //Always resolves to true on iOS.
           showPlayServicesUpdateDialog: true,
         });
         const userInfo = await GoogleSignin.signIn();
         const userToken = await GoogleSignin.getTokens();
         console.log('@@@ Google SignIn Response =========== ', userInfo, userToken);
         let userID = await AsyncStorage.getItem('USER_ID');
         let data =  {
           uid: userInfo.user.id,  
           display_name: userInfo.user.name,
           provider: 'google',
           userID: userID,
         }
         this.setState({ selectedAccountName: 'Google'})
         this.props.addSocialMediaAccountDetails(data, (res) => this.addSocialMediaAccountDetailsSuccessCallBack(res), (error) => this.addSocialMediaAccountDetailsFailureCallBack(error));
         this.setState({ userInfo: userInfo });
     } catch (error) {
         console.log('Message', error.message);
         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
           console.log('User Cancelled the Login Flow');
         } else if (error.code === statusCodes.IN_PROGRESS) {
           console.log('Signing In');
         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
           console.log('Play Services Not Available or Outdated');
         } else {
           console.log('Some Other Error Happened');
         }
     }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  _signOut = async () => {
    try {
      AccessToken.getCurrentAccessToken().then((data) => {
          if(data)
            LoginManager.logOut();
      })
      //Remove user session from the device.
      try {
        const userInfo = await GoogleSignin.isSignedIn();
        if(userInfo)
          await GoogleSignin.signOut();
        this.setState({ userInfo: null }); // Remove the user from your app's state as well
      } catch (error) {
        console.error('@@@ Error Logout =========', error);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderFacebookConnectedAccountView = (accountItem) => {
    return (
      <View style={styles.connectedListCell}>
        <View style={styles.leftRow}>
          <Image style={styles.icon} source={R.images.faceBook} />
          <View style={styles.connectedStatus}>
            <Text style={styles.connected}>Connected as</Text>
            <Text>{accountItem.display_name ? accountItem.display_name : this.state.userDetails.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setState({ selectedAccountData: accountItem, showDisconnectModal: true, isFromFacebook: true, })}>
          <Image style={styles.cross} source={IMG_CONST.CROSS_ICON2} />
        </TouchableOpacity>
      </View>
    )
  }

  renderGoogleConnectedAccountView = (accountItem) => {
    return (
      <View style={styles.connectedListCell}>
        <View style={styles.leftRow}>
          <Image style={styles.icon} source={R.images.googlePlus} />
          <View style={styles.connectedStatus}>
            <Text style={styles.connected}>Connected as</Text>
            <Text>{accountItem.display_name ? accountItem.display_name : this.state.userDetails.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setState({ selectedAccountData: accountItem, showDisconnectModal: true, isFromFacebook: false, })}>
          <Image style={styles.cross} source={IMG_CONST.CROSS_ICON2} />
        </TouchableOpacity>
      </View>
    )
  }

  renderFacebookConnectAccountView = () => {
    return (
      <TouchableOpacity onPress={() => this.onPressLoginWithFacebook()} style={styles.connectedListBottomCell}>
        <Image style={styles.icon} source={R.images.faceBook} />
        <View style={styles.connectedStatus}>
          <Text>Connect Facebook Account</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderGoogleConnectAccountView = () => {
    return (
      <TouchableOpacity onPress={() => this.onPressGoogleSignIn()} style={styles.connectedListBottomCell}>
        <Image style={styles.icon} source={R.images.googlePlus} />
        <View style={styles.connectedStatus}>
          <Text>Connect Google Account</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSocialViews = (accountItem) => {
    switch (accountItem.provider) {
      case 'facebook':
        return this.renderFacebookConnectedAccountView(accountItem);
      case 'google':
        return this.renderGoogleConnectedAccountView(accountItem);
      default:
        break;
    }
  }

  renderSocialConnectView = (itemCode) => {
    let faceBookIndex = this.state.socialAccountList.findIndex((item) => item.provider === 'facebook');
    let googleIndex = this.state.socialAccountList.findIndex((item) => item.provider === 'google');
    console.log('@@@ index =======', faceBookIndex, googleIndex)
    switch (itemCode) {
      case 0:
          if(faceBookIndex === -1) {
            return this.renderFacebookConnectAccountView();
          }
        break;
      case 1:
          if(googleIndex === -1) {
            return this.renderGoogleConnectAccountView();
          }
        break;
      default:
        break;
    }
  }

  renderConnectedAccounts = () => {
    return (
      <View style={styles.connectedAccountContainer}>
        {this.state.socialAccountList.map((socialItem, index) => {
          return (
            <View>
              {this.renderSocialViews(socialItem)}
            </View>
          )
        })}
        {!this.state.isFetching && this.renderSocialConnectView(0)}
        {! this.state. isFetching && this.renderSocialConnectView(1)}
      </View>
    )
  }

  renderDisconnectModal = () => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showDisconnectModal}
            onRequestClose={() => {
                this.setState({ showDisconnectModal: false })
            }}
        >
            <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ showDisconnectModal: false })} style={styles.modalContainer}>
              <View style={styles.popup}>
                <Text style={styles.deleteAddress}>Disconnect {this.state.isFromFacebook ? 'Facebook' : 'Google'}</Text>
                <Text style={styles.areYouSure}>Are you sure you want to disconnect your {this.state.isFromFacebook ? 'facebook' : 'google'} account from IkyaMart?</Text>
                <View style={styles.horizontalLine} />
                <View style={styles.bottomPopupView}>
                  <TouchableOpacity onPress={() => this.setState({ showDisconnectModal: false })}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({ showDisconnectModal: false }, () => this.removeSocialMediaAccountDetails())}>
                    <Text style={styles.yesDelete}>Disconnect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
        </Modal>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {this.renderConnectedAccounts()}
        {this.renderDisconnectModal()}
      </View>
  );
}
}

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
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getAddressList: (data, successCallBack, failureCallBack) => dispatch(profileActions.getAddressList(data, successCallBack, failureCallBack)),
    updateAddress: (data, successCallBack, failureCallBack) => dispatch(profileActions.updateAddress(data, successCallBack, failureCallBack)),
    deleteAddress: (data, successCallBack, failureCallBack) => dispatch(profileActions.deleteAddress(data, successCallBack, failureCallBack)),
    getSocialMediaAccountDetails: (data, successCallBack, failureCallBack) => dispatch(profileActions.getSocialMediaAccountDetails(data, successCallBack, failureCallBack)),
    addSocialMediaAccountDetails: (data, successCallBack, failureCallBack) => dispatch(profileActions.addSocialMediaAccountDetails(data, successCallBack, failureCallBack)),
    removeSocialMediaAccountDetails: (data, successCallBack, failureCallBack) => dispatch(profileActions.removeSocialMediaAccountDetails(data, successCallBack, failureCallBack)),
    addAddressForOrder: (data, successCallBack, failureCallBack) => dispatch(cartActions.addAddressForOrder(data, successCallBack, failureCallBack)),
    getReviewList: (data, successCallBack, failureCallBack) => dispatch(productActions.getReviewList(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAccounts);