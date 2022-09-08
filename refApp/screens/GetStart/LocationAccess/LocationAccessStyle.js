import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../../utils/Scale';
import COLOR_CONST from '../../../theme/ColorConstants';
import { FONTS } from '../../../theme/ColorConstants';

export default StyleSheet.create({

  maincontainer :{
    backgroundColor: COLOR_CONST.white,
    justifyContent: 'center',
    flex:1
  },

  container: {
    alignItems: 'center',
  },

  Locationimage: {
    width: scale(154),
    height: scale(154),
    marginBottom: scale(44)
  },

  activeText: {
    fontSize: scale(17),
    color: COLOR_CONST.primaryThemeGradient,
    fontFamily: FONTS.GTWalsheimProMedium,
    marginBottom: scale(20),
    lineHeight: scale(19),
  },

  textDescription: {
    fontSize: scale(15),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProLight,
    textAlign:'center',
    lineHeight: scale(20),
  },

  customButtonStyle: {
    width: scale(174),
    height: scale(44),
    marginTop: verticalScale(30),
    backgroundColor: COLOR_CONST.primaryThemeGradient,
    borderRadius:scale(22)
  },

  customButtonTxtStyle: {
    color: COLOR_CONST.white,
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  NothanksText: {
    fontSize: scale(15),
    color: COLOR_CONST.coolGreyTwo,
    fontFamily: FONTS.GTWalsheimProRegular,
    marginTop: scale(16),
    lineHeight:scale(18)
  },
});
