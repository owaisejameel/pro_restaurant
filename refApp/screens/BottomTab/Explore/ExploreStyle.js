import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';


export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_CONST.white
    },

    headerTitleStyle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale(25.6),
    },

    notifIcon: {
        width: scale(16.7),
        height: scale(19),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    cartIcon: {
        width: scale(19.2),
        height: scale(18.2),
        marginLeft: scale(6.5)
    },

    listContainer: {
        flex: 1,
        alignItems: 'center',
        // marginTop: verticalScale(19.8),
    },

    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: scale(375),
        height: scale(60),
        backgroundColor: COLOR_CONST.white,
        // borderRadius: scale(5),
        // marginBottom:verticalScale(10)
    },

    downContent: {
        backgroundColor: COLOR_CONST.white,
        // marginBottom: verticalScale(5),
        // borderRadius: scale(5)
    },

    downContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: scale(375),
        backgroundColor: COLOR_CONST.white,
        borderRadius: scale(5),
        // marginBottom:verticalScale(10)
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(25),
        height: scale(25),
        borderRadius: scale(40/2),
        backgroundColor: COLOR_CONST.white,
        overflow: 'hidden',
        borderWidth: 0.3,
        marginLeft: scale(13),
    },

    imageContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(25),
        height: scale(25),
        borderRadius: scale(2),
        // borderRadius: scale(40/2),
        backgroundColor: COLOR_CONST.white,
        overflow: 'hidden',
        borderWidth: 0.3,
        marginLeft: scale(13),
    },

    imageContainer1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(25),
        height: scale(25),
        borderRadius: scale(25/2),
        backgroundColor: COLOR_CONST.white,
        overflow: 'hidden',
        borderWidth: 0.3,
        marginLeft: scale(13),
    },

    imageContainer3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(25),
        height: scale(25),
        borderRadius: scale(2),
        backgroundColor: COLOR_CONST.white,
        overflow: 'hidden',
        borderWidth: 0.3,
        marginLeft: scale(13),
    },

    bottleImage: {
        width: scale(25),
        height: scale(25)
    },

    categoryNameText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(14),
        lineHeight:scale(16),
        color: COLOR_CONST.charcoalGrey,
        marginLeft:verticalScale(9.6),
        alignSelf:'center'
    },

    subText:{
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(15),
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5,
        alignSelf: 'center',
        marginHorizontal:verticalScale(10),

    },

    nextImage: {
        width: scale(15),
        height: scale(15),
        alignSelf: 'center',
        opacity: 0.5
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    left1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(18),
        marginBottom: verticalScale(10.5),
    },

    rightArrow: {
        marginRight: scale(20.3),
        width: scale(8.7),
        height: scale(15.8),
    },

    downArrow: {
        marginTop: verticalScale(15),
        marginRight: scale(16.8),
        width: scale(15.8),
        height: scale(8.7),
    },

    line: {
        flex:1,
        borderBottomWidth: 1,
        height: scale(2),
        width: "100%",
        borderBottomColor: COLOR_CONST.lineColor,
        alignSelf: 'center'
    },

    subCategoryLine: {
        flex:1,
        borderBottomWidth: 1,
        height: scale(2),
        width: scale(340),
        borderBottomColor: COLOR_CONST.lineColor,
        alignSelf: 'center',
        opacity:0.5
    },

    expandedline: {
        height: scale(2),
        width: scale(500),
        backgroundColor: COLOR_CONST.lineColor,
        alignSelf: 'center'
    },

    subCategoryList: {
        flex: 1,
        marginTop: verticalScale(14.5),
        marginLeft: scale(47.6),
        backgroundColor: COLOR_CONST.white
    },

    subCategoryCellContainer: {
        justifyContent: 'center',
        marginBottom: verticalScale(15),
    },

    subCatText: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(12),
        color: COLOR_CONST.coolGreyTwo,
    }

});
