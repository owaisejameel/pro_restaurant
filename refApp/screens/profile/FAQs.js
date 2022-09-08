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
import styles from './FAQsStyle';
import Scale, { verticalScale } from '../../utils/Scale';
import { WebView } from 'react-native-webview';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default class FAQs extends Component {

    constructor(props) {
      super(props);
      this.state = {
        helpData: '<h1>No Data Found!</h1>',
      }
    }
    
    componentDidMount() {
      this.setNavigationHeaderConfiguration();
      console.log('@@@ Data ==========', this.props.route.params)
      let localData = this.props.route.params.helpCenterData;
      let dataIndex = this.props.route.params.helpCenterData.findIndex((item) => item.id === 7);
      if(dataIndex !== -1)
        this.setState({ helpData: localData[dataIndex].content });
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white },
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}>FAQs</Text></View>),
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON}style={styles.backIcon}/></TouchableOpacity>),
        })
    }

    renderQuestionView = () => {
      return (
        <View style={styles.questionView}>
            <Text style={styles.question}>1.1 Question?</Text>
            <Text style={styles.answer}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={[styles.question, { marginTop: verticalScale(28)}]}>1.2 Question?</Text>
            <Text style={styles.answer}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={[styles.question, { marginTop: verticalScale(28)}]}>1.3 Question?</Text>
            <Text style={styles.answer}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
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
