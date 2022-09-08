import {StyleSheet, Dimensions, Platform} from 'react-native';
import scale, {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import {FONTS} from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  headerTitleStyle: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(18),
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(20),
  },

  backIcon: {
    width: scale(11.9),
    height: scale(21.7),
    marginLeft: scale(18),
  },

  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR_CONST.paleGrey,
  },

  emptyBoxContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  emptyNotifBox: {
    width: scale(118.7),
    height: scale(144),
    alignSelf: 'center',
  },

  noNotificationsText: {
    fontSize: scale(17),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    lineHeight: scale(19),
    textAlign: 'center',
    opacity: 0.9,
    marginTop: verticalScale(38),
  },

  browseText: {
    fontSize: scale(15),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5,
    fontFamily: FONTS.GTWalsheimProMedium,
    lineHeight: scale(18),
    marginTop: verticalScale(8),
    textAlign: 'center',
  },

  continueShoppingButton: {
    width: scale(335),
    height: scale(44),
    marginBottom: verticalScale(30),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.99,
  },

  continueText: {
    fontSize: scale(15),
    color: COLOR_CONST.white,
    fontFamily: FONTS.GTWalsheimProBold,
    lineHeight: scale(18),
    textAlign: 'center',
  },

  listContainer: {
    flex: 1,
    shadowColor: COLOR_CONST.black,
    shadowOffset: {width: 4, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginTop: verticalScale(4),
  },

  cellContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR_CONST.white,
    borderBottomColor: '#f9fbfd',
    borderBottomWidth: verticalScale(3),
  },

  bellContainer: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_CONST.bellLightGrey,
    marginTop: verticalScale(25),
    marginLeft: scale(15),
  },

  notifIcon: {
    width: scale(20),
    height: scale(20.1),
  },

  dataContainer: {
    marginLeft: scale(14),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(19),
  },

  notificationHeader: {
    fontSize: scale(17),
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProBold,
    lineHeight: scale(19),
    width: scale(200)
  },

  notificationDetail: {
    fontSize: scale(15),
    marginTop: verticalScale(5),
    color: COLOR_CONST.coolGreyTwo,
    fontFamily: FONTS.GTWalsheimProRegular,
    width: scale(276),
    lineHeight: scale(18),
    marginBottom: verticalScale(31),
  },

  days: {
    fontSize: scale(10),
    color: COLOR_CONST.coolGreyTwo,
    fontFamily: FONTS.GTWalsheimProRegular,
    lineHeight: scale(11),
  },

  bottomView: {
    height: verticalScale(128),
    alignItems: 'center',
  },

  thatsText: {
    fontSize: scale(13),
    marginTop: verticalScale(18),
    opacity: 0.4,
    color: COLOR_CONST.charcoalGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    lineHeight: scale(15),
  },

  deleteText: {
    fontSize: scale(18),
    marginTop: verticalScale(12),
    opacity: 0.9,
    color: COLOR_CONST.google,
    fontFamily: FONTS.GTWalsheimProMedium,
    lineHeight: scale(20),
  },

  deleteIcon: {
    width: scale(17.8),
    height: scale(22),
  },

  rightSwipeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  clearContainer: {
    height: scale(55),
    paddingBottom: verticalScale(25),
  },

  clearText: {
    fontSize: scale(13),
    marginTop: verticalScale(20.5),
    opacity: 0.9,
    height: scale(47),
    color: COLOR_CONST.charcoalGrey,
    marginRight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
  },
});
