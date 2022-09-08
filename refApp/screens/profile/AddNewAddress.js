import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { RootView } from '../../components/RootView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SimpleTextInput } from '../../components/SimpleTextInput';
import GreenButton from '../../components/GreenButton';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import R from '../../R';
import styles from './AddNewAddressStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import * as UserActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import * as Validators from '../../utils/Validators';
import CountDown from 'react-native-countdown-component';
import * as setOtp from '../../redux/actions/setOtp';
import * as Sentry from '@sentry/react-native';

//import {SET_OTP} from '../../../utils/Constants'
class AddNewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputData: {
        name: '',
        flatNo: '',
        addressLine1: '',
        addressLine2: '',
        pinCode: '',
        phoneNo: '',
        city: '',
        state: '',
        country: '',
        otp: '',
      },
      textInputFocusData: {
        nameFocus: false,
        flatNoFocus: false,
        addressLine1Focus: false,
        addressLine2Focus: false,
        pinCodeFocus: false,
        phoneNoFocus: false,
        cityFocus: false,
        stateFocus: false,
        countryFocus: false,
        otpFocus: false,
      },
      textInputErrorData: {
        nameError: false,
        flatNoError: false,
        addressLine1Error: false,
        addressLine2Error: false,
        pinCodeError: false,
        phoneNoError: false,
        cityError: false,
        stateError: false,
        countryError: false,
        otpError: false,
      },
      isDefault: false,
      sendLink: true,
      showTimer: true,
      startTimer: true,
      isOTPSent: false,
      showResendLink: false,
      isPhoneNoVerified: false,
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    try {
      this.setEditData();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setNavigationHeaderConfiguration = () => {
    let title = 'Add New Address';
    if (this.props.route && this.props.route.params && this.props.route.params.isFromEdit) {
      title = "Edit Address";
    }
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>{title}</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  setEditData = () => {
    try {
      if (this.props.route.params && this.props.route.params.isFromEdit) {
        const { name, flat_no, address, address_line_2, zip_code, phone_number, city, state, country, is_default } = this.props.route.params.addressData;
        console.log('@@@ data ==========', this.props.route.params.addressData)
        this.setState(prevState => ({
          textInputData: {
            ...prevState.textInputData,
            name: name,
            flatNo: flat_no,
            addressLine1: address,
            addressLine2: address_line_2,
            pinCode: zip_code,
            phoneNo: phone_number,
            city: city ? city : '',
            state: state ? state : '',
            country: country ? country : '',
          },
          isDefault: is_default
        }))
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onChangeTextInput = (input, text) => {
    try {
      this.setState(prevState => ({
        textInputErrorData: {
          ...prevState.textInputErrorData,
          nameError: false,
          flatNoError: false,
          addressLine1Error: false,
          addressLine2Error: false,
          pinCodeError: false,
          phoneNoError: false,
          cityError: false,
          stateError: false,
          countryError: false,
          otpError: false,
        },
      }))
      if (input !== 'otp') {
        this.setState({
          sendLink: true,
          showTimer: true,
          startTimer: true,
          isOTPSent: false,
          showResendLink: false,
          isPhoneNoVerified: false,
        })
      }
      this.setState({ ...this.state.textInputData, [input]: text });
      this.setState(prevState => ({
        textInputData: {
          ...prevState.textInputData,
          [input]: text,
        },
      }))
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  clearFocous = () => {
    this.setState({
      textInputFocusData: {
        nameFocus: false,
        flatNoFocus: false,
        addressLine1Focus: false,
        addressLine2Focus: false,
        pinCodeFocus: false,
        phoneNoFocus: false,
        cityFocus: false,
        stateFocus: false,
        countryFocus: false,
        otpFocus: false,
      },
    });
  };

  validateInput = () => {
    try {
      this.clearFocous();
      if (this.state.textInputData.name === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            nameError: true,
          },
        }))
      } else if (this.state.textInputData.flatNo === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            flatNoError: true,
          },
        }))
      } else if (this.state.textInputData.addressLine1 === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            addressLine1Error: true,
          },
        }))
      } else if (this.state.textInputData.city === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            cityError: true,
          },
        }))
      } else if (this.state.textInputData.state === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            stateError: true,
          },
        }))
      } else if (this.state.textInputData.country === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            countryError: true,
          },
        }))
      } else if (this.state.textInputData.pinCode === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            pinCodeError: true,
          },
        }))
      } else if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            phoneNoError: true,
          },
        }))
      } else {
        this.checkPincode()
        // this.saveAddress();
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  checkPincode = async () => {

    try {
      if (this.state.textInputData.pinCode.trim().length === 0 || !Validators.isPincodeValid(this.state.textInputData.pinCode)) {
        // this.setState({ emailError: true, errorMessage: 'Invalid Pincode', showAlertModal: true });
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            pinCodeError: true,
          },
        }))
        return;
      }

      let data = {
        "zipcode": this.state.textInputData.pinCode
      }
      this.props.sendPincode(data, (res) => this.sendLinkSuccessCallBack(res), (err) => this.sendLinkFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  sendLinkSuccessCallBack = async (res) => {
    try {
      let userData = this.props.profileData;
      if ((userData.phone_number !== this.state.textInputData.phoneNo) && !this.state.isPhoneNoVerified) {
        this.onSubmitEditing();
        return;
      }
      let setOtpforhome = this.state.textInputData.pinCode
      this.props.setOTPfunction(setOtpforhome)
      console.log('@@@ Send Pincode Success CallBack ===================', res);
      setTimeout(() => {
        AsyncStorage.setItem('pincode', this.state.textInputData.pinCode);
        this.saveAddress();
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendLinkFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            this.props.showErrorModal(error, true);
            console.log('@@@ Send Pincode Failure CallBack ===================', error);
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Send Pincode Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true });
          });
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  saveAddress = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      const { name, flatNo, addressLine1, addressLine2, pinCode, phoneNo, city, state, country, isDefault } = this.state.textInputData;
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        address: {
          name: name,
          flat_no: flatNo,
          address: addressLine1,
          zip_code: pinCode,
          phone_number: phoneNo,
          city: city,
          state: state,
          country: country,
          is_default: isDefault,
        }
      }
      if (this.props.route.params && this.props.route.params.isFromEdit) {
        data['addressId'] = this.props.route.params.addressData.id;
        data.address['address_first'] = addressLine1;
        data.address['address_line_2'] = addressLine2;
        this.props.updateAddress(data, (res) => this.createAddressSuccessCallBack(res), (error) => this.createAddressFailureCallBack(error));
      } else {
        data.address['address_line_2'] = addressLine2;
        this.props.createAddress(data, (res) => this.createAddressSuccessCallBack(res), (error) => this.createAddressFailureCallBack(error));
      }
    } catch (err) {
      Sentry.captureException(err);
    }

  }

  createAddressSuccessCallBack = (res) => {
    try {
      this.setState({
        isFetchingData: false,
        addressList: res.data.length === 0 ? [] : res.data
      })
      console.log('@@@ Create Address Success CallBack ===================', res);
      this.props.navigation.goBack();
      setTimeout(() => {
        if (this.props.route.params && this.props.route.params.isFromEdit)
          this.props.showErrorModal('Address updated successfully!', false);
        else
          this.props.showErrorModal('Address added successfully!', false);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createAddressFailureCallBack = (error) => {
    try {
      this.setState({ isFetchingData: false });
      console.log('@@@ Create Address Failure CallBack ===================');
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

  onPressSendOTP = async () => {
    try {
      this.setState(prevState => ({
        textInputData: {
          ...prevState.textInputData,
          ['otp']: '',
        },
      }))
      let userID = await AsyncStorage.getItem('USER_ID');
      let formData = new FormData();
      formData.append("phone_number", this.state.textInputData.phoneNo)
      if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            phoneNoError: true,
          },
        }))
        return;
      }
      let data = {
        profileData: formData,
        userID: userID,
      }
      console.log('@@@ Send Delivery OTP Data ==========', data);
      this.props.sendDeliveryPhoneNoOTP(data, (res) => this.sendDeliveryPhoneNoOTPSuccessCallBack(res), (error) => this.sendDeliveryPhoneNoOTPFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendDeliveryPhoneNoOTPSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Send Delivery OTP Data Success CallBack ===================', res);
      this.setState({ isOTPSent: true });
      setTimeout(() => {
        this.refs._scrollView.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendDeliveryPhoneNoOTPFailureCallBack = (error) => {
    try {
      console.log('@@@ Send Delivery OTP Data Failure CallBack ===================', error);
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

  onPressOTPVerify = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            phoneNoError: true,
          },
        }))
        return;
      }
      if (this.state.textInputData.otp === '') {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            otpError: true,
          },
        }))
        return;
      }
      let verifyData = {
        phoneNumber: this.state.textInputData.phoneNo,
        otp: this.state.textInputData.otp,
        userID: userID
      }
      console.log('@@@ Verify Delivery Phone No Data ==========', verifyData);
      this.props.verifyDeliveryPhoneNo(verifyData, (res) => this.verifyDeliveryPhoneNoSuccessCallBack(res), (error) => this.verifyDeliveryPhoneNoFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  verifyDeliveryPhoneNoSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Verify Delivery Phone No Success CallBack ===================', res);
      this.setState({ isPhoneNoVerified: true, showResendLink: false, isOTPSent: false });
      setTimeout(() => {
        this.props.showErrorModal('Phone no verified successfully !', false);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  verifyDeliveryPhoneNoFailureCallBack = (error) => {
    try {
      console.log('@@@ Verify Delivery Phone No Failure CallBack ===================', error);
      this.setState({
        isOTPSent: true,
        showResendLink: true,
        isPhoneNoVerified: false,
      })
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

  onSubmitEditing = () => {
    try {
      if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            phoneNoError: true,
          },
        }))
        return;
      }
      let userData = this.props.profileData;
      if (userData.phone_number === this.state.textInputData.phoneNo) {
        return;
      } else {
        this.setState({ isPhoneNoVerified: false }, () => {
          this.onPressSendOTP();
        });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  renderCounter() {
    if (this.state.showTimer) {
      return (
        <View style={styles.counterContainer}>
          <CountDown
            until={45}
            onFinish={() => this.setState({ showResendLink: true })}
            digitStyle={styles.digitContainer}
            digitTxtStyle={styles.digitStyle}
            separatorStyle={styles.digitStyle}
            timeToShow={['M', 'S']}
            timeLabels={{ m: null, s: null }}
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
      <View style={styles.container}>
        <ScrollView ref='_scrollView'>
          <View style={styles.formContainer}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
            <KeyboardAwareScrollView>
              <SimpleTextInput
                title={'Name'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      nameFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      nameFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('name', text)}
                focusData={this.state.textInputFocusData.nameFocus}
                errorData={this.state.textInputErrorData.nameError}
                value={this.state.textInputData.name}
              />
              <SimpleTextInput
                title={'Flat / House / Apartment No.'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      flatNoFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      flatNoFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('flatNo', text)}
                focusData={this.state.textInputFocusData.flatNoFocus}
                errorData={this.state.textInputErrorData.flatNoError}
                value={this.state.textInputData.flatNo}
              />
              <SimpleTextInput
                title={'Address Line 1'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      addressLine1Focus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      addressLine1Focus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('addressLine1', text)}
                focusData={this.state.textInputFocusData.addressLine1Focus}
                errorData={this.state.textInputErrorData.addressLine1Error}
                value={this.state.textInputData.addressLine1}
              />
              <SimpleTextInput
                title={'Address Line 2'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      addressLine2Focus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      addressLine2Focus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('addressLine2', text)}
                focusData={this.state.textInputFocusData.addressLine2Focus}
                errorData={this.state.textInputErrorData.addressLine2Error}
                value={this.state.textInputData.addressLine2}
              />
              <SimpleTextInput
                title={'City'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      cityFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      cityFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('city', text)}
                focusData={this.state.textInputFocusData.cityFocus}
                errorData={this.state.textInputErrorData.cityError}
                value={this.state.textInputData.city}
              />
              <SimpleTextInput
                title={'State'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      stateFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      stateFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('state', text)}
                focusData={this.state.textInputFocusData.stateFocus}
                errorData={this.state.textInputErrorData.stateError}
                value={this.state.textInputData.state}
              />
              <SimpleTextInput
                title={'Country'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      countryFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      countryFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('country', text)}
                focusData={this.state.textInputFocusData.countryFocus}
                errorData={this.state.textInputErrorData.countryError}
                value={this.state.textInputData.country}
              />
              <SimpleTextInput
                title={'Pin Code'}
                keyboardType={'number-pad'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      pinCodeFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      pinCodeFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('pinCode', text)}
                focusData={this.state.textInputFocusData.pinCodeFocus}
                errorData={this.state.textInputErrorData.pinCodeError}
                value={this.state.textInputData.pinCode}
              />
              <SimpleTextInput
                title={'Phone Number'}
                keyboardType={'number-pad'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      phoneNoFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData: {
                      ...prevState.textInputErrorData,
                      phoneNoFocus: false,
                    },
                  }))
                }
                onChangeText={text => this.onChangeTextInput('phoneNo', text)}
                focusData={this.state.textInputFocusData.phoneNoFocus}
                errorData={this.state.textInputErrorData.phoneNoError}
                value={this.state.textInputData.phoneNo}
                onSubmitEditing={() => this.onSubmitEditing()}
                returnKeyType={'done'}
              />

              {this.state.isOTPSent &&
                <View>
                  <SimpleTextInput
                    title={'OTP'}
                    // editable={this.props.profileData.phone_number === ''}
                    keyboardType={'number-pad'}
                    maxLength={5}
                    onFocus={() =>
                      this.setState(prevState => ({
                        textInputFocusData: {
                          ...prevState.textInputErrorData,
                          otpFocus: true,
                        },
                      }))
                    }
                    onBlur={() =>
                      this.setState(prevState => ({
                        textInputFocusData: {
                          ...prevState.textInputErrorData,
                          otpError: false,
                        },
                      }))
                    }
                    value={this.state.textInputData.otp}
                    onChangeText={text => this.onChangeTextInput('otp', text)}
                    focusData={this.state.textInputFocusData.otpFocus}
                    errorData={this.state.textInputErrorData.otpError}
                  />
                  {this.state.isOTPSent && <TouchableOpacity style={styles.verifyButton} onPress={() => this.onPressOTPVerify()}>
                    <Text style={styles.otpVerifyText}>{'VERIFY OTP'}</Text>
                  </TouchableOpacity>}
                </View>}
              {this.state.isOTPSent && !this.state.showResendLink && this.renderCounter()}
              {this.state.showResendLink && (
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      { isOTPSent: false, showResendLink: false },
                      () => {
                        this.onPressSendOTP();
                      },
                    );
                  }}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </KeyboardAwareScrollView>
          </View>
        </ScrollView>
        <GreenButton
          title="SAVE ADDRESS"
          customStyle={[styles.loginButton, { opacity: this.state.isPhoneNoVerified ? 1 : 1 }]}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        // disabled={!this.state.isPhoneNoVerified}
        />
      </View>
    );
  }
};

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
    showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    createAddress: (data, successCallBack, failureCallBack) => dispatch(profileActions.createAddress(data, successCallBack, failureCallBack)),
    updateAddress: (data, successCallBack, failureCallBack) => dispatch(profileActions.updateAddress(data, successCallBack, failureCallBack)),
    sendDeliveryPhoneNoOTP: (data, successCallBack, failureCallBack) => dispatch(profileActions.sendDeliveryPhoneNoOTP(data, successCallBack, failureCallBack)),
    verifyDeliveryPhoneNo: (data, successCallBack, failureCallBack) => dispatch(profileActions.verifyDeliveryPhoneNo(data, successCallBack, failureCallBack)),
    sendPincode: (data, successCallBack, failureCallBack) => dispatch(UserActions.sendPincode(data, successCallBack, failureCallBack)),
    setOTPfunction: (setOtpforhome) => dispatch(setOtp.setotpfrom_verifiedOTP(setOtpforhome))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAddress);