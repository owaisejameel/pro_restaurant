import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  Dimensions,
} from 'react-native';
import R from '../../R';
import {ExploreList} from '../../theme/constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './ProfileFAQStyle';
import * as IMG_CONST from '../../theme/ImageConstants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import scale, {verticalScale} from '../../utils/Scale';
import {connect} from 'react-redux';
import * as profileActions from '../../redux/actions/profileActions';
import * as commonActions from '../../redux/actions/commonActions';
import DeviceInfo from 'react-native-device-info';
import {WebView} from 'react-native-webview';
import RenderHtml from 'react-native-render-html';

class ProfileFAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faqList: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getFAQData();
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.setNavigationHeaderConfiguration();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: {backgroundColor: COLOR_CONST.white},
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitleStyle}>FAQs</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}>
          <Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} />
        </TouchableOpacity>
      ),
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  getFAQData = () => {
    let data = {
      uuid: DeviceInfo.getUniqueId(),
    };
    this.props.getFAQList(
      data,
      (res) => this.getFAQListSuccessCallBack(res),
      (error) => this.getFAQListFailureCallBack(error),
    );
  };

  getFAQListSuccessCallBack = (res) => {
    console.log('@@@ Get FAQ List Success CallBack ===================', res);
    let localCategoryList = [];
    this.setState({faqList: res.data.faqs}, () => {
      this.state.faqList.map((item) => {
        let localItem = item;
        localItem.isExpanded = false;
        localCategoryList.push(localItem);
      });
    });
    this.setState({faqList: localCategoryList});
  };

  getFAQListFailureCallBack = (error) => {
    console.log('@@@ Get FAQ List Failure CallBack ===================');
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  onPressExpandableView = (item, index) => {
    let localFAQList = this.state.faqList;
    let selectedIndex = localFAQList.findIndex(
      (catItem) => catItem.id === item.id,
    );
    localFAQList[selectedIndex].isExpanded = !item.isExpanded;
    this.setState({faqList: localFAQList});
  };

  renderCategoryListCell = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPressCategory(item, false)}
        style={styles.subCategoryCellContainer}>
        <Text style={styles.subCatText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  renderQuestionView = () => {
    return (
      <View style={styles.questionView}>
        {this.state.faqList.map((item, index) => {
          return (
            <>
              <Text style={styles.question}>
                {index + 1 + '. ' + item.title}
              </Text>
              {/* <Text style={styles.question}>{index+1 + '. ' + item.content}</Text> */}
            </>
          );
        })}
      </View>
    );
  };
  renderListItem = ({item, index}) => {
    console.log('jigar', index, JSON.stringify(item.content));

    // <View style={styles.questionView}>
    return (
      <View style={{flex: 1}}>
        <Text style={styles.question}>{index + 1 + '. ' + item.title}</Text>

        <View style={{marginHorizontal: scale(20), marginTop: 5}}>
          <RenderHtml
            // contentWidth={100}
            source={{
              html: item.content,
            }}
            // enableExperimentalMarginCollapsing={true}
            // enableCSSInlineProcessing={true}
            tagsStyles={tagsStyles}
            customListStyleSpecs={list}
          />
          {/* <WebView
            source={{
              html: item.content,
            }}
            startInLoadingState={true}
            scalesPageToFit={true}
            javaScriptEnabled={false}
            domStorageEnabled={true}
            // startInLoadingState={true}
            style={{
              width: Dimensions.get('window').width - scale(40),
              height: 100,
              // width: Dimensions.get('window').width - scale(40),
              // minHeight: 100,
            }}
          /> */}
        </View>
        {/* <View style={{alignSelf: 'stretch', flex: 1}}>
          <WebView source={{html: item.content}} style={{flex: 1}} />
        </View> */}
        {/* <Text style={styles.question}>{index+1 + '. ' + item.content}</Text> */}
      </View>
    );
    // </View>
  };
  render() {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          isFocused={true}
        />
        <View style={styles.listContainer}>
          {/* <WebView source={{uri: 'https://www.google.com/'}} style={{flex: 1}} /> */}
          <FlatList
            data={this.state.faqList}
            renderItem={this.renderListItem}
            style={{flex: 1}}
            ListFooterComponent={() => (
              <View style={{height: 50, width: '100%'}} />
            )}
          />

          {/* {this.state.faqList.length != undefined && this.state.faqList.length != 0 ? (
            //
            this.renderQuestionView()
          ) : (
            <Text style={styles.noData}>No Data Available</Text>
          )} */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartHasProductFlag: state.cart.cartHasProduct,
  };
};

const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  p: {
    color: 'black',
  },
  table: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  th: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  tr: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  td: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  
};

const list = {
  ul: {
    justifyContent: 'flex-start',
    alignItem: 'flex-start',
    // display: flex;
  },
  li: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItem: 'flex-start',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    flexDirection: 'column',
  },
  span:{
    textAlign: 'left'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showErrorModal: (message) =>
      dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getFAQList: (data, successCallBack, failureCallBack) =>
      dispatch(
        profileActions.getFAQList(data, successCallBack, failureCallBack),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFAQ);
