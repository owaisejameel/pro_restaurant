import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import R from '../../R';
import GreenButton from '../../components/GreenButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SimpleTextInput} from '../../components/SimpleTextInput';
import styles from './EditProfileStyle';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingImage from 'react-native-image-progress';
import * as Validators from '../../utils/Validators';
import * as commonActions from '../../redux/actions/commonActions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as profileActions from '../../redux/actions/profileActions';
import * as filterActions from '../../redux/actions/filterActions';
import CountDown from 'react-native-countdown-component';
import * as Sentry from '@sentry/react-native';

class EditProfile extends Component {

      constructor(props) {
        super(props);
        this.state = {
          textInputData: {
            name: '',
            email: '',
            phoneNo: '',
            otp: '',
          },
          textInputFocusData: {
            nameFocus: false,
            emailFocus: false,
            phoneNoFocus: false,
            otpFocus: false,
          },
          textInputErrorData: {
            nameError: false,
            emailError: false,
            phoneNoError: false,
            otpError: false,
          },
          imageData: {
            image: '',
            base64: '',
          },
          profileImageData: null,
          showProfileImage: false,
          profileImage: null,
          showPickerModal: false,
          sendLink: true,
          showTimer: true,
          startTimer: true,
          isOTPSent: false,
          showResendLink: false,
          isPhoneNoVerified: true,
        }
    }
      
