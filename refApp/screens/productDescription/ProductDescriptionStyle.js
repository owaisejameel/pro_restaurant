import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_CONST.paleGrey
  },

  mrp: {
    fontSize: scale(16),
    lineHeight: scale(23),
    marginLeft: scale(5),
    textAlign: 'left',
    color: COLOR_CONST.coolGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  backButton: {
    paddingVertical: verticalScale(20),
    paddingRight: scale(20),
  },

  backIcon: {
    width: scale(11.9),
    height: scale(21.7),
    marginLeft: scale(16),
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  shareIcon: {
    width: scale(16),
    height: scale(21),
    marginRight: scale(14.2)
  },

  cartIcon: {
    width: scale(20.2),
    height: scale(17.9),
    marginRight: scale(20.6)
  },

  imageStyle: {
    height: scale(216),
    width: width,
  },

  variantList: {
    flex: 1,
    paddingLeft: scale(12),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(14.2),
    backgroundColor: COLOR_CONST.white
  },

  variantCell: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },

  variantImage: {
    width: scale(45),
    height: scale(45),
  },

  productImageContainer: { 
    alignItems: 'center',
    backgroundColor: COLOR_CONST.white,
    paddingBottom: verticalScale(20.2),
  },

  productNameContainer: {
    // height: scale(120),
    width: scale(375),
    marginTop: verticalScale(2),
    backgroundColor: COLOR_CONST.white,
    zIndex: 10,
  },

  heartIcon: {
    position: 'absolute',
    right: scale(29),
    top: scale(-25),
    zIndex: 1000,
  },

  heartConatiner: {
    position: 'absolute',
    right: scale(29),
    top: scale(-25),
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_CONST.white,
    width: scale(50),
    height: scale(50),
    borderRadius: 40,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },

  heart: {
    width: scale(19),
    height: scale(18),
  },

  productName: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.apple,
    fontSize: scale(22),
    lineHeight: scale(30),
    textAlign: 'left',
    marginTop: verticalScale(29),
    marginLeft: scale(18)
  },

  priceRow: {
    flexDirection: 'row',
    marginTop: verticalScale(11),
    marginLeft: scale(18),
    alignItems: 'center',
    // flexWrap: 'wrap',
  },

  outStock: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  price: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.facebook,
    fontSize: scale(24),
    lineHeight: scale(32),
    letterSpacing: 1.08,
    textAlign: 'left',
  },

  salePrice: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.facebook,
    fontSize: scale(16),
    lineHeight: scale(23),
    textAlign: 'left',
  },

  discountRow: {
    // flexDirection: 'row',
    alignSelf: 'center'
  },

  discountPrice: {
    fontSize: scale(16),
    lineHeight: scale(23),
    marginLeft: scale(15),
    textAlign: 'left',
    color: COLOR_CONST.coolGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    textDecorationLine:'line-through',
  },

  inStock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(18),
  },

  stockTick: {
    width: scale(13),
    height: scale(13),
    marginLeft: scale(13),
    marginRight: scale(6),
  },

  tick: {
    width: scale(13),
    height: scale(13)
  },

  dot: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(5/2),
    backgroundColor: COLOR_CONST.primaryThemeGradient,
  },

  inStockText: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(12),
    lineHeight: scale(16),
    letterSpacing: 0.54,
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  soldOutText: {
    color: COLOR_CONST.pastelRed,
    fontSize: scale(14),
    lineHeight: scale(16),
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  tools: {
    borderWidth: 1,
    borderColor: COLOR_CONST.borderduckEggBlue,
    backgroundColor: COLOR_CONST.white,
    marginLeft: scale(75),
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(30),
},

  minus: {
      fontSize: scale(15),
      marginLeft: scale(8),
      marginRight: scale(15.4),
      lineHeight: scale(18),
      fontFamily: FONTS.GTWalsheimProMedium,
      color: COLOR_CONST.charcoalGrey,
      opacity: 0.5
  },

  count: {
      fontSize: scale(15),
      lineHeight: scale(18),
      fontFamily: FONTS.GTWalsheimProMedium,
      color: COLOR_CONST.charcoalGrey,
  },

  plus: {
      fontSize: scale(15),
      lineHeight: scale(18),
      marginLeft: scale(15.4),
      marginRight: scale(8),
      fontFamily: FONTS.GTWalsheimProMedium,
      color: COLOR_CONST.charcoalGrey,
      opacity: 0.5,
  },

  selectorToolContainer: {
    marginTop: verticalScale(5),
    backgroundColor: COLOR_CONST.white,
    paddingBottom: verticalScale(22.2),
  },

  selectorToolMessageContainer: {
    marginTop: verticalScale(5),
    marginLeft: scale(18),
  },

  selectorToolMessage: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.pastelRed,
  },

  toolItemCell: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(5),
    width: scale(67),
    height: scale(37),
    borderWidth: 1,
    borderRadius: scale(4),
    borderColor: COLOR_CONST.whiteThree,
  },

  toolItemSizeCell: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(5),
    height: scale(37),
    borderWidth: 1,
    borderRadius: scale(4),
    paddingHorizontal: scale(5),
    borderColor: COLOR_CONST.whiteThree,
  },

  labelText: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(17),
    lineHeight: scale(21),
  },

  colorText: {
    fontFamily: FONTS.GTWalsheimProBold,
    marginLeft: scale(18),
    marginTop: verticalScale(22),
    marginBottom: verticalScale(9.8),
    color: COLOR_CONST.coolGreyTwo,
    fontSize: scale(13),
    lineHeight: scale(15),
    letterSpacing: 0.5,
  },

  sizeText: {
    fontFamily: FONTS.GTWalsheimProBold,
    marginLeft: scale(18),
    marginTop: verticalScale(10.2),
    marginBottom: verticalScale(9.8),
    color: COLOR_CONST.coolGreyTwo,
    fontSize: scale(13),
    lineHeight: scale(15),
    letterSpacing: 0.5,
  },

  listSelector: {
    flex: 1,
    marginLeft: scale(18),
  },

  productSpecificationContainer: {
    width: scale(375),
    marginTop: verticalScale(5),
    backgroundColor: COLOR_CONST.white
  },

  specificationConainer: {
    marginLeft: scale(18),
    marginTop: verticalScale(22)
  },

  specifictaionTitle: {
    color: COLOR_CONST.coolGreyTwo,
    fontSize: scale(13),
    lineHeight: scale(15),
    letterSpacing: 0.5,
    fontFamily: FONTS.GTWalsheimProBold,
    textAlign: 'left'
  },

  specificationTypeConainer: {
    // justifyContent:'space-around', 
    flexDirection: 'row',
    marginTop: scale(9),
    justifyContent: 'flex-start',
  },

  AlcohalTypeConainer: {
    flexDirection: 'row',
    marginTop: scale(36),
    justifyContent: 'flex-start',
    marginBottom: verticalScale(16)
  },

  leftContainer: {
    marginLeft: scale(142)
  },


  titleType: {
    color: COLOR_CONST.coolGreyTwo,
    fontSize: scale(13),
    lineHeight: scale(21),
    textAlign: 'left',
    fontFamily: FONTS.GTWalsheimProRegular
  },

  cantaintType: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProRegular,
    lineHeight: scale(21),
    textAlign: 'left',
    marginTop: scale(3)
  },

  descrpitionStyle: {
    marginTop: verticalScale(2),
    width: scale(375),
    backgroundColor: COLOR_CONST.white
  },

  descrpitionReadStyle: {
    // marginTop: verticalScale(19),
    marginLeft: scale(18),
    marginBottom: verticalScale(10)
  },

  skuReadStyle: {
    marginTop: verticalScale(19),
    marginLeft: scale(18),
    // marginBottom: verticalScale(10)
  },

  expiryReadStyle: {
    // marginTop: verticalScale(19),
    marginLeft: scale(18),
    // marginBottom: verticalScale(10)
  },

  ShippingContainer: {
    marginTop: verticalScale(6),
    width: scale(375),
    backgroundColor: COLOR_CONST.white
  },

  DiscantaintType: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProRegular,
    lineHeight: scale(21),
    textAlign: 'left',
    marginTop: verticalScale(7),
    marginBottom: verticalScale(11)
  },

  shippingStyle: {
    marginTop: verticalScale(22),
    marginLeft: scale(18),
  },

  pincode: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(13),
    lineHeight: scale(21),
    textAlign: 'left',
    marginTop: verticalScale(19),
    marginBottom: verticalScale(8),
    width:scale(339),
    fontFamily: FONTS.GTWalsheimProRegular
  },

  inputField: {
    marginTop: verticalScale(24),
    justifyContent:'space-between', 
    flexDirection:'row',
    borderBottomWidth: scale(0.5),
    marginRight: scale(18.1),
    paddingBottom: verticalScale(6.1),
    borderColor: COLOR_CONST.coolGreyTwo
  },

  textPincode: {
    flex:1,
    marginRight: scale(20)
  },

  imagesstyle: {
    width: scale(31),
    height: scale(31.7),
},

  readmore: {
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(15),
    lineHeight: scale(18),
    textAlign: 'left',
    color: COLOR_CONST.greenThemeColor,
  },

  AddbuttonCustom: {
    width: scale(110),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: COLOR_CONST.darkishBlue,
    opacity: 0.99,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(3)
  },

  AddbuttonCustom1: {
    width: scale(width/2) - 40,
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: COLOR_CONST.darkishBlue,
    opacity: 0.99,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(3)
  },

  cartButtonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: verticalScale(21),
    marginBottom: verticalScale(7),
    marginHorizontal: scale(11)
  },

  cartButtonCustom: {
    width: scale(161),
    height: scale(44),
    borderRadius: scale(21),
    backgroundColor: COLOR_CONST.darkishBlue,
    opacity: 0.99,
    alignItems: 'center',
    justifyContent: 'center',
  },

  BUYcustomTxtStyle: {
    color: COLOR_CONST.white,
    alignSelf: 'center',
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: 0.4
  },

  BUYbuttonCustom: {
    width: scale(110),
    height: scale(44),
    borderRadius: scale(21),
    backgroundColor: COLOR_CONST.greenButton,
    opacity: 0.99,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(3)
  },

  BUYbuttonCustom1: {
    width: scale(width/2) - 40,
    height: scale(44),
    borderRadius: scale(21),
    backgroundColor: COLOR_CONST.primaryThemeGradient,
    opacity: 0.99,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(3)
  },

  BUYcustomTxtStyle: {
    color: COLOR_CONST.white,
    alignSelf: 'center',
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: 0.4
  },

  AddcustomTxtStyle: {
    color: COLOR_CONST.white,
    alignSelf: 'center',
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: 0.4
  },

  buttonCustom: {
    width: scale(333),
    height: scale(44),
    marginTop: verticalScale(27),
    borderRadius: scale(21),
    backgroundColor: COLOR_CONST.coolGrey,
    opacity: 0.99,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },

  customTxtStyle: {
    color: COLOR_CONST.white,
    alignSelf: 'center',
    fontFamily: FONTS.GTWalsheimProMedium,
    fontSize: scale(14),
    lineHeight: scale(16),
    letterSpacing: 0.4
  },

  productGrid: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(30)

  },

  ButtonConatiner: {
    position: 'absolute',
    bottom: 0,
    height: scale(59),
    width: scale(375),
    backgroundColor: COLOR_CONST.white
  },

  InnerConatiner: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(7),
    marginHorizontal: scale(11)
  },

  InnerConatinerNOTIFICATION: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(7),
    marginHorizontal: scale(15)
  },

  NotificationTitle: {
    width: scale(152),
    height: scale(34),
    marginTop: scale(15)
  },

  currentlyOut: {
    fontSize: scale(13),
    lineHeight: scale(15),
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.89,
    textAlign: 'left',
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  getNotified: {
    fontSize: scale(13),
    lineHeight: scale(15),
    color: COLOR_CONST.charcoalGrey,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    fontFamily: FONTS.GTWalsheimProBold,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: 'center',
    alignItems: 'center'
  },

  popup: {
    width: scale(286),
    borderRadius: scale(8),
    backgroundColor: COLOR_CONST.white,
  },

  deleteAddress: {
    fontSize: scale(18),
    lineHeight: scale(20),
    marginTop: verticalScale(31),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: 'center',
    color: COLOR_CONST.charcoalGrey
  },

  areYouSure: {
    fontSize: scale(15),
    lineHeight: scale(18),
    color: COLOR_CONST.coolGreyTwo,
    marginTop: verticalScale(23),
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: 'center',
    alignSelf: 'center',
  },

  bottomPopupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    paddingTop: verticalScale(7.5),
    marginBottom: verticalScale(12.4),
    borderTopWidth: 1,
    borderTopColor: COLOR_CONST.lightGreyText
  },

  verticalLine: {
    width: 1,
    height: scale(25),
    backgroundColor: COLOR_CONST.lightGreyText,
  },

  cancelText: {
    fontSize: scale(15),
    lineHeight: scale(18),
    marginLeft: scale(47.5),
    color: COLOR_CONST.coolGreyTwo,
    fontFamily: FONTS.GTWalsheimProRegular,
    textAlign: 'center'
  },

  yesDelete: {
    fontSize: scale(15),
    lineHeight: scale(18),
    opacity: 0.8,
    marginRight: scale(47.5),
    fontFamily: FONTS.GTWalsheimProMedium,
    textAlign: 'center',
    color: COLOR_CONST.charcoalGrey
  },

  NotificationPoupModel: {
    marginHorizontal: scale(40),
    borderBottomWidth: 0.5,
    borderColor: COLOR_CONST.lightGreyText,
    paddingBottom: verticalScale(6),
    marginRight: scale(20),
    textAlign: 'center',
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(17),
    lineHeight: scale(19),
    color: COLOR_CONST.darkishBlueTwo,
    marginTop: verticalScale(18)
  },

  cartModalContainer: {
    flex: 1,
    backgroundColor: COLOR_CONST.modalTransparentBg,
    justifyContent: 'flex-end',
  },

  cartContainer: {
    backgroundColor: COLOR_CONST.white
  },

  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20)
  },

  tools: {
    borderWidth: 1,
    borderColor: COLOR_CONST.borderduckEggBlue,
    backgroundColor: COLOR_CONST.white,
    marginRight: scale(26),
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(30),
},

