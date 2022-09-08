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

  Bellimage: {
    // marginTop: verticalScale(147.8),
    width: scale(124),
    height: scale(168.3),
    marginBottom: scale(19.8)
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
    color: COLOR_CONST.confirmPasswordfocus,
    fontFamily: FONTS.GTWalsheimProLight,
    width: scale(238),
    lineHeight: scale(20),
    textAlign:'center',
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
