import React from 'react';
import {
    StyleSheet, View, ScrollView, Image, Dimensions, Text, TextInput, SafeAreaView,
    KeyboardAvoidingView, Platform, ImageBackground, TouchableOpacity, FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import R from '../../R';
import GreenButton from "../../components/GreenButton";
import { SimpleTextInput } from "../../components/SimpleTextInput";
import NumericInput from 'react-native-numeric-input'
import styles from "./HomeoPharmaNXTStyle";
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import ImagePicker from 'react-native-image-crop-picker';
import scale, { verticalScale } from '../../utils/Scale';

export default class HomoeoPharmaNXT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fnameFocus: false,
            fnameBlur: false,
            contactNumberFocus: false,
            contactNumberBlur: false,
            pincodeFocus: false,
            pincodeBlur: false,
            addressFocus: false,
            addressBlur: false,
            landmarkFocus: false,
            landmarkBlur: false,
            addmedicine: false,
            uploadedImages: [],
            medicineCount: 0,
        };
    }

    componentDidMount() {
        this.setNavigationHeaderConfiguration();
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.LightlightNavy, shadowColor: 'transparent', elevation: 0, },
            title: STR_CONST.MEDICINE_ORDER,
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON_WHITE} style={styles.backIcon} /></TouchableOpacity>),
        })
    }

    onPressSelectImage = () => {
        let uploadImages = this.state.uploadedImages;
        try {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
                compressImageQuality: 0.8
            }).then(async image => {
                console.log('@@@ Selected Image Item =============', image);
                for (let index = 0; index < image.length; index++) {
                    uploadImages.unshift(image[index]);
                }
                this.setState({ uploadedImages: uploadImages });
            });
        } catch (e) {
            console.log('@@@ Error Selecting image ============', e);
        }
    }

    onRemoveSelectedImage = (item, index) => {
        let uploadImages = this.state.uploadedImages;
        uploadImages.splice(index, 1);
        this.setState({ uploadImages: uploadImages });
    }

    renderImageCell = (item, index) => {
        return (
            <View style={styles.attachedChildContainer}>
                <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.onRemoveSelectedImage(item, index)} style={styles.cancelContainer}>
                    <Image source={IMG_CONST.CANCEL} style={styles.cancleImage} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item.path }} style={styles.attachment} />
                </View>
            </View>
        )
    }


    renderUploadedImageList() {
        return (
            <View style={styles.courseListContainer}>
                <FlatList
                    extraData={this.state}
                    data={this.state.uploadedImages}
                    renderItem={({ item, index }) => this.renderImageCell(item, index)}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }


    renderillustration = () => {
        return (
            <Image source={IMG_CONST.ILLUSTRATION1} style={styles.illustrationImage} />
        )
    }

    renderAddressDetails = () => {
        return (
            <View style={styles.addressContainer}>
                <View style={styles.addressSubContainer}>
                    <Text style={styles.DeliveryText}>
                        Delivery Details
                  </Text>
                    <View style={styles.TextInputStyles}>
                        <SimpleTextInput
                            title={'Full Name'}
                            onFocus={() => {
                                this.setState({ fnameFocus: true })
                            }}
                            onBlur={() => {
                                this.setState({ fnameFocus: false })
                            }}
                            focusData={this.state.fnameFocus}
                            errorData={this.state.fnameBlur}
                            onChangeText={fname => this.setState({ fname })}
                            style={{
                                fontFamily: R.fonts.GTWalsheimProRegular,
                            }} />
                        <SimpleTextInput
                            title={'Contact Number'}
                            onFocus={() => {
                                this.setState({ contactNumberFocus: true })
                            }}
                            onBlur={() => {
                                this.setState({ contactNumberFocus: false })
                            }}
                            focusData={this.state.contactNumberFocus}
                            errorData={this.state.contactNumberBlur}
                            onChangeText={contactNumber => this.setState({ contactNumber })}
                            style={{
                                fontFamily: R.fonts.GTWalsheimProRegular,
                            }}
                            keyboardType={'numeric'}

                        />
                        <SimpleTextInput
                            title={'Pincode'}
                            onFocus={() => {
                                this.setState({ pincodeFocus: true })
                            }}
                            onBlur={() => {
                                this.setState({ pincodeFocus: false })
                            }}
                            focusData={this.state.pincodeFocus}
                            errorData={this.state.pincodeBlur}
                            onChangeText={pincode => this.setState({ pincode })}
                            keyboardType={'numeric'}

                        />
                        <SimpleTextInput
                            title={'Address'}
                            onFocus={() => {
                                this.setState({ addressFocus: true })
                            }}
                            onBlur={() => {
                                this.setState({ addressFocus: false })
                            }}
                            focusData={this.state.addressFocus}
                            errorData={this.state.addressBlur}
                            onChangeText={address => this.setState({ address })}
                            style={{ fontFamily: R.fonts.GTWalsheimProRegular, }} />
                        <SimpleTextInput
                            title={'Landmark'}
                            onFocus={() => {
                                this.setState({ landmarkFocus: true })
                            }}
                            onBlur={() => {
                                this.setState({ landmarkFocus: false })
                            }}
                            onChangeText={landmark => this.setState({ landmark })}
                            focusData={this.state.landmarkFocus}
                            errorData={this.state.landmarkBlur}
                            style={{ fontFamily: R.fonts.GTWalsheimProRegular, }} />
                    </View>
                </View>
            </View>
        )
    }


    renderMakeMedicineList = () => {
        return (
            <View style={styles.makeListContainer}>
                <View style={styles.addressSubContainer}>
                    <Text style={styles.MakeListText}>
                        Make a List of Medicines
                </Text>
                    <TouchableOpacity onPress={() =>
                        this.setState({ addmedicine: true })
                    }>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={R.images.add} style={{ height: 25, width: 25, }} />
                            <Text style={styles.addmedicineGreen}>
                                Add Medicine
                                 </Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.addmedicine ?
                        <View style={styles.containerAddmedicine}>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.textstyle}
                                    secureTextEntry={false}
                                    placeholder="Type Medical Name"
                                    underlineColorAndroid="transparent"
                                />
                                 <View style={styles.tools}>
                                    <TouchableOpacity onPress={() => this.setState({ medicineCount: this.state.medicineCount - 1 })}>
                                        <Text style={styles.minus}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.count}>{this.state.medicineCount}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ medicineCount: this.state.medicineCount + 1 })}>
                                        <Text style={styles.plus}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() =>
                                this.setState({ addmedicine: false })
                            }>
                                <Image source={R.images.cancelMedicine} style={styles.cancelImagemedicine} />
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                    <Text
                        style={styles.orTextStyles}>
                        - OR -
                    </Text>
                    <Text style={styles.uploadPrescription}>
                        Upload Prescription
                     </Text>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onPressSelectImage()}  >
                        <Text style={styles.uploadPrescriptionText}>
                            UPLOAD PRESCRIPTION
                    </Text>
                    </TouchableOpacity>

                    {this.state.uploadedImages.length > 0 &&
                        <View style={styles.attachedRootView}>
                            {this.renderUploadedImageList()}
                        </View>}
                </View>
            </View>
        )
    }

    renderNextStep = () => {
        return (
            <View>
                <View style={styles.NextContainer}>
                    <Text style={styles.nextText}>
                        Next Step
                            </Text>
                    <Text style={styles.nextContaint}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book.
                    </Text>
                </View>


                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <GreenButton
                        title="PLACE ORDER REQUEST"
                        customStyle={styles.customButtom}
                        customTxtStyle={styles.customButtomText}
                    //   onPress={() => this.props.navigation.navigate('')}
                    />
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: R.colors.paleGrey }}>
                <FocusAwareStatusBar barStyle="light-content" backgroundColor={COLOR_CONST.LightlightNavy} isFocused={true} />
                <View style={{ flex: 2.6 }}>
                    <ScrollView>
                        {this.renderillustration()}
                        {this.renderAddressDetails()}
                        {this.renderMakeMedicineList()}
                        {this.renderNextStep()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}