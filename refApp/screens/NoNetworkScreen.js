import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import scale, {verticalScale} from '../utils/Scale';
import COLOR_CONST, {FONTS} from '../theme/ColorConstants';
import * as IMG_CONST from '../theme/ImageConstants';

function NoNetwork() {
  return (
    <View style={styles.emtpyAddressContainer}>
      <View style={styles.cartempty}>
        <Image
          source={IMG_CONST.NO_INTERNET_ICON}
          style={styles.emptyAddressIcon}
        />
        <Text style={styles.noAnyOrder}>No Internet</Text>
        <Text style={styles.youhave}>
            Your connection is no more. Please try again
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emtpyAddressContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartempty: {
    flex: 1,
    justifyContent: 'center',
  },

  emptyAddressIcon: {
    width: scale(121.3),
    height: scale(121.3),
    alignSelf: 'center',
  },
  noAnyOrder: {
    fontSize: scale(17),
    fontFamily: FONTS.GTWalsheimProMedium,
    color: COLOR_CONST.charcoalGrey,
    lineHeight: scale(19),
    marginTop: verticalScale(24.6),
    opacity: 0.9,
    textAlign: 'center',
  },

  youhave: {
    fontSize: scale(15),
    fontFamily: FONTS.GTWalsheimProRegular,
    color: COLOR_CONST.charcoalGrey,
    width: scale(233),
    lineHeight: scale(18),
    textAlign: 'center',
    marginTop: verticalScale(8),
    opacity: 0.5,
    textAlign: 'center',
  },
});

export default NoNetwork;
