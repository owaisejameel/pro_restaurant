import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.white,
        alignItems: 'center'
    },

    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(25.6),
    },

    headerTitleStyle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
    },

    timeslotTitleStyle: {
        marginVertical: scale(20),
        fontSize: scale(16),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
        textAlign:'center'
    },

    selecteddateContainerStyle: {
        height: scale(50), 
        borderBottomWidth: scale(2),
        borderBottomColor: COLOR_CONST.black,
    },

    unselecteddateContainerStyle: {
        height: scale(50), 
        // borderBottomWidth: 1,
        // borderBottomColor: COLOR_CONST.lightGreyText,
    },

    disabledTimeslotContainerStyle: {
        backgroundColor: COLOR_CONST.lightGreyText,
        borderRadius:scale(8),
        margin: Platform.OS==='ios'? scale(10) : scale(8),
        maxWidth: scale(150),
        minWidth: scale(150),
    },

    selectedTimeslotContainerStyle: {
        borderRadius:scale(8),
        backgroundColor: COLOR_CONST.primaryThemeGradient,
        borderWidth: 1,
        borderColor: COLOR_CONST.primaryThemeGradient,
        margin: Platform.OS==='ios'? scale(10) : scale(8),
        maxWidth: scale(150),
        minWidth: scale(150),
    },

    unselectedTimeslotContainerStyle: {
        borderRadius: scale(8),
        borderColor: COLOR_CONST.coolGrey,
        borderWidth: 1,
        margin: Platform.OS==='ios'? scale(10) : scale(8),
        maxWidth: scale(150),
        minWidth: scale(150),
    },

    disabledTimeslotTextStyle: {
        margin:scale(15),
        fontSize: scale(12),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.black,
        lineHeight: scale(18),
        textAlign: 'center',
        // height:scale(25)
    },

    selectedTimeslotTextStyle: {
        margin:scale(15),
        fontSize: scale(12),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.white,
        lineHeight: scale(18),
        textAlign: 'center',
        // height:scale(25)
    },

    unselectedTimeslotTextStyle: {
        margin:scale(15),
        fontSize: scale(12),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.coolGrey,
        lineHeight: scale(18),
        textAlign: 'center',
        // height:scale(25)
    },

    selecteddateTitleStyle: {
        margin: scale(20),
        fontSize: scale(16),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.black,
        lineHeight: scale(18),
        textAlign: 'center',
        height:scale(25)
    },

    unSelecteddateTitleStyle: {
        margin:scale(20),
        fontSize: scale(14),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGrey,
        lineHeight: scale(16),
        textAlign: 'center',
        height:scale(25)
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    notifIcon: {
        width: scale(16.7),
        height: scale(19),
        marginRight: scale(20.3)
    },

    cartIcon: {
        width: scale(22),
        height: scale(17.9),
        marginRight: scale(25.6)
    },

    emtpyAddressContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    emptyAddressIcon: {
        marginTop: verticalScale(73.4),
        width: scale(145.1),
        height: scale(165),
        alignSelf: 'center',
    },

    noAnyOrder: {
        fontSize: scale(17),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(19),
        marginTop: verticalScale(24.6),
        opacity: 0.9,
        textAlign: 'center'
    },

    youhave: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(233),
        lineHeight: scale(18),
        textAlign: 'center',
        marginTop: verticalScale(8),
        opacity: 0.5,
        textAlign: 'center'
    },

    loginText: {
        fontSize: scale(14),
        lineHeight: scale(16),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
    },

    listContainer: {
        flex: 1,
        marginTop: verticalScale(9.8),
    },

    orderNumber: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(11),
        opacity: 0.89,
    },

    orderSummary: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        marginBottom: verticalScale(6),
        // marginLeft: scale(20),
    },

    horizontalLine: {
        height: verticalScale(1),
        width: '100%',
        backgroundColor: COLOR_CONST.lightGreyText,
        opacity:0.8,
        alignSelf:'center',
    },
    
    horizontalLineLight: {
        height: verticalScale(1),
        width: '90%',
        backgroundColor: COLOR_CONST.lightGreyText,
        opacity:0.5,
        marginTop:scale(7),
        marginBottom:scale(2),
        alignSelf:'center'
    },

    rowContainer: {
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(4),
        // width: scale(353),
        width: '100%',
        alignSelf: 'center',
        // marginBottom: verticalScale(11),
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: verticalScale(18),
    },

    productImage: {
        width: scale(65),
        height: scale(65),
        marginLeft: scale(9),
        marginTop: verticalScale(16),
    },

    middleInfo: {
        // marginLeft: scale(11),
        // marginTop: verticalScale(15),
    },

    prodName: {
        width: scale(150),
        fontSize: scale(17),
        lineHeight: scale(24),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(11),
    },

    dateRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    orderText: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
        marginTop: verticalScale(2),
        marginLeft: scale(11),
    },

    date: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.89,
        marginTop: verticalScale(6),
        marginLeft: scale(4),
    },

    priceValue: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.coolGreyTwo,
        opacity: 0.9,
    },

    rightInfo: {
        marginLeft: scale(41),
        alignItems: 'flex-end',
        marginTop: verticalScale(12),   
    },

    quantity: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.4,
    },

    placedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(32),
    },

    greenDot: {
        width: scale(7),
        height: scale(7),
        borderRadius: scale(3.5),
        backgroundColor: COLOR_CONST.greenyBlue
    },

    placedText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.9,
        marginLeft: scale(11),
    },

    horizontalLinse: {
        width: scale(338),
        height: 1,
        backgroundColor: COLOR_CONST.lightBlueGrey,
        marginTop: verticalScale(18),
        opacity: 0.5,
        alignSelf: 'center'
    },


    writeReview: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.7,
        textAlign: 'center',
        marginTop: scale(15),
        marginBottom: scale(11),
    },

    toolRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(10),
        marginLeft: scale(11),
    },

    mrp: {
        fontSize: scale(12),
        lineHeight: scale(14),
        // height: scale(18),
        color: COLOR_CONST.coolGreyTwo,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(5),
        // marginBottom: verticalScale(13),
      },

    tools: {
        borderWidth: 1,
        borderColor: COLOR_CONST.borderduckEggBlue,
        backgroundColor: COLOR_CONST.white,
        marginLeft: scale(127),
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(30),
    },

    minus: {
        fontSize: scale(15),
        marginLeft: scale(8),
        marginRight: scale(15.4),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5
    },

    count: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    plus: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginLeft: scale(15.4),
        marginRight: scale(8),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5
    },

    bottomDetails: {
        backgroundColor: COLOR_CONST.white
    },

    headerCart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(18),
    },

    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(8),
    },

    yourCart: {
        fontSize: scale(15),
        lineHeight: scale(19),
        marginLeft: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
    },

    amountText: {
        fontSize: scale(15),
        lineHeight: scale(19),
        marginRight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
    },

    productName: {
        fontSize: scale(15),
        lineHeight: scale(22),
        marginLeft: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(250)
    },

    price: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginRight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    tax: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(26),
    },

    deliveryContainer: {
        marginTop: verticalScale(8),
    },

    delivery: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(6),
    },

    coupon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10),
    },

    total: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(6),
    },

    discount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(10),
        // marginBottom: verticalScale(6),
    },

    couponText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginLeft: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    changeCouponText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginTop: verticalScale(5),
        marginLeft: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.pastelRed,
    },

    couponPrice: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginRight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    loginButton: {
        alignSelf: 'center',
        width: scale(339),
        height: scale(42),
        borderRadius: scale(21),
        opacity: 0.99,
        marginBottom: verticalScale(10),
    },

    loginText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.9,
        letterSpacing: 0.4,
        fontFamily: FONTS.GTWalsheimProBold,
    },

    cancelText: {
        fontSize: scale(15),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.coolGreyTwo,
        // marginVertical: verticalScale(20),
        textAlign:'center'
    },

    modalContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.modalTransparentBg,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    popup: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: COLOR_CONST.white,
    },

    oopsText: {
        fontSize: scale(13),
        lineHeight: scale(19),
        color: COLOR_CONST.google,
        marginTop: verticalScale(10),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    validText: {
        fontSize: scale(13),
        lineHeight: scale(19),
        color: COLOR_CONST.greenBlue,
        marginTop: verticalScale(10),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    couponTick: {
        width: scale(42),
        height: scale(42),
        marginTop: verticalScale(25),
        marginBottom: verticalScale(57),
    },

    enterCouponText: {
        fontSize: scale(15),
        lineHeight: scale(19),
        color: COLOR_CONST.coolGreyTwo,
        marginTop: verticalScale(23),
        letterSpacing: 0.4,
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
    },

    couponInput: {
        width: scale(261),
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.charcoalGrey,
        marginTop: verticalScale(41),
        fontFamily: FONTS.GTWalsheimProRegular,
        borderBottomWidth: scale(0.5),
        borderBottomColor: COLOR_CONST.charcoalGrey,
        paddingBottom: verticalScale(9), 
        textAlign: 'center',
    },

    buttonContainer: {
        width: scale(375),
        height: scale(59),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: scale(0.5),
        borderBottomWidth: scale(0.5),
        borderTopColor: COLOR_CONST.lightGreyText,
        borderBottomColor: COLOR_CONST.lightGreyText,
        marginTop: verticalScale(14),
        marginBottom: verticalScale(10),
    },

    loginButton1: {
        zIndex: 1000,
        width: scale(335),
        height: scale(42),
        marginTop: verticalScale(25),
        backgroundColor: COLOR_CONST.primaryThemeGradient,
    },

    loginText1: {
        fontSize: scale(14),
        lineHeight: scale(16),
        letterSpacing: 0.4,
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
    },

    applyCouponRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(5),
    },

    applyCouponText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginTop: verticalScale(5),
        marginLeft: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.pastelRed,
    },

    subText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginTop: verticalScale(5),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        marginRight: scale(18),
    },

    continueShoppingButton: {
        width: scale(339),
        height: scale(42),
        marginTop: verticalScale(25),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.99
    },

    applyText: {
        fontSize: scale(15),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
        lineHeight: scale(18),
    },
    
    productRow: {
        width: scale(280),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(10),
    },

    quantityText: {
        fontSize: scale(13),
        color: COLOR_CONST.coolGreyTwo,
        fontFamily: FONTS.GTWalsheimProRegular,
        marginRight: scale(20),
        lineHeight: scale(19),
    },

    addressContainer: {
    },

    shippingAddressContainer: {
        width: scale(335),
        // height: scale(70),
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(4),
        marginVertical: verticalScale(6),
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: 'rgba(242, 246, 248, 1)',
        borderWidth:1,
        // paddingLeft: scale(10),
        paddingVertical: scale(21),
    },

    timeslotContainer: {
        width: scale(335),
        backgroundColor: 'rgb(246, 248, 250)',
        borderRadius: scale(4),
        marginVertical: verticalScale(6),
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderColor: 'rgba(242, 246, 248, 1)',
        borderWidth:1,
        paddingHorizontal: scale(21),
        paddingVertical: scale(18),
        flexDirection:'row'
    },

    rightArrow: {
        // marginRight: scale(20.3),
        width: scale(8.7),
        height: scale(15.8),
    },

    emtpyShipping: {
        width: scale(335),
        height: scale(70),
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(4),
        marginTop: verticalScale(6),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'rgba(242, 246, 248, 1)',
        borderWidth:1,
        // paddingLeft: scale(10),
        paddingVertical: scale(21),
    },

    shippingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    subTax: {
        paddingHorizontal: scale(30),
    },

    subTaxTitle:{
        paddingTop:scale(5),
        fontSize: scale(12),
        lineHeight: scale(14),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
    },

    addAddress: {
        fontSize: scale(14),
        color: COLOR_CONST.facebook,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(10),
        // marginTop: scale(20.2),
        lineHeight: scale(19),
        textDecorationLine: "underline",
        paddingRight: scale(20),
    },

    editAddress: {
        fontSize: scale(14),
        color: COLOR_CONST.darkishBlue,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(10),
        marginTop: scale(20.2),
        lineHeight: scale(19),
        textDecorationLine: "underline",
        paddingRight: scale(20),
    },
    
    shippingAddress: {
        fontSize: scale(14),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(10),
        marginTop: scale(20.2),
        lineHeight: scale(19),
    },

    shippingAddressdata: {
        fontSize: scale(15),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProRegular,
        marginLeft: scale(20),
        lineHeight: scale(18),
    },

    timeslotdata: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.coolGrey,
        lineHeight: scale(18),
    },

    radioContainer: {
        width: scale(335),
        height: scale(110),
        justifyContent: 'center',
        marginTop: verticalScale(8),
        paddingLeft: scale(20),
        paddingVertical: scale(21),
        alignSelf: 'center',
        backgroundColor: COLOR_CONST.white,
        borderColor: 'rgba(242, 246, 248, 1)',
        borderWidth:1,
    },

    innerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    middleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(16),
    },

    paymentOption: {
        fontSize: scale(12),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProRegular,
        marginLeft: scale(7),
        lineHeight: scale(14),
    },

    labelSticker: {
        width: scale(74.5),
        height: scale(25),
        borderTopLeftRadius: scale(50),
        borderBottomLeftRadius: scale(50),
        backgroundColor: COLOR_CONST.pastelRed,
        position: 'absolute',
        right: 0,
        bottom: verticalScale(10),
        justifyContent: 'center',
    },

    stickerText: {
        fontSize: scale(8),
        lineHeight: scale(9),
        letterSpacing: 0.3,
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
        marginLeft: scale(12.1),
    },

    excludingGST: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.primaryThemeGradient,
        opacity: 0.9,
    },

    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(11),
    },

    periodText: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.primaryThemeGradient,
    },

    packageText: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.greenThemeColor,
    },
    
    changeText: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(11),
        textDecorationLine: 'underline',
        color: COLOR_CONST.charcoalGrey,
    },

});
