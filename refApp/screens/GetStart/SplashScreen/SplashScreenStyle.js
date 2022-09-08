import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';

export default StyleSheet.create({

    appContainer: { 
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor: COLOR_CONST.white 
    },

    logoContainer:  {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        borderWidth: 2,
        borderColor: COLOR_CONST.white,
    },

    appLogo:  {
      width: scale(180), //440
      height: scale(180)
    },

    brandName: {
        fontSize: scale(18),
        lineHeight: scale(20),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
        textAlign: 'center',
        position: 'absolute',
        bottom: verticalScale(73.8),
    },

    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoImage: {
        marginTop: verticalScale(287),
        width: scale(195),
        height: scale(96)
    }
    
});
