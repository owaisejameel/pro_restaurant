import React from 'react';
import {View, StatusBar} from 'react-native';
import R from '../R';
import FocusAwareStatusBar from './FocusAwareStatusBar';
export const RootView = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: R.colors.paleGrey,
      }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
      {/* <StatusBar backgroundColor="#FFF" barStyle="dark-content" /> */}
      {props.children}
    </View>
  );
};