selectQuantityText: {
    fontSize: scale(14),
    marginLeft: scale(19),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
},

minus: {
    fontSize: scale(20),
    marginLeft: scale(8),
    marginRight: scale(15.4),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5
},

count: {
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
},

plus: {
    fontSize: scale(20),
    lineHeight: scale(18),
    marginLeft: scale(15.4),
    marginRight: scale(8),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.5
},

selectSubscription: {
    fontSize: scale(13),
    lineHeight: scale(19),
    marginLeft: scale(19),
    marginTop: verticalScale(24),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.coolGreyTwo,
},

selectSubscriptionPeriod: {
    fontSize: scale(13),
    lineHeight: scale(19),
    marginLeft: scale(19),
    marginTop: verticalScale(32),
    fontFamily: FONTS.GTWalsheimProBold,
    color: COLOR_CONST.coolGreyTwo,
},

subscriptionRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: verticalScale(15),
  marginLeft: scale(21),
},

packageRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: scale(40),
},

radio: {
  width: scale(21),
  height: scale(21)
},

dailyText: {
  fontSize: scale(14),
  lineHeight: scale(19),
  marginLeft: scale(10),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.charcoalGrey,
},

pickerContainer: {
  height: scale(40),
  marginHorizontal: scale(21),
  // marginTop: verticalScale(12),
  borderWidth: 0,
},

