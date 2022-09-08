import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';
import R from '../../R';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:COLOR_CONST.primaryThemeGradient,
    },

    innerContainer: {
        flex: 1, 
        backgroundColor: COLOR_CONST.LightlightNavy,
    },

    brandName: {
        fontSize: scale(21),
        lineHeight: scale(24),
        marginTop: verticalScale(40),
        width: scale(323),
        height: scale(24),
        marginLeft: scale(20),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
    },

    getStartedText: {
        fontSize: scale(12),
        lineHeight: scale(14),
        marginTop: verticalScale(12),
        width: scale(332),
        height: scale(44),
        marginLeft: scale(20),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    homeoIcon: {
        width: scale(137.6),
        height: scale(50.9),
        marginTop: verticalScale(15.8),
        marginLeft: scale(26.9)
    },

    segmentContainer: {
        zIndex: 8888,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: Platform.OS === 'ios' ? verticalScale(145) : verticalScale(146),
    },

    box1: {
        flex: 1,
        marginTop: verticalScale(44),
        backgroundColor: '#eaf0fb',
        borderTopRightRadius: scale(10),
        borderTopLeftRadius: scale(10),
    },

    segmentButtonHolder: {
        width: scale(274),
        height: scale(38),
        borderRadius: scale(20),
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },

    tabStyle: {
        backgroundColor: '#ffffff',
        borderColor: '#fff',
        borderRadius: scale(18),
        width: scale(145),
        height: scale(38)
    },

    activeTabStyle: {
        backgroundColor: COLOR_CONST.apple,
        borderColor: COLOR_CONST.apple,
        borderRadius: scale(18),
    },

    activetabTextStyle: {
        fontSize: scale(14), 
        color: COLOR_CONST.white, 
        fontFamily: FONTS.GTWalsheimProBold
    },
     
});
