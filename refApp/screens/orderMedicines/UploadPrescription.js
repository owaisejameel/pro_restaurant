import React from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList, Text, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProductGrid } from "../../components/homeComponents/ProductGrid/ProductGrid";
import { RecommendedProductList } from "../../theme/constants";
import GreenButton from "../../components/GreenButton";
import styles from "./UploadPrescriptionStyle";
import COLOR_CONST from "../../theme/ColorConstants";
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import scale, { verticalScale } from '../../utils/Scale';
import ImagePicker from 'react-native-image-crop-picker';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default class UploadPrescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedImages: [],
        };
    }


    componentDidMount() {
        this.setNavigationHeaderConfiguration();
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white},
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
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
                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 50, right: 50}} onPress={() => this.onRemoveSelectedImage(item, index)} style={styles.cancelContainer}>
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

    renderUploaded = () => {
        return (
            <View style={styles.FirstContainer}>
                <View>
                <View style={styles.viewContainer}>
                    <Image source={IMG_CONST.PRECRIPTION} style={styles.prescriptionImage} />
                    <Text style={styles.title}>Please upload images of your prescription</Text>
                </View>

                <TouchableOpacity onPress={() => this.onPressSelectImage()} style={[styles.galleryContainer, { marginBottom: this.state.uploadedImages.length > 0 ? verticalScale(7.5) : verticalScale(28.2) }]}>
                    <Image source={IMG_CONST.GALLERY} style={styles.galleryImage} />
                </TouchableOpacity>
                {this.state.uploadedImages.length > 0 && <View style={[styles.view, { marginTop: verticalScale(7.5)}]}>
                    <Text style={styles.titleText}>Prescription attached by you</Text>
                </View>}
                </View>
                                
                {this.state.uploadedImages.length > 0 && 
                <View style={styles.attachedRootView}>
                    {this.renderUploadedImageList()}
                </View>}
                {/* <View style={styles.attachedRootView}>
                    <View style={styles.attachedChildContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={IMG_CONST.ATTACHMENT} style={styles.attachment} />
                        </View>
                        <View style={styles.cancelContainer}>
                            <Image source={IMG_CONST.CANCEL} style={styles.cancleImage} />
                        </View>
                    </View>
                    <View style={styles.attachedChildContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={IMG_CONST.ATTACHMENT1} style={styles.attachment1} />
                        </View>
                        <View style={styles.cancelContainer}>
                            <Image source={IMG_CONST.CANCEL} style={styles.cancleImage} />
                        </View>
                    </View>
                </View> */}
            </View>
        )
    }

    renderContainer = () => {
        return (
            <View style={styles.renderContainer}>
                <View style={styles.EasyConatiner}>
                        <Text style={styles.titleCard}>3 Step for Easy Process</Text>
                        <View style={styles.processFlowView}>
                            <View style={styles.processFlowContainer}>
                                <View style={styles.processFlowChild}>
                                    <Image source={IMG_CONST.FILE} style={styles.ImageStyle1}
                                        tintColor={COLOR_CONST.white} />
                                </View>
                               <View style={styles.horizotalLine}/>
                                <View style={styles.processFlowChild}>
                                    <Image source={IMG_CONST.PHONE} style={styles.ImageStyle}
                                        tintColor={COLOR_CONST.white} />
                                </View>
                                <View style={styles.horizotalLine}/>

                                <View style={styles.processFlowChild}>
                                    <Image source={IMG_CONST.DRUGS} style={styles.ImageStyle2}
                                        tintColor={COLOR_CONST.white} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.processFlowTextView}>
                            <View style={styles.processFlowTextContainer}>
                                <View style={styles.processFlowTextChild}>
                                    <Text style={styles.processFlowText}>Upload Valid</Text>
                                    <Text style={styles.processFlowText}>Prescription</Text>
                                </View>

                                <View style={styles.processFlowTextChild}>
                                    <Text style={styles.processFlowText}>Receive</Text>
                                    <Text style={styles.processFlowText}>Confirmation Call</Text>
                                </View>
                                <View style={styles.processFlowTextChild}>
                                    <Text style={styles.processFlowText}>Get Medicines at</Text>
                                    <Text style={styles.processFlowText}>Your Home</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.notesView}>
                            <Text style={styles.noteText}>Notes:</Text>
                            <Text style={styles.notes}>1. Upload Clear Images</Text>
                            <Text style={styles.notes}>2. Do not upload Medicines Pictures</Text>
                            <Text style={styles.notes}>3. Do not Crop the Images</Text>
                        </View>
                    </View>

            </View>

        )
    }


    renderButtonContainer = () => {
        return (
            <View style={styles.renderContainer}>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={styles.viewStyle}>
                        <View style={styles.viewChild}>
                            <Image source={IMG_CONST.GROUP} style={styles.image} />
                            <View style={styles.textView}>
                                <Text style={styles.text}>Our Pharmacist will call you to confirm medicines </Text>
                                <Text style={styles.text}>from your prescription by today</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.greebButtonView}>
                    <GreenButton
                        title="CONTINUE"
                        customStyle={styles.greebButtoncustomStyle}
                        customTxtStyle={styles.greebButtoncustomTxtStyle}
                    //   onPress={() => this.props.navigation.navigate('')}
                    />
                </View>
                <View style={styles.bottomView}>
                </View>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
             <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
                <ScrollView>
                    {this.renderUploaded()}
                    {this.renderContainer()}
                    {this.renderButtonContainer()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}
