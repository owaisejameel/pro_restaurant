import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';

export default StyleSheet.create({

    container: {
        backgroundColor: COLOR_CONST.white,
        width: scale(375),
        height: scale(313)
    },

    loaderContainer: {
        width:"100%",
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000000,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    loader:{
        width: scale(50),
        height: scale(50),
    },

    flexstyle: {
        flex: 1
    },

    productGrid: {
        flex: 1,
        paddingBottom: scale(35)
    },

    headerTitleStyle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
        width: scale(200),
        textAlign: 'center'
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

    notifIcon: {
        width: scale(16.7),
        height: scale(19),
    },

    cartIcon: {
        width: scale(20.2),
        height: scale(17.9),
        marginLeft: scale(6.5)
    },

    wishlistCartIcon: {
        width: scale(20.2),
        height: scale(17.9),
        marginRight: scale(25.6)
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale(25.6),
    },

    mainContainer: {
        flex: 1,
        backgroundColor: COLOR_CONST.white,
    },

    sortHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    textpoup: {
        fontFamily: FONTS.GTWalsheimProRegular,
        marginHorizontal: 10,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
        fontSize: scale(17),
        lineHeight:scale(19)
    },

    gridTitleContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: scale(20),
        marginTop: verticalScale(18)
    },

    titleTextStyle: {
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.5,
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular
    },

    viewAllText: {
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.8,
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium
    },

    listContainer: { 
        flex: 1, 
        alignItems: 'center',
        marginTop: verticalScale(10)
    },

    listContainerOne: { 
        flex: 1, 
        marginLeft: scale(11),
        marginTop: verticalScale(10)
    },

    productGridStyle: {
        borderWidth: 1,
        borderRadius: scale(4),
        width: scale(166),
        borderColor: COLOR_CONST.borderduckEggBlue,
        marginHorizontal: scale(5),
        marginBottom: verticalScale(11),
        overflow: 'hidden'
    },

    imageMainContainer: {
        alignItems: 'center',
    },

    imageContainer: {
        flexDirection: 'row',
    },

    heartIcon: {
        width: scale(18.9),
        height: scale(18.9),
    },

    BottalImage: {
        width: scale(171),
        height: scale(171),
    },

    titleContainer: {
        width: scale(159),
        // marginTop: verticalScale(15),
        alignItems: 'center'
    },

    titleNameStyle: {
        fontSize: scale(17),
        lineHeight: scale(19),
        // height: scale(19),
        color: COLOR_CONST.charcoalGrey,
        marginTop: verticalScale(11),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProRegular
    },

    price: {
        fontSize: scale(17),
        lineHeight: scale(18),
        color: COLOR_CONST.facebook,
        fontFamily: FONTS.GTWalsheimProMedium,
        marginTop: verticalScale(5),
        marginBottom: verticalScale(13),
        // height: scale(18),
    },

    discountRow: {
        flexDirection: 'row',
    },

    discountPrice: {
        fontSize: scale(17),
        lineHeight: scale(18),
        color: COLOR_CONST.coolGrey,
        fontFamily: FONTS.GTWalsheimProMedium,
        textDecorationLine:'line-through',
        marginTop: verticalScale(5),
        marginBottom: verticalScale(9),
        height: scale(18),
    },

    addToCartContainer: {
        width: scale(171),
        backgroundColor: COLOR_CONST.buttonColor,
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center'
    },

    addToCartText: {
        color: COLOR_CONST.white,
        alignSelf: 'center',
        fontFamily: FONTS.GTWalsheimProBold,
        fontSize: scale(13),
        lineHeight: scale(15),
        // marginTop: verticalScale(14)
    },

    spinner: {
        width: Platform.OS === 'ios' ? scale(171) : scale(177),
        backgroundColor: COLOR_CONST.white,
        height: scale(40),
        alignItems: 'center',
    },

    qtyStyle: {
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.7,
        fontSize: scale(13),
        lineHeight: scale(15),
        // marginLeft: scale(5)
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    sortByContiner: {
        alignSelf: 'flex-end',
        width: scale(375),
        height: scale(316),
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },

    crossIcon: {
        width: scale(12),
        height: scale(12),
        marginRight: scale(30.3),
    },

    sortRow: {
        marginTop: verticalScale(24),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    sortByText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        fontSize: scale(18),
        lineHeight: scale(20),
        marginLeft: scale(25),
        marginLeft: scale(24),
    },

    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(22),
        marginLeft: scale(26.6)
    },
    
    innerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    dollarDown: {
        width: scale(17),
        height: scale(12),
    },

    newIcon: {
        width: scale(12),
        height: scale(12),
    },

    popularityIcon: {
        width: scale(9),
        height: scale(12),
    },

    filterText: {
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        // marginLeft: scale(9),
        color: COLOR_CONST.coolGreyTwo
    },

    tickCorrect: {
        width: scale(18.3),
        height: scale(18.3),
        marginRight: scale(26.8)
    },

    TitleSort: {
         marginLeft:scale(10.5),
          alignSelf: 'center',  
          color:COLOR_CONST.greyTextColor 
    },

    verticalLine: {
        width: 1,
        height: scale(18),
        backgroundColor: COLOR_CONST.greyTextColor,
    },

    emtpyAddressContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cartempty: { 
        flex: 1, 
        justifyContent:'center'
    },

    emptyAddressIcon: {
        width: scale(171.5),
        height: scale(186.7),
        alignSelf: 'center',
    },

    noAnyOrder: {
        fontSize: scale(17),
        textAlign: 'center',
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(19),
        marginTop: verticalScale(24.6),
        opacity: 0.9
    },

    youhave: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(233),
        lineHeight: scale(18),
        textAlign: 'center',
        marginTop: verticalScale(8),
        opacity: 0.5
    },

    loginButton: {
        alignSelf: 'center',
        width: scale(339),
        height: scale(42),
        borderRadius: scale(21),
        opacity: 0.99,
        marginBottom: verticalScale(30.2),
    },

    loginText: {
        fontSize: scale(14),
        lineHeight: scale(16),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
    },

    showingResults: {
        fontSize: scale(10),
        lineHeight: scale(11),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
        marginLeft: scale(11),
        marginTop: verticalScale(8.8),
        // marginBottom: verticalScale(10.2),
    },

    touchableOpacityStyle:{
        // backgroundColor:COLOR_CONST.white,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        top: verticalScale(16),
        right: verticalScale(14.1),
        width: scale(18),
        height: scale(18),
        zIndex:1000
    },

    labelSticker: {
        position: 'absolute',
        backgroundColor: COLOR_CONST.pastelRed,
        paddingHorizontal: scale(10),
        height: scale(17),
        justifyContent: 'center',
        borderTopRightRadius: scale(5),
        borderBottomRightRadius: scale(5),
        left: 0,
        top: verticalScale(16),
        justifyContent: 'center',
        alignItems: 'center'
    },

    stickerText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.white,
        fontSize: scale(10), 
        textAlign: 'center',
        lineHeight: scale(11),
    },

    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: verticalScale(30),
    }
});