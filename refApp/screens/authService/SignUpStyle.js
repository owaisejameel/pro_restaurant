import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';
import R from '../../R';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({

    container: {
        flex: 1,
    },

    innerTopContainer: {
        backgroundColor: '#fff',
        borderTopRightRadius: scale(10),
        borderTopLeftRadius: scale(10),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    fieldContainer: {
        marginTop: scale(61.8),
        alignItems: 'center'
    },

    input: {
        width: scale(256),
        height: scale(40),
        fontSize: scale(15),
        color: COLOR_CONST.darkishBlue,
        lineHeight: scale(18),
        marginLeft: scale(18.3),
        fontFamily:FONTS.GTWalsheimProMedium
    },

    input1: {
        width: scale(222.8),
        height: scale(40),
        fontSize: scale(15),
        color: COLOR_CONST.darkishBlue,
        lineHeight: scale(18),
        marginLeft: scale(18.3),
        fontFamily:FONTS.GTWalsheimProMedium
    },

    loginButton: {
        width: scale(312),
        height: scale(44),
        marginTop: verticalScale(29),
        marginBottom: verticalScale(18),
        backgroundColor: COLOR_CONST.primaryThemeGradient,
    },

    loginText: {
        fontSize: scale(14),
        lineHeight: scale(16),
        letterSpacing: 0.4,
        opacity: 0.9,
        fontFamily: FONTS.GTWalsheimProBold,
    },

    forgotText: {
        fontSize: scale(13),
        lineHeight: scale(15),
        textAlign: 'center',
        marginTop: verticalScale(24),
        marginBottom: verticalScale(21),
        fontFamily:FONTS.GTWalsheimProRegular,
        color:COLOR_CONST.charcoalGrey,
        opacity:0.7
    },

    continueText: {
        fontSize: scale(11),
        lineHeight: scale(13),
        color: COLOR_CONST.greyTextColor,
        textAlign: 'center',
        marginTop: verticalScale(21),
        fontFamily:FONTS.GTWalsheimProRegular
    },

    signUpVia: {
        fontSize: scale(11),
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.59,
        textAlign: 'center',
        fontFamily:FONTS.GTWalsheimProRegular
    },

    bottomContainer: {
        // height: Platform.OS === 'ios' ? "100%" : verticalScale(259),
        // backgroundColor: COLOR_CONST.paleGreyFive, 
    },

    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(37.8),
        borderRadius: scale(19.8),
        marginHorizontal: scale(2),
        backgroundColor: COLOR_CONST.facebook,
        flex: 1
    },

    appleSocialButtonContainer: {
        marginTop: verticalScale(13.8),
        marginHorizontal: scale(20)
    },

    appleSocialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(37.8),
        borderRadius: scale(19.8),
        backgroundColor: COLOR_CONST.darkishBlueTwo
    },

    socialButtonContainer: {
        marginTop: verticalScale(13.8),
        marginHorizontal: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    fStyle: {
        width: scale(5.7),
        height: scale(13.1),
        marginRight: verticalScale(12),
    },

    gStyle: {
        width: scale(16.3),
        height: scale(12.2),
        marginRight: scale(7.7)
    },

    aStyle: {
        width: scale(13.5),
        height: scale(16.5),
        marginRight: scale(16.5),
    },

    fbText: {
        fontSize: scale(14.4),
        lineHeight: scale(17),
        fontFamily:FONTS.GTWalsheimProBold,
        color:COLOR_CONST.white,
    },

    skipText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        // marginTop: verticalScale(9),
        color: COLOR_CONST.greyTextColor,
        textAlign: 'center',
        marginBottom: verticalScale(18),
        fontFamily:FONTS.GTWalsheimProRegular
    },

    bySigningUp: {
        fontSize: scale(13),
        lineHeight: scale(15),
        marginTop: verticalScale(15.2),
        color: COLOR_CONST.greyTextColor,
        textAlign: 'center',
        fontFamily:FONTS.GTWalsheimProLight
    },

    termsAndConditionText: {
        fontSize: scale(13),
        lineHeight: scale(15),
        marginTop: verticalScale(9),
        marginBottom: verticalScale(9),
        color: COLOR_CONST.apple,
        textAlign: 'center',
        fontFamily:FONTS.GTWalsheimProMedium
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: COLOR_CONST.whiteThree,
        width: scale(312),
        height: scale(40),
        borderRadius: scale(20),
    },

    SectionStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: COLOR_CONST.focusDarkColor,
        width: scale(312),
        height: scale(40),
        borderRadius: scale(20),
    },

    errorSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: COLOR_CONST.pastelRed,
        width: scale(312),
        height: scale(40),
        borderRadius: scale(20),
    },

    ImageStyleAccount: {
        width: scale(24.1),
        height: scale(24.1),
        marginLeft: scale(13.9),
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    ImageStyleEmail: {
        width: scale(22.7),
        height: scale(14.3),
        marginLeft: scale(15),
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    phoneImage: {
        width: scale(12.8),
        height: scale(20.2),
        marginLeft: scale(15),
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    ImageStylekey: {
        width: scale(23.9),
        height: scale(11.7),
        marginLeft: scale(15),
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    eye: {
        marginRight: scale(16.8)
    },

    ImageStyleEye: {
        width: scale(16.5),
        height: scale(11.3),
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    bottomView: {
        alignSelf: 'flex-end',
        width: scale(375),
        height: scale(70),
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        justifyContent: 'center',
    },

    alertText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily:FONTS.GTWalsheimProRegular,
        color:COLOR_CONST.pastelRed,
        width: scale(295),
        marginLeft: scale(20)
    },

    crossIcon: {
        width: scale(14.6),
        height: scale(14.6),
        position: 'absolute',
        bottom: verticalScale(17.6),
        right: scale(17.4),
    }
    
});
