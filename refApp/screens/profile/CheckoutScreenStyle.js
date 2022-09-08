import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
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

    formContainer: { 
        flex: 1,
        backgroundColor: COLOR_CONST.white,
        paddingHorizontal: scale(18),
        paddingTop: verticalScale(22),
        marginHorizontal: scale(11),
        marginTop: verticalScale(20.8),
    },

    loginButton: {
        width: scale(339),
        height: scale(42),
        borderRadius: scale(21),
        opacity: 0.99,
        marginBottom: verticalScale(30.2),
        alignSelf: 'center'
    },

    loginText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        letterSpacing: 0.4,
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
    },

    selectAddressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(21),
    },

    billingAddress: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProMedium,
    },

    selectAddress: {
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.facebook,
        fontFamily: FONTS.GTWalsheimProMedium,
    },

    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkBoxContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(14.8),
    },

    checkbox: {
        width: scale(15),
        height: scale(15),
    },

    billingText: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.coolGreyTwo,
        fontFamily: FONTS.GTWalsheimProRegular,
        marginLeft: scale(6)
    }

});
