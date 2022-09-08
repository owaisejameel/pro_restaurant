import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale , {verticalScale} from '../../utils/Scale';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import { FONTS } from '../../../app/theme/ColorConstants';
import * as CONST from '../../theme/StringConstants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR_CONST.paleGrey
    },

    listContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_CONST.paleGrey
    },
    
    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(25.6),
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

    savedCards: {
        alignSelf: 'flex-start',
        fontSize: scale(13),
        marginTop: verticalScale(22),
        marginBottom: verticalScale(14.5),
        lineHeight: scale(15),
        color: COLOR_CONST.coolGreyTwo,
        marginLeft: scale(20),
        fontFamily: FONTS.MetropolisSemiBold,
    },

    cardContainer: {
        width: scale(335),
        height: scale(170.1),
        borderRadius: scale(10),
        marginBottom: verticalScale(20),
    },

    shadowView: {
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: scale(7),
        borderRadius: scale(10),
    },

    visaImage: {
        width: scale(46.8),
        height: scale(15.2),
        alignSelf: 'flex-end',
        marginTop: verticalScale(19.8),
        marginRight: scale(18.2)
    },

    cardNumber: {
        fontSize: scale(10),
        marginTop: verticalScale(18.5),
        lineHeight: scale(11),
        color: COLOR_CONST.white,
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    cardHolder: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.white,
        width: scale(198),
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    expires: {
        fontSize: scale(10),
        lineHeight: scale(11),
        color: COLOR_CONST.white,
        width: scale(120),
        fontFamily: FONTS.MetropolisRegular,
    },

    cardNo: {
        fontSize: scale(23),
        marginTop: verticalScale(9),
        lineHeight: scale(27),
        color: COLOR_CONST.white,
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(22),
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(5),
    },

    cardHolderName: {
        fontSize: scale(16),
        lineHeight: scale(18),
        color: COLOR_CONST.white,
        width: scale(198),
        marginLeft: scale(17.1),
        fontFamily: FONTS.MetropolisRegular,
    },

    date: {
        fontSize: scale(16),
        lineHeight: scale(18),
        color: COLOR_CONST.white,
        width: scale(120),
        // marginLeft: scale(2),
        fontFamily: FONTS.MetropolisRegular,
    },

    continueShoppingButton: {
        width: scale(339),
        height: scale(42),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(30),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.99
    },

    continueText: {
        fontSize: scale(15),
        color: COLOR_CONST.white,
        fontFamily: FONTS.GTWalsheimProBold,
        lineHeight: scale(18),
        textAlign: 'center'
    },

});
