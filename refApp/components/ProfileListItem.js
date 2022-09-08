import React, {useState} from 'react';
import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import R from '../R';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ProfileListItem = props => {
  const [NotificationToggle, setNotificationToggle] = useState(
    props.isNotificationOn,
  );
  const toggleSwitch = () =>
    setNotificationToggle(previousState => !previousState);

  const renderCounterOrButton = () => {
    return props.showCounterOrButton == 0 ? null : props.showCounterOrButton ==
      1 ? (
      <View
        style={{
          flex: 2,
          paddingVertical: '1%',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.charcoalGrey,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: '30%',
            marginVertical: '12%',
          }}>
          <Text
            style={{
              fontFamily: R.fonts.GTWalsheimProRegular,
              color: R.colors.white,
            }}>
            {props.count}
          </Text>
        </View>
      </View>
    ) : (
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Switch
          trackColor={{false: '#fff', true: '#43b7a7'}}
          thumbColor={NotificationToggle ? '#fff' : '#fff'}
          ios_backgroundColor="#fff"
          onValueChange={toggleSwitch}
          value={NotificationToggle}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: R.colors.white,
          borderColor: R.colors.lightBlueGrey,
          borderBottomWidth: 1,
          borderBottomStartRadius: 5,
        }}>
        <View
          style={{flex: 0.5, marginHorizontal: '8%', paddingVertical: '5%'}}>
          <Image source={props.image} style={props.imgStyle} />
        </View>
        <View
          style={{
            flex: props.showCounterOrButton == 0 ? 7 : 5,
            paddingVertical: '5%',
          }}>
          <Text style={{fontFamily: R.fonts.GTWalsheimProRegular}}>
            {props.title}
          </Text>
        </View>
        {renderCounterOrButton(props.showCounterOrButton)}
      </View>
    </TouchableOpacity>
  );
};
