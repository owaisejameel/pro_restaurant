import React from 'react';
import {View, Text} from 'react-native';
import R from '../R';

export const HeaderTitle = props => {
  return (
    <Text style={[{fontFamily: R.fonts.GTWalsheimProRegular, fontSize: 18}, props.textcolour]}>
      {props.title}
    </Text>
  );
};