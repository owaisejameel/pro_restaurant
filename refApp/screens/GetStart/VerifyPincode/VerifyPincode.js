/**
 * Forgot Password Screen
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
  StatusBar
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../../R';
import SegmentControl from 'react-native-segment-controller';
import GreenButton from '../../../components/GreenButton';
import styles from './VerifyPincodeStyle';
import { verticalScale } from '../../../utils/Scale';
import ColorConstants from '../../../theme/ColorConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import * as IMG_CONST from '../../../theme/ImageConstants';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import * as UserActions from '../../../redux/actions/userActions';
import * as setOtp from '../../../redux/actions/setOtp'
import {SET_OTP} from '../../../utils/Constants'
import AsyncStorage from '@react-native-community/async-storage';
import * as commonActions from '../../../redux/actions/commonActions';
import * as Validators from '../../../utils/Validators';
import CountDown from 'react-native-countdown-component';
import * as Sentry from '@sentry/react-native';

class VerifyPincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      emailError: false,
      passwordError: false,
      newPassword: true,
      password: '',
      email: true,
      passwordfocus: true,
      showAlertModal: false,
      errorMessage: '',
      sendLink: false,
      showTimer: false,
      startTimer: true,
      isOTPSent: false,
      showResendLink: false,
    };
  }

  onFocus(item) {
    if (item == 'email')
      this.setState({ email: false, passwordfocus: true });
    else
      this.setState({ email: true, passwordfocus: false });
  }

  newPasswordVisibility = () => {
    this.setState({newPassword: !this.state.newPassword});
  };

  onPressVerifyOTP = () => {
    try {
      if(this.state.emailInput.trim().length === 0 || !Validators.isPhoneNoValid(this.state.emailInput)) {
        this.setState({ emailError: true, errorMessage: 'Invalid phone no.', showAlertModal: true });
        return ;
      }
      if(this.state.password.trim().length === 0 && this.state.isOTPSent) {
        this.setState({ passwordError: true, errorMessage: `OTP can't be empty`, showAlertModal: true });
        return ;
      }
      let data = {
          otp: this.state.password
        }
      this.props.verifyOTP(data, (res) => this.verifyOTPSuccessCallBack(res), (err) => this.verifyOTPFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  verifyOTPSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Verify OTP Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('Your OTP is Verified. Please proceed next and reset your password.', false);
        this.setState({ 
          sendLink: true, 
        }, () => {
          setTimeout(() => {
            this.props.hideErrorModal();
            this.props.navigation.navigate('CreateNewPassword', { tokenValue: res.data.token });
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
        });
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  verifyOTPFailureCallBack = (error) => {
    try {
      if(error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ Verify OTP Failure CallBack ===================', error);
            this.setState({ showAlertModal: true });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Verify OTP Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true });
          });
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressSendLink = () => {
    try {
      if(this.state.emailInput.trim().length === 0 || !Validators.isPincodeValid(this.state.emailInput)) {
          this.setState({ emailError: true, errorMessage: 'Invalid Pincode', showAlertModal: true });
          return ;
      }
      let data = {
          "zipcode": this.state.emailInput
      }
      this.props.sendPincode(data, (res) => this.sendLinkSuccessCallBack(res), (err) => this.sendLinkFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendLinkSuccessCallBack = async(res) => {
    try {
      let setOtpforhome = this.state.emailInput
      // setOtpforhome ={
      //   setopt:this.state.emailInput
      // }
      console.log('@@@ Send Pincode Success CallBack ===================', res);
      this.props.setOTPfunction(setOtpforhome)
      setTimeout(() => {
         AsyncStorage.setItem('pincode', this.state.emailInput);
          this.props.showErrorModal("Delivery available for this location", false);
          setTimeout(async () => {
              this.props.hideErrorModal();
              this.props.navigation.replace('AuthNavigator');
          }, 2000);
        }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendLinkFailureCallBack = (error) => {
    try {
      if(error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ Send Pincode Failure CallBack ===================', error);
            this.setState({ showAlertModal: true },()=>{
              setTimeout(async () => {
                this.setState({ showAlertModal: false });
            }, 2000);
            });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Send Pincode Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true },()=>{
              setTimeout(async () => {
                this.setState({ showAlertModal: false });
            }, 2000);
            });
          });
        }, 0);
      }
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

  createGuestUserSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Create Guest User Success CallBack ===================', res);
      let userData = res.data.data;
      await AsyncStorage.setItem('GUEST_USER_TOKEN', userData.uuid);
      this.props.navigation.replace('MainNavigator');
      // this.setState({ emailInput: '', passwordInput: ''});
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createGuestUserFailureCallBack = (error) => {
    try {
      if(error) {
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

  resetErrors = () => {
    this.setState({
      emailError: false,
      passwordError: false,
      errorMessage: ''
    });
  }

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false }, () => {
      this.resetErrors();
    });
  }

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
        <Text style={styles.forgotTextHeader}>Pincode Verification</Text>
      </View>
    )
  }

  renderAlertModal = () => {
    return(
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

  renderCounter() {
    if(this.state.showTimer){
    return (
      <View style={styles.counterContainer}>
        <CountDown
          until={45}
          onFinish={() => this.setState({ showResendLink: true })}
          digitStyle={styles.digitContainer}
          digitTxtStyle={styles.digitStyle}
          separatorStyle={styles.digitStyle}
          timeToShow={['M','S']}
          timeLabels={{m: null, s: null}}
          showSeparator
          running={this.state.startTimer}
        />
      </View>
      );
    } else {
        return(
            <View/>
        )
    }
  }


  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: ColorConstants.paleGrey }}>
        {/* <SafeAreaView style={styles.container}> */}
        <FocusAwareStatusBar barStyle="light-content" backgroundColor={ColorConstants.primaryThemeGradient} isFocused={true} />
                <View style={{backgroundColor:ColorConstants.secondaryThemeGradient}}>
                {this.renderForgotHeader()}
                {this.renderTopHeader()}
                <View style={styles.innerTopContainer}>
                  {this.state.sendLink && <Text style={styles.resetText}>OTP has been sent to your phone number.</Text>}
                  {!this.state.sendLink && <Text style={styles.enterYourText}>Enter your Pincode to check our availability of delivery service</Text>}
                  <View style={styles.fieldContainer}>
                    <View style={this.state.emailError ? styles.errorSectionStyle : this.state.email ? styles.SectionStyle : styles.SectionStyle1}>
                        <Image source={R.images.pincode} style={styles.ImageStyleEmail} />
                        <TextInput
                          style={styles.input}
                          onFocus={() => this.onFocus('email')}
                          secureTextEntry={false}
                          keyboardType={'number-pad'}
                          placeholder="Pincode"
                          placeholderTextColor={this.state.emailError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                          underlineColorAndroid="transparent"
                          value={this.state.emailInput}
                          onChangeText={(value) => this.setState({ emailInput: value }, () => {
                            this.resetErrors();
                          })}
                          autoCapitalize='none'
                          editable={!this.state.isOTPSent}
                        />
                    </View>
                    {/* {this.state.isOTPSent && <View style={[this.state.passwordError ? styles.errorSectionStyle : this.state.passwordfocus ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13) }]}>
                        <Image source={R.images.key} style={styles.ImageStylekey} />
                        <TextInput
                          style={styles.input}
                          onFocus={() => this.onFocus('password')}
                          secureTextEntry={false}
                          keyboardType={'number-pad'}
                          placeholder="Enter OTP"
                          placeholderTextColor={this.state.passwordError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                          underlineColorAndroid="transparent"
                          value={this.state.password}
                          onChangeText={(value) => this.setState({ password: value }, () => {
                            this.resetErrors();
                          })}
                          autoCapitalize={false}
                        />
                    </View>} */}
                    <GreenButton
                        title={this.state.isOTPSent ? 'OTP VERIFY' : "SUBMIT"}
                        disabled={this.state.emailInput.trim() === ''}
                        customStyle={[styles.loginButton, { opacity: this.state.emailInput.trim() === '' ? 0.5 : 1, marginBottom: this.state.isOTPSent || this.state.showResendLink  ? verticalScale(57.2) : verticalScale(20.2) }]}
                        customTxtStyle={styles.loginText}
                        onPress={() => {
                        //   if(!this.state.isOTPSent)
                            this.onPressSendLink();
                        //   else
                        //     this.onPressVerifyOTP();
                        }}
                    />
                    {/* {this.state.isOTPSent && !this.state.showResendLink && this.renderCounter()}
                    {this.state.showResendLink && 
                    <TouchableOpacity onPress={() => {
                      this.setState({isOTPSent: false, showResendLink: false }, () => {
                        this.onPressSendLink()
                      });
                    }}><Text style={styles.resendText}>Resend OTP</Text></TouchableOpacity>} */}
                  
                    {/* <TouchableOpacity  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                      <Text style={styles.skipText}>Continue to Login</Text>
                    </TouchableOpacity> */}
             
                  </View>
                </View>
                </View>
          {/* </SafeAreaView> */}
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
      createGuestUser: (data, successCallBack, failureCallBack) => dispatch(UserActions.createGuestUser(data, successCallBack, failureCallBack)),
      sendLink: (data, successCallBack, failureCallBack) => dispatch(UserActions.sendLink(data, successCallBack, failureCallBack)),
      sendPincode: (data, successCallBack, failureCallBack) => dispatch(UserActions.sendPincode(data, successCallBack, failureCallBack)),
      verifyOTP: (data, successCallBack, failureCallBack) => dispatch(UserActions.verifyOTP(data, successCallBack, failureCallBack)),
     setOTPfunction: (setOtpforhome) => dispatch(setOtp.setotpfrom_verifiedOTP(setOtpforhome)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPincode);