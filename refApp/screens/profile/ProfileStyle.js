import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.paleGrey
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

    cartIcon: {
        width: scale(20.2),
        height: scale(17.9),
        marginRight: scale(25.6)
    },

    headerContainer: {
        flexDirection: 'row',
        backgroundColor: COLOR_CONST.white,
        paddingBottom: verticalScale(22),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    
    leftRow: {
        flexDirection: 'row',
    },

    carmeraButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(62),
        height: scale(62),
        borderRadius: scale(6),
        backgroundColor: COLOR_CONST.paleGreyFour,
        marginLeft: scale(18),
        overflow: 'hidden'
    },

    cameraIcon1: {
        width: scale(17.7),
        height: scale(14),
    },

    profileIcon: {
        width: scale(62),
        height: scale(62),
    },

    propfileData: {
        width: scale(161),
        marginLeft: scale(16),
    },

    profileName: {
        fontSize: scale(24),
        lineHeight: scale(28),
        marginTop: verticalScale(12),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    profileEmail: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
        shadowColor: COLOR_CONST.black,
        backgroundColor: COLOR_CONST.white,
        width: scale(260),
    },

    listContainer: {
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(21),
        marginTop: verticalScale(5.4),
        backgroundColor: COLOR_CONST.white,
    },

    bottomListContainer: {
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(16),
        marginTop: verticalScale(5.6),
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        marginBottom: verticalScale(57.8),
    },

    rowItemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    leftIcon: {
        width: scale(16),
        height: scale(16),
        marginLeft: scale(26),
    },

    logoutIcon: {
        width: scale(17.7),
        height: scale(17),
        marginLeft: scale(26),
    },

    paymentIcon: {
        width: scale(14.4),
        height: scale(10.6),
        marginLeft: scale(26),
    },

    notificationIcon: {
        width: scale(15.8),
        height: scale(18),
        marginLeft: scale(26),
    },

    wishList: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(19),
    },

    countContainer: {
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        backgroundColor: COLOR_CONST.charcoalGrey,
        marginLeft: scale(214),
        justifyContent: 'center',
        alignItems: 'center',
    },

    countText: {
        fontSize: scale(13),
        lineHeight: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.white,
    },

    horizontalLine: {
        width: scale(336.8),
        height: 1,
        backgroundColor: COLOR_CONST.defaultBgColor,
        marginLeft: scale(31),
        marginTop: verticalScale(9),
        marginBottom: verticalScale(13),
    },

    notifIcon: {
        width: scale(40.8),
        height: scale(27),
        marginLeft: scale(167.1)
    },

    modalContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.modalTransparentBg,
        justifyContent: 'center',
        alignItems: 'center'
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


    popup: {
        width: scale(286),
        borderRadius: scale(8),
        backgroundColor: COLOR_CONST.white,
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
        color: COLOR_CONST.coolGreyTwo,
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

    editButton: {
        width: scale(68),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: COLOR_CONST.paleGreyTwo,
        marginLeft: scale(25),
        justifyContent: 'center',
        alignItems: 'center'
    },

    editText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'center',
        opacity: 0.8,
        color: COLOR_CONST.darkBlueGrey,
    }

});
