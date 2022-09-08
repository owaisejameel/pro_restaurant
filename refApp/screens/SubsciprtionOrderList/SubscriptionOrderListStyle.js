import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.white
    },

    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLOR_CONST.paleGrey
    },

    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
    },

    headerTitleStyle: {
        fontSize: scale(15),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        lineHeight: scale(18),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    reviewListContainer: {
        backgroundColor: COLOR_CONST.white,
        marginTop: verticalScale(20.8),
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

    statusView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: verticalScale(8),
        width: scale(353),
        borderRadius: scale(4),
        backgroundColor: COLOR_CONST.white,
    },

    tickView: {
        marginTop: verticalScale(17.8),
        marginLeft: scale(13),
        alignItems: 'center'
    },

    tickIcon: {
        width: scale(16),
        height: scale(16)
    },

    orderStatusVerticalLine: {
        width: 1,
        height: scale(70),
        backgroundColor: COLOR_CONST.lightGreyText,
    },

    rightInfo: {
        marginLeft: scale(9),
        marginTop: verticalScale(18),
    },

    rowContent: {
        width: scale(305),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 

    statusRow: {
        flexDirection: 'row', 
    }, 

    statusHeading: {
        fontSize: scale(14),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
        marginEnd: scale(6)
    },

    statusText: {
        fontSize:scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
    },

    rowContent: {
        width: scale(305),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 

    orderProduct:{
        width: scale(305),
        flexDirection: 'row',
        paddingTop: scale(10)
    },

    orderImage: {
        width: scale(32),
        height: scale(32),
    },

    orderProductName: {
        fontSize: scale(17),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        width: scale(180),
        marginStart: scale(13)
    },

    orderQty: {
        fontSize: scale(13),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        opacity: 0.4,
    },

    package: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.primaryThemeGradient,
        marginStart: scale(13),
        marginTop: scale(5)
    },

    period: {
        fontSize: scale(10),
        lineHeight: scale(19),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.greenThemeColor,
        marginTop: scale(5)
    },

    orderStatusVerticalLine: {
        width: 1,
        height: scale(70),
        backgroundColor: COLOR_CONST.lightGreyText,
    },

    statusBottom: {
        flexDirection: 'row',
        marginTop: scale(8), 
        justifyContent: 'space-between',
        marginBottom: scale(16)
    },
    
    orderCancel: {
        fontSize: scale(12),
        lineHeight: scale(19),
        color: COLOR_CONST.pastelRed,
        fontFamily: FONTS.GTWalsheimProRegular,
        textDecorationLine: 'underline'
    }, 

    statusRow: {
        flexDirection: 'row', 
    }, 

    deliveredIcon: {
        height: scale(14),
        width: scale(20),
    },

    pendingIcon: {
        height:scale(15),
        width: scale(16)
    },

    viewAll:{
        fontSize: scale(14),
        lineHeight: scale(19),
        color: COLOR_CONST.pastelRed,
        fontFamily: FONTS.GTWalsheimProMedium,
        textDecorationLine: 'underline',
        alignSelf:'flex-end',
        marginTop: scale(5),
        marginEnd: scale(16)
    },

    placedRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    greenDot: {
        width: scale(7),
        height: scale(7),
        borderRadius: scale(3.5),
        backgroundColor: COLOR_CONST.greenyBlue
    },

});
