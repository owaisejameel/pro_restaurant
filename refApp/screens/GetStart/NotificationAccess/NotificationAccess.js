import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar
} from 'react-native';
import NormalButton from '../../../components/NormalButton';
import styles from './NotificationAccessStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import * as STR_CONST from '../../../theme/StringConstants';
import AsyncStorage from '@react-native-community/async-storage';

export default class NotificationAccess extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressNotificationAccess = async() => {
    this.props.navigation.navigate('AuthNavigator');
    // await AsyncStorage.setItem('NOTIFICATION_ACCESS', 'true');
    // let userToken = await AsyncStorage.getItem('USER_TOKEN');
    // if(!userToken)
    // this.props.navigation.navigate('AuthNavigator');
    // else
    //   this.props.navigation.navigate('MainNavigator');
  }

  onPressNoThanks = async() => {
    let userToken = await AsyncStorage.getItem('USER_TOKEN');
    if(!userToken)
    this.props.navigation.navigate('AuthNavigator');
    else
      this.props.navigation.navigate('MainNavigator');
  }

  renderNotificationAccessView = () => {
    return (
      <View style={styles.container}>
        <Image source={IMG_CONST.BELL} style={styles.Bellimage} />
        <View>
          <Text style={styles.activeText}>{STR_CONST.ACTIVE_NOT}</Text>
        </View>
        <Text style={styles.textDescription}>
         {STR_CONST.YOU_WILL}
        </Text>
        <NormalButton
          title="Give Access"
          customStyle={styles.customButtonStyle}
          onPress={() => this.onPressNotificationAccess()}
          customTxtStyle={styles.customButtonTxtStyle}
        />
        <View>
        <Text onPress={() => this.onPressNoThanks()} style={styles.NothanksText}>{STR_CONST.NO_THANKS}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
        <View style={styles.maincontainer}>
        <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
        {this.renderNotificationAccessView()}
      </View>
    );
  }
}
