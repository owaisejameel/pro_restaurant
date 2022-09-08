import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';

export default StyleSheet.create({

    container: {
        // paddingHorizontal: scale(20),
        paddingTop: verticalScale(21.2),
        paddingBottom: verticalScale(11.2),
        backgroundColor: COLOR_CONST.white
    },

    flexStyle: {
        flex: 1
    },

    listContainer: {
        flex: 1,
        alignItems: 'center',
    },

    categoryContainer: {
        alignItems: 'center',
        width: scale(350/3),
    },
    
    // categoryContainer: {
    //     alignItems: 'center',
    //     width: scale(350/3),
    //     borderColor: 'rgba(0,0,0,0.1)',
    //     borderWidth: scale(0.6),
    // },

    categoryView: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: scale(100),
        height: scale(100),
        borderRadius: scale(100/8),
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 0.6,
        marginVertical: scale(10)
    },

    // categoryView: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     overflow: 'hidden',
    //     width: scale(115),
    //     height: scale(115),
    //     // borderRadius: scale(100 / 8),
        
    //     // elevation:0.4,
    // },

    categoryImage: {
        width: scale(100),
        height: scale(100),
    },

    // categoryImage: {
    //     width: scale(120),
    //     height: scale(120),
    // },

    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: scale(20),
    },

    featured: {
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.charcoalGrey,
        marginBottom: verticalScale(14.8),
    },

    viewAllText: {
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        marginBottom: verticalScale(14.8),
    },

    categoryText: {
        fontSize: scale(12),
        marginTop: verticalScale(4.8),
        marginBottom: verticalScale(6.7),
        lineHeight: scale(14),
        width: scale(120),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    cardViewContainer: {
        backgroundColor: COLOR_CONST.white,
        height: scale(60),
        width: scale(160),
        margin: scale(10),
        borderRadius: 5,
    },

    viewContainer: {
        backgroundColor: COLOR_CONST.greenThemeColor,
        width: scale(61),
        height: scale(61),
        borderRadius: scale(61/2),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.1,
        overflow: 'hidden',
        marginRight: scale(20),
    },


    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(25),
        height: scale(25),
        borderRadius: scale(25/2),
        backgroundColor: COLOR_CONST.white,
        overflow: 'hidden',
        borderWidth: 0.3
    },

    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: scale(15),
    },

    cardImage: {
        height: scale(25),
        width: scale(25),
    },

    cardText: {
        marginHorizontal: scale(9.6),
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(14),
        lineHeight: scale(16),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    viewAllContainer: {
        backgroundColor: COLOR_CONST.white,
        height: scale(60),
        borderWidth: 1.2,
        borderColor: COLOR_CONST.greenButton,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

});