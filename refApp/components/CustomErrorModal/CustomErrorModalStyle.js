import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';

const styles = {

    container: {
        width:"100%",
        height:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'transparent',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    bottomView: {
        alignSelf: 'flex-end',
        width: scale(375),
        height: scale(70),
        backgroundColor: COLOR_CONST.white,
        shadowColor: COLOR_CONST.black,
        shadowOffset: { width: 4, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        justifyContent: 'center',
    },

    alertText: {
        fontSize: scale(15),
        lineHeight: scale(18),
        fontFamily:FONTS.GTWalsheimProRegular,
        color:COLOR_CONST.google,
        width: scale(295),
        marginLeft: scale(20)
    },

    crossIcon: {
        width: scale(14.6),
        height: scale(14.6),
        position: 'absolute',
        bottom: verticalScale(17.6),
        right: scale(17.4),
    }

}
export default styles;