labelStyle: {
  fontSize: scale(14),
  lineHeight: scale(19),
  color: COLOR_CONST.charcoalGrey,
  fontFamily: FONTS.GTWalsheimProRegular,
},

totalPriceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: verticalScale(29),
  marginLeft: scale(19),
},

totalPrice: {
  fontSize: scale(15),
  lineHeight: scale(19),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.coolGreyTwo,
},

priceValue: {
  fontSize: scale(24),
  lineHeight: scale(28),
  letterSpacing: 0.92,
  fontFamily: FONTS.GTWalsheimProMedium,
  color: COLOR_CONST.facebook,
  marginLeft: scale(12),
},

cancelText: {
  fontSize: scale(15),
  lineHeight: scale(19),
  letterSpacing: 0.92,
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.coolGreyTwo,
  textAlign: 'center',
  marginTop: scale(9),
  marginBottom: verticalScale(13.2),
},

reviewContainer: {
  marginTop: verticalScale(5),
  backgroundColor: COLOR_CONST.white,
},

productRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: verticalScale(22),
},

leftHeading: {
  fontSize: scale(13),
  lineHeight: scale(15),
  letterSpacing: 0.5,
  marginLeft: scale(18),
  fontFamily: FONTS.GTWalsheimProBold,
  color: COLOR_CONST.coolGreyTwo,
},

