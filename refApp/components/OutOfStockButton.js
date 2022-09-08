import React from "react";
import { StyleSheet, View, Text } from "react-native";
import scale, { verticalScale } from "../utils/Scale";
import COLOR_CONST, { FONTS } from '../theme/ColorConstants';

const OutOfStockButton = () => {
  return (
    <View
      // colors={[COLOR_CONST.white, COLOR_CONST.white]}
      style={styles.outOfStockContainer}
    >
      <View onPress={() => {}}>
        <Text style={styles.outOfStockText}>Out of Stock</Text>
      </View>
    </View>
  );
};

export default OutOfStockButton;

const styles = StyleSheet.create({
  outOfStockContainer: {
    width: scale(171),
    backgroundColor: COLOR_CONST.white,
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOR_CONST.borderduckEggBlue,
  },
  outOfStockText: {
    color: COLOR_CONST.error,
    alignSelf: "center",
    fontFamily: FONTS.GTWalsheimProRegular,
    fontSize: scale(13),
    lineHeight: scale(15),
  },
});
