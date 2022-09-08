import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({
    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.paleGrey
    },

    TextInputStyle: {
        height: scale(50),
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(22),
        lineHeight: scale(25),
        textAlign: 'left',
        color: COLOR_CONST.charcoalGrey,
        marginLeft: scale(26)
    },

    currentLocationStyles: {
        backgroundColor: COLOR_CONST.white,
        alignContent: 'center',
        marginTop: scale(6),
        borderRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,

    },
    currentLocation: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: scale(20),
        marginRight: scale(22.1),
        marginTop: scale(14),
        marginBottom: scale(16)
    },

    MyLocation: {
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
        opacity: 0.9,
        fontSize: scale(15),
        textAlign: 'left'
    },
    UsingLocation: {
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
        opacity: 0.4,
        fontSize: scale(15),
        textAlign: 'left',
        marginTop: scale(2)
    },

    imagesstyle: {
        width: scale(30.9),
        height: scale(31.2),
        opacity: 0.89
    },

    RecentSearch: {
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5,
        fontSize: scale(15),
        lineHeight: scale(18),
        marginTop: scale(21),
        marginBottom: scale(6),
        marginLeft: scale(18)
    },

    loactionName: {
        fontSize: scale(15),
        lineHeight: scale(18),
        textAlign: 'left',
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.7,
        fontFamily: FONTS.GTWalsheimProRegular,
        marginTop: scale(15),
        marginBottom: scale(15)

    },

    borderLine: {
        borderBottomWidth: 0.5,
        color: COLOR_CONST.lightBlueGrey,
        opacity: 0.1,
    },

    ThatsAll: {
        marginTop: scale(27),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(15),
        lineHeight: scale(18),
        opacity: 0.4
    },

    LocationContainer: {
        backgroundColor: COLOR_CONST.white, shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    }



});
