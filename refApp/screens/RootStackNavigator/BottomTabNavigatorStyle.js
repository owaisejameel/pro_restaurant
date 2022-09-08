import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLOR_CONST.white,
    },

    outerContainer: { 
        flex: 1, 
    },

    tabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: scale(2),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(17),
    },

    labelStyle: {
        fontSize: scale(12),
        lineHeight: scale(16),
        color: COLOR_CONST.tabsLabelColor,
        marginTop: verticalScale(4),
    },

    homeIcons: {
        width: scale(28.8),
        height: scale(25),
    },

    exploreIcons: {
        width: scale(22),
        height: scale(22),
    },

    searchIcons: {
        width: scale(22.4),
        height: scale(22.5),
    },

    wishListIcons: {
        // width: scale(24),
        width: scale(25),
        height: scale(22),
    },

    profileIcons: {
        width: scale(8.2),
        height: scale(23.2),
        resizeMode: "contain"
    },
});
