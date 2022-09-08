import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import R from '../R';

const CustomButton = props => {
  return (
    <TouchableOpacity
      style={[styles.btnStyle, props.customStyle]}
      onPress={props.onPress}>
      <View
        style={{
          // flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={props.img} style={props.imgStyle} />
      </View>
      <View >
        <Text style={props.customTxtStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnStyle: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 30,
    //borderWidth: 1,
  },
});
