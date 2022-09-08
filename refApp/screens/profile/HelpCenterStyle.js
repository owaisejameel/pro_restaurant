import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

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

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    listContainer: {
        backgroundColor: COLOR_CONST.white,
        paddingBottom: verticalScale(6),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },

    cellContainer: {
        justifyContent: 'center',
    },

    itemText: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.darkBlueGrey,
        marginLeft: scale(20),
        lineHeight: scale(18),
        paddingTop: verticalScale(16),
        opacity: 0.8,
        paddingBottom: verticalScale(11),
    },

    separatorView: {
        // marginLeft: scale(31),
        height: 0.5,
        opacity: 0.3,
        backgroundColor: COLOR_CONST.darkBlueGrey,
    }

});
