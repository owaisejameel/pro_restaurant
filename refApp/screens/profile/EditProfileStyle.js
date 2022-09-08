import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.white
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
        backgroundColor: COLOR_CONST.white,
        paddingHorizontal: scale(18),
        paddingBottom: verticalScale(40),
        marginTop: verticalScale(2),
    },

    container: { 
        flex: 1,
        backgroundColor: COLOR_CONST.paleGrey,  
    },

    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },

    loginButton: {
        width: scale(339),
        height: scale(42),
        borderRadius: scale(21),
        opacity: 0.99,
        // marginTop: verticalScale(113),
        marginBottom: verticalScale(45),
        alignSelf: 'center'
    },

    cameraButton: {
        width: scale(122),
        height: scale(122),
        borderRadius: scale(6),
        backgroundColor: COLOR_CONST.paleGreyFour,
        marginTop: verticalScale(36),
        marginBottom: verticalScale(29),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden'
    },

    profileIcon: {
        width: scale(122),
        height: scale(122),
    },

    cameraIcon: {
        width: scale(34.8),
        height: scale(27.5),
    },

    loginText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.9,
        letterSpacing: 0.4,
        fontFamily: FONTS.GTWalsheimProMedium,
    },

    modalContainer: {
        flex: 1,
    },

    transparentBg: {
        flex: 1,
        backgroundColor: COLOR_CONST.modalBackgroundColor,
        opacity: 0.55,
    },

    bottomView: {
        width: scale(375),
        height: scale(211),
        backgroundColor: COLOR_CONST.white
    },

    crossIcon: {
        width: scale(24),
        height: scale(24),
        alignSelf: 'flex-end',
        marginTop: verticalScale(16),
        marginRight: scale(16),
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(19)
    },

    leftButton: {
        alignItems: 'center',
        marginRight: scale(39),
    },

    rightButton: {
        alignItems: 'center',
        marginLeft: scale(39),
    },

    takePictureText: {
        fontSize: scale(14),
        lineHeight: scale(20),
        marginTop: verticalScale(24),
        fontFamily: FONTS.MetropolisBold,
        textAlign: 'center',
        color: COLOR_CONST.modalButtonColor
    },
    
    cameraIcon: {
        width: scale(24),
        height: scale(24),
        marginTop: verticalScale(16),
    },

    whiteCameraContainer: {
        width: scale(122),
        height: scale(122),
        backgroundColor: 'transparent',
        position: 'absolute',
        alignSelf: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    whiteCamera: {
        width: scale(34.8),
        height: scale(27.5),
    },

    checkContainer: {
        marginLeft: scale(13)
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
        color:COLOR_CONST.greenish,
        // marginBottom: verticalScale(15),
        // position: 'absolute',
        // right: 0,
        bottom: verticalScale(20),
    },
    
    

});
