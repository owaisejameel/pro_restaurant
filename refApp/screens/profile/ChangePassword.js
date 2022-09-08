//** CHANGE PASSWORD SCREEN */

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StatusBar, BackHandler } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SimpleTextInput } from '../../components/SimpleTextInput';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import styles from './ChangePasswordStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import AsyncStorage from '@react-native-community/async-storage';
import { verticalScale } from '../../utils/Scale';
import * as Validators from '../../utils/Validators';
import * as Sentry from '@sentry/react-native';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputData: {
        currentPass: '',
        newPass: '',
        newPass1: '',
      },
      textInputFocusData: {
        currentPassFocus: false,
        newPassFocus: false,
        newPass1Focus: false,
      },
      textInputErrorData: {
        currentPassError: false,
        newPassError: false,
        newPass1Error: false,
      },
      showMissmatchError: false,
      showPasswordChangedSuccessfully: false,
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Change Password</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  onChangeTextInput = (input, text) => {
    this.setState(prevState => ({
      textInputErrorData: {
        ...prevState.textInputErrorData,
        currentPassError: false,
        newPassError: false,
        newPass1Error: false,
      },
    }))
    this.setState({ ...this.state.textInputData, [input]: text });
    this.setState(prevState => ({
      textInputData: {
        ...prevState.textInputData,
        [input]: text,
      },
    }))
  };

  validateInput = () => {
    try {
      if (this.state.textInputData.currentPass.trim().length === 0 || !Validators.isPasswordValid(this.state.textInputData.currentPass)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            currentPassError: true,
          },
        }))
        return;
      } else if (this.state.textInputData.newPass.trim().length === 0 || !Validators.isPasswordValid(this.state.textInputData.newPass)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            newPassError: true,
          },
        }))
        return;
      } else if (this.state.textInputData.newPass1.trim().length === 0 || !Validators.isPasswordValid(this.state.textInputData.newPass1)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            newPass1Error: true,
          },
        }))
        return;
      }
      if (this.state.textInputData.newPass != this.state.textInputData.newPass1) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            newPass1Error: true,
          },
        }))
        this.props.showErrorModal('The Password you entered did not matched. Please try again');
        return;
        // this.setState({showMissmatchError: true});
      } else {
        this.changePassword();
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  changePassword = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        user: {
          current_password: this.state.textInputData.currentPass,
          password: this.state.textInputData.newPass,
        },
        userID: userID,
      }
      console.log('@@@ Change Password Data ==========', data);
      this.props.changePassword(data, (res) => this.changePasswordSuccessCallBack(res), (error) => this.changePasswordFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  changePasswordSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Change Password Success CallBack ===================', res);
      this.setState({ showPasswordChangedSuccessfully: true });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  changePasswordFailureCallBack = (error) => {
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

  renderPasswordForm = () => {
    return (
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView>
          <Text style={[styles.enterPasswordHeader, { color: (this.state.textInputErrorData.currentPassError || this.state.textInputErrorData.newPassError || this.state.textInputErrorData.newPass1Error) ? COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey }]}>Enter a passsword with alphabets A-z, number and a symbol</Text>
          <Text style={styles.passwordMismatch}>{this.state.showMissmatchError ? 'Password Missmatch !' : ''}</Text>
          <View style={styles.formContainer}>
            <SimpleTextInput title={'Enter Current Password'}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    currentPassFocus: true,
                  },
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    currentPassFocus: false,
                  },
                }))
              }
              secureTextEntry={true}
              onChangeText={text => this.onChangeTextInput('currentPass', text)}
              focusData={this.state.textInputFocusData.currentPassFocus}
              errorData={this.state.textInputErrorData.currentPassError}
            />
            <SimpleTextInput
              title={'Enter New Password'}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPassFocus: true,
                  },
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPassFocus: false,
                  },
                }))
              }
              secureTextEntry={true}
              onChangeText={text => this.onChangeTextInput('newPass', text)}
              focusData={this.state.textInputFocusData.newPassFocus}
              errorData={this.state.textInputErrorData.newPassError}
            />
            <SimpleTextInput
              title={'Re-enter New Password'}
              onFocus={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPass1Focus: true,
                  },
                }))
              }
              onBlur={() =>
                this.setState(prevState => ({
                  textInputFocusData: {
                    ...prevState.textInputErrorData,
                    newPass1Focus: false,
                  },
                }))
              }
              secureTextEntry={true}
              onChangeText={text => this.onChangeTextInput('newPass1', text)}
              focusData={this.state.textInputFocusData.newPass1Focus}
              errorData={this.state.textInputErrorData.newPass1Error}
            />
          </View>
        </KeyboardAwareScrollView>
        <GreenButton
          title="CHANGE PASSWORD"
          disabled={this.state.textInputData.currentPass.trim() === '' || this.state.textInputData.newPass.trim() === '' || this.state.textInputData.newPass1.trim() === ''}
          customStyle={[styles.loginButton, { opacity: this.state.textInputData.currentPass.trim() === '' || this.state.textInputData.newPass.trim() === '' || this.state.textInputData.newPass1.trim() === '' ? 0.5 : 1 }]}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
      </View>
    )
  }

  renderPasswordSuccessfullyChangedView = () => {
    return (
      <View style={styles.passwordChangedContainer}>
        <View>
          <Image source={IMG_CONST.CHANGE_PASSWORD_ICON} style={styles.lockIcon} />
          <Text style={styles.passwordChanged}>Password changed successfully !</Text>
          <Text style={styles.youCan}>You can now go back and continue browsing products</Text>
          <Text style={styles.youCan}>Enjoy Shopping !</Text>
        </View>
        <GreenButton
          title="GO TO PROFILE"
          customStyle={[styles.loginButton]}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {!this.state.showPasswordChangedSuccessfully && this.renderPasswordForm()}
        {this.state.showPasswordChangedSuccessfully && this.renderPasswordSuccessfullyChangedView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartHasProductFlag: state.cart.cartHasProduct,
    profileData: state.profile.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    changePassword: (data, successCallBack, failureCallBack) => dispatch(profileActions.changePassword(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);