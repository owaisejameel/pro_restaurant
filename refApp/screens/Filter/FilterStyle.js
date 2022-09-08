import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
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

    clearText: {
        fontSize: scale(12),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.coolGreyTwo,
        lineHeight: scale(14),
        marginRight: scale(20),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    HeaderConatiner: {
        flexDirection: 'row',
        backgroundColor: COLOR_CONST.white,
        width: scale(375),
        height: scale(50),
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowColor: COLOR_CONST.black,
        elevation: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(1),
    },

    LeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale(68),
    },

    RightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale(68)
    },

    verticleLine: {
        height: scale(20),
        width: 1,
        backgroundColor: COLOR_CONST.coolGrey,
        opacity: 0.4,
        // alignSelf: 'center',
        // marginLeft: scale(70)

    },

    imageSize: {
        width: scale(13.5),
        height: scale(8),
    },

    imageSizeFilter: {
        width: scale(10.5),
        height: scale(13),
    },

    FilterStyle: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(10.5),
    },

    sortStyle: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(10.5),
        opacity: 0.5
    },

    buttonCustom: {
        width: scale(173),
        height: scale(44),
        // marginTop: verticalScale(27),
        borderRadius: 21,
        backgroundColor: COLOR_CONST.coolGrey,
        opacity: 0.99,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonConatiner: {
        position: 'absolute',
        bottom: verticalScale(7),
        left: 0,
        right: 0,
        // height: scale(59),
        width: scale(375),
        alignContent: 'center',
        backgroundColor: COLOR_CONST.white
    },

    InnerConatiner: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: verticalScale(8),
        // marginBottom: verticalScale(7),
        marginHorizontal: scale(11)
    },

    customTxtStyle: {
        color: COLOR_CONST.white,
        alignSelf: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(14),
        lineHeight: scale(16),
        letterSpacing: 0.4
    },

    containerFilter: {
        flexDirection: 'row',
    },


    LeftContainerFilter: {
        backgroundColor: COLOR_CONST.whiteTwo,
        width: scale(119.2),
        height: scale(637.4),
        marginTop: verticalScale(7),
        alignSelf: 'flex-start',
    },

    buttonStyle: {
        backgroundColor: COLOR_CONST.btnColor,
        // width: wp('40%'),
        // height: hp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        opacity: 0.7,
        marginBottom: 5,
    },

    priceRangeTitle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        lineHeight: scale(24),
        color: COLOR_CONST.charcoalGrey,
        textAlign: 'left',
        marginLeft: scale(13.9)
    },

    SelectPriceTitle: {
        marginLeft: scale(26.8),
        // marginTop: verticalScale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(15),
        lineHeight: scale(18),
        textAlign: 'left',
        color: COLOR_CONST.charcoalGrey
    },

    rangeConatiner: {
        backgroundColor: COLOR_CONST.white,
        height: scale(642),
        width: scale(255.8),
        paddingTop: verticalScale(26),
    },

    CategoryConatiner: {
        backgroundColor: COLOR_CONST.white,
        flex: 1,
        // height: scale(642),
        width: scale(255.8)

    },
    BrandConatiner: {
        backgroundColor: COLOR_CONST.white,
        height: scale(642),
        width: scale(255.8)
    },

    searchImage: {
        width: scale(16),
        height: scale(16),
        alignSelf: 'center'
    },
    TextInputStyle: {
        flex: 1,
        height: scale(50),
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(15),
        lineHeight: scale(18),
        textAlign: 'left',
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(18)
    },

    CategoryFilterConatiner: {
        flexDirection: 'row',
        marginLeft: scale(27.8),
        marginBottom: scale(28.7)
    },

    BrandFilterConatiner: {
        flexDirection: 'row',
        marginLeft: scale(27.8),
        marginBottom: scale(28.8)
    },

    DiscountedStyle: {
        fontSize: scale(15),
        lineHeight: scale(18),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'left',
        opacity: 0.8,
        marginLeft: scale(11.4),
        alignSelf: 'center'
    },

    searchCatgeory: {
        marginTop: verticalScale(23),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: scale(28)
    },

    CheckIocnStyle: {
        width: scale(14.9),
        height: scale(14.9),
        borderRadius: 3
    },

    labelTitle: {
        fontSize: scale(15),
        lineHeight: scale(18),
        textAlign: 'left',
        fontFamily: FONTS.GTWalsheimProRegular,
        marginLeft: scale(19.1),
        color: COLOR_CONST.coolGreyTwo

    },

    starightLine: {
        borderWidth: 0.5,
        borderColor: COLOR_CONST.charcoalGrey,
        marginBottom: verticalScale(22),
        opacity: 0.2,
        marginLeft: scale(27.8)
    },

    rangeContainer: {
        width: scale(214.3),
        height: scale(30),
        marginLeft: scale(20),
    },

    rangeRow: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scale(202.3),
        marginTop: verticalScale(23),
        marginLeft: scale(25.8)
    },

    rangeText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
    },

    checkBoxContainer: {
        flexDirection:'row', 
        alignItems: 'center',
        marginLeft:scale(27.3), 
        marginTop:verticalScale(35)
    }
});