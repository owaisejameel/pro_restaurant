import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.white,
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

    cartIcon: {
        width: scale(20.2),
        height: scale(17.9),
        marginRight: scale(25.6)
    },

    emtpyAddressContainer: {
        marginTop: verticalScale(72.2),
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1
    },

    emptyAddressIcon: {
        width: scale(124.1),
        height: scale(155.8),
        alignSelf: 'center',
    },

    noAnyOrder: {
        fontSize: scale(17),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(19),
        marginTop: verticalScale(34),
        opacity: 0.9,
        alignSelf:'center',
    },

    youhave: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(233),
        lineHeight: scale(18),
        textAlign: 'center',
        marginTop: verticalScale(8),
        opacity: 0.5
    },

    loginButton: {
        alignSelf: 'center',
        width: scale(335),
        height: scale(42),
        borderRadius: scale(20),
        opacity: 0.99,
        marginTop: verticalScale(37),
    },

    loginText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
    },

    listContainer: {
        flex: 1,
    },

    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(19),
        marginBottom: verticalScale(8.2)
    },

    orderNumber: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(11),
        opacity:0.4
    },

    totalAmountContainer: {
        backgroundColor: COLOR_CONST.white,
    },

    totalAmountText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.9,
        marginTop: verticalScale(7),
        marginLeft: scale(100),
    },

    writeReview: {
        fontSize: scale(14),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.facebook,
        marginRight: scale(11),
        marginTop: verticalScale(10),
        alignSelf: 'flex-end'
    },

    rowContainer: {
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(4),
        // paddingBottom: verticalScale(20),
        width: scale(353),
        alignSelf: 'center',
    },

    insideContainer: {
        // marginTop: verticalScale(2),
    },

    row: {
        flexDirection: 'row',
        // alignItems: 'center',
    },

    productImage: {
        width: scale(65),
        height: scale(65),
        marginLeft: scale(9),
        marginTop: verticalScale(16),
    },

    middleInfo: {
        marginLeft: scale(11),
        marginTop: verticalScale(15),
        width: scale(180),
    },

    productName: {
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(100),
        marginLeft: scale(11),
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
        color: COLOR_CONST.buttonColor,
    },

    dateRow: {
        flexDirection: 'row',
        // alignItems: 'center'
    },

    orderText: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.4,
        marginTop: verticalScale(6),
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

    statusRow: {
        width: scale(250),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    priceValue: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.9,
        marginTop: verticalScale(7),
        marginLeft: scale(11),
    },
    
    subscriptionPriceValue: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.9,
        marginTop: verticalScale(7),
        marginLeft: scale(100),
    },

    excludingGST: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.primaryThemeGradient,
        opacity: 0.9,
        marginLeft: scale(10)
    },

    rightInfo: {
        // marginLeft: scale(41),
        alignItems: 'flex-end',
        marginTop: verticalScale(14.8),   
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
        // marginTop: verticalScale(32),
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
    
    line: {
        width: scale(333),
        height: 1,
        alignSelf: 'center',
        backgroundColor: COLOR_CONST.lightGreyText,
        marginTop: verticalScale(16.2),
        opacity: 0.5
    },
    
    cancelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(11.5),
        paddingBottom: verticalScale(17),
        backgroundColor: COLOR_CONST.white
    },
    
    cancelOrder: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.modalTransparentBg,
        justifyContent: 'center',
        alignItems: 'center'
    },

    popup: {
        width: scale(286),
        borderRadius: scale(8),
        backgroundColor: COLOR_CONST.white,
    },

    reviewPopup: {
        width: scale(286),
        borderRadius: scale(8),
        backgroundColor: COLOR_CONST.white,
    },

    emptyText: {
        fontSize: scale(12),
        lineHeight: scale(14),
        marginBottom: verticalScale(15.8),
        fontFamily: FONTS.GTWalsheimProMedium,
        textAlign: 'center',
        color: COLOR_CONST.pastelRed
    },

    deleteAddress: {
        fontSize: scale(18),
        lineHeight: scale(20),
        marginTop: verticalScale(31),
        fontFamily: FONTS.GTWalsheimProMedium,
        textAlign: 'center',
        color: COLOR_CONST.charcoalGrey
    },

    areYouSure: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.8,
        marginTop: verticalScale(23),
        color: COLOR_CONST.greyTextColor,
        width: scale(221),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center',
        alignSelf: 'center',
    },

    bottomPopupView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: verticalScale(30),
        paddingTop: verticalScale(7.5),
        marginBottom: verticalScale(12.4),
        borderTopWidth: 1,
        borderTopColor: COLOR_CONST.lightGreyText,
    },

    bottomPopupViewReview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: verticalScale(7.5),
        marginBottom: verticalScale(12.4),
        borderTopWidth: 1,
        borderTopColor: COLOR_CONST.lightGreyText,
    },

    verticalLine: {
        width: 1,
        height: scale(25),
        backgroundColor: COLOR_CONST.lightGreyText,
    },

    cancelText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.greyTextColor,
        // marginLeft: scale(47.5),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center'
    },

    yesDelete: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.8,
        // marginRight: scale(47.5),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center',
        color: COLOR_CONST.charcoalGrey
    },

    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(12.2),
        marginBottom: verticalScale(15.2),
        marginHorizontal: scale(63.4),
    },

    star: {
        width: scale(23.9),
        height: scale(22.8)
    },

    ratingInput: {
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.charcoalGrey,
        width: scale(256),
        height: scale(90),
        borderRadius: scale(10),
        borderWidth: 1,
        borderColor: COLOR_CONST.lightGreyText,
        marginBottom: verticalScale(15.8),
        alignSelf: 'center',
        paddingTop: verticalScale(12.8),
        paddingHorizontal: scale(12),
    },

    labelSticker: {
        height: scale(22.2),
        borderTopLeftRadius: scale(50),
        borderBottomLeftRadius: scale(50),
        backgroundColor: COLOR_CONST.pastelRed,
        top:scale(5),
        right: 0,
        justifyContent: 'center',
        alignSelf:'flex-end'        
    },

    stickerText: {
        fontSize: scale(8),
        lineHeight: scale(9),
        letterSpacing: 0.3,
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
        marginLeft: scale(12.1),
        marginRight: scale(5),
    },

    package: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.primaryThemeGradient,
        marginStart: scale(13),
        marginTop: scale(5)
    },
    
    period: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.greenThemeColor,
        marginTop: scale(5)
    },
});
