import React from 'react';
import {StyleSheet, View} from 'react-native';
import scale, { verticalScale } from '../utils/Scale';

const ProductOverlay = () => {
  return (
    <View style={styles.overlay} />
  );
};

export default ProductOverlay;

const styles = StyleSheet.create({
    overlay: {
        position:"absolute",
        width: scale(171),
        height: verticalScale(242),
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
});
