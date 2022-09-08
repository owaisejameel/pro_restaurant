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
import styles from './CheckoutScreenStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import * as cartActions from '../../redux/actions/cartActions';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import * as Validators from '../../utils/Validators';
import * as Sentry from '@sentry/react-native';

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billingAndAddressSame: false,
      saveAddress: false,
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
      },
      shippingsaveAddress: false,
      shippingtextInputData: {
        name: '',
        flatNo: '',
        addressLine1: '',
        addressLine2: '',
        pinCode: '',
        phoneNo: '',
        city: '',
        state: '',
        country: '',
      },
      shippingtextInputFocusData: {
        nameFocus: false,
        flatNoFocus: false,
        addressLine1Focus: false,
        addressLine2Focus: false,
        pinCodeFocus: false,
        phoneNoFocus: false,
        cityFocus: false,
        stateFocus: false,
        countryFocus: false,
      },
      shippingtextInputErrorData: {
        nameError: false,
        flatNoError: false,
        addressLine1Error: false,
        addressLine2Error: false,
        pinCodeError: false,
        phoneNoError: false,
        cityError: false,
        stateError: false,
        countryError: false,
      },
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
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Checkout</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  setEditData = () => {
    try {
      if (this.props.route.params && this.props.route.params.isFromEdit) {
        const { name, flat_no, address, address_line_2, zip_code, phone_number, city, state, country } = this.props.route.params.addressData;
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
        },
      }))
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

  shippingonChangeTextInput = (input, text) => {
    try {
      this.setState(prevState => ({
        shippingtextInputErrorData: {
          ...prevState.shippingtextInputErrorData,
          nameError: false,
          flatNoError: false,
          addressLine1Error: false,
          addressLine2Error: false,
          pinCodeError: false,
          phoneNoError: false,
          cityError: false,
          stateError: false,
          countryError: false,
        },
      }))
      this.setState({ ...this.state.shippingtextInputData, [input]: text });
      this.setState(prevState => ({
        shippingtextInputData: {
          ...prevState.shippingtextInputData,
          [input]: text,
        },
      }))
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  validateInput = () => {
    try {
      if (this.state.textInputData.name === '' || !Validators.isNameValid(this.state.textInputData.name)) {
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
      } else if (this.state.textInputData.city === '' || !Validators.isNameValid(this.state.textInputData.city)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            cityError: true,
          },
        }))
      } else if (this.state.textInputData.state === '' || !Validators.isNameValid(this.state.textInputData.state)) {
        this.setState(prevState => ({
          textInputErrorData: {
            ...prevState.textInputErrorData,
            stateError: true,
          },
        }))
      } else if (this.state.textInputData.country === '' || !Validators.isNameValid(this.state.textInputData.country)) {
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
      } else if (this.state.shippingtextInputData.name === '' || !Validators.isNameValid(this.state.shippingtextInputData.name)) {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            nameError: true,
          },
        }))
      } else if (this.state.shippingtextInputData.flatNo === '') {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            flatNoError: true,
          },
        }))
      } else if (this.state.shippingtextInputData.addressLine1 === '') {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            addressLine1Error: true,
          },
        }))
      } else if (this.state.shippingtextInputData.city === '' || !Validators.isNameValid(this.state.shippingtextInputData.city)) {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            cityError: true,
          },
        }))
      } else if (this.state.shippingtextInputData.state === '' || !Validators.isNameValid(this.state.shippingtextInputData.state)) {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            stateError: true,
          },
        }))
      } else if (this.state.shippingtextInputData.country === '' || !Validators.isNameValid(this.state.shippingtextInputData.country)) {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            countryError: true,
          },
        }))
      } else if (this.state.shippingtextInputData.pinCode === '') {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            pinCodeError: true,
          },
        }))
      } else if (this.state.shippingtextInputData.phoneNo.trim().length === '' || !Validators.isPhoneNoValid(this.state.shippingtextInputData.phoneNo)) {
        this.setState(prevState => ({
          shippingtextInputErrorData: {
            ...prevState.shippingtextInputErrorData,
            phoneNoError: true,
          },
        }))
      } else {
        this.onAddressSave();
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onAddressSave = () => {
    try {
      if (this.props.route.params && this.props.route.params.isFromBuyNow) {
        this.saveAddressForBuyProduct();
      } else {
        this.saveAddress();
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  saveAddress = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let { name, flatNo, addressLine1, pinCode, phoneNo, city, state, country, addressLine2 } = this.state.textInputData;
      const shipping = this.state.shippingtextInputData;
      let finalData = {
        // delivery_address_id: 24,
        userID: userID,
        cartId: this.props.cartData.order.id,
        billing_same_as_shipping: this.state.billingAndAddressSame,
        address: {
          name: shipping.name,
          flat_no: shipping.flatNo,
          address: shipping.addressLine1,
          city: city,
          state: state,
          country: country,
          address_line_2: addressLine2,
          zip_code: shipping.pinCode,
          phone_number: shipping.phoneNo,
          is_default: this.state.billingAndAddressSame ? this.state.saveAddress : this.state.shippingsaveAddress,
          billing_address: {
            name: name,
            flat_no: flatNo,
            address: addressLine1,
            zip_code: pinCode,
            phone_number: phoneNo,
            is_default: this.state.saveAddress

          }
        }
      }
      this.props.addAddressForOrder(finalData, (res) => this.addAddressForOrderSuccessCallBack(res, finalData), (error) => this.addAddressForOrderFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  saveAddressForBuyProduct = async () => {
    try {
      const productData = this.props.route.params.productData;
      const buyNowResponse = this.props.route.params.buyNowResponse;
      let userID = await AsyncStorage.getItem('USER_ID');
      let { name, flatNo, addressLine1, addressLine2, pinCode, phoneNo, city, state, country } = this.state.textInputData;
      const shipping = this.state.shippingtextInputData;
      let finalData = {
        // delivery_address_id: 24,
        userID: userID,
        cartId: buyNowResponse.data.order.id,
        billing_same_as_shipping: this.state.billingAndAddressSame,
        address: {
          name: shipping.name,
          flat_no: shipping.flatNo,
          address: shipping.addressLine1,
          zip_code: shipping.pinCode,
          phone_number: shipping.phoneNo,
          city: city,
          state: state,
          country: country,
          address_line_2: addressLine2,
          is_default: this.state.billingAndAddressSame ? this.state.saveAddress : this.state.shippingsaveAddress,
          billing_address: {
            name: name,
            flat_no: flatNo,
            address: addressLine1,
            zip_code: pinCode,
            phone_number: phoneNo,
            is_default: this.state.saveAddress
          }
        }
      }
      this.props.addAddressForOrder(finalData, (res) => this.addAddressForOrderSuccessCallBack(res, finalData), (error) => this.addAddressForOrderFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addAddressForOrderSuccessCallBack = (res, finalData) => {
    try {
      console.log('@@@ Add Address To Order Success CallBack ===================', res);
      if (this.props.route.params && this.props.route.params.isFromBuyNow) {
        console.log('@@@ inside ================1', this.props.route.params.isFromSubscribe)
        let isFromSubscribe = false;
        if (this.props.route.params && this.props.route.params.isFromSubscribe)
          isFromSubscribe = true;
        this.props.navigation.navigate('BuyProductConfirmOrderScreen', { checkoutData: finalData, isFromSubscribe: isFromSubscribe, productData: this.props.route.params.productData, buyNowResponse: this.props.route.params.buyNowResponse });
      } else {
        console.log('@@@ inside ================2')
        this.props.navigation.navigate('ConfirmOrderScreen', { checkoutData: finalData });
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

  enableMyBillingAddressSame = () => {
    try {
      this.setState({ billingAndAddressSame: !this.state.billingAndAddressSame }, () => {
        const { name, flatNo, addressLine1, addressLine2, pinCode, phoneNo, city, state, country } = this.state.textInputData;
        if (this.state.billingAndAddressSame) {
          this.setState(prevState => ({
            shippingtextInputData: {
              ...prevState.shippingtextInputData,
              name: name,
              flatNo: flatNo,
              addressLine1: addressLine1,
              addressLine2: addressLine2,
              pinCode: pinCode,
              phoneNo: phoneNo,
              city: city ? city : '',
              state: state ? state : '',
              country: country ? country : '',
            },
          }))
        } else {
          this.setState(prevState => ({
            shippingtextInputData: {
              ...prevState.shippingtextInputData,
              name: '',
              flatNo: '',
              addressLine1: '',
              addressLine2: '',
              pinCode: '',
              phoneNo: '',
              city: '',
              state: '',
              country: '',
            },
          }))
        }
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
            <View style={styles.selectAddressRow}>
              <Text style={styles.billingAddress}>Billing Address</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SavedAddresses', { isFromCheckout: true, isFromBuyNow: this.props.route.params.isFromBuyNow, productData: this.props.route.params.productData, buyNowResponse: this.props.route.params.buyNowResponse, isFromSubscribe: this.props.route.params.isFromSubscribe })}>
                <Text style={styles.selectAddress}>Select Address</Text>
              </TouchableOpacity>
            </View>
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
              />
            </KeyboardAwareScrollView>
            <TouchableOpacity onPress={() => this.enableMyBillingAddressSame()} style={styles.checkBoxContainer}>
              <Image source={this.state.billingAndAddressSame ? IMG_CONST.CHECK_BOX_SELECTED : IMG_CONST.CHECK_BOX_UNSELECTED} style={styles.checkbox} />
              <Text style={styles.billingText}>My billing and shipping address are the same</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ saveAddress: !this.state.saveAddress })} style={styles.checkBoxContainer1}>
              <Image source={this.state.saveAddress ? IMG_CONST.CHECK_BOX_SELECTED : IMG_CONST.CHECK_BOX_UNSELECTED} style={styles.checkbox} />
              <Text style={styles.billingText}>Save address</Text>
            </TouchableOpacity>
            {!this.state.billingAndAddressSame && <>
              <View style={styles.selectAddressRow}>
                <Text style={styles.billingAddress}>Shipping Address</Text>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('SavedAddresses', { isFromCheckout: true })}>
                    <Text style={styles.selectAddress}>Select Address</Text>
                </TouchableOpacity> */}
              </View>
              <KeyboardAwareScrollView>
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Name'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        nameFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        nameFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('name', text)}
                  focusData={this.state.shippingtextInputFocusData.nameFocus}
                  errorData={this.state.shippingtextInputErrorData.nameError}
                  value={this.state.shippingtextInputData.name}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Flat / House / Apartment No.'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        flatNoFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        flatNoFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('flatNo', text)}
                  focusData={this.state.shippingtextInputFocusData.flatNoFocus}
                  errorData={this.state.shippingtextInputErrorData.flatNoError}
                  value={this.state.shippingtextInputData.flatNo}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Address Line 1'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        addressLine1Focus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        addressLine1Focus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('addressLine1', text)}
                  focusData={this.state.shippingtextInputFocusData.addressLine1Focus}
                  errorData={this.state.shippingtextInputErrorData.addressLine1Error}
                  value={this.state.shippingtextInputData.addressLine1}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Address Line 2'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        addressLine2Focus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        addressLine2Focus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('addressLine2', text)}
                  focusData={this.state.shippingtextInputFocusData.addressLine2Focus}
                  errorData={this.state.shippingtextInputErrorData.addressLine2Error}
                  value={this.state.shippingtextInputData.addressLine2}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'City'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        cityFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        cityFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('city', text)}
                  focusData={this.state.shippingtextInputFocusData.cityFocus}
                  errorData={this.state.shippingtextInputErrorData.cityError}
                  value={this.state.shippingtextInputData.city}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'State'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        stateFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        stateFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('state', text)}
                  focusData={this.state.shippingtextInputFocusData.stateFocus}
                  errorData={this.state.shippingtextInputErrorData.stateError}
                  value={this.state.shippingtextInputData.state}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Country'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        countryFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        countryFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('country', text)}
                  focusData={this.state.shippingtextInputFocusData.countryFocus}
                  errorData={this.state.shippingtextInputErrorData.countryError}
                  value={this.state.shippingtextInputData.country}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Pin Code'}
                  keyboardType={'number-pad'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        pinCodeFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        pinCodeFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('pinCode', text)}
                  focusData={this.state.shippingtextInputFocusData.pinCodeFocus}
                  errorData={this.state.shippingtextInputErrorData.pinCodeError}
                  value={this.state.shippingtextInputData.pinCode}
                />
                <SimpleTextInput
                  editable={!this.state.billingAndAddressSame}
                  title={'Phone Number'}
                  keyboardType={'number-pad'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        phoneNoFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      shippingtextInputFocusData: {
                        ...prevState.shippingtextInputErrorData,
                        phoneNoFocus: false,
                      },
                    }))
                  }
                  onChangeText={text => this.shippingonChangeTextInput('phoneNo', text)}
                  focusData={this.state.shippingtextInputFocusData.phoneNoFocus}
                  errorData={this.state.shippingtextInputErrorData.phoneNoError}
                  value={this.state.shippingtextInputData.phoneNo}
                />
              </KeyboardAwareScrollView>
              <TouchableOpacity onPress={() => this.setState({ shippingsaveAddress: !this.state.shippingsaveAddress })} style={styles.checkBoxContainer1}>
                <Image source={this.state.shippingsaveAddress ? IMG_CONST.CHECK_BOX_SELECTED : IMG_CONST.CHECK_BOX_UNSELECTED} style={styles.checkbox} />
                <Text style={styles.billingText}>Save address</Text>
              </TouchableOpacity>
            </>}
          </View>
        </ScrollView>
        <GreenButton
          title="CONTINUE"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.validateInput()}
        />
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
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
    addAddressForOrder: (data, successCallBack, failureCallBack) => dispatch(cartActions.addAddressForOrder(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);