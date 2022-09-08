import React, {Component} from 'react';
import {Text, View, ImageBackground, Image, StyleSheet, StatusBar} from 'react-native';
import styles from './SplashScreenStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import COLOR_CONST from '../../../theme/ColorConstants';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import LinearGradient from 'react-native-linear-gradient';

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  async componentDidMount() {
    let userToken = await AsyncStorage.getItem('USER_TOKEN');
    this.timeoutHandle = setTimeout(() => {
      if(!userToken){
      AsyncStorage.setItem('pincode', '560098');
      this.props.navigation.navigate('AuthNavigator');
      //this.props.navigation.navigate('VerifyPincode');
    }
      
      else{
        this.props.navigation.replace('MainNavigator');
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <ImageBackground source={IMG_CONST.SPLASH_BG} style={styles.appContainer}>
        <FocusAwareStatusBar hidden={true} />
        <Animatable.View
          animation="bounceIn"
          duraton="1500">
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              source={IMG_CONST.SPLASH_LOGO_WHITE}
              style={styles.appLogo}
              resizeMode="stretch"
            />
        </Animatable.View>
          {/* <Text style={styles.brandName}>Welcome to the World of Varieties</Text> */}
      </ImageBackground>
    );
  }
}

export default SplashScreen;
