import { StyleSheet, Dimensions, Platform } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';


export default StyleSheet.create({

    backButton: {
        paddingVertical: verticalScale(20),
        paddingRight: scale(20),
    },

    backIcon: {
        width: scale(11.9),
        height: scale(21.7),
        marginLeft: scale(18),
    },

    illustrationImage: {
        width: scale(375),
        height: scale(167),
        opacity: 0.96
    },

    addressContainer: {
        backgroundColor: COLOR_CONST.white,
        marginTop: verticalScale(10.7),
        // height:scale(424),
        width: scale(375)
    },

    makeListContainer: {
        backgroundColor: COLOR_CONST.white,
        marginTop: verticalScale(10.7),
        // height: verticalScale(225),
        width: scale(375)
    },

    addressSubContainer: {
        marginTop: verticalScale(20),
        marginLeft: scale(20)
    },

    DeliveryText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.charcoalGrey,
        marginBottom: verticalScale(37.2)
    },

    MakeListText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.charcoalGrey,
        marginBottom: verticalScale(22)
    },

    orTextStyles: {
        fontSize: 12,
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.coolGreyTwo,
        marginTop: scale(19.2),
        alignSelf: 'center',
        marginBottom: scale(18.2)
    },

    containerAddmedicine: {
        flexDirection: 'row',
        marginTop: verticalScale(21),
        alignItems: 'center'
    },

    SectionStyle: {
        borderRadius: 6,
        borderColor: '#eaf0fb',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: scale(309),
        height: scale(47),
        backgroundColor: '#fff',
    },

    cancelImagemedicine: {
        width: scale(11.4),
        height: scale(11.4),
        alignSelf: 'center',
        marginLeft: scale(10.3)
    },

    addmedicineGreen: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(12),
        lineHeight: scale(14),
        marginLeft: scale(7.4),
        color: COLOR_CONST.greenyBlue,
    },

    NumericInputStyle: {
        marginVertical: verticalScale(7),
        marginHorizontal: scale(7)
    },

    textstyle: {
        fontSize: scale(12),
        fontFamily: FONTS.GTWalsheimProRegular,
        textAlign: 'left',
        marginLeft: scale(13),
        flex: 1,
        color: COLOR_CONST.coolGreyTwo
    },

    uploadPrescription: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.charcoalGrey,
    },


    TextInputStyles: {
        marginRight: scale(18.5)
    },


    buttonStyle: {
        marginTop: verticalScale(19.2),
        width: scale(335),
        borderRadius: 22,
        borderColor: COLOR_CONST.coolGreyTwo,
        borderWidth: 1,
        height: scale(44),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: scale(18.8)
    },

    uploadPrescriptionText: {
        fontSize: scale(14),
        lineHeight: scale(16),
        letterSpacing: 0.4,
        fontFamily: FONTS.GTWalsheimProBold,
        color: COLOR_CONST.coolGreyTwo,
    },

    NextContainer: {
        marginTop: scale(10),
        backgroundColor: COLOR_CONST.white,
    },

    nextText: {
        fontFamily: FONTS.GTWalsheimProMedium,
        fontSize: scale(12),
        lineHeight: scale(14),
        color: COLOR_CONST.charcoalGrey,
        marginTop: scale(20),
        marginLeft: scale(20),
        marginBottom: scale(12.2)
    },

    nextContaint: {
        fontSize: scale(14),
        lineHeight: scale(22),
        marginLeft: scale(20),
        textAlign: 'left',
        marginRight: scale(16),
        fontFamily: FONTS.GTWalsheimProRegular,
        color: COLOR_CONST.charcoalGrey,
        marginBottom: scale(10.5)
    },
    customButtom: {
        width: scale(312),
        height: scale(44),
        marginTop: verticalScale(20.2),
        backgroundColor: COLOR_CONST.greenButton,
    },

    customButtomText: {
        fontFamily: FONTS.GTWalsheimProBold,
        fontSize: scale(14),
        lineHeight: scale(16),
        letterSpacing: 0.4,
        color: COLOR_CONST.white
    },

    attachedRootView: {
        flexDirection: 'row',
        marginTop: verticalScale(12),
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
        right: scale(-9.5),
    },

    cancleImage: {
        height: scale(19),
        width: scale(19),
    },

    attachment: {
        marginTop: verticalScale(20),
        height: scale(49),
        width: scale(74),
    },

    attachment1: {
        marginTop: verticalScale(11),
        height: scale(65),
        width: scale(57),
    },

    tools: {
        borderWidth: 1,
        borderColor: COLOR_CONST.borderduckEggBlue,
        backgroundColor: COLOR_CONST.white,
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(30),
        marginRight: scale(7)
    },

    minus: {
        fontSize: scale(18),
        marginLeft: scale(8),
        marginRight: scale(15.4),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.coolGreyTwo,
    },

    count: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.charcoalGrey,
    },

    plus: {
        fontSize: scale(18),
        lineHeight: scale(18),
        marginLeft: scale(15.4),
        marginRight: scale(8),
        fontFamily: FONTS.GTWalsheimProMedium,
        color: COLOR_CONST.coolGreyTwo,
    },

});
