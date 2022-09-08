import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.primaryThemeGradient
    },

    emptyView: {
        flex: 1,
        backgroundColor: COLOR_CONST.white
    },

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.paleGrey
    },

    wrapper: {
        height: scale(160),
    },

    banner: {
        width: scale(375),
        height: scale(160),
    },

    banner1: {
        width: scale(140),
        height: scale(140),
    },

    logoIcon: {
        width: scale(50),
        height: scale(50),
        marginLeft: scale(15),
    },

    slide1: {
        height: scale(107),
    },

    slide2: {
        width: scale(374),
        height: scale(107),
        backgroundColor: 'red'
    },

    slide3: {
        width: scale(374),
        height: scale(107),
        backgroundColor: 'black'
    },

    pagination: {
        position: 'absolute',
        bottom: verticalScale(7),
        left: 0,
        right: 0,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    overlayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
    },

    welcome: {
        textAlign: 'center',
        fontSize: scale(21),
        lineHeight: scale(24),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.white,
        marginTop: verticalScale(19.2),
    },

    detailContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    detailText: {
        marginTop: verticalScale(12),
        width: scale(288),
        textAlign: 'center',
        fontSize: scale(8),
        lineHeight: scale(9),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.white,
    },

    inActiveDot: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CONST.inActiveDotLightGrey,
        width: scale(4), 
        height: scale(4),
        borderRadius: scale(2), 
        marginHorizontal: scale(2.5),
    },

    activeDot: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CONST.coolGreyTwo,
        width: scale(4), 
        height: scale(4),
        borderRadius: scale(2), 
        marginHorizontal: scale(2.5),
    },

    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    logoImage: {
        marginTop: verticalScale(287),
        width: scale(195),
        height: scale(96)
    },

    headerContainer: {
        backgroundColor: COLOR_CONST.LightlightNavy,
        alignContent: 'flex-start',
        paddingBottom: 10
    },

    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: verticalScale(20),
    },

    homeHeaderText: {
        // color: COLOR_CONST.white,
        // fontFamily: FONTS.GTWalsheimProBold,
        // fontSize: scale(28),
        // lineHeight: scale(32),
        // textAlign: 'left',
        marginLeft: scale(23),
        // marginRight: scale(15),
    },

    orglivTextImage: {
        width: scale(109),
        height: scale(40),
    },

    locationTitleText: {
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(11),
        lineHeight: scale(13)
    },

    locationNameText: {
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(15),
        lineHeight: scale(18)
    },

    pincodeStyle: {
        // backgroundColor: COLOR_CONST.greenBlue,
        justifyContent:'center',
        // borderRadius: scale(30),
        // paddingHorizontal: scale(10),
        marginHorizontal: scale(10),
        // marginTop: verticalScale(12),
        // marginHorizontal: scale(23),
        width:scale(170)
    },
    pincodeTextTitle: {
        fontSize: scale(13),
        color: COLOR_CONST.white,
        lineHeight: scale(15),
        // marginVertical: scale(5),
        fontFamily:FONTS.GTWalsheimProMedium,
        top:Platform.OS==='android'? scale(9) : scale(8),
        paddingLeft:Platform.OS==='android'? scale(4) : 0,
    },
    pincodeText: {
        // color: COLOR_CONST.white,
        // fontFamily: FONTS.GTWalsheimProMedium,
        // fontSize: scale(13),
        // lineHeight: scale(15)
        // width: scale(256),
        fontSize: scale(13),
        color: COLOR_CONST.white,
        lineHeight: scale(18),
        // marginLeft: scale(18.3),
        fontFamily:FONTS.GTWalsheimProMedium
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

    SectionStyle: {
        marginTop: verticalScale(12),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: COLOR_CONST.borderduckEggBlue,
        height: verticalScale(44),
        borderRadius: 4,
        marginHorizontal: scale(23),
        marginBottom: verticalScale(22)
    },
    LocationStyle: {
        marginTop: verticalScale(12),
        marginHorizontal: scale(23),
    },
    ImageStyle: {
        marginLeft: scale(16),
        marginRight: scale(14.1),
        height: scale(17.9),
        width: scale(17.9),
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    searchText: {
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.greyTextColor,
        fontFamily: FONTS.GTWalsheimProRegular
    },

    buttonContainer: {
        alignItems: 'center',
        paddingBottom: verticalScale('20.2')
    },

    customButtonStyle: {
        width: scale(335),
        height: scale(50),
        borderRadius: 5,
        backgroundColor: COLOR_CONST.primaryThemeGradient,
    },

    customButtonTextStyle: {
        color: 'white',
        fontSize: scale(17),
        lineHeight: scale(19),
        marginLeft: scale(13.2),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    buttonImage: {
        width: scale(17),
        height: scale(17)
    },

    ImageBackground: {
        height: scale(150),
        width: scale(375),
        marginBottom: verticalScale(20)
    },

    startOrderButton: {
        width: scale(70.3),
        height: scale(19.3),
        marginTop: verticalScale(116),
        backgroundColor: COLOR_CONST.primaryThemeGradient,
        marginLeft: scale(214)
    },

  
    startOrderButtonText: {
        fontSize: scale(8),
        lineHeight: scale(9),
        letterSpacing: scale(0.23),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium
    },

    productGridStyle: {
        marginTop: verticalScale(10),
        // marginBottom: verticalScale(150)
    },

    chatRoundView: {
        position: 'absolute',
        right: scale(10),
        bottom: verticalScale(10),
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        backgroundColor: COLOR_CONST.transparent,
        justifyContent: 'center',
        alignItems: 'center'
    },

    chatIcon: {
        height: scale(65),
        width: scale(65)
    },
});
