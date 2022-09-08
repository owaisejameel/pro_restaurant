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

    counterContainer: {
        marginBottom: verticalScale(15),
    },

    digitContainer: {
        width: scale(25),
    },

    digitStyle: {
        fontSize: scale(20),
        lineHeight: scale(23),
        fontFamily:FONTS.GTWalsheimProLight,
        color:COLOR_CONST.google,
    },    

    resendText: {
        fontSize: scale(20),
        lineHeight: scale(23),
        fontFamily:FONTS.GTWalsheimProMedium,
        color:COLOR_CONST.google,
        textDecorationLine: 'underline',
        marginBottom: verticalScale(15),
    },

    verifyButton: { 
        zIndex: 1000,
        position: 'absolute',
        right: 0,
        top: verticalScale(25),
        width: scale(100),
        height: scale(50),
        justifyContent: 'center',
        alignItems: 'center'
    },

    otpVerifyText: {
        fontSize: scale(12),
        lineHeight: scale(14),
        letterSpacing: scale(0.34),
        fontFamily:FONTS.GTWalsheimProBold,
        color:COLOR_CONST.buttonColor,
        // marginBottom: verticalScale(15),
        // position: 'absolute',
        // right: 0,
        bottom: verticalScale(20),
    },
    

});
