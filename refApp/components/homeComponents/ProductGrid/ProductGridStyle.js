import { StyleSheet, Dimensions, Platform } from "react-native";
import scale, { verticalScale } from "../../../utils/Scale";
import COLOR_CONST, { FONTS } from "../../../theme/ColorConstants";

export default StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: verticalScale(30),
},

  container: {
    backgroundColor: COLOR_CONST.white,
    paddingBottom: verticalScale(20),
    width: scale(375),
    // height: scale(313)
  },

  flexstyle: {
    flex: 1,
  },

  selectorToolMessageContainer: {
    marginTop: verticalScale(5),
    marginLeft: scale(18),
  },

  selectorToolMessage: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.pastelRed,
    fontSize: 10
  },

  gridTitleContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: scale(20),
    marginTop: verticalScale(18),
  },

  titleTextStyle: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(17),
    lineHeight: scale(19),
    fontFamily: FONTS.GTWalsheimProBold,
  },

  viewAllText: {
    color: COLOR_CONST.charcoalGrey,
    fontSize: scale(15),
    lineHeight: scale(18),
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  gridListContainer: {
    marginHorizontal: scale(11),
  },

  productGridStyle1: {
    borderWidth: 1,
    borderRadius: scale(4),
    width: scale(150),
    minHeight: scale(410),
    borderColor: COLOR_CONST.borderduckEggBlue,
    overflow: "hidden",
    marginTop: verticalScale(15),
    marginHorizontal: scale(5),
    // padding: scale(15),
  },
  productGridStyle: {
    borderWidth: 1,
    borderRadius: scale(4),
    // width: scale(166),
    minHeight: scale(160),
    borderColor: COLOR_CONST.borderduckEggBlue,
    overflow: "hidden",
    marginTop: verticalScale(15),
    marginHorizontal: scale(5),
    padding: scale(15),
  },
  modalstyle:{
    // flex:1,
    borderWidth:1,
    borderColor:COLOR_CONST.coolGrey,
    borderRadius:scale(5),
    padding:scale(5),
    width:scale(102)
    // marginRight:scale(5)

  },
  pickerStyle:{
  flex:1,
  
  },
  dropdownStyle:{
    // backgroundColor:'red'
  },
  defaultTextStyle:{
    fontSize: scale(14),
    lineHeight: scale(21),
    color: COLOR_CONST.coolGrey,
    fontFamily: FONTS.GTWalsheimProRegular,
    paddingLeft:scale(5)
  },
  selectedTextStyle:{
    fontSize: scale(14),
    lineHeight: scale(21),
    color: COLOR_CONST.black,
    fontFamily: FONTS.GTWalsheimProRegular,
    // paddingLeft:scale(7)
  },
  dropdownTextStyle:{
    color:'#000',
    fontSize:14
  },
  imageMainContainer1: {
    // alignItems: 'center',
    // flexDirection: "row",
  },
  imageMainContainer: {
    // alignItems: 'center',
    flexDirection: "row",
  },

  imageContainer: {
    flexDirection: "row",
  },

  heartIcon: {
    width: scale(30),
    height: scale(30),
  },

  BottalImage1: {
    width: scale(140),
    height: scale(140),
    alignSelf:'center'
    // marginTop: scale(14),
  },

  BottalImage: {
    width: scale(60),
    height: scale(60),
    // marginTop: scale(14),
  },

  BottalImage2: {
    width: scale(90),
    height: scale(90),
    // marginTop: scale(14),
  },

  titleContainer: {
    width: scale(130),
    height: scale(38),
    marginTop: verticalScale(11),
    alignItems: "center",
  },

  titleNameStyle1: {
    fontSize: scale(14),
    // height: scale(22),
    // marginHorizontal: scale(10),
    lineHeight: scale(22),
    marginTop: verticalScale(5),
    color: COLOR_CONST.charcoalGrey,
    // textAlign: 'center',
    fontFamily: FONTS.GTWalsheimProRegular,
  },

  titleNameStyle: {
    fontSize: scale(17),
    // height: scale(22),
    // marginHorizontal: scale(10),
    lineHeight: scale(24),
    // marginTop: verticalScale(11),
    color: COLOR_CONST.charcoalGrey,
    // textAlign: 'center',
    fontFamily: FONTS.GTWalsheimProRegular,
    width:'80%',
  },

  price: {
    fontSize: scale(16),
    lineHeight: scale(18),
    // height: scale(18),
    color: COLOR_CONST.facebook,
    fontFamily: FONTS.GTWalsheimProMedium,
    // marginTop: verticalScale(5),
    // marginBottom: verticalScale(13),
  },

  mrp: {
    fontSize: scale(14),
    lineHeight: scale(16),
    // height: scale(18),
    color: COLOR_CONST.darkGreyBlue,
    fontFamily: FONTS.GTWalsheimProMedium,
    // marginTop: verticalScale(5),
    // marginBottom: verticalScale(13),
  },

  mrp1: {
    marginLeft: scale(3),
    fontSize: scale(10),
    lineHeight: scale(15),
    color: COLOR_CONST.coolGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
  },

  discountRow: {
    flexDirection: "row",
  },

  discountPrice1: {
    fontSize: scale(12),
    lineHeight: scale(15),
    color: COLOR_CONST.coolGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    textDecorationLine: "line-through",
    // marginTop: verticalScale(5),
    // marginBottom: verticalScale(13),
    height: scale(18),
  },
  discountPrice: {
    fontSize: scale(12),
    lineHeight: scale(15),
    color: COLOR_CONST.coolGrey,
    fontFamily: FONTS.GTWalsheimProMedium,
    textDecorationLine: "line-through",
    // marginTop: verticalScale(5),
    // marginBottom: verticalScale(13),
    height: scale(18),
  },

  addToCartContainer1: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(107),
    backgroundColor: COLOR_CONST.buttonColor,
    height: scale(40),
    borderRadius: scale(6),
  },

  addToCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(107),
    backgroundColor: COLOR_CONST.buttonColor,
    height: scale(40),
    borderRadius: scale(6),
  },

  inclusiveTaxText1: {
    color: COLOR_CONST.greyTextColor,
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(10),
    lineHeight: scale(12),
    // marginTop: verticalScale(14)
  },

  inclusiveTaxText: {
    color: COLOR_CONST.greyTextColor,
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(10),
    lineHeight: scale(12),
    // marginTop: verticalScale(14)
  },

  addToCartText: {
    color: COLOR_CONST.white,
    alignSelf: "center",
    fontFamily: FONTS.GTWalsheimProBold,
    fontSize: scale(13),
    lineHeight: scale(15),
    // marginTop: verticalScale(14)
  },


  spinner1: {
    width: Platform.OS === 'ios' ? scale(107) : scale(107),
    backgroundColor: COLOR_CONST.white,
    // height: scale(30),
    alignItems: 'center',
    alignSelf: 'center',
                  position:'absolute',
                  bottom:verticalScale(10)
  },
  
  spinner: {
    width: Platform.OS === 'ios' ? scale(171) : scale(107),
    backgroundColor: COLOR_CONST.white,
    height: scale(40),
    alignItems: 'center',
},

  spinner2: {
    width: Platform.OS === 'ios' ? scale(90) : scale(90),
    backgroundColor: COLOR_CONST.white,
    height: scale(30),
    alignItems: 'center',
    marginLeft:scale(5)
},

