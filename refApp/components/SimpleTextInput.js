import React from 'react';
import { TextInput, Text, View, Platform } from 'react-native';
import R from '../R';
import scale , {verticalScale} from '../utils/Scale';
import COLOR_CONST from '../../app/theme/ColorConstants';
import { FONTS } from '../../app/theme/ColorConstants';

export const SimpleTextInput = props => {
  return (
    <View>
      <Text
        style={{
          color: props.focusData
            ? R.colors.black
            : props.errorData == false
            ? R.colors.charcoalGrey
            : R.colors.pastelRed,
          fontSize: scale(13),
          lineHeight: scale(15),
          fontFamily: FONTS.GTWalsheimProRegular,
          opacity: props.errorData ? 1 : 0.7
        }}>
        {props.title}
      </Text>
      <TextInput
        {...props}
        onFocus={props.onFocus}
        maxLength={props.title == 'Phone Number' ? 10 : 500 }
        onBlur={props.onBlur}
        onSubmitEditing={props.onSubmitEditing}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: props.focusData
            ? R.colors.black
            : props.errorData == false
            ? R.colors.whiteTwo
            : R.colors.pastelRed,
          marginTop: Platform.OS === 'ios' ? verticalScale(7) : 0,
          marginBottom: verticalScale(24),
          fontSize: scale(17),
          lineHeight: scale(19),
          opacity: 0.9,
          fontFamily: FONTS.GTWalsheimProRegular,
          color: COLOR_CONST.charcoalGrey,
          paddingBottom: 0,
        }}
      />
    </View>
  );
};
