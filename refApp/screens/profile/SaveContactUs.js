//** CONTACT US SCREEN */

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, BackHandler } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SimpleTextInput } from '../../components/SimpleTextInput';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import styles from './SaveContactUsStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import AsyncStorage from '@react-native-community/async-storage';
import { verticalScale } from '../../utils/Scale';
import * as Validators from '../../utils/Validators';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';

class SaveContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputData: {
        currentPass: this.props.profileData ? this.props.profileData.name : '',
        newPass: this.props.profileData ? this.props.profileData.email : '',
        newPass1: this.props.profileData ? this.props.profileData.phone_number ? this.props.profileData.phone_number : '' : '',
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
      descriptionText: '',
      showMissmatchError: false,
      showPasswordChangedSuccessfully: false,
      isInvalidDescription: false,
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
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Contact Us</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  onChangeTextInput = (input, text) => {
    this.setState({ isInvalidDescription: false });
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
      if (this.state.textInputData.currentPass.trim().length === 0 || !Validators.isNameValid(this.state.textInputData.currentPass)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            currentPassError: true,
          },
        }))
        return;
      } else if (this.state.textInputData.newPass.trim().length === 0 || !Validators.isEmailValid(this.state.textInputData.newPass)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            newPassError: true,
          },
        }))
        return;
      } else if (this.state.textInputData.newPass1.trim().length === 0 || !Validators.isPhoneNoValid(this.state.textInputData.newPass1)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            newPass1Error: true,
          },
        }))
        return;
      } else if (this.state.descriptionText.trim().length === 0) {
        this.setState({ isInvalidDescription: true });
        return;
      } else {
        this.saveContactUs();
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  saveContactUs = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        name: this.state.textInputData.currentPass,
        email: this.state.textInputData.newPass,
        phone: this.state.textInputData.newPass1,
        description: this.state.descriptionText,
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
      }
      console.log('@@@ Save Contact Us Data ==========', data);
      this.props.saveContactUs(data, (res) => this.saveContactUsSuccessCallBack(res), (error) => this.saveContactUsFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  saveContactUsSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Save Contact Us Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('Details sent successfully.', false);
        setTimeout(() => {
          this.props.hideErrorModal();
          this.props.navigation.goBack();
        }, 2000);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  saveContactUsFailureCallBack = (error) => {
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
    const { profileData } = this.props;
    return (
      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.formContainer}>
            <SimpleTextInput title={'Name'}
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
              value={this.state.textInputData.currentPass}
              onChangeText={text => this.onChangeTextInput('currentPass', text)}
              focusData={this.state.textInputFocusData.currentPassFocus}
              errorData={this.state.textInputErrorData.currentPassError}
            />
            <SimpleTextInput
              title={'Email'}
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
              value={this.state.textInputData.newPass}
              autoCapitalize={'none'}
              onChangeText={text => this.onChangeTextInput('newPass', text)}
              focusData={this.state.textInputFocusData.newPassFocus}
              errorData={this.state.textInputErrorData.newPassError}
            />
            <SimpleTextInput
              title={'Phone Number'}
              keyboardType={'number-pad'}
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
              value={this.state.textInputData.newPass1}
              onChangeText={text => this.onChangeTextInput('newPass1', text)}
              focusData={this.state.textInputFocusData.newPass1Focus}
              errorData={this.state.textInputErrorData.newPass1Error}
            />
            <TextInput
              style={styles.ratingInput}
              multiline={true}
              textAlignVertical={'top'}
              secureTextEntry={false}
              value={this.state.descriptionText}
              placeholder="Write your query.."
              placeholderTextColor={COLOR_CONST.coolGreyTwo}
              underlineColorAndroid='transparent'
              returnKeyType={'done'}
              onChangeText={(text) => this.setState({ descriptionText: text, isInvalidDescription: false, })}
            />
            {this.state.isInvalidDescription && <Text style={styles.emptyText}>Description cannot be empty.</Text>}
          </View>
        </KeyboardAwareScrollView>
        <GreenButton
          title="SUBMIT"
          disabled={this.state.textInputData.currentPass.trim() === '' || this.state.textInputData.newPass.trim() === '' || this.state.textInputData.newPass1.trim() === '' || this.state.descriptionText.trim() === ''}
          customStyle={[styles.loginButton, { opacity: this.state.textInputData.currentPass.trim() === '' || this.state.textInputData.newPass.trim() === '' || this.state.textInputData.newPass1.trim() === '' || this.state.descriptionText.trim() === '' ? 0.5 : 1 }]}
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
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    saveContactUs: (data, successCallBack, failureCallBack) => dispatch(profileActions.saveContactUs(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveContactUs);