import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import R from '../R';
import LinearGradient from 'react-native-linear-gradient';
import COLOR_CONST from '../theme/ColorConstants';

const NormalButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.buttonStyle, props.customStyle]}>
        <Text style={[{ color: R.colors.white }, props.customTxtStyle]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NormalButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: R.colors.greenButton,
  },
});
