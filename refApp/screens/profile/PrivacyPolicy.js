import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import {HelpCenterList} from '../../theme/constants';
import R from '../../R';
import styles from './TermsOfServiceStyle';
import { verticalScale } from '../../utils/Scale';
import { WebView } from 'react-native-webview';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default class PrivacyPolicy extends Component {

    constructor(props) {
      super(props);
      this.state = {
        helpData: '<h1>No Data Found!</h1>',
      }
    }
    
    componentDidMount() {
      this.setNavigationHeaderConfiguration();
      let localData = this.props.route.params.helpCenterData;
      this.setState({ helpData: localData.content });
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white },
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}>{this.props.route.params.helpCenterData.title}</Text></View>),
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON}style={styles.backIcon}/></TouchableOpacity>),
        })
    }

    renderQuestionView = () => {
      return (
        <View style={styles.questionView}>
            <Text style={styles.question}>Heading</Text>
            <Text style={styles.answer}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</Text>
        </View>
      )
    }

    render() {
        return (
          <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
            <WebView
              originWhitelist={['*']}
              source={{ html: this.state.helpData }}
              style={{flex: 1}}
            />
            {/* {this.renderQuestionView()} */}
          </View>
        );
    }
};