rightHeading: {
  fontSize: scale(12),
  lineHeight: scale(14),
  marginRight: scale(18),
  fontFamily: FONTS.GTWalsheimProMedium,
  color: COLOR_CONST.darkishBlue,
  textDecorationLine: 'underline'
},

ratingContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: verticalScale(2.3),
  // marginBottom: verticalScale(20.5),
},

leftView: {
  marginLeft: scale(18),
},

verticalLine: {
  width: 1,
  height: scale(124),
  backgroundColor: COLOR_CONST.lightGreyText,
  marginHorizontal:verticalScale(10.7)
},

starContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: verticalScale(7.4),
  marginBottom: verticalScale(16.9),
  // alignSelf: 'stretch',
  // backgroundColor: 'red'
  // marginRight: scale(38.1),
},

star: {
    width: scale(17.5),
    height: scale(16.7),
    marginRight: scale(3),
},

biggerRatingText: {
  fontSize: scale(38),
  lineHeight: scale(43),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.charcoalGrey,
},

basedText: {
  fontSize: scale(10),
  lineHeight: scale(11),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.coolGreyTwo,
},

rightView: {
  justifyContent: 'center',
  marginRight: scale(18)
},

starRow: {
  width:scale(120),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: verticalScale(10.7),
},

no: {
  fontSize: scale(12),
  lineHeight: scale(11),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.charcoalGrey,
},

