import React from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as IMG_CONST from "../theme/ImageConstants";
import scale, { verticalScale } from '../utils/Scale';
import { WebView } from 'react-native-webview';
import ColorConstants, { FONTS } from "../theme/ColorConstants";
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { ActivityIndicator } from 'react-native-paper';
import Modal from 'react-native-modal';

const INJECTED_JAVASCRIPT = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://tawk.to/chat/5fed8a42df060f156a929787/1eqru85qj';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();`;

class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
  }


  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: {
        backgroundColor: ColorConstants.white,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerTitle: () => (
        <View>
          <Text style={{
            fontSize: scale(15),
            fontFamily: FONTS.GTWalsheimProMedium,
            color: ColorConstants.charcoalGrey,
            lineHeight: scale(18),
          }}>Customer Support</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{}}>
          <Image
            source={IMG_CONST.BACK_ICON}
            style={{
              width: scale(11.9),
              height: scale(21.7),
              marginLeft: scale(18),
            }} />
        </TouchableOpacity>
      ),
    })
  };

  renderLoading = () => {
    return (
      <Modal isVisible={this.state.isLoading}
        style={{ flex: 1, margin: 0 }}>
        <ActivityIndicator color={ColorConstants.primaryThemeGradient} />
      </Modal>
    )
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: ColorConstants.white,
        paddingVertical: verticalScale(5)
      }}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor={ColorConstants.white}
          isFocused={true} />
        <WebView
          source={{ uri: 'https://tawk.to/chat/5fed8a42df060f156a929787/1eqru85qj' }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabledAndroid={true}
          onLoadStart={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            this.setState({ isLoading: nativeEvent.loading });
          }}
          onLoadEnd={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            this.setState({ isLoading: nativeEvent.loading });
          }}
        />
        {this.renderLoading()}
      </SafeAreaView>
    )
  }
}

export default ChatScreen;