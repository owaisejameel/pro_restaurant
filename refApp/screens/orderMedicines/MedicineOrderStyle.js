import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';


export default StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.LightlightNavy
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
    rootContainer: {
        flex: 1.5,
        backgroundColor: COLOR_CONST.LightlightNavy,
        justifyContent: 'center',
        zIndex: 6000,
    },
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dashedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: scale(50),
        width: scale(329),
        borderWidth: 1,
        borderColor: COLOR_CONST.white,
        borderRadius: 2,
        borderStyle: 'dashed',
        zIndex: 0,
        opacity: 0.8,
    },
    viewContainerFirst: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginHorizontal: scale(10),
        marginLeft: scale(30)
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginHorizontal: scale(10),
        // marginRight:scale(200)
    },
    viewContainerlast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginHorizontal: scale(10),
        marginRight: scale(30)
    },
    imageStyle: {
        height: scale(10),
        width: scale(9.9)
    },
    textView: {
        marginHorizontal: 5,
    },
    textStyle: {
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(12),
    },
    textinputRootView: {
        zIndex: 8888,
        backgroundColor: COLOR_CONST.LightlightNavy,
        // backgroundColor:'red',
        // paddingTop:-60,
        flex: 0.2,
    },
    textinputChildView: {
        alignSelf: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
        alignItems: 'center',
        // height: scale(40)
        /* borderRadius: 40,*/
    },

    verticaleLine: {
        borderLeftWidth: 0.8,
        borderLeftColor: COLOR_CONST.white,
        height: scale(30),
        marginTop: verticalScale(8)
    },

    textinputViewContainer: {
        width: scale(329),
        height: scale(44),
        justifyContent: 'center',
    },
    textinputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: COLOR_CONST.borderduckEggBlue,
        height: scale(45),
        borderRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    searchImage: {
        width: scale(17.9),
        height: scale(17.9),
        marginHorizontal: scale(12),
        opacity: 0.5
    },
    textInput: {
        fontFamily: COLOR_CONST.GTWalsheimProRegular,
        color:COLOR_CONST.coolGreyTwo,
        flex: 1,
        lineHeight:scale(18),
        fontSize: scale(15),
    },
    viewText: {
        flex: 5
    },
    scrollView: {
        backgroundColor: COLOR_CONST.paleGrey
    },
    TextContainer: {
        alignItems: 'center',
        marginTop: verticalScale(20),
    },
    text: {
        fontSize: scale(12),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
        marginTop: scale(20),
    },
    prescriptionView: {
        marginTop: verticalScale(19.8),
        marginBottom: verticalScale(10),
       
    },
    touchableOpacity: {
        alignSelf: 'center'
       
    },
    prescriptionRootView: {
        width: scale(335),
        height: verticalScale(50),
        backgroundColor: COLOR_CONST.white,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLOR_CONST.borderduckEggBlue
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.5,
        // shadowRadius: 1,
        // elevation: 1,
        // borderRadius: 40,
        // justifyContent:'center'
    },
    prescriptionChildView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: scale(10),
        marginVertical: verticalScale(14),
    },
    prescriptionContainer: {
        flexDirection: 'row'
    },
    prescriptionImage: {
        height: scale(23.8),
        width: scale(18.1),
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    prescriptionText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(14),
        lineHeight: scale(16),
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
        alignSelf: 'center',
        marginHorizontal: scale(10),
    },
    nextImageContainer: {
        alignSelf: 'center',
    },
    nextImage: {
        width: scale(6.5),
        height: scale(11.8),
        alignSelf: 'center',
        opacity: 0.5,
        marginRight: scale(23.32)
    },
    card: {
        alignItems: 'center'
    },
    cardRootView: {
        width: scale(335),
        height: scale(89),
        marginBottom: verticalScale(20.2),
        backgroundColor: COLOR_CONST.white,
        /*  borderWidth: scale(0.1),
          borderColor: COLOR_CONST.borderduckEggBlue,*/
    },
    cardChildView: {
        justifyContent: 'center',
        backgroundColor: COLOR_CONST.white,
        height: scale(100),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLOR_CONST.borderduckEggBlue
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.5,
        // shadowRadius: 1,
        // elevation: 1,
    },
    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scale(10)
    },
    cardContainer: {
        flexDirection: 'row'
    },
    cardImage: {
        height: scale(24),
        width: scale(24),
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    title: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(14),
        lineHeight: scale(16),
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
        marginHorizontal: scale(10)
    },
    subtitleView: {
        marginLeft: scale(20)
    },
    subtitle: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.coolGreyTwo,
        fontFamily: FONTS.GTWalsheimProRegular,
        // marginTop: verticalScale(16),
    },

    subtitleLsst: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.coolGreyTwo,
        fontFamily: FONTS.GTWalsheimProRegular,
        // marginTop: verticalScale(7.4),
    },
    subtitleViewDont: {
        justifyContent: 'flex-start',
        flexDirection: "row",
        marginTop: verticalScale(16)
    },

    dot: {
        height: scale(3),
        width: scale(3),
        borderRadius: 3,
        backgroundColor: COLOR_CONST.coolGreyTwo,
        alignSelf: 'center',
        marginRight: scale(5)
    },

    selectDoctor: {
        justifyContent: 'flex-start',
        flexDirection: "row",
        marginTop: verticalScale(7.4)
    },

    downImage: {
        width: scale(11.8),
        height: scale(6.5),
        alignSelf: 'center',
        marginTop: verticalScale(9),
        marginRight: scale(20.6),
        opacity: 0.5,
    },
    bottomView: {
        marginVertical: scale(7)

    },
    RecommendedContainer: {
        marginBottom: verticalScale(20)
    }
});
