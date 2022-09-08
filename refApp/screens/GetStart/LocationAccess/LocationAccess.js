import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar
} from 'react-native';
import NormalButton from '../../../components/NormalButton';
import styles from './LocationAccessStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import * as STR_CONST from '../../../theme/StringConstants';
import AsyncStorage from '@react-native-community/async-storage';

export default class LocationAccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressLocationAccess = async() => {
    this.props.navigation.navigate('NotificationAccess');
    // await AsyncStorage.setItem('LOCATION_ACCESS', 'true');
    // let notificationAccess = await AsyncStorage.getItem('NOTIFICATION_ACCESS');
    // let userToken = await AsyncStorage.getItem('USER_TOKEN');
    // if(!notificationAccess)
    //   this.props.navigation.navigate('NotificationAccess');
    // else if(!userToken)
    //   this.props.navigation.navigate('AuthNavigator');
    // else
    //   this.props.navigation.navigate('MainNavigator');
  }

  onPressNoThanks = async() => {
    this.props.navigation.navigate('NotificationAccess');
    // let notificationAccess = await AsyncStorage.getItem('NOTIFICATION_ACCESS');
    // let userToken = await AsyncStorage.getItem('USER_TOKEN');
    // if(!notificationAccess)
    //   this.props.navigation.navigate('NotificationAccess');
    // else if(!userToken)
    // this.props.navigation.navigate('AuthNavigator');
    // else
    //   this.props.navigation.navigate('MainNavigator');
  }

  renderLoactionAccessView = () => {
    return (
      <View style={styles.container}>
        <Image source={IMG_CONST.COMPASS} style={styles.Locationimage} />
        <View>
          <Text style={styles.activeText}>{STR_CONST.FIND_THE}</Text>
        </View>
        <Text style={styles.textDescription}>
          {STR_CONST.HOMOEO_PHARMA}
        </Text>
        <NormalButton
          title="Give Access"
          customStyle={styles.customButtonStyle}
          onPress={() => this.onPressLocationAccess()}
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
        {this.renderLoactionAccessView()}
      </View>
    );
  }
}
