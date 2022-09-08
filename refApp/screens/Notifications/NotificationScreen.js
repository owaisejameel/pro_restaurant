/**
 * Notification Screen
 */
import React, {Component} from 'react';
import {View, Image, Text, FlatList, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as STR_CONST from '../../../app/theme/StringConstants';
import {FONTS} from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../../app/theme/ImageConstants';
import LinearGradient from 'react-native-linear-gradient';
import styles from './NotificationScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import scale, {verticalScale} from '../../utils/Scale';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as commonActions from '../../redux/actions/commonActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import * as Sentry from '@sentry/react-native';

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList: [],
      noProductFound: false,
      isFetchingData: true,
      showReadAll: false,
      pageCount: 1,
      limit: 10,
      loading: true,
      pageLoader: false,
      pullToRefresh: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      notFinalLoad: false,
    };
  }

  componentDidMount() {
    this.setNavigationHeaderConfiguration();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      try {
        this.getNotificationList();
      } catch (err) {
        Sentry.captureException(err);
      }
  });
  }

  componentWillUnmount() {
  }

  getNotificationList = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        pageCount: this.state.pageCount,
      }
      this.props.getNotificationList(data, (res) => this.getNotificationListSuccessCallBack(res), (error) => this.getNotificationListFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getNotificationListSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Get Notification List Data Success CallBack ===================', res);
      this.setState({ 
        notificationList: this.state.notificationList.concat(res.data),
        pageLoader: false,
        lastLoadCount: this.state.notificationList.concat(res.data).length,
        onEndReachedCalledDuringMomentum: this.state.notificationList.concat(res.data).length >= this.state.limit ? true : false,
        notFinalLoad: this.state.notificationList.concat(res.data).length >= this.state.limit ? true : false
        // notificationList: res.data ? res.data : []
      }, () => {
        if(this.state.notificationList.length === 0) {
          this.setState({ noProductFound: true , isFetchingData: false, showReadAll: false, }, () => {
            this.setNavigationHeaderConfiguration();
          });
        } else {
          this.setState({ isFetchingData: false, showReadAll: true, }, () => {
            this.setNavigationHeaderConfiguration();
          });
        }
      })
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  getNotificationListFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Notification List Data Failure CallBack ===================', error);
      if (error) {
        setTimeout(() => {
          this.setState({ noProductFound: true });
          if(error !== 'You are not authorized.')
            this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  deleteNotification = async(item) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        notificationId: item.id,
      }
      this.props.deleteNotification(data, (res) => this.deleteNotificationSuccessCallBack(res), (error) => this.deleteNotificationFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  deleteNotificationSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Delete Notification List Data Success CallBack ===================', res);
      this.setState({ notificationList: [], pageCount: 1 }, () => {
        this.getNotificationList();
      })
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  deleteNotificationFailureCallBack = (error) => {
    try {
      console.log('@@@ Delete Notification List Data Failure CallBack ===================', error);
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  readNotification = async(item) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        notification_id: item.id,
      }
      this.props.readNotification(data, (res) => this.readNotificationSuccessCallBack(res), (error) => this.readNotificationFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  readNotificationSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Read Notification List Data Success CallBack ===================', res);
      this.setState({ notificationList: [], pageCount: 1 }, () => {
        this.getNotificationList();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  readNotificationFailureCallBack = (error) => {
    try {
      console.log('@@@ Read Notification List Data Failure CallBack ===================', error);
      if (error) {
        setTimeout(() => {
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  readAllNotification = async() => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        userID: userID,
        uuid: DeviceInfo.getUniqueId(),
        read_all: true,
      }
      this.props.readAllNotification(data, (res) => this.readAllNotificationSuccessCallBack(res), (error) => this.readAllNotificationFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  readAllNotificationSuccessCallBack = async(res) => {
    try {
      console.log('@@@ Read Notification List Data Success CallBack ===================', res);
      this.setState({ notificationList: [], pageCount: 1 }, () => {
        this.getNotificationList();
      })  
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  
  readAllNotificationFailureCallBack = (error) => {
    try {
      console.log('@@@ Read Notification List Data Failure CallBack ===================', error);
      if (error) {
        setTimeout(() => {
          if(error !== 'You are not authorized.')
          this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitleStyle}>Notifications</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}>
          <Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.readAllNotification()} style={styles.clearContainer}>
          {this.state.showReadAll && <Text style={styles.clearText}>Read all</Text>}
        </TouchableOpacity>
      ),
    });
  };

  onLanguageSelect = (langCode) => {
    this.props.navigation.navigate('OnBoardingScreen');
  };

  onEndReached = () => {
    console.log('@@@ On End Reached ==============', this.state.onEndReachedCalledDuringMomentum, this.state.lastLoadCount, this.state.limit, this.state.notFinalLoad)
        if (!this.state.onEndReachedCalledDuringMomentum) {
            this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
                setTimeout(() => {
                if (this.state.lastLoadCount >= this.state.limit && this.state.notFinalLoad) {
                    this.setState({ pageLoader: true, pageCount: this.state.pageCount + 1 }, async() => {
                      let userID = await AsyncStorage.getItem('USER_ID');
                      let data = {
                        userID: userID,
                        uuid: DeviceInfo.getUniqueId(),
                        pageCount: this.state.pageCount,
                      }
                      this.props.getNotificationList(data, (res) => this.getNotificationListSuccessCallBack(res), (error) => this.getNotificationListFailureCallBack(error));
                  });
                }
                }, 1500);
            });
        }
  };

// Key Extractor
  _keyExtractor = (item, index) => item.id;

// Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });

// Footer loader for Pagination  
  _renderSearchResultsFooter = () => {
    return this.state.pageLoader ? (
    <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={'#000000'} />
    </View>
    ) : null;
  };

  renderNoNotificationsView = () => {
    return (
      <View style={styles.noNotificationsContainer}>
        <View style={styles.emptyBoxContainer}>
          <Image
            source={IMG_CONST.EMPTY_NOTIFICATIONS_BOX}
            style={styles.emptyNotifBox}
            resizeMode="cover"
          />
          <Text style={styles.noNotificationsText}>
            {STR_CONST.NO_NOTIFICATIONS_YET}
          </Text>
          <Text style={styles.browseText}>{STR_CONST.BROWSE_FOR_PRODUCTS}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <LinearGradient
            colors={[
              COLOR_CONST.primaryThemeGradient,
              COLOR_CONST.secondaryThemeGradient,
            ]}
            style={styles.continueShoppingButton}>
            <Text style={styles.continueText}>
              {STR_CONST.CONTINUE_SHOPPING}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  onPressDeleteItem = () => {};

  getSwipeControl = (item, index) => {
    return (
      <View style={styles.rightSwipeContainer}>
        <TouchableOpacity
          onPress={() => this.deleteNotification(item)}
          style={[styles.rightSwipeContainer]}>
          <Image style={styles.deleteIcon} source={IMG_CONST.DELETE_ICON} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderNotificationCell = (item, index) => {
    const swipeoutBtns = [
      {
        component: this.getSwipeControl(item, index),
      },
    ];
    const created_at = moment(item.created_at).format("lll"); 
    return (
      <Swipeout
        close={!(this.state.index === index)}
        style={{backgroundColor: 'transparent'}}
        autoClose
        right={swipeoutBtns}
        onOpen={(sectionID, rowID) => {
          this.setState({
            index,
          });
        }}
        buttonWidth={scale(188)}
        onClose={() => {}}>
        <TouchableOpacity onLongPress={() => this.readNotification(item)}>
          <LinearGradient
            colors={
              !item.is_read
                ? [
                    COLOR_CONST.lightNotificationColor,
                    COLOR_CONST.newNotificationColor,
                  ]
                : [COLOR_CONST.white, COLOR_CONST.white]
            }
            style={[styles.cellContainer]}>
            <View style={styles.bellContainer}>
              <Image
                source={IMG_CONST.NOTIFICATION_BELL_ICON}
                style={styles.notifIcon}
                resizeMode="cover"
              />
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.notificationHeader}>
                  {item.title}
                </Text>
                <Text style={styles.days}>{created_at}</Text>
              </View>
              <Text style={styles.notificationDetail}>
                {item.message}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  renderNotificationListView = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.notificationList}
          extraData={this.state}
          renderItem={({item, index}) =>
            this.renderNotificationCell(item, index)
          }
          onEndReachedThreshold={0.01}
          onEndReached={() => this.onEndReached()}
          ListFooterComponent={() => this._renderSearchResultsFooter()}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor="#FFF"
          isFocused={true}
        />
        { !this.state.noProductFound && !this.state.isFetchingData && this.renderNotificationListView() }
        { this.state.noProductFound && this.renderNoNotificationsView() }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartHasProductFlag: state.cart.cartHasProduct,
    cartData: state.cart.cartData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getNotificationList: (data, successCallBack, failureCallBack) => dispatch(UserActions.getNotificationList(data, successCallBack, failureCallBack)),
    readNotification: (data, successCallBack, failureCallBack) => dispatch(UserActions.readNotification(data, successCallBack, failureCallBack)),
    readAllNotification: (data, successCallBack, failureCallBack) => dispatch(UserActions.readAllNotification(data, successCallBack, failureCallBack)),
    deleteNotification: (data, successCallBack, failureCallBack) => dispatch(UserActions.deleteNotification(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);