innerStar: {
  width: scale(12,7),
  height: scale(12.1),
  marginLeft: scale(8.9),
  marginRight: scale(13.6),
},

progressContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding:3
},

filled1: {
  width: scale(81.3),
  height: scale(3),
  backgroundColor: COLOR_CONST.greenBlue,
},

unfilled1: {
  width: scale(42.7),
  height: scale(3),
  backgroundColor: COLOR_CONST.lightGreyText,
},

filled2: {
  width: scale(62.3),
  height: scale(3),
  backgroundColor: COLOR_CONST.greenBlue,
},

unfilled2: {
  width: scale(61.7),
  height: scale(3),
  backgroundColor: COLOR_CONST.lightGreyText,
},

filled3: {
  width: scale(41.3),
  height: scale(3),
  backgroundColor: COLOR_CONST.darkishBlue,
},

unfilled3: {
  width: scale(82.7),
  height: scale(3),
  backgroundColor: COLOR_CONST.lightGreyText,
},

filled4: {
  width: scale(27.3),
  height: scale(3),
  backgroundColor: COLOR_CONST.darkishBlue,
},

unfilled4: {
  width: scale(96.7),
  height: scale(3),
  backgroundColor: COLOR_CONST.lightGreyText,
},

filled5: {
  width: scale(9.5),
  height: scale(3),
  backgroundColor: COLOR_CONST.pastelRed,
},

