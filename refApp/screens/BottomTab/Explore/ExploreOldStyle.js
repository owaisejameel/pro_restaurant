import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';


export default StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',

    },
    mainContainer: {
        width: scale(370),
        height: scale(67),
        backgroundColor: COLOR_CONST.white,
    },
    viewContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal:verticalScale(20),
        marginVertical: verticalScale(15),
        borderBottomWidth: verticalScale(0.8),
        borderBottomColor:COLOR_CONST.lightBlueGrey,
        paddingBottom:scale(9),
    },
    childContainer: {
        flexDirection: 'row'
    },
    bottleImage: {
        width: scale(42),
        height: scale(42)
    },
    categoryNameText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(18),
        color: COLOR_CONST.darkBlueGrey,
        opacity: 0.8,
        marginHorizontal:verticalScale(10),
    },
    subText:{
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(15),
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5,
        alignSelf: 'center',
        marginHorizontal:verticalScale(10),

    },
    nextImageContainer: {
        alignSelf: 'center',
        marginRight:scale(11.3)
    },
    nextImage: {
        width: scale(15),
        height: scale(15),
        alignSelf: 'center',
        opacity: 0.5
    },

});