qtyStyle: {
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    opacity: 0.7,
    fontSize: scale(13),
    lineHeight: scale(15),
    // marginLeft: scale(5)
},

  // spinner: {
  //   alignSelf: "center",
  //   width: Platform.OS === "ios" ? scale(115) : scale(107),
  //   backgroundColor: COLOR_CONST.white,
  //   minHeight: scale(40),
  //   maxHeight: scale(40),
  //   height: scale(40),
  //   alignItems: "center",
  //   borderWidth:1,
  //   borderLeftWidth:scale(0),
  //   borderRightWidth:scale(0),
  //   borderColor:COLOR_CONST.lightGreyText,
  //   marginLeft:scale(5)
  // },

  // qtyStyle: {
  //   fontFamily: FONTS.GTWalsheimProRegular,
  //   color: COLOR_CONST.charcoalGrey,
  //   opacity: 0.7,
  //   fontSize: scale(13),
  //   lineHeight: scale(15),
  //   marginLeft: scale(5),
  // },

  TouchableOpacityStyle: {
    // backgroundColor:COLOR_CONST.white,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: verticalScale(16),
    right: verticalScale(16),
    width: scale(18),
    height: scale(18),
    zIndex: 1000,
  },

  labelSticker1: {
    position: "absolute",
    backgroundColor: COLOR_CONST.pastelRed,
    paddingHorizontal: scale(10),
    height: scale(17),
    justifyContent: "center",
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
    left: 0,
    top: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },

  labelSticker: {
    position: "absolute",
    backgroundColor: COLOR_CONST.pastelRed,
    paddingHorizontal: scale(10),
    height: scale(17),
    justifyContent: "center",
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
    left: 0,
    bottom: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  stickerText: {
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.white,
    fontSize: scale(10),
    textAlign: "center",
    lineHeight: scale(11),
  },

  // GRID VIEW STYLE

  // container: {
  //     backgroundColor: COLOR_CONST.white,
  //     paddingBottom: verticalScale(20),
  //     width: scale(375),
  //     // height: scale(313)
  // },

  // flexstyle: {
  //     flex: 1
  // },

  // gridTitleContainer: {
  //     justifyContent: 'space-between',
  //     flexDirection: 'row',
  //     marginHorizontal: scale(20),
  //     marginTop: verticalScale(18)
  // },

  // titleTextStyle: {
  //     color: COLOR_CONST.charcoalGrey,
  //     fontSize: scale(17),
  //     lineHeight: scale(19),
  //     fontFamily: FONTS.GTWalsheimProBold
  // },

  // viewAllText: {
  //     color: COLOR_CONST.charcoalGrey,
  //     fontSize: scale(15),
  //     lineHeight: scale(18),
  //     fontFamily: FONTS.GTWalsheimProMedium
  // },

  // gridListContainer: {
  //     marginHorizontal: scale(11),
  // },

  // productGridStyle: {
  //     borderWidth: 1,
  //     borderRadius: scale(4),
  //     width: scale(166),
  //     // height: scale(500),
  //     borderColor: COLOR_CONST.borderduckEggBlue,
  //     overflow: 'hidden',
  //     marginTop: verticalScale(15),
  //     marginHorizontal: scale(5),
  // },

  // imageMainContainer: {
  //     alignItems: 'center',
  // },

  // imageContainer: {
  //     flexDirection: 'row',
  // },

  // heartIcon: {
  //     width: scale(18.9),
  //     height: scale(18.9),
  // },

  // BottalImage: {
  //     width: scale(166),
  //     height: scale(166),
  //     // marginTop: scale(14),
  // },

  // titleContainer: {
  //     width: scale(130),
  //     height: scale(38),
  //     marginTop: verticalScale(11),
  //     alignItems: 'center'
  // },

  // titleNameStyle: {
  //     fontSize: scale(17),
  //     // height: scale(22),
  //     marginHorizontal: scale(10),
  //     lineHeight: scale(19),
  //     marginTop: verticalScale(11),
  //     color: COLOR_CONST.charcoalGrey,
  //     textAlign: 'center',
  //     fontFamily: FONTS.GTWalsheimProRegular
  // },

  // price: {
  //     fontSize: scale(17),
  //     lineHeight: scale(18),
  //     // height: scale(18),
  //     color: COLOR_CONST.facebook,
  //     fontFamily: FONTS.GTWalsheimProMedium,
  //     marginTop: verticalScale(5),
  //     marginBottom: verticalScale(13),
  // },

  // discountRow: {
  //     flexDirection: 'row',
  // },

  // discountPrice: {
  //     fontSize: scale(17),
  //     lineHeight: scale(18),
  //     color: COLOR_CONST.coolGrey,
  //     fontFamily: FONTS.GTWalsheimProMedium,
  //     textDecorationLine:'line-through',
  //     marginTop: verticalScale(5),
  //     marginBottom: verticalScale(13),
  //     height: scale(18),
  // },

  // addToCartContainer: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     width: scale(164),
  //     backgroundColor: COLOR_CONST.buttonColor,
  //     height: scale(40)
  // },

  // addToCartText: {
  //     color: COLOR_CONST.white,
  //     alignSelf: 'center',
  //     fontFamily: FONTS.GTWalsheimProBold,
  //     fontSize: scale(13),
  //     lineHeight: scale(15),
  //     // marginTop: verticalScale(14)
  // },

  // spinner: {
  //     alignSelf: 'center',
  //     width: Platform.OS === 'ios' ? scale(164) : scale(170),
  //     backgroundColor: COLOR_CONST.white,
  //     height: scale(40),
  //     alignItems: 'center',
  // },

  // qtyStyle:{
  //     fontFamily:FONTS.GTWalsheimProRegular,
  //     color:COLOR_CONST.charcoalGrey,
  //     opacity:0.7,
  //     fontSize:scale(13),
  //     lineHeight:scale(15),
  //     marginLeft:scale(5)
  // },

  // TouchableOpacityStyle:{
  //     // backgroundColor:COLOR_CONST.white,
  //     justifyContent:'center',
  //     alignItems:'center',
  //     position: 'absolute',
  //     top: verticalScale(16),
  //     right: verticalScale(16),
  //     width: scale(18),
  //     height: scale(18),
  //     zIndex:1000
  // },

  // labelSticker: {
  //     position: 'absolute',
  //     backgroundColor: COLOR_CONST.pastelRed,
  //     paddingHorizontal: scale(10),
  //     height: scale(17),
  //     justifyContent: 'center',
  //     borderTopRightRadius: scale(5),
  //     borderBottomRightRadius: scale(5),
  //     left: 0,
  //     top: verticalScale(16),
  //     justifyContent: 'center',
  //     alignItems: 'center'
  // },
  // stickerText: {
  //     fontFamily: FONTS.GTWalsheimProMedium,
  //     color: COLOR_CONST.white,
  //     fontSize: scale(10),
  //     textAlign: 'center',
  //     lineHeight: scale(11),
  // }
});
