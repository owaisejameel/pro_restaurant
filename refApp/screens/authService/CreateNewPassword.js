/**
 * Create New Password Screen
 */
import React from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../R';
import SegmentControl from 'react-native-segment-controller';
import GreenButton from '../../components/GreenButton';
import styles from './CreateNewPasswordStyle';
import { verticalScale } from '../../utils/Scale';
import ColorConstants from '../../theme/ColorConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import * as IMG_CONST from '../../theme/ImageConstants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as Validators from '../../utils/Validators';
import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';

class CreateNewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: true,
      passwordfocus: true,
      confirmPasswordfocus: true,
      tokenPasswordFocus: true,
      confirmPasswordEye: true,
      password: '',
      confirmPassword: '',
      passwordToken: '',
      passwordError: false,
      confirmPasswordError: false,
      passwordTokenError: false,
      showAlertModal: false,
      passwordDidntMatch: false,
      errorMessage: ''
    };
  }

  onFocus(item) {
    try {
      console.log('@@@ item ========', item);
      if (item == 'password')
        this.setState({ passwordfocus: false, confirmPasswordfocus: true, tokenPasswordFocus: true })
      else if (item === 'tokenPassword')
        this.setState({ passwordfocus: true, confirmPasswordfocus: true, tokenPasswordFocus: false })
      else
        this.setState({ passwordfocus: true, confirmPasswordfocus: false, tokenPasswordFocus: true })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  newPasswordVisibility = () => { this.setState({ newPassword: !this.state.newPassword }); };

  newPasswordVisibility1 = () => { this.setState({ confirmPasswordEye: !this.state.confirmPasswordEye }); };

  onResetPassword = async () => {
    try {
      this.resetErrors();
      if (this.state.password.trim().length === 0 || !Validators.isPasswordValid(this.state.password)) {
        this.setState({ passwordError: true, errorMessage: 'Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)', showAlertModal: true });
        return;
      }
      if (this.state.confirmPassword.trim().length === 0 || !Validators.isPasswordValid(this.state.confirmPassword)) {
        this.setState({ confirmPasswordError: true, errorMessage: 'Enter a password with alphabets A-z, number and a symbol(minimum 6 characters long)', showAlertModal: true });
        return;
      }
      if (this.state.confirmPassword.trim() !== this.state.password.trim()) {
        this.setState({ confirmPasswordError: true, errorMessage: `Password & Confirm Password doesn't match`, showAlertModal: true });
        return;
      }
      // if(this.state.passwordToken.trim().length < 5) {
      //   this.setState({ passwordTokenError: true, errorMessage: 'Token is too short (minimum is 5 characters)', showAlertModal: true });
      //   return ;
      // }
      let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
      let data = {
        user: {
          reset_password_token: this.props.route.params.tokenValue,
          password: this.state.password,
          device_token: fcmToken,
        }
      }
      this.props.resetPassword(data, (res) => this.resetPasswordSuccessCallBack(res), (err) => this.resetPasswordFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  resetPasswordSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Reset Password Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal(res.data.message, false);
        setTimeout(() => {
          this.props.hideErrorModal();
          this.props.navigation.replace('LoginScreen');
        }, 3000);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  resetPasswordFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ Reset Password Failure CallBack ===================', error);
            this.setState({ showAlertModal: true });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Reset Password Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true });
          });
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  resetErrors = () => {
    try {
      this.setState({
        passwordError: false,
        confirmPasswordError: false,
        passwordTokenError: false,
        passwordfocus: true,
        confirmPasswordfocus: true,
        tokenPasswordFocus: true,
        errorMessage: ''
      });
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

  renderTopHeader = () => {
    return (
      <LinearGradient colors={[ColorConstants.primaryThemeGradient, ColorConstants.secondaryThemeGradient, ColorConstants.secondaryThemeGradient, ColorConstants.secondaryThemeGradient, ColorConstants.secondaryThemeGradient]} style={styles.innerContainer}>
        <Image style={{ alignSelf: 'center', height: 120, width: 210 }} source={require('../../assets/logo.png')} />
      </LinearGradient>
    )
  }

  renderForgotHeader = () => {
    return (
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotTextHeader}>Create New Password</Text>
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
      <KeyboardAwareScrollView style={{ backgroundColor: ColorConstants.paleGrey }}>
        <SafeAreaView style={styles.container}>
          <FocusAwareStatusBar barStyle="light-content" backgroundColor={ColorConstants.primaryThemeGradient} isFocused={true} />
          <View style={styles.topContainer}>
            {this.renderForgotHeader()}
            {this.renderTopHeader()}
            <View style={styles.innerTopContainer}>
              <View style={styles.fieldContainer}>
                <View style={[this.state.passwordError ? styles.errorSectionStyle : this.state.passwordfocus ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13) }]}>
                  <Image source={R.images.key} style={styles.ImageStylekey} />
                  <TextInput
                    style={[styles.input1, { color: this.state.passwordfocus ? ColorConstants.charcoalGrey : ColorConstants.darkishBlue }]}
                    onFocus={() => this.onFocus('password')}
                    secureTextEntry={this.state.newPassword}
                    onChangeText={(value) => this.setState({ password: value })}
                    value={this.state.password}
                    placeholder="Enter New Password"
                    placeholderTextColor={this.state.passwordError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                    underlineColorAndroid="transparent"
                  />
                  <TouchableOpacity style={styles.eye} onPress={this.newPasswordVisibility}>
                    <Image source={this.state.newPassword ? R.images.eye : R.images.eyeClosed} style={this.state.newPassword ? styles.ImageStyleEye : styles.ImageStyleEyeClosed} />
                  </TouchableOpacity>
                </View>
                <View style={[this.state.confirmPasswordError ? styles.errorSectionStyle : this.state.confirmPasswordfocus ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13) }]}>
                  <Image source={R.images.key} style={styles.ImageStylekey} />
                  <TextInput
                    style={[styles.input1, { color: this.state.confirmPasswordfocus ? ColorConstants.charcoalGrey : ColorConstants.darkishBlue }]}
                    onFocus={() => this.onFocus('confirmPassword')}
                    secureTextEntry={this.state.confirmPasswordEye}
                    onChangeText={(value) => this.setState({ confirmPassword: value })}
                    value={this.state.confirmPassword}
                    placeholder="Confirm New Password"
                    placeholderTextColor={this.state.confirmPasswordError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                    underlineColorAndroid="transparent"
                  />
                  <TouchableOpacity style={styles.eye} onPress={this.newPasswordVisibility1}>
                    <Image source={this.state.confirmPasswordEye ? R.images.eye : R.images.eyeClosed} style={this.state.confirmPasswordEye ? styles.ImageStyleEye : styles.ImageStyleEyeClosed} />
                  </TouchableOpacity>
                </View>
                {/* <View style={[this.state.passwordTokenError ? styles.errorSectionStyle : this.state.tokenPasswordFocus ? styles.SectionStyle : styles.SectionStyle1, { marginTop: verticalScale(13) }]}>
                  <Image source={R.images.key} style={styles.ImageStylekey} />
                  <TextInput
                    style={[styles.input1, { color: this.state.tokenPasswordFocus ? ColorConstants.charcoalGrey : ColorConstants.darkishBlue }]}
                    onFocus={() => this.onFocus('tokenPassword')}
                    onChangeText={(value) => this.setState({ passwordToken: value })}
                    value={this.state.passwordToken}
                    placeholder="Enter Reset Password Token"
                    placeholderTextColor={this.state.passwordTokenError ? ColorConstants.pastelRed : ColorConstants.coolGreyTwo}
                    underlineColorAndroid="transparent"
                  />
                  <TouchableOpacity style={styles.eye} onPress={this.newPasswordVisibility1}>
                    <View style={styles.ImageStyleEye} />
                  </TouchableOpacity>
                </View> */}
                <GreenButton
                  title="RESET PASSWORD"
                  disabled={this.state.password.trim() === '' || this.state.confirmPassword.trim() === ''}
                  customStyle={[styles.loginButton, { opacity: this.state.password.trim() === '' || this.state.confirmPassword.trim() === '' ? 0.5 : 1 }]}
                  customTxtStyle={styles.loginText}
                  onPress={() => {
                    this.onResetPassword();
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
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
    resetPassword: (data, successCallBack, failureCallBack) => dispatch(UserActions.resetPassword(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPassword);