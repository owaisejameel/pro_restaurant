import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import R from '../../R';
import styles from './HelpCenterStyle';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default class HelpCenter extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
    
    componentDidMount() {
      this.setNavigationHeaderConfiguration();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
      this.props.navigation.goBack();
      return true;
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white },
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Help Center</Text></View>),
            headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON}style={styles.backIcon}/></TouchableOpacity>),
        })
    }

    renderListItem = (item, index) => {
      return (
        <TouchableOpacity style={styles.cellContainer} onPress={() => this.props.navigation.navigate('PrivacyPolicy', { helpCenterData: item })}>
            <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      );
    };

   renderItemSeparator = () => {
      return (
        <View style={styles.separatorView} />
      );
    };

    render() {
      return (
        <View style={styles.container}>
          <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
          <View style={styles.listContainer}>
            <FlatList
              style={{backgroundColor: R.colors.white}}
              data={this.props.route.params.helpCenterData}
              renderItem={({ item, index}) => this.renderListItem(item, index)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}
            />
          </View>
        </View>
      );
    }
  };
