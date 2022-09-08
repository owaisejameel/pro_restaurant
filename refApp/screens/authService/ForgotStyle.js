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
        backgroundColor: COLOR_CONST.primaryThemeGradient,
    },

    innerContainer: {
        flex: 1, 
        backgroundColor: COLOR_CONST.LightlightNavy,
        height: scale(160.8),
    },

    brandName: {
        fontSize: scale(21),
        lineHeight: scale(24),
        marginTop: verticalScale(40),
        width: scale(323),
        height: scale(24),
        marginLeft: scale(20),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
    },

    getStartedText: {
        fontSize: scale(12),
        lineHeight: scale(14),
        marginTop: verticalScale(12),
        width: scale(323),
        height: scale(44),
        marginLeft: scale(20),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    homeoIcon: {
        alignSelf: 'center',
        // width: scale(137.6),
        // height: scale(50.9),
        marginTop: verticalScale(50),
        // marginLeft: scale(26.9)
    },

    forgotPasswordContainer: {
        width: scale(274),
        height: scale(38),
        zIndex: 8888,
        borderRadius: scale(18),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: Platform.OS === 'ios' ? verticalScale(145) : verticalScale(145),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderWidth: 0.1,
        elevation: 2,
    },

    forgotTextHeader: {
        fontSize: scale(16),
        lineHeight: scale(16),
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.9,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
    },

    resetText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginTop: verticalScale(46),
        color: COLOR_CONST.greyTextColor,
        width: scale(274),
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    enterYourText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        marginTop: verticalScale(46),
        color: COLOR_CONST.greyTextColor,
        width: scale(274),
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    box1: {
        flex: 1,
        marginTop: verticalScale(45),
        backgroundColor: '#eaf0fb'
    },

    segmentButtonHolder: {
        width: scale(274),
        height: scale(38),
        borderRadius: scale(20),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },

    tabStyle: {
        backgroundColor: '#ffffff',
        borderColor: '#fff',
        borderRadius: scale(20),
        width: scale(145),
        height: scale(38)
    },

    activeTabStyle: {
        backgroundColor: COLOR_CONST.darkishBlue,
        borderColor: COLOR_CONST.darkishBlue,
        borderRadius: scale(20),
    },

    activetabTextStyle: {
        fontSize: scale(15), 
        color: '#ffffff', 
        fontFamily:FONTS.GTWalsheimProBold
    },

    innerTopContainer: {
        // marginTop: verticalScale(44),
        backgroundColor: '#fff',
        borderTopRightRadius: scale(10),
        borderTopLeftRadius: scale(10),
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        zIndex: 1000,
    },

    fieldContainer: {
        marginTop: scale(29),
        alignItems: 'center'
    },

    input: {
        width: scale(256),
        height: scale(40),
        fontSize: scale(15),
        color: COLOR_CONST.focusDarkColor,
        lineHeight: scale(18),
        marginLeft: scale(18.3),
        fontFamily:FONTS.GTWalsheimProMedium
    },

    input1: {
        width: scale(222.8),
        height: scale(40),
        fontSize: scale(15),
        color: COLOR_CONST.focusDarkColor,
        lineHeight: scale(18),
        marginLeft: scale(18.3),
        fontFamily:FONTS.GTWalsheimProRegular
    },

    loginButton: {
        width: scale(312),
        height: scale(44),
        marginTop: verticalScale(29),
        // marginBottom: verticalScale(20),
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
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.59,
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

    topContainer: {
    },

    bottomContainer: {
        marginTop: -2,
        backgroundColor: COLOR_CONST.paleGrey,
    },

    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: scale(110),
        height: scale(37.8),
        borderRadius: scale(19.8),
        backgroundColor: COLOR_CONST.darkishBlue
    },

    socialButtonContainer: {
        marginTop: verticalScale(13.8),
        marginHorizontal: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    fStyle: {
        width: scale(5.7),
        height: scale(13.1),
        marginLeft: scale(14),
        marginRight: verticalScale(12),
    },

    gStyle: {
        width: scale(15.7),
        height: scale(10.1),
        marginLeft: scale(14),
        marginRight: scale(8.2)
    },

    aStyle: {
        width: scale(13.5),
        height: scale(16.5),
        marginLeft: scale(26),
        marginRight: scale(16.5),
    },

    fbText: {
        fontSize: scale(14.4),
        lineHeight: scale(17),
        fontFamily:FONTS.GTWalsheimProMedium,
        color:COLOR_CONST.white,
    },

    skipText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        // marginTop: verticalScale(33),
        color: COLOR_CONST.greyTextColor,
        textAlign: 'center',
        marginBottom: verticalScale(20),
        fontFamily:FONTS.GTWalsheimProRegular
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

    ImageStyleEmail: {
        height: scale(22.7),
        width: scale(14.3),
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
    },

    counterContainer: {
        marginBottom: verticalScale(15),
    },

    digitContainer: {
        // width: scale(50),
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
    
});
