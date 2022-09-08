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

    cartempty: { 
        flex: 1, 
        justifyContent:'center'
    },
    
    emptyAddressIcon: {
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
        // marginTop: verticalScale(9.8),
    },

    orderNumber: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(11),
        opacity: 0.89,
    },

    horizontalLine: {
        height: 1,
        width: '100%',
        backgroundColor: COLOR_CONST.lightGreyText,
        opacity:0.8,
        alignSelf:'center'
    },
    
    horizontalLineLight: {
        height: 1,
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
        marginTop: verticalScale(15),
    },

    prodName: {
        fontSize: scale(17),
        lineHeight: scale(24),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(11),
        // backgroundColor: COLOR_CONST.LightlightNavy,
        width: scale(250)
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
        // width: scale(100),
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.apple,
        opacity: 0.9,
    },

    excludingGST: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.primaryThemeGradient,
        opacity: 0.9,
    },

    rightInfo: {
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
        color: COLOR_CONST.darkGreyBlue,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginLeft: scale(5),
      },

    tools: {
        borderWidth: 1,
        borderColor: COLOR_CONST.borderduckEggBlue,
        backgroundColor: COLOR_CONST.white,
        marginLeft: scale(77),
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(30),
    },

    tools1: {
        position: 'absolute',
        bottom: verticalScale(10),
        right: scale(17.4),
        // borderWidth: 1,
        // borderColor: COLOR_CONST.borderduckEggBlue,
        backgroundColor: COLOR_CONST.white,
        // marginLeft: scale(57),
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(30),
    },

    minus: {
        fontSize: scale(20),
        // marginLeft: scale(8),
        // marginRight: scale(8),
        // lineHeight: scale(22),
        // paddingHorizontal:scale(3),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.primaryThemeGradient,
        // backgroundColor:COLOR_CONST.secondaryThemeGradient,
       opacity: 0.5
    },
    
    plusMinusContainer:{
        backgroundColor:COLOR_CONST.primaryThemeGradient,
        height:"100%", 
        justifyContent:'center',
        alignItems:'center',
    },

    plusMinusContainer1:{
        // backgroundColor:COLOR_CONST.primaryThemeGradient,
        // height:"100%", 
        justifyContent:'center',
        alignItems:'center',

        width: Platform.OS === 'ios' ? scale(30) : scale(30),
                        borderWidth: 1,
                        borderRadius:30/5,
                        borderColor: COLOR_CONST.primaryThemeGradient, //COLOR_CONST.lightGreyText,
                        height:scale(30),
                        backgroundColor:'#fff',
                        paddingBottom: Platform.OS === 'ios' ? verticalScale(0) : verticalScale(3),
    },

    count: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.primaryThemeGradient,
        minWidth:scale(30),
        textAlign:"center"
    },

    plus: {
        fontSize: scale(20),
        // lineHeight: scale(22),
        // marginLeft: scale(8),
        // marginRight: scale(8),
        // paddingHorizontal:scale(3),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.primaryThemeGradient,
        // backgroundColor:COLOR_CONST.secondaryThemeGradient,
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
        alignItems: 'center',
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
        color: COLOR_CONST.google,
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
        marginBottom: verticalScale(30)
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
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
        marginVertical: verticalScale(20),
    },

    modalContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.white,
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
        color: COLOR_CONST.greenish,
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

    selectCouponCode: {
        fontSize: scale(15),
        lineHeight: scale(19),
        color: COLOR_CONST.coolGreyTwo,
        marginTop: verticalScale(23),
        letterSpacing: 0.4,
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
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
        borderBottomWidth: 0.5,
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
        backgroundColor: COLOR_CONST.greenButton,
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
        color: COLOR_CONST.google,
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

    modalContainer1: {
        flex: 1,
        backgroundColor: COLOR_CONST.modalTransparentBg,
        justifyContent: 'center',
        alignItems: 'center'
    },

    popup1: {
        width: scale(286),
        borderRadius: scale(8),
        backgroundColor: COLOR_CONST.white,
    },

    deleteAddress1: {
        fontSize: scale(18),
        lineHeight: scale(20),
        marginTop: verticalScale(31),
        fontFamily: FONTS.GTWalsheimProMedium,
        textAlign: 'center',
        color: COLOR_CONST.charcoalGrey
    },

    areYouSure1: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.8,
        marginTop: verticalScale(23),
        color: COLOR_CONST.coolGreyTwo,
        width: scale(221),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center',
        alignSelf: 'center',
    },

    bottomPopupView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: verticalScale(30),
        paddingTop: verticalScale(7.5),
        marginBottom: verticalScale(12.4),
        borderTopWidth: 1,
        borderTopColor: COLOR_CONST.lightGreyText,
    },

    verticalLine1: {
        width: scale(0.5),
        height: scale(25),
        backgroundColor: COLOR_CONST.lightGreyText,
    },

    cancelText1: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.coolGreyTwo,
        // marginLeft: scale(47.5),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center'
    },

    yesDelete1: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.8,
        // marginRight: scale(47.5),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center',
        color: COLOR_CONST.charcoalGrey
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

    crossButton: {
        position: 'absolute',
        top: verticalScale(10),
        right: scale(17.4),
        width: scale(20), 
        height: scale(20),
        justifyContent: 'center',
        alignItems: 'center' 
    },

    crossIcon: {
        width: scale(14.6),
        height: scale(14.6),
    },

    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(11),
        width: scale(180)
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
        marginLeft: scale(6),
        textDecorationLine: 'underline',
        color: COLOR_CONST.charcoalGrey,
    },

    availableCoupons: {
        flex: 0.5,
        marginTop: verticalScale(28),
        // alignSelf: 'center',
        marginHorizontal: scale(20),
    },

    couponCell: {
        borderBottomWidth: 1,
        width: scale(335),
        borderBottomColor: COLOR_CONST.greyTextColor,
        marginBottom: verticalScale(20),
    },

    offRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    offText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },
    
    userButton: {
        width: scale(64),
        height: scale(23),
        borderWidth: 1,
        borderColor: COLOR_CONST.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(21),
    },

    useText: {
        fontSize: scale(10),
        lineHeight: scale(11),
        letterSpacing: 0.29,
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.buttonColor,
    },

    couponDetails: {
        fontSize: scale(10),
        lineHeight: scale(11),
        letterSpacing: 0.29,
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.greyTextColor,
        marginBottom: verticalScale(17),
        width: scale(174),
    },
    logo_image:{
        width: scale(65),
        height: scale(65),    
    }
});
