/**
 * New Card Screen
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as STR_CONST from '../../../app/theme/StringConstants';
import ColorConstants, { FONTS } from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../../app/theme/ImageConstants';
import LinearGradient from 'react-native-linear-gradient';
import styles from './NewCardStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import moment from 'moment';

class NewCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            savedCardList: [1, 2],
            cardNo: '',
            cardHolder: '',
            expiry: '',
            cVV: '',
            isInvalidCardNo: false,
            isInvalidCardHolder: false,
            isInvalidCVV: false,
            isInvalidExpiry: false,
        }
    }

    componentDidMount() {
        this.setNavigationHeaderConfiguration();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        });
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}></Text></View>),
            headerLeft: () => (<TouchableOpacity onPress={() => this.onPressBackButton()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
        })
    }


    handleBackButtonClick = () => {
          this.props.navigation.navigate('Home');
          return true;
    }

    onPressBackButton = () => {
        this.props.navigation.navigate('Home');
    }

    resetValidationStatus = () => {
        this.setState({
            isInvalidCardNo: false,
            isInvalidCardHolder: false,
            isInvalidCVV: false,
            isInvalidExpiry: false,
        })
    }

    _handlingCardNumber(number) {
        this.resetValidationStatus();
        this.setState({
            cardNo: number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
        });
    }

    _handlingCardExpiry(text) {
        this.resetValidationStatus();
        if (text.indexOf('.') >= 0 || text.length > 5) {
            return;
        }

        if (text.length === 2 && this.state.expiry.length === 1) {
            text += '/'
        }

        this.setState({ expiry: text });
    }

    onPressAddCard = () => {
        this.resetValidationStatus();
        if (this.state.cardNo.trim().length < 19) {
            this.setState({ isInvalidCardNo: true });
            return
        }
        if (this.state.cardHolder.trim().length === 0) {
            this.setState({ isInvalidCardHolder: true });
            return
        }
        if (this.state.expiry.trim().length === 0) {
            this.setState({ isInvalidExpiry: true });
            return
        }
        if (this.state.cVV.trim().length < 3) {
            this.setState({ isInvalidCVV: true });
            return
        }
        let cardData = {
            id: 1,
            cardNo: this.state.cardNo,
            cardHolder: this.state.cardHolder,
            expiry: this.state.expiry
        }
        console.log('@@@ navigation ============', this.props.route);
        this.props.route.params.onAddCard(cardData);
        this.props.navigation.goBack();
    }

    renderSavedCardCell = () => {
        return (
            <View style={styles.shadowView}>
                <LinearGradient colors={['#004491', '#195aa4']} style={styles.cardContainer}>
                    <Image
                        source={IMG_CONST.VISA_ICON}
                        style={styles.visaImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.cardNumber}>{STR_CONST.CARD_NUMBER}</Text>
                    <View style={styles.cardName}>
                        <Text style={styles.cardNoText}>{this.state.cardNo}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cardHolderText}>{STR_CONST.CRAD_HOLDER}</Text>
                        <Text style={styles.expires}>{STR_CONST.EXPIRES}</Text>
                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.cardHolderName}>{this.state.cardHolder}</Text>
                        <Text style={styles.date}>{this.state.expiry}</Text>
                    </View>
                </LinearGradient>
            </View>
        )
    }

    renderTextFieldContainer = () => {
        return (
            <View style={styles.textFieldContainer}>
                <Text style={[styles.cardNo, { color: this.state.isInvalidCardNo ? COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey }]}>{STR_CONST.CARD_NUMBER_TEXT}</Text>
                <TextInput
                    ref={component => this.emailField = component}
                    placeholder=''
                    maxLength={19}
                    keyboardType={'number-pad'}
                    autoCorrect={false}
                    onSubmitEditing={(text) => this.field.focus()}
                    onChangeText={(value) => this._handlingCardNumber(value)}
                    value={this.state.cardNo}
                    returnKeyType='next'
                    style={[styles.input, { borderColor: this.state.isInvalidCardNo ? COLOR_CONST.pastelRed : COLOR_CONST.lightGreyText }]}
                />
                <Text style={[styles.cardHolder, { color: this.state.isInvalidCardHolder ? COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey }]}>{STR_CONST.CARD_HOLDER_TEXT}</Text>
                <TextInput
                    ref={component => this.field = component}
                    placeholder=''
                    autoCorrect={false}
                    onSubmitEditing={(text) => this.field1.focus()}
                    onChangeText={(value) => this.setState({ cardHolder: value })}
                    value={this.state.cardHolder}
                    returnKeyType='next'
                    style={[styles.input, { borderColor: this.state.isInvalidCardHolder ? COLOR_CONST.pastelRed : COLOR_CONST.lightGreyText }]}
                />
                <View style={styles.bottomFieldContainer}>
                    <View>
                        <Text style={[styles.expiryCVV, { color: this.state.isInvalidExpiry ? COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey }]}>{STR_CONST.EXPIRY_TEXT}</Text>
                        <TextInput
                            ref={component => this.field1 = component}
                            placeholder=''
                            autoCorrect={false}
                            onSubmitEditing={(text) => this.field2.focus()}
                            onChangeText={(value) => this._handlingCardExpiry(value)}
                            value={this.state.expiry}
                            returnKeyType='next'
                            style={[styles.inputBottom, { borderColor: this.state.isInvalidExpiry ? COLOR_CONST.pastelRed : COLOR_CONST.lightGreyText }]}
                        />
                    </View>
                    <View style={styles.rightBottomField}>
                        <Text style={[styles.expiryCVV, { color: this.state.isInvalidCVV ? COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey }]}>{STR_CONST.CVV}</Text>
                        <TextInput
                            ref={component => this.field2 = component}
                            placeholder=''
                            maxLength={3}
                            autoCorrect={false}
                            onChangeText={(value) => this.setState({ cVV: value }, () => {
                                this.resetValidationStatus();
                            })}
                            value={this.state.cVV}
                            returnKeyType='next'
                            style={[styles.inputBottom, { borderColor: this.state.isInvalidCVV ? COLOR_CONST.pastelRed : COLOR_CONST.lightGreyText }]}
                        />
                    </View>

                </View>
            </View>
        )
    }

    renderCardForm = () => {
        return (
            <View style={styles.cardFormContainer}>
                {this.renderTextFieldContainer()}
            </View>

        )
    }

    renderSavedCardForm = () => {
        return (
            <View style={styles.listContainer}>
                {this.renderSavedCardCell()}
                {this.renderCardForm()}
                <TouchableOpacity onPress={() => this.onPressAddCard()}>
                    <LinearGradient colors={[ColorConstants.primaryThemeGradient, ColorConstants.secondaryThemeGradient]} style={styles.continueShoppingButton}>
                        <Text style={styles.continueText}>{'PROCEED'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    renderOrderConfirmedView = () => {
        const { placed_at, total, order_number } = this.props.route.params.orderData.order;
        const { product_names } = this.props.route.params.orderData;
        return (
            <View style={styles.orderConfirmedView}>
                <View style={styles.orderData}>
                    <Image
                        source={IMG_CONST.CHECKMARK_ICON}
                        style={styles.checkMarkImage}
                    />
                    <Text style={styles.orderConfirmedText}>Order Confirmed</Text>
                    <Text style={styles.thankYouText}>Thank you so much for your order.</Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.rowDollar}>
                        <Text style={styles.dollar}>₹ </Text>
                        {/* <Text style={styles.dollarValue}>{Math.floor(total)}.<Text style={styles.innerDollarValue}>{total - Math.floor(total)}</Text></Text> */}
                        <Text style={styles.dollarValue}>{parseFloat(total).toFixed(2)}</Text>
                    </View>
                    {/* <Text style={styles.productName}>{product_names[0]}</Text> */}
                    <Text style={styles.orderNumber}>Order Number : {order_number}</Text>
                    <Text style={styles.productDate}>{moment(placed_at).format("DD")}/{moment(placed_at).format("MMM")}/{moment(placed_at).format("YYYY")}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PreMyOrders', { isFromOrderPlaced: true })}>
                    <LinearGradient colors={[
                        COLOR_CONST.primaryThemeGradient,
                         COLOR_CONST.secondaryThemeGradient
                         ]} style={styles.goToMyOrdersButton}>
                        <Text style={styles.continueText}>{'GO TO MY ORDERS'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    renderOrderDeclinedView = () => {
        const { placed_at, total } = this.props.route.params.orderData.order;
        const { product_names } = this.props.route.params.orderData;
        return (
            <View style={styles.orderConfirmedView}>
                <View style={styles.orderData}>
                    <Text style={styles.ohNoes}>Oh Noes!</Text>
                    <Image
                        source={IMG_CONST.CROSS_ICON}
                        style={styles.crossImage}
                    />
                    <Text style={styles.orderDeclinedText}>Your order was declined!</Text>
                    <View style={styles.horizontalLine} />
                    <View style={styles.rowDollar}>
                        <Text style={styles.dollar}>₹ </Text>
                        <Text style={styles.dollarValue}>{total}</Text>
                    </View>
                    {/*<Text style={styles.productName}>Product Name</Text>*/}
                    <Text style={styles.productDate}>{moment(placed_at).format("DD")}/{moment(placed_at).format("MMM")}/{moment(placed_at).format("YY")}</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.changeThePaymentMethodButton}>
                            <Text style={styles.continueText}>{'CHANGE THE PAYMENT METHOD'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.cancelText}>Cancel transaction?</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
                    <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={styles.container}>
                        {/* {this.renderSavedCardForm()} */}
                        {this.renderOrderConfirmedView()}
                        {/* {this.renderOrderDeclinedView()} */}
                    </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
};

export default NewCard;
