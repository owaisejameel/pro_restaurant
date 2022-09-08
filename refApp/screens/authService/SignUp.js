/**
 * SignUp Screen
 */
import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import R from '../../R';
import GreenButton from '../../components/GreenButton';
import styles from './SignUpStyle';
import { verticalScale } from '../../utils/Scale';
import ColorConstants from '../../theme/ColorConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions';
import * as profileActions from '../../redux/actions/profileActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as Validators from '../../utils/Validators';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import appleAuth from "@invertase/react-native-apple-authentication";
import * as Sentry from '@sentry/react-native';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      emailInput: '',
      // passwordInput: '',
      phoneNo: '',
      phoneNoError: false,
      nameError: false,
      passwordError: false,
      emailError: false,
      newPassword: true,
      email: true,
      phone: true,
      name: true,
      password: true,
      errorMessage: '',
      showAlertModal: false,
      incorrectEmailPassword: false,
      helpCenterList: null,
      privacyPolicy: null,
      termsPolicy: null,
    };
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    try {
      this.setupGoogleConfiguration();
      this.getHelpCenterData();
    } catch (err) {
      Sentry.captureException(err);
    }
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

  onFocus(item) {
    try {
      if (item == 'email')
        this.setState({ email: false, name: true, password: true, phone: true, })
      else if (item == 'name')
        this.setState({ name: false, password: true, email: true, phone: true })
      else if (item == 'phoneNo')
        this.setState({ name: true, password: true, email: true, phone: false })
      else
        this.setState({ email: true, name: true, password: false, phone: true })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  newPasswordVisibility = () => {
    try {
      this.setState({ newPassword: !this.state.newPassword });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  initUser = async (token) => {
    try {
      let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => {
          response.json().then((json) => {
            console.log('@@@ Facebook Login Response ============', json);
            let data = {
              access_token: token,
              provider: 'facebook',
              grant_type: "password",
              device_token: fcmToken,
              loginType: 2,
              uuid: DeviceInfo.getUniqueId()
            }
            this.props.onSocialLogin(data, (res) => this.onLoginUserSuccessCallBack(res), (err) => this.onLoginUserFailureCallBack(err))
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
        function (error) {
          console.log("Login fail with error: " + error);
        }
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressGoogleSignIn = async () => {
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
        let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
        console.log('@@@ Google SignIn Response =========== ', userInfo, userToken);
        let data = {
          access_token: userToken.accessToken,
          provider: 'google',
          grant_type: "password",
          device_token: fcmToken,
          loginType: 2,
          uuid: DeviceInfo.getUniqueId()
        }
        this.props.onSocialLogin(data, (res) => this.onLoginUserSuccessCallBack(res), (err) => this.onLoginUserFailureCallBack(err))
        this.setState({ userInfo: userInfo });
      } catch (error) {
        console.log('@@@ Message ==============================', error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User Cancelled the Login Flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Signing In');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play Services Not Available or Outdated');
        } else {
          console.log('Some Other Error Happened', error);
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressLoginWithApple = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      // const credentialState = await appleAuth.getCredentialStateForUser(
      //   appleAuthRequestResponse.user,
      // );

      // use credentialState response to ensure the user is authenticated
      // if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // user is authenticated
      console.log("appleAuthRequestResponse", appleAuthRequestResponse);
      console.log("identityToken", appleAuthRequestResponse.identityToken);
      let data = {
        access_token: appleAuthRequestResponse.identityToken,
        provider: 'apple',
        grant_type: "password",
        loginType: 2,
        uuid: DeviceInfo.getUniqueId()
      }
      this.props.onSocialLogin(data, (res) => this.onLoginUserSuccessCallBack(res), (err) => this.onLoginUserFailureCallBack(err))
      // }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onLoginUserSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Login Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('You have been Logged In Successfully', false);
        setTimeout(async () => {
          this.props.hideErrorModal();
          let userData = res.data.data;
          await AsyncStorage.setItem('USER_TOKEN', userData.token.access_token);
          await AsyncStorage.setItem('USER_ID', String(userData.user.id));
          this.props.navigation.replace('MainNavigator');
          this.setState({
            emailInput: '',
            // passwordInput: ''
          });
        }, 2000);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onLoginUserFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ Login Failure CallBack ===================', error);
            this.setState({ showAlertModal: true });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Login Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true });
          });
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  };

  resetErrors = () => {
    this.setState({
      nameError: false,
      passwordError: false,
      phoneNoError: false,
      emailError: false,
      errorMessage: ''
    });
  }

  onPressSignUp = async () => {
    try {
      if (this.state.nameInput.trim().length < 3 || !Validators.isNameValid(this.state.nameInput)) {
        this.setState({ nameError: true, errorMessage: `Name should contain minimum 3 characters`, showAlertModal: true });
        return;
      }
      if (this.state.emailInput.trim().length === 0 || !Validators.isEmailValid(this.state.emailInput)) {
        this.setState({ emailError: true, errorMessage: 'Invalid email.', showAlertModal: true });
        return;
      }
      if (this.state.phoneNo.trim().length === 0 || !Validators.isPhoneNoValid(this.state.phoneNo)) {
        this.setState({ phoneNoError: true, errorMessage: 'Invalid phone no.', showAlertModal: true });
        return;
      }
      // if(this.state.passwordInput.trim().length === 0 || !Validators.isPasswordValid(this.state.passwordInput)) {
      //   this.setState({ passwordError: true, errorMessage: 'Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)', showAlertModal: true });
      //   return ;
      // }
      let data = {};
      let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
      data = {
        user: {
          name: this.state.nameInput,
          email: this.state.emailInput,
          // password: this.state.passwordInput,
          phone_number: this.state.phoneNo,
          device_token: fcmToken,
        }
      }
      this.props.onSignUpUser(data, (res) => this.onSignUpUserSuccessCallBack(res), (err) => this.onSignUpUserFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onSignUpUserSuccessCallBack = async (res) => {
    try {
      let userData = res.data.data;
      // await AsyncStorage.setItem('USER_TOKEN', userData.token.access_token);
      // await AsyncStorage.setItem('USER_ID', String(userData.user.id));
      console.log('@@@ SignUp Success CallBack ===================', res);
      this.props.navigation.navigate('VerifyAccount', {
        email: this.state.phoneNo,
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onSignUpUserFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ SignUp Failure CallBack ===================', error);
            this.setState({ showAlertModal: true });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ SignUp Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true });
          });
        }, 1000);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onCloseAlertModal = () => {
    try {
      this.setState({ showAlertModal: false }, () => {
        this.resetErrors();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onGuestLogin = () => {
    try {
      let data = {};
      data = {
        uuid: DeviceInfo.getUniqueId()
      }
      this.props.createGuestUser(data, (res) => this.createGuestUserSuccessCallBack(res), (err) => this.createGuestUserFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createGuestUserSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Create Guest User Success CallBack ===================', res);
      let userData = res.data.data;
      await AsyncStorage.setItem('GUEST_USER_TOKEN', userData.uuid);
      await AsyncStorage.setItem('USER_ID', String(userData.id));
      this.props.navigation.replace('MainNavigator');
      // this.setState({ emailInput: '', passwordInput: ''});
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createGuestUserFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ Create Guest User Failure CallBack ===================', error);
            this.setState({ showAlertModal: true });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Create Guest User Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true });
          });
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHelpCenterData = async () => {
    try {
      let data = {
        uuid: DeviceInfo.getUniqueId(),
      }
      this.props.getHelpCenterDetails(data, (res) => this.getHelpCenterDetailsSuccessCallBack(res), (error) => this.getHelpCenterDetailsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHelpCenterDetailsSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Help Center Data Success CallBack ===================', res);
      this.setState({ helpCenterList: res.data.help_centers }, () => {
        let privacyIndex = this.state.helpCenterList.findIndex((item) => item.title.toLowerCase() === 'privacy policy');
        let termsIndex = this.state.helpCenterList.findIndex((item) => (item.title.toLowerCase() === 'terms of service'
          || item.title.toLowerCase() === 'terms & condition'
          || item.title.toLowerCase() === 'terms & conditions'
        ));
        if (privacyIndex !== -1) {
          this.setState({ privacyPolicy: this.state.helpCenterList[privacyIndex] });
        }
        if (termsIndex !== -1) {
          this.setState({ termsPolicy: this.state.helpCenterList[termsIndex] });
        }
      });
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

  renderAlertModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showAlertModal}
        onRequestClose={() => {
          this.onCloseAlertModal();
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => this.onCloseAlertModal()} style={styles.modalContainer}>
          <View style={styles.bottomView}>
            <Text style={styles.alertText}>{this.state.errorMessage}</Text>
            <TouchableOpacity onPress={() => this.onCloseAlertModal()}>
              <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }


  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: ColorConstants.paleGreyFive }} >
        <FocusAwareStatusBar barStyle="light-content" backgroundColor={ColorConstants.primaryThemeGradient} isFocused={true} />
        <View style={styles.container}>
          <View style={styles.innerTopContainer}>
            <View style={styles.fieldContainer}>
              <View style={this.state.nameError ? styles.errorSectionStyle : this.state.name ? styles.SectionStyle : styles.SectionStyle1}>
                <Image source={R.images.account} style={styles.ImageStyleAccount} />
                <TextInput
                  style={[styles.input, { color: this.state.nameError ? ColorConstants.pastelRed : this.state.name ? ColorConstants.charcoalGrey : ColorConstants.focusDarkColor }]}
                  onFocus={() => this.onFocus('name')}
                  placeholderTextColor={this.state.nameError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                  secureTextEntry={false}
                  placeholder="Full Name"
                  underlineColorAndroid="transparent"
                  value={this.state.nameInput}
                  onChangeText={(value) => this.setState({ nameInput: value }, () => {
                    this.resetErrors();
                  })}
                  autoCapitalize={false}
                />
              </View>
              <View style={[this.state.emailError ? styles.errorSectionStyle : this.state.email ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13) }]}>
                <Image source={R.images.email} style={styles.ImageStyleEmail} />
                <TextInput
                  style={[styles.input, { color: this.state.emailError ? ColorConstants.pastelRed : this.state.email ? ColorConstants.charcoalGrey : ColorConstants.focusDarkColor }]}
                  onFocus={() => this.onFocus('email')}
                  placeholderTextColor={this.state.emailError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                  secureTextEntry={false}
                  placeholder="Email"
                  underlineColorAndroid="transparent"
                  value={this.state.emailInput}
                  onChangeText={(value) => this.setState({ emailInput: value }, () => {
                    this.resetErrors();
                  })}
                  autoCapitalize={false}
                />
              </View>
              <View style={[this.state.phoneNoError ? styles.errorSectionStyle : this.state.phone ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13) }]}>
                <Image source={R.images.phoneIcon} style={styles.phoneImage} />
                <TextInput
                  style={[styles.input, { color: this.state.phoneNoError ? ColorConstants.pastelRed : this.state.email ? ColorConstants.charcoalGrey : ColorConstants.focusDarkColor }]}
                  onFocus={() => this.onFocus('phoneNo')}
                  placeholderTextColor={this.state.phoneNoError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                  secureTextEntry={false}
                  maxLength={10}
                  keyboardType={'number-pad'}
                  placeholder="Phone Number"
                  underlineColorAndroid="transparent"
                  value={this.state.phoneNo}
                  onChangeText={(value) => this.setState({ phoneNo: value }, () => {
                    this.resetErrors();
                  })}
                  autoCapitalize={false}
                />
              </View>
              {/* <View style={[this.state.passwordError ? styles.errorSectionStyle : this.state.password ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13)}]}>
                  <Image source={R.images.key} style={styles.ImageStylekey} />
                  <TextInput
                    style={[styles.input1, { color: this.state.passwordError ? ColorConstants.pastelRed : this.state.password ? ColorConstants.charcoalGrey : ColorConstants.focusDarkColor }]}
                    onFocus={() => this.onFocus('password')}
                    placeholderTextColor={this.state.passwordError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                    secureTextEntry={this.state.newPassword}
                    placeholder="Password"
                    underlineColorAndroid="transparent"
                    value={this.state.passwordInput}
                    onChangeText={(value) => this.setState({ passwordInput: value }, () => {
                      this.resetErrors();
                    })}
                    autoCapitalize={false}
                  />
                  <TouchableOpacity style={styles.eye} onPress={this.newPasswordVisibility}>
                    <Image source={this.state.newPassword ? R.images.eye : R.images.eyeClosed} style={this.state.newPassword ? styles.ImageStyleEye : styles.ImageStyleEyeClosed} />
                  </TouchableOpacity>
              </View> */}
              <GreenButton
                title="SIGN UP"
                disabled={this.state.emailInput.trim() === '' ||
                  // this.state.passwordInput.trim() === ''  || 
                  this.state.nameInput.trim() === '' || this.state.phoneNo.trim() === ''}
                customStyle={[styles.loginButton, {
                  opacity: this.state.emailInput.trim() === '' ||
                    //  this.state.passwordInput.trim() === ''  ||
                    this.state.nameInput.trim() === '' || this.state.phoneNo.trim() === '' ? 0.5 : 1
                }]}
                customTxtStyle={styles.loginText}
                onPress={() => this.onPressSignUp()}
              />
              {/* <TouchableOpacity onPress={() => this.onGuestLogin()}>
                <Text style={styles.skipText}>Skip & Continue as Guest</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.continueText}>or Sign up via</Text>
            <View style={styles.socialButtonContainer}>
              <TouchableOpacity onPress={() => this.onPressLoginWithFacebook()} style={styles.socialButton}>
                <Image source={R.images.facebook} style={styles.fStyle} />
                <Text style={styles.fbText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressGoogleSignIn()} style={[styles.socialButton, { backgroundColor: ColorConstants.pastelRed }]}>
                <Image source={IMG_CONST.GMAIL_ICON} style={styles.gStyle} />
                <Text style={styles.fbText}>Google</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.appleSocialButtonContainer}>
              {appleAuth.isSupported && Platform.OS === 'ios' && <TouchableOpacity
                onPress={() => this.onPressLoginWithApple()}
                style={[styles.appleSocialButton, {
                  backgroundColor: ColorConstants.black
                }]}>
                <Image source={R.images.apple} style={styles.aStyle} />
                <Text style={styles.fbText}>Sign in with Apple</Text>
              </TouchableOpacity>}
            </View>
            <Text style={styles.bySigningUp}>By Signing Up you agree with our</Text>
            <Text style={styles.termsAndConditionText}><Text onPress={() => this.state.termsPolicy && this.props.navigation.navigate('PrivacyPolicy', { helpCenterData: this.state.termsPolicy })}>Terms & Conditions</Text> & <Text onPress={() => this.state.privacyPolicy && this.props.navigation.navigate('PrivacyPolicy', { helpCenterData: this.state.privacyPolicy })}>Privacy Policy</Text></Text>
          </View>
        </View>
        {this.renderAlertModal()}
      </KeyboardAwareScrollView>
    );
  }
}


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    onSignUpUser: (data, successCallBack, failureCallBack) => dispatch(UserActions.onSignUpUser(data, successCallBack, failureCallBack)),
    createGuestUser: (data, successCallBack, failureCallBack) => dispatch(UserActions.createGuestUser(data, successCallBack, failureCallBack)),
    onSocialLogin: (data, successCallBack, failureCallBack) => dispatch(UserActions.onSocialLogin(data, successCallBack, failureCallBack)),
    getHelpCenterDetails: (data, successCallBack, failureCallBack) => dispatch(profileActions.getHelpCenterDetails(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);