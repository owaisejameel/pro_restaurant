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
import R from '../../R';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class CommanLogo extends React.Component {
  constructor() {
    super();
    this.state = {
    
    };
  }

  render() {
    return (
    <View>
        <View
            style={{
              backgroundColor: R.colors.LightlightNavy,
              // alignItems: 'baseline',
              marginVertical:hp('3%'),
              paddingLeft: wp('6%'),
            }}>
            <Image source={R.images.logo} style={{ width: 150, height: 54 }} />
            <Text
              style={{
                color: 'white',
                fontSize: wp('4%'),
                paddingTop: hp('2%'),
                marginRight: 10,
                fontFamily:R.fonts.GTWalsheimProRegular
              }}>
              Get started and discover the best offers around you
            </Text>
          </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
