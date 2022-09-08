import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SegmentControl from 'react-native-segment-controller';
import Login from './Login';
import SignUp from './SignUp';
import R from '../../R';
import styles from './RootStyle';
import CommanLogo from './CommanLogo';
import LinearGradient from 'react-native-linear-gradient';
import scale, {verticalScale} from '../../utils/Scale';
import ColorConstants, {FONTS} from '../../theme/ColorConstants';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      currentindex: 0,
      botton1: false,
      botton2: true,
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(index) {
    this.setState({currentindex: index});
  }

  renderElement(currentindex) {
    if (currentindex == 0) return <SignUp navigation={this.props.navigation} />;
    return <Login navigation={this.props.navigation} />;
  }

  _onPress = (item) => {
    if (item == 'button1') {
      this.setState({button1: true, button2: false});
    } else {
      this.setState({button2: true, button1: false});
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[
            ColorConstants.primaryThemeGradient,
            ColorConstants.secondaryThemeGradient,
            ColorConstants.secondaryThemeGradient,
            ColorConstants.secondaryThemeGradient,
            ColorConstants.secondaryThemeGradient,
          ]}
          style={styles.innerContainer}>
          <Image
            style={{alignSelf: 'center', margin: 32}}
            source={R.images.logo}
          />
          <View style={styles.segmentContainer}>
            <View
              style={[
                styles.segmentButtonHolder,
                {backgroundColor: this.state.button2 ? 'red' : 'white'},
              ]}>
              <SegmentControl
                values={['Sign Up', 'Log In']}
                selectedIndex={this.state.currentindex}
                height={hp('6%')}
                onTabPress={this.handlePress}
                tabTextStyle={{
                  fontSize: scale(14),
                  color: ColorConstants.greyTextColor,
                  fontFamily: FONTS.GTWalsheimProRegular,
                  lineHeight: scale(16),
                }}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activetabTextStyle}
              />
            </View>
          </View>
          <View style={styles.box1}>
            {this.renderElement(this.state.currentindex)}
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
