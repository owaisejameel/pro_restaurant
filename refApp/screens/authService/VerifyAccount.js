/**
 * Verify Account Screen
 */
import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import R from '../../R';
import GreenButton from '../../components/GreenButton';
import styles from './VerifyAccountStyle';
import ColorConstants from '../../theme/ColorConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import * as IMG_CONST from '../../theme/ImageConstants';
import {verticalScale} from '../../utils/Scale';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {connect} from 'react-redux';
import * as UserActions from '../../redux/actions/userActions';
import * as commonActions from '../../redux/actions/commonActions';
import AsyncStorage from '@react-native-community/async-storage';
import * as Validators from '../../utils/Validators';
import DeviceInfo from 'react-native-device-info';
import CountDown from 'react-native-countdown-component';

class VerifyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: this.props.route.params.email,
      isFromLogin: this.props.route.params.isFromLogin,
      emailError: false,
      passwordError: false,
      newPassword: true,
      password: '',
      email: true,
      passwordfocus: true,
      showAlertModal: false,
      errorMessage: '',
      sendLink: true,
      showTimer: true,
      startTimer: true,
      isOTPSent: true,
      showResendLink: false,
    };
  }

  onFocus(item) {
    if (item == 'email') this.setState({email: false, passwordfocus: true});
    else this.setState({email: true, passwordfocus: false});
  }

  newPasswordVisibility = () => {
    this.setState({newPassword: !this.state.newPassword});
  };

  onPressVerifyOTP = () => {
    if (
      this.state.emailInput.trim().length === 0 ||
      !Validators.isPhoneNoValid(this.state.emailInput)
    ) {
      this.setState({
        emailError: true,
        errorMessage: 'Invalid phone no.',
        showAlertModal: true,
      });
      return;
    }
    if (this.state.password.trim().length === 0 && this.state.isOTPSent) {
      this.setState({
        passwordError: true,
        errorMessage: `OTP can't be empty`,
        showAlertModal: true,
      });
      return;
    }
    let data = {
      confirmation_otp: this.state.password,
      phone_number: this.state.emailInput,
      uuid: DeviceInfo.getUniqueId()
    };
    if(this.state.isFromLogin){
      data["login_using_phone_number"] = true
    }
    this.props.confirmAccount(
      data,
      (res) => this.confirmAccountSuccessCallBack(res),
      (err) => this.confirmAccountFailureCallBack(err),
    );
  };

  confirmAccountSuccessCallBack = async (res) => {
    console.log(
      '@@@ Confirm Account Success CallBack ===================',
      res,
    );
    if(this.state.isFromLogin){
      let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
      data = {
        // email: this.state.emailInput,  
        password: 'password',  
        phone_number: this.state.emailInput,
        grant_type: "password",
        loginType: 1, 
        device_token: fcmToken,
        uuid: DeviceInfo.getUniqueId(),
      }
      // this.onLoginUserSuccessCallBack(res);
      this.props.onLoginUser(data, (res) => this.onLoginUserSuccessCallBack(res), (err) => this.onLoginUserFailureCallBack(err))
      return;
    }
    let userData = res.data.data;
    await AsyncStorage.setItem('USER_TOKEN', userData.token.access_token);
    await AsyncStorage.setItem('USER_ID', userData.user.id + '');
    setTimeout(() => {
      this.props.showErrorModal(
        'Your OTP is Verified. Welcome to IkyaMart.',
        false,
      );
      this.setState(
        {
          sendLink: true,
        },
        () => {
          setTimeout(() => {
            this.props.hideErrorModal();
            this.props.navigation.navigate('MainNavigator');
            this.setState({
              emailInput: '',
              password: '',
              sendLink: false,
              showTimer: false,
              startTimer: true,
              isOTPSent: false,
              showResendLink: false,
            });
          }, 2000);
        },
      );
    }, 0);
  };

  confirmAccountFailureCallBack = (error) => {
    if (error) {
      setTimeout(() => {
        this.setState({errorMessage: error}, () => {
          console.log(
            '@@@ Confirm Account Failure CallBack ===================',
            error,
          );
          this.setState({showAlertModal: true, password: ''});
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({errorMessage: 'Network Error!'}, () => {
          console.log(
            '@@@ Confirm Account Failure CallBack Network Error ===================',
          );
          this.setState({showAlertModal: true});
        });
      }, 0);
    }
  };



  onLoginUserSuccessCallBack = async(res) => {
    console.log('@@@ Login Success CallBack ===================', res);
    setTimeout(() => {
      this.props.showErrorModal('You have been Logged In Successfully', false);
      setTimeout(async () => {
        this.props.hideErrorModal();
        let userData = res.data.data;
        await AsyncStorage.setItem('USER_TOKEN', userData.token.access_token);
        await AsyncStorage.setItem('USER_ID', String(userData.user.id));
        this.props.navigation.replace('MainNavigator');
        this.setState({ emailInput: '',
        //  passwordInput: ''
        });
      }, 2000);
    }, 0);
  }

  onLoginUserFailureCallBack = (error) => {
    if(error) {
      setTimeout(() => {
        this.setState({ errorMessage: error }, () => {
          console.log('@@@ Login Failure CallBack ===================', error);
          this.setState({ showAlertModal: true });
          setTimeout(() => {
            if (this.state.errorMessage === 'Sorry, You need to confirm your account first.')
              this.onPressSendLink();
            }, 500);
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
  }

  onPressSendLink = () => {
    if (
      this.state.emailInput.trim().length === 0 ||
      !Validators.isPhoneNoValid(this.state.emailInput)
    ) {
      this.setState({
        emailError: true,
        errorMessage: 'Invalid phone no.',
        showAlertModal: true,
      });
      return;
    }
    let data = {
      phone_number: this.state.emailInput,
    };
    this.props.resendConfirmAccountToken(
      data,
      (res) => this.resendConfirmAccountTokenSuccessCallBack(res),
      (err) => this.resendConfirmAccountTokenFailureCallBack(err),
    );
  };

  resendConfirmAccountTokenSuccessCallBack = async (res) => {
    console.log(
      '@@@ Resend Confirm Account Success CallBack ===================',
      res,
    );
    this.setState({sendLink: true, isOTPSent: true, showTimer: true}, () => {});
  };

  resendConfirmAccountTokenFailureCallBack = (error) => {
    if (error) {
      setTimeout(() => {
        this.setState({errorMessage: error}, () => {
          console.log(
            '@@@ Send Link Failure CallBack ===================',
            error,
          );
          this.setState({showAlertModal: true});
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({errorMessage: 'Network Error!'}, () => {
          console.log(
            '@@@ Send Link Failure CallBack Network Error ===================',
          );
          this.setState({showAlertModal: true});
        });
      }, 0);
    }
  };

  onGuestLogin = () => {
    let data = {};
    data = {
      uuid: DeviceInfo.getUniqueId(),
    };
    this.props.createGuestUser(
      data,
      (res) => this.createGuestUserSuccessCallBack(res),
      (err) => this.createGuestUserFailureCallBack(err),
    );
  };

  createGuestUserSuccessCallBack = async (res) => {
    console.log(
      '@@@ Create Guest User Success CallBack ===================',
      res,
    );
    let userData = res.data.data;
    await AsyncStorage.setItem('GUEST_USER_TOKEN', userData.uuid);
    this.props.navigation.replace('MainNavigator');
    // this.setState({ emailInput: '', passwordInput: ''});
  };

  createGuestUserFailureCallBack = (error) => {
    if (error) {
      setTimeout(() => {
        this.setState({errorMessage: error}, () => {
          console.log(
            '@@@ Create Guest User Failure CallBack ===================',
            error,
          );
          this.setState({showAlertModal: true});
        });
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({errorMessage: 'Network Error!'}, () => {
          console.log(
            '@@@ Create Guest User Failure CallBack Network Error ===================',
          );
          this.setState({showAlertModal: true});
        });
      }, 0);
    }
  };

  resetErrors = () => {
    this.setState({
      emailError: false,
      passwordError: false,
      errorMessage: '',
    });
  };

  onCloseAlertModal = () => {
    this.setState({showAlertModal: false}, () => {
      this.resetErrors();
    });
  };

  renderTopHeader = () => {
    return (
      // <LinearGradient colors={[ColorConstants.primaryThemeGradient, ColorConstants.secondaryThemeGradient]} style={styles.innerContainer}>
      //     <Image style={{alignSelf: 'center', margin: 32}} source={require('../../assets/logo.png')} />
      // </LinearGradient>
      <LinearGradient colors={[ColorConstants.primaryThemeGradient, ColorConstants.secondaryThemeGradient]} style={styles.innerContainer}>
      <Image style={styles.homeoIcon} source={R.images.logo} />
    </LinearGradient>

    )
  }
  
  renderForgotHeader = () => {
    return (
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotTextHeader}>OTP Verification</Text>
      </View>
    )
  }

  renderAlertModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showAlertModal}
        onRequestClose={() => {
          this.onCloseAlertModal();
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.onCloseAlertModal()}
          style={styles.modalContainer}>
          <View style={styles.bottomView}>
            <Text style={styles.alertText}>{this.state.errorMessage}</Text>
            <TouchableOpacity onPress={() => this.onCloseAlertModal()}>
              <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  renderCounter() {
    if (this.state.showTimer) {
      return (
        <View style={styles.counterContainer}>
          <CountDown
            until={45}
            onFinish={() => this.setState({showResendLink: true})}
            digitStyle={styles.digitContainer}
            digitTxtStyle={styles.digitStyle}
            separatorStyle={styles.digitStyle}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
            running={this.state.startTimer}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: ColorConstants.paleGrey}}>
        {/* <SafeAreaView style={styles.container}> */}
          <FocusAwareStatusBar
            barStyle="light-content"
            backgroundColor={ColorConstants.primaryThemeGradient}
            isFocused={true}
          />
          <View style={styles.topContainer}>
            {this.renderForgotHeader()}
            {this.renderTopHeader()}
            <View style={styles.innerTopContainer}>
              {this.state.sendLink && (
                <Text style={styles.resetText}>
                  OTP has been sent to your Phone Number
                </Text>
              )}
              {!this.state.sendLink && (
                <Text style={styles.enterYourText}>
                  Enter your registered phone number and we’ll sent you a otp to reset
                  your password.
                </Text>
              )}
              <View style={styles.fieldContainer}>
                <View
                  style={
                    this.state.emailError
                      ? styles.errorSectionStyle
                      : this.state.email
                      ? styles.SectionStyle
                      : styles.SectionStyle1
                  }>
                  <Image
                    source={R.images.phoneIcon}
                    style={styles.ImageStyleEmail}
                  />
                  <TextInput
                    style={styles.input}
                    editable={!this.state.isOTPSent}
                    onFocus={() => this.onFocus('email')}
                    secureTextEntry={false}
                    placeholder="Email"
                    placeholderTextColor={
                      this.state.emailError
                        ? ColorConstants.pastelRed
                        : ColorConstants.coolGreyTwo
                    }
                    underlineColorAndroid="transparent"
                    value={this.state.emailInput}
                    onChangeText={(value) =>
                      this.setState({emailInput: value}, () => {
                        this.resetErrors();
                      })
                    }
                    autoCapitalize={false}
                  />
                </View>
                {this.state.isOTPSent && (
                  <View
                    style={[
                      this.state.passwordError
                        ? styles.errorSectionStyle
                        : this.state.passwordfocus
                        ? styles.SectionStyle
                        : styles.SectionStyle1,
                      {marginTop: verticalScale(13)},
                    ]}>
                    <Image source={R.images.key} style={styles.ImageStylekey} />
                    <TextInput
                      style={styles.input}
                      onFocus={() => this.onFocus('password')}
                      keyboardType={'number-pad'}
                      secureTextEntry={false}
                      maxLength={5}
                      placeholder="Enter OTP"
                      placeholderTextColor={
                        this.state.passwordError
                          ? ColorConstants.pastelRed
                          : ColorConstants.coolGreyTwo
                      }
                      underlineColorAndroid="transparent"
                      value={this.state.password}
                      onChangeText={(value) =>
                        this.setState({password: value}, () => {
                          this.resetErrors();
                        })
                      }
                      autoCapitalize={false}
                    />
                  </View>
                )}
                <GreenButton
                  title={this.state.isOTPSent ? 'OTP VERIFY' : 'SUBMIT'}
                  disabled={this.state.emailInput.trim() === ''}
                  customStyle={[
                    styles.loginButton,
                    {
                      opacity: this.state.emailInput.trim() === '' ? 0.5 : 1,
                      marginBottom:
                        this.state.isOTPSent || this.state.showResendLink
                          ? verticalScale(20.2)
                          : verticalScale(57.2),
                    },
                  ]}
                  customTxtStyle={styles.loginText}
                  onPress={() => {
                    if (!this.state.isOTPSent) this.onPressSendLink();
                    else this.onPressVerifyOTP();
                  }}
                />
                {this.state.isOTPSent &&
                  !this.state.showResendLink &&
                  this.renderCounter()}
                {this.state.showResendLink && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {isOTPSent: false, showResendLink: false},
                        () => {
                          this.onPressSendLink();
                        },
                      );
                    }}>
                    <Text style={styles.resendText}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* <View style={styles.bottomContainer}>
                    <TouchableOpacity  onPress={() => this.onGuestLogin()}>
                      <Text style={styles.skipText}>Skip & Continue as Guest</Text>
                    </TouchableOpacity>
                </View> */}
          </View>
        {/* </SafeAreaView> */}
        {this.renderAlertModal()}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    createGuestUser: (data, successCallBack, failureCallBack) => dispatch(UserActions.createGuestUser(data, successCallBack, failureCallBack),),
    resendConfirmAccountToken: (data, successCallBack, failureCallBack) => dispatch(UserActions.resendConfirmAccountToken(data, successCallBack, failureCallBack)),
    confirmAccount: (data, successCallBack, failureCallBack) => dispatch(UserActions.confirmAccount(data, successCallBack, failureCallBack)),
    onLoginUser: (data, successCallBack, failureCallBack) => dispatch(UserActions.onLoginUser(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
