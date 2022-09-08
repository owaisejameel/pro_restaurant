import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import LinearGradient from 'react-native-linear-gradient';
import COLOR_CONST from '../theme/ColorConstants';

const GreenButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={[styles.buttonStyle, props.customStyle]}>
        <Text style={[{ color: R.colors.white }, props.customTxtStyle]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GreenButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: R.colors.primaryThemeGradient,
  },
});
