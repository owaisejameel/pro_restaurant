import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import R from "../../R";
import { hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default StyleSheet.create({

    safeAreaView: {
        flex: 1,
        backgroundColor: COLOR_CONST.paleGrey
    },

    viewContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(25.2)
    },

    prescriptionImage: {
        height: scale(23.8),
        width: scale(18.1),
        resizeMode: 'stretch',
        alignItems: 'center',
        marginLeft: verticalScale(20.9),
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

    title: {
        marginLeft: verticalScale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(14),
        lineHeight:scale(16),
        color: COLOR_CONST.charcoalGrey,
        alignSelf:'center'
    },

    cardContainer: {
        alignSelf: 'center',

    },

    FirstContainer: {
        // height: scale(329.2),
        // width: scale(375),
        backgroundColor:COLOR_CONST.white,
    },

    EasyConatiner: {
        height: scale(200),
        width: scale(375),
        backgroundColor:COLOR_CONST.white
    },

    mainContainer: {
        width: scale(370),
        height: scale(67),
        backgroundColor: COLOR_CONST.white,
    },

    childContainer: {
        flexDirection: 'row'
    },

    renderContainer:{
        paddingTop:scale(10.8)
    },

    galleryContainer: {
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR_CONST.whiteThree,
        borderRadius: 19,
        width: scale(120),
        marginLeft: scale(18),
        marginBottom: verticalScale(28.2),
        height: scale(120),
    },

    galleryImage: {
        height: scale(32.4),
        width: scale(32.4),
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    titleText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.coolGreyTwo,

    },
    mainView: {
        // borderBottomWidth: scale(5),
        // borderBottomColor: COLOR_CONST.lightBlueGrey,
        // paddingBottom: verticalScale(10),
    },


    attachedRootView: {
        flexDirection: 'row',
        marginTop:verticalScale(12),
        paddingBottom: verticalScale(11.2),
    },

    courseListContainer: {
        flex: 1,
        marginLeft: scale(20)
    },

    attachedChildContainer: {
        backgroundColor: COLOR_CONST.uploadBG,
        marginTop: verticalScale(9.5),
        width: scale(86),
        marginRight: scale(14),
        height: scale(86),
        borderRadius: scale(6),
    },

    cancelContainer: {
        position: 'absolute',
        top: scale(-9.5),
        right:scale(-9.5),
    },

    cancleImage: {
        height: scale(19),
        width: scale(19),
    },

    attachment: {
        marginTop:verticalScale(20),
        height: scale(49),
        width: scale(74),
    },

    attachment1: {
        marginTop:verticalScale(11),
        height: scale(65),
        width: scale(57),
    },
    card: {
        marginTop: verticalScale(20),
        marginLeft: scale(21.6)
    },

    titleCard: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(14),
        lineHeight:scale(16),
        color: COLOR_CONST.charcoalGrey,
        marginTop: verticalScale(20),
        marginLeft: scale(21.6)
    },

    processFlowView: {
        justifyContent: 'center',
        marginTop: verticalScale(12)
    },

    processFlowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        // marginLeft:scale(40)
    },

    horizotalLine:{
       width: scale(87),
       height: 1,
       backgroundColor: COLOR_CONST.paleGrey,
       opacity:0.2,
       borderWidth:0.5,
       zIndex:0,
       borderRadius: 4,
       borderStyle: 'dashed',
    },

    processFlowChild: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_CONST.darkishBlueTwo,
        height: scale(37),
        width: scale(37),
        borderRadius: scale(37/2)
    },

    ImageStyle: {
        // padding: verticalScale(10),
        width: scale(19.2),
        height: scale(19.2),
    },

    ImageStyle2: {
        // padding: verticalScale(10),
        width: scale(19),
        height: scale(20.2),
    },

    ImageStyle1: {
        // padding: verticalScale(10),
        width: scale(13.8),
        height: scale(18.3),
    },

    processFlowTextView: {
        justifyContent: 'center',
        marginVertical: verticalScale(5),
    },

    processFlowTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    processFlowTextChild: {
        alignItems: 'center',
        marginLeft: verticalScale(10),
        marginTop:verticalScale(7)
    },

    processFlowText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(8),
        lineHeight: scale(9),
        color: COLOR_CONST.charcoalGrey,
    },
    notesView: {
        marginLeft: scale(20),
        marginTop: verticalScale(12),
        marginBottom:verticalScale(20)
    },

    noteText: {
        fontFamily: FONTS.GTWalsheimProBold,
        fontSize: scale(8),
        lineHeight: scale(9),
        color: COLOR_CONST.darkGrey,
        marginBottom: scale(5)
    },

    notes: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(8),
        lineHeight: scale(12),
        letterSpacing: 0.08,
        color: COLOR_CONST.coolGreyTwo,
    },

    notes1: {
        fontFamily: FONTS.GTWalsheimProRegular,
        fontSize: scale(8),
        lineHeight: scale(12),
        letterSpacing: 0.08,
        color: COLOR_CONST.coolGreyTwo,
        marginBottom:20
    },

    viewStyle: {
        width: scale(375),
        height: scale(70),
        alignContent:'center',
        marginTop: verticalScale(15),
        marginLeft: scale(20)
    },

    viewChild: {
        flexDirection: 'row',
    },

    view: {
        marginLeft: scale(15),
        // marginTop:verticalScale(17)
    },

    image: {
        height: scale(50),
        width: scale(50),
    },

    textView: {
        marginLeft: scale(8),
        marginTop: verticalScale(10)
    },

    text: {
        fontSize: scale(12),
        lineHeight: scale(16),
        color: COLOR_CONST.charcoalGrey,
        fontFamily: FONTS.GTWalsheimProRegular,
    },

    greebButtonView: {
        alignItems: 'center'
    },

    greebButtoncustomStyle: {
        height: scale(44),
        width: scale(312),
        marginTop: verticalScale(12.2),
        backgroundColor: COLOR_CONST.primaryThemeGradient,
        borderRadius: 22,
        opacity:0.99
    },

    greebButtoncustomTxtStyle: {
        fontSize: scale(14),
        letterSpacing: 0.4,
        lineHeight: scale(16),
        fontFamily: FONTS.GTWalsheimProBold

    },

    bottomView: {
        marginTop: verticalScale(20),

    }
});
