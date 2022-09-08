import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLOR_CONST.white
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

    listContainer: {
        flex: 1,
        paddingBottom: verticalScale(31),
        backgroundColor: COLOR_CONST.white
    },

    cardContainer: {
        width: scale(335),
        height: scale(170.1),
        borderRadius: scale(10),
    },

    shadowView: {
        marginTop: verticalScale(46),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: scale(7),
        borderRadius: scale(10),
        alignSelf: 'center'
    },

    visaImage: {
        width: scale(46.8),
        height: scale(15.2),
        alignSelf: 'flex-end',
        marginTop: verticalScale(19.8),
        marginRight: scale(18.2)
    },

    cardNumber: {
        fontSize: scale(10),
        marginTop: verticalScale(18.5),
        lineHeight: scale(11),
        color: COLOR_CONST.white,
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    cardName: {
        height: scale(58),
    },

    cardNoText: {
        fontSize: scale(23),
        marginTop: verticalScale(9),
        lineHeight: scale(27),
        color: COLOR_CONST.white,
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    cardHolderText: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.white,
        width: scale(198),
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    cardHolder: {
        fontSize: scale(13),
        lineHeight: scale(15),
        marginTop: verticalScale(28),
        color: COLOR_CONST.charcoalGrey,        
        fontFamily: FONTS.MetropolisRegular,
    },

    expires: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.white,
        width: scale(120),
        fontFamily: FONTS.MetropolisRegular,
    },

    cardNo: {
        fontSize: scale(13),
        marginTop: verticalScale(9),
        lineHeight: scale(15),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.MetropolisRegular,
    },

    expiryCVV: {
        fontSize: scale(13),
        marginTop: verticalScale(28),
        lineHeight: scale(15),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.MetropolisRegular,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: verticalScale(22),
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(5),
    },

    cardHolderName: {
        fontSize: scale(16),
        lineHeight: scale(18),
        width: scale(198),
        color: COLOR_CONST.white,
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    date: {
        fontSize: scale(16),
        lineHeight: scale(18),
        color: COLOR_CONST.white,
        width: scale(120),
        marginLeft: scale(2),
        fontFamily: FONTS.MetropolisRegular,
    },

    continueShoppingButton: {
        width: scale(339),
        height: scale(42),
        marginBottom: verticalScale(30),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.99
    },

    goToMyOrdersButton: {
        width: scale(339),
        height: scale(42),
        marginBottom: verticalScale(28.2),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.99
    },

    changeThePaymentMethodButton: {
        width: scale(339),
        height: scale(42),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: 0.99
    },

    continueText: {
        fontSize: scale(15),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
        lineHeight: scale(18),
        textAlign: 'center'
    },

    textFieldContainer: {
        marginTop: verticalScale(35.4),
        marginHorizontal: scale(25)
    },

    input: {
        height: scale(37),
        borderBottomWidth: 1,
        borderColor: COLOR_CONST.lightGreyText,
    },

    inputBottom: {
        height: scale(37),
        width: scale(134.1),
        borderBottomWidth: 1,
        borderColor: COLOR_CONST.lightGreyText,
    },

    rightBottomField: {
        marginLeft: scale(33.9),
    },

    bottomFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    orderConfirmedView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    checkMarkImage: {
        width: scale(97.4),
        height: scale(84.7),
    },

    orderConfirmedText: {
        fontSize: scale(16),
        marginTop: verticalScale(44.1),
        lineHeight: scale(18),
        color: COLOR_CONST.greenish,
        fontFamily: FONTS.MetropolisRegular,
    },

    thankYouText: {
        fontSize: scale(14),
        marginTop: verticalScale(11.1),
        lineHeight: scale(16),
        color: COLOR_CONST.greyTextColor,
        fontFamily: FONTS.MetropolisRegular,
    },

    productName: {
        fontSize: scale(14),
        marginTop: verticalScale(18.4),
        lineHeight: scale(16),
        color: COLOR_CONST.greyTextColor,
        fontFamily: FONTS.MetropolisRegular,
    },

    orderNumber: {
        fontSize: scale(14),
        marginTop: verticalScale(18.4),
        lineHeight: scale(16),
        color: COLOR_CONST.greyTextColor,
        fontFamily: FONTS.MetropolisRegular,
    },

    productDate: {
        fontSize: scale(14),
        marginTop: verticalScale(18.4),
        lineHeight: scale(16),
        color: COLOR_CONST.greyTextColor,
        fontFamily: FONTS.MetropolisRegular,
    },

    horizontalLine: {
        height: verticalScale(1),
        width: scale(243.1),
        backgroundColor: COLOR_CONST.lightGreyText,
        marginTop: verticalScale(12.2),
    },

    rowDollar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(12.4)
    },

    dollar: {
        fontSize: scale(18),
        lineHeight: scale(18),
        color: COLOR_CONST.apple,
        fontFamily: FONTS.MetropolisRegular,
    },

    dollarValue: {
        fontSize: scale(26),
        lineHeight: scale(26),
        // marginLeft: scale(8.6),
        color: COLOR_CONST.apple,
        fontFamily: FONTS.ProximaRegular,
    },

    innerDollarValue: {
        fontSize: scale(15),
        lineHeight: scale(26),
        color: COLOR_CONST.dollarValue,
        fontFamily: FONTS.MetropolisRegular,
    },

    orderData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    crossImage: {
        width: scale(82.5),
        height: scale(82.5),
        marginTop: verticalScale(43),
    },

    ohNoes: {
        fontSize: scale(20),
        marginTop: verticalScale(17.5),
        lineHeight: scale(23),
        color: COLOR_CONST.google,
        fontFamily: FONTS.MetropolisRegular,
    },

    orderDeclinedText: {
        fontSize: scale(16),
        marginTop: verticalScale(46.5),
        lineHeight: scale(18),
        color: COLOR_CONST.google,
        fontFamily: FONTS.MetropolisRegular,
    },

    cancelText: {
        fontSize: scale(15),
        marginTop: verticalScale(18.3),
        marginBottom: verticalScale(38.7),
        textAlign: 'center',
        lineHeight: scale(18),
        color: COLOR_CONST.thankYouGrey,
        fontFamily: FONTS.MetropolisRegular,
    }
});