unfilled5: {
  width: scale(114.5),
  height: scale(3),
  backgroundColor: COLOR_CONST.lightGreyText,
},

horizontalLine: {
  width: scale(339),
  height: 1,
  backgroundColor: COLOR_CONST.lightGreyText,
  marginTop: verticalScale(17),
  marginBottom: verticalScale(15.5),
  alignSelf: 'center'
},

reviewListContainer: {
  backgroundColor: COLOR_CONST.white,
},

reviewCell: {

},

nameRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginHorizontal: scale(18),
},

reviewName: {
  fontSize: scale(14),
  lineHeight: scale(16),
  fontFamily: FONTS.GTWalsheimProMedium,
  color: COLOR_CONST.charcoalGrey,
},

dateText: {
  fontSize: scale(8),
  lineHeight: scale(9),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.coolGreyTwo,
},

starListContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: scale(71),
  marginLeft: scale(18),
  marginTop: verticalScale(3.8),
  marginBottom: verticalScale(7.2),
},

listStar: {
    width: scale(10.8),
    height: scale(10),
    // marginRight: scale(10),
},

reviewText: {
  fontSize: scale(12),
  lineHeight: scale(14),
  marginLeft: scale(18),
  fontFamily: FONTS.GTWalsheimProRegular,
  color: COLOR_CONST.charcoalGrey,
},

listHorizontalLine: {
  width: scale(339),
  height: scale(0.5),
  backgroundColor: COLOR_CONST.lightGreyText,
  marginVertical: verticalScale(15.5),
  alignSelf: 'center'
},

allTen: {
  fontSize: scale(12),
  lineHeight: scale(14),
  fontFamily: FONTS.GTWalsheimProMedium,
  marginLeft: scale(18),
  color: COLOR_CONST.darkishBlue,
  textDecorationLine: 'underline',
  marginBottom: verticalScale(18),
},

emptyText: {
  fontSize: scale(12),
  lineHeight: scale(14),
  marginLeft: scale(21),
  marginTop: verticalScale(10),
  fontFamily: FONTS.GTWalsheimProMedium,
  color: COLOR_CONST.pastelRed
},

modalContainer1: {
  flex: 1,
  backgroundColor: COLOR_CONST.modalTransparentBg,
  justifyContent: 'center',
  alignItems: 'center'
},

popup1: {
  width: scale(286),
  borderRadius: scale(8),
  backgroundColor: COLOR_CONST.white,
},

deleteAddress1: {
  fontSize: scale(18),
  lineHeight: scale(20),
  marginTop: verticalScale(31),
  fontFamily: FONTS.GTWalsheimProMedium,
  textAlign: 'center',
  color: COLOR_CONST.charcoalGrey
},

areYouSure1: {
  fontSize: scale(15),
  lineHeight: scale(18),
  opacity: 0.8,
  marginTop: verticalScale(23),
  color: COLOR_CONST.coolGreyTwo,
  width: scale(221),
  fontFamily: FONTS.GTWalsheimProRegular,
  textAlign: 'center',
  alignSelf: 'center',
},

bottomPopupView1: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: verticalScale(30),
  paddingTop: verticalScale(7.5),
  marginBottom: verticalScale(12.4),
  borderTopWidth: 1,
  borderTopColor: COLOR_CONST.lightGreyText,
},

verticalLine1: {
  width: scale(0.5),
  height: scale(25),
  backgroundColor: COLOR_CONST.lightGreyText,
},

cancelText1: {
  fontSize: scale(15),
  lineHeight: scale(18),
  color: COLOR_CONST.coolGreyTwo,
  // marginLeft: scale(47.5),
  fontFamily: FONTS.GTWalsheimProRegular,
  textAlign: 'center'
},

yesDelete1: {
  fontSize: scale(15),
  lineHeight: scale(18),
  opacity: 0.8,
  // marginRight: scale(47.5),
  fontFamily: FONTS.GTWalsheimProRegular,
  textAlign: 'center',
  color: COLOR_CONST.charcoalGrey
},

});