    componentDidMount() {
      this.setNavigationHeaderConfiguration();
      try {
        this.setProfileData();
      } catch (err) {
        Sentry.captureException(err);
      }
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white },
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Edit Profile</Text></View>),
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON}style={styles.backIcon}/></TouchableOpacity>),
        })
    }

    setProfileData = () => {
      try {
        let userData = this.props.profileData;
        console.log('@@@ user ========', userData);
        // const sourceProfile = `data:image/jpeg;base64,${userData.base_64_profile_picture}`;
        this.setState({ profileImage: userData.profile_picture, profileImageData: { data: userData.profile_picture } });
        this.setState(prevState => ({
          textInputData : {
            ...prevState.textInputData,
            name: userData.name,
            email: userData.email,
            phoneNo: userData.phone_number ? userData.phone_number : '',
          },
        }))
      } catch (err) {
        Sentry.captureException(err);
      }
    }

    onChangeTextInput = (input, text) => {
      if(input === 'phoneNo'){
        if(text.length >= 10){
          this.setState({
            isOTPSent: false,
          });
        }
      }
      this.setState(prevState => ({
        textInputErrorData : {
          ...prevState.textInputErrorData,
          nameError: false,
          emailError: false,
          phoneNoError: false,
          otpError: false,
        },
      }))
      this.setState(prevState => ({
        textInputData : {
          ...prevState.textInputData,
          [input]: text,
        },
      }))
    };

    validateInput = () => {
      try {
        if (this.state.textInputData.name === '' || !Validators.isNameValid(this.state.textInputData.name)) {
          this.setState(prevState => ({
            textInputErrorData : {
              ...prevState.textInputErrorData,
              nameError: true,
            },
          }))
          return;
        } else if (this.state.textInputData.email === '' || !Validators.isEmailValid(this.state.textInputData.email)) {
          this.setState(prevState => ({
            textInputErrorData : {
              ...prevState.textInputErrorData,
              emailError: true,
            },
          }))
          return;
        } else if (this.state.textInputData.phoneNo.trim().length === 0 || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
          this.setState(prevState => ({
            textInputErrorData : {
              ...prevState.textInputErrorData,
              phoneNoError: true,
            },
          }))
          return;
        } else {
          this.updateProfileData();
        }
      } catch (err) {
        Sentry.captureException(err);
      }
    };

    updateProfileData = async() => {
      try {
        let userData = this.props.profileData;
        // if(userData.phone_number !== this.state.textInputData.phoneNo) {
        //   this.onSubmitEditing();
        //   return;
        // }
        let userID = await AsyncStorage.getItem('USER_ID');
        let formData = new FormData();
        if(this.state.profileImageData.data && !this.state.profileImageData.data.includes('https')) {
            formData.append("is_base_64", true)
            formData.append("profile_picture", 'data:image/jpeg;base64,'+this.state.profileImageData.data)
        }
        formData.append("name", this.state.textInputData.name)
        formData.append("email", this.state.textInputData.email)
        formData.append("phone_number", this.state.textInputData.phoneNo)
        let data = {
          profileData: formData,
          userID: userID,
        }
        console.log('@@@ Update Profile Data ==========', data);
        this.props.updateProfileData(data, (res) => this.updateProfileDataSuccessCallBack(res), (error) => this.updateProfileDataFailureCallBack(error));
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  
    updateProfileDataSuccessCallBack = async(res) => {
      try {
        console.log('@@@ Update profile Data Success CallBack ===================', res);
        this.props.navigation.goBack();
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
            }).then(async image => {
                console.log('@@@ Selected Image Item =============', image);
                const source = { uri: (Platform.OS==='android') ? image.path : image.path };
                this.setState({ profileImage: image.path, showPickerModal: false, isInvalidUploadImage: false, profileImageData: image });
            });
    } catch (e) {
        Sentry.captureException(e);
        console.log('@@@ Error opening camera ==========', e);
    }
  }

  onSubmitEditing = () => {
    try {
      if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData : {
            ...prevState.textInputErrorData,
            phoneNoError: true,
          },
        }))
        return;
      }
      let userData = this.props.profileData;
      if(userData.phone_number === this.state.textInputData.phoneNo) {
        return;
      } else {
        this.setState(prevState => ({
          textInputData : {
            ...prevState.textInputData,
            ['otp']: "",
          },
        }))
        this.setState({ isPhoneNoVerified: false }, () => {
          this.onPressSendOTP();
        });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressSendOTP = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let formData = new FormData();
      formData.append("phone_number", this.state.textInputData.phoneNo)
      if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData : {
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
      console.log('@@@ Send OTP Data ==========', data);
      this.props.sendPhoneNoOTP(data, (res) => this.sendPhoneNoOTPSuccessCallBack(res), (error) => this.sendPhoneNoOTPFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendPhoneNoOTPSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Send OTP Data Success CallBack ===================', res);
      this.setState({ isOTPSent: true });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendPhoneNoOTPFailureCallBack = (error) => {
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

  onPressOTPVerify = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      if (this.state.textInputData.phoneNo === '' || !Validators.isPhoneNoValid(this.state.textInputData.phoneNo)) {
        this.setState(prevState => ({
          textInputErrorData : {
            ...prevState.textInputErrorData,
            phoneNoError: true,
          },
        }))
        return;
      }
      if (this.state.textInputData.otp === '') {
        this.setState(prevState => ({
          textInputErrorData : {
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
      console.log('@@@ Verify Phone No Data ==========', verifyData);
      this.props.verifyPhoneNo(verifyData, (res) => this.verifyPhoneNoSuccessCallBack(res), (error) => this.verifyPhoneNoFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  verifyPhoneNoSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Verify Phone No Success CallBack ===================', res);
      this.setState({ isPhoneNoVerified: true,  showResendLink: false, isOTPSent: false });
      setTimeout(() => {
        this.props.showErrorModal('Phone no verified successfully !', false);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  verifyPhoneNoFailureCallBack = (error) => {
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

  onPressPickImage = () => {
    try {
            ImagePicker.openPicker({
                mediaType: 'photo',
                compressImageQuality: 0.3,
                includeBase64: true,
                cropping: true,
            }).then(async image => {
                console.log('@@@ Selected Image Item =============', image);
                const source = { uri: (Platform.OS==='android') ? image.path : image.path };
                this.setState({ profileImage: image.path, showPickerModal: false, profileImageData: image });
            });
    } catch (e) {
        Sentry.captureException(e);
        console.log('@@@ Error opening image picker ==========', e);
    }
  }


  renderCameraButton = () => {
    console.log('@@@ profile ========', this.state.profileImage);
    return (
      <TouchableOpacity onPress={() => this.onPressCameraUploadImage()} style={styles.cameraButton}>
        <LoadingImage 
          source={this.state.profileImage ? { uri: this.state.profileImage } : IMG_CONST.CAMERA_ICON} 
          style={this.state.profileImage ? styles.profileIcon : styles.cameraIcon} 
        />
        {this.state.profileImage && <View style={styles.whiteCameraContainer}>
          <Image source={IMG_CONST.WHITE_CAMERA_ICON} style={styles.whiteCamera} />
        </View>}
      </TouchableOpacity>
    )
  }

  renderImagePickerModal = () => {
    return(
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
      <View style={styles.innerContainer}>
      <KeyboardAwareScrollView style={styles.container}>

        <View style={styles.formContainer}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
            {this.renderCameraButton()}
              <SimpleTextInput
                title={'Name'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData : {
                      ...prevState.textInputErrorData,
                      nameFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData : {
                      ...prevState.textInputErrorData,
                      nameFocus: false,
                    },
                  }))
                }
                value={this.state.textInputData.name}
                onChangeText={text => this.onChangeTextInput('name', text)}
                focusData={this.state.textInputFocusData.nameFocus}
                errorData={this.state.textInputErrorData.nameError}
              />
              <SimpleTextInput
                title={'Email'}
                editable={false}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData : {
                      ...prevState.textInputErrorData,
                      emailFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData : {
                      ...prevState.textInputErrorData,
                      emailError: false,
                    },
                  }))
                }
                value={this.state.textInputData.email}
                onChangeText={text => this.onChangeTextInput('email', text)}
                focusData={this.state.textInputFocusData.emailFocus}
                errorData={this.state.textInputErrorData.emailError}
              />
              <SimpleTextInput
                title={'Phone Number'}
                // editable={this.props.profileData.phone_number === ''}
                keyboardType={'number-pad'}
                onFocus={() =>
                  this.setState(prevState => ({
                    textInputFocusData : {
                      ...prevState.textInputErrorData,
                      phoneNoFocus: true,
                    },
                  }))
                }
                onBlur={() =>
                  this.setState(prevState => ({
                    textInputFocusData : {
                      ...prevState.textInputErrorData,
                      phoneNoError: false,
                    },
                  }))
                }
                value={this.state.textInputData.phoneNo}
                onChangeText={text => this.onChangeTextInput('phoneNo', text)}
                focusData={this.state.textInputFocusData.phoneNoFocus}
                errorData={this.state.textInputErrorData.phoneNoError}
                onSubmitEditing={() => this.onSubmitEditing()}
                returnKeyType={'done'}
              />
              {this.state.isOTPSent && 
              <View>
                <SimpleTextInput
                  title={'OTP'}
                  maxLength={5}
                  // editable={this.props.profileData.phone_number === ''}
                  keyboardType={'number-pad'}
                  onFocus={() =>
                    this.setState(prevState => ({
                      textInputFocusData : {
                        ...prevState.textInputErrorData,
                        otpFocus: true,
                      },
                    }))
                  }
                  onBlur={() =>
                    this.setState(prevState => ({
                      textInputFocusData : {
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
                        {isOTPSent: false, showResendLink: false},
                        () => {
                          this.onPressSendOTP();
                        },
                      );
                    }}>
                    <Text style={styles.resendText}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
        </View>
      </KeyboardAwareScrollView>
      <GreenButton
        title="SAVE PROFILE"
        customStyle={[styles.loginButton,{ opacity: this.state.isPhoneNoVerified ? 1 : 0.5 }]}
        customTxtStyle={styles.loginText}
        onPress={() => this.validateInput()}
        disabled={!this.state.isPhoneNoVerified}
      />
      {this.renderImagePickerModal()}
      </View>
    );
};
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
    showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
    removeFilterData: () => dispatch(filterActions.removeFilterData()),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    updateProfileData: (data, successCallBack, failureCallBack) => dispatch(profileActions.updateProfileData(data, successCallBack, failureCallBack)),
    sendPhoneNoOTP: (data, successCallBack, failureCallBack) => dispatch(profileActions.sendPhoneNoOTP(data, successCallBack, failureCallBack)),
    verifyPhoneNo: (data, successCallBack, failureCallBack) => dispatch(profileActions.verifyPhoneNo(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);