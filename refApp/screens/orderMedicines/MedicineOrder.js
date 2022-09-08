import React from 'react';
import {
    StyleSheet, View, ScrollView, Image, Dimensions, Text, TextInput, SafeAreaView,
    KeyboardAvoidingView, Platform, ImageBackground, TouchableOpacity,
    StatusBar
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import R from '../../R';
import { ProductGrid } from "../../components/homeComponents/ProductGrid/ProductGrid";
import { RecommendedProductList } from "../../theme/constants";
import styles from "./MedicineOrderStyle";
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default class MedicineOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.setNavigationHeaderConfiguration();
     }
 
     setNavigationHeaderConfiguration = () => {
         this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.LightlightNavy, shadowColor: 'transparent'},
             title: STR_CONST.MEDICINE_ORDER,
             headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON_WHITE} style={styles.backIcon}/></TouchableOpacity>),
         })
     }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
             <FocusAwareStatusBar barStyle="light-content" backgroundColor="#195aa4" isFocused={true} />
                <View style={styles.rootContainer}>
                    <View style={styles.container}>
                        <View style={styles.dashedContainer}>
                            <View style={styles.viewContainerFirst}>
                                <Image source={IMG_CONST.DISCOUNT} style={styles.imageStyle} />
                                <View style={styles.textView}>
                                    <Text style={styles.textStyle}>Flat </Text>
                                    <Text style={styles.textStyle}>15% off</Text>
                                </View>
                            </View>
                            <View style={styles.verticaleLine}/>
                            <View style={styles.viewContainer}>
                                <Image source={IMG_CONST.MEDICINEICON} style={styles.imageStyle} />
                                <View style={styles.textView}>
                                    <Text style={styles.textStyle}>1 Lakh </Text>
                                    <Text style={styles.textStyle}>+ Products</Text>
                                </View>
                            </View>
                            <View style={styles.verticaleLine}/>

                            <View style={styles.viewContainerlast}>
                                <Image source={IMG_CONST.UNDO} style={styles.imageStyle} />
                                <View style={styles.textView}>
                                    <Text style={styles.textStyle}>Easy </Text>
                                    <Text style={styles.textStyle}>Return</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.textinputRootView}>
                    <View style={styles.textinputChildView}>
                        <View
                            style={styles.textinputViewContainer}>
                            <View style={styles.textinputContainer}>
                                <Image source={IMG_CONST.SEARCH} style={styles.searchImage} />
                                <Text style={styles.textInput}>Search Medicine</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.viewText}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.TextContainer}>
                            <Text
                                style={styles.text}>
                                - OR -
                        </Text>
                        </View>
                        <View style={styles.prescriptionView}>
                            <TouchableOpacity style={styles.touchableOpacity}
                                onPress={() => this.props.navigation.navigate('UploadPrescription')}>
                                <View
                                    style={styles.prescriptionRootView}>
                                    <View style={styles.prescriptionChildView}>
                                        <View style={styles.prescriptionContainer}>
                                            <Image source={IMG_CONST.PRECRIPTION} style={styles.prescriptionImage} />
                                            <Text style={styles.prescriptionText}>
                                                Order via Prescription
                                    </Text>
                                        </View>
                                        <View style={styles.nextImageContainer}>
                                            <Image source={IMG_CONST.NEXT} style={styles.nextImage} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card}>
                            <View
                                style={styles.cardRootView}>
                                <View style={styles.cardChildView}>
                                    <View style={styles.cardView}>
                                        <View style={styles.cardContainer}>
                                            <Image source={IMG_CONST.DONTPRECRIPTION} style={styles.cardImage} />
                                            <View>
                                                <Text style={styles.title}>
                                                    Don't have a Prescription ?
                                            </Text>
                                                <View style={styles.subtitleView}>
                                                  <View style={styles.subtitleViewDont}>
                                                  <View style={styles.dot}></View>
                                                    <Text style={styles.subtitle}>
                                                        Add medicines to your cart
                                                     </Text>
                                                  </View>
                                                  <View style={styles.selectDoctor}>
                                                  <View style={styles.dot}></View>
                                                    <Text style={styles.subtitleLsst}>
                                                        Select free doctor consultation at checkout
                                                    </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <Image source={IMG_CONST.DOWNARROW} style={styles.downImage} />
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomView}></View>
                        <View style={styles.RecommendedContainer}>
                            <ProductGrid name={'Recommended Product'} data={RecommendedProductList} onPress={() => this.props.navigation.navigate('ProductDescription')
                            } onPressProductListing={() => this.props.navigation.navigate('ProductListing')} />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}
