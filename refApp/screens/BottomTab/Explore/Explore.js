import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, BackHandler } from 'react-native';
import R from '../../R'
import { ExploreList } from '../../../theme/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './ExploreStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import LoadingImage from 'react-native-image-progress';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import scale, { verticalScale } from '../../../utils/Scale';
import { connect } from 'react-redux';
import * as categoryActions from '../../../redux/actions/categoryActions';
import * as commonActions from '../../../redux/actions/commonActions';
import * as cartActions from '../../../redux/actions/cartActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';
import CachedImage from '../../../components/CachedImage';
import * as Sentry from '@sentry/react-native';

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        };
    }

    componentDidMount() {
        this.setNavigationHeaderConfiguration();
        this.getExploreData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            try {
                this.refreshCart();
            } catch (err) {
                Sentry.captureException(err);
            }
        });
    }

    handleBackButtonClick = () => {
        try {
            this.props.navigation.goBack();
            return true;
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    setNavigationHeaderConfiguration = () => {
        const { cartHasProductFlag, showNotificationDot, cartCount } = this.props;
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white, shadowColor: 'transparent', elevation: 0, },
            headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Category</Text></View>),
            // headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('NotificationScreen')
                        }>
                        <Image
                            source={IMG_CONST.NOTIFICATIONS_ICON}
                            style={styles.notifIcon}
                        />
                        {showNotificationDot && (
                            <View
                                style={{
                                    height: scale(6),
                                    width: scale(6),
                                    borderRadius: scale(3),
                                    backgroundColor: COLOR_CONST.primaryThemeGradient,
                                    borderColor: 'white',
                                    borderWidth: 0.9,
                                    position: 'absolute',
                                    top: scale(0),
                                    end: scale(2),
                                }}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Wishlist')}>
                        <Image source={IMG_CONST.HEARTWISHLIST} style={styles.cartIcon} />
                        {/* onPress={() => this.props.navigation.navigate('Cart')}>
            <Image source={IMG_CONST.CART_BLACK_ICON} style={styles.cartIcon} /> */}
                        {/* {cartHasProductFlag && (
              <View
                style={{
                  height: scale(20),
                  width: scale(20),
                  borderRadius: scale(10),
                  backgroundColor: COLOR_CONST.primaryThemeGradient,
                  borderColor: 'white',
                  borderWidth:0.9,
                  position: 'absolute',
                  top: scale(-10),
                  end: scale(-10),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                ><Text style={{ fontSize: scale(10), color: COLOR_CONST.white, fontFamily: FONTS.GTWalsheimProRegular}}>{cartCount}</Text></View>
            )} */}
                    </TouchableOpacity>
                </View>
            ),
        });
    };
    componentWillUnmount() {
        try {
            this._unsubscribe();
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getExploreData = () => {
        try {
            let data = {
                uuid: DeviceInfo.getUniqueId(),
            }
            this.props.startSpinner();
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.getCategoryList(data, (res) => this.getCategoryListSuccessCallBack(res), (error) => this.getCategoryListFailureCallBack(error));
            });
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getCategoryListSuccessCallBack = (res) => {
        try {
            console.log('@@@ Get Category List Success CallBack ===================');
            let localCategoryList = [];
            this.setState({ categoryList: res.data }, () => {
                this.state.categoryList.map((item) => {
                    let localItem = item;
                    localItem['isExpanded'] = false;
                    localCategoryList.push(localItem);
                })
            });
            this.setState({ categoryList: localCategoryList });
            this.props.stopSpinner();
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getCategoryListFailureCallBack = (error) => {
        try {
            console.log('@@@ Get Category List Failure CallBack ===================');
            this.props.stopSpinner();
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

    onPressCategory = (item, isFromCategory) => {
        try {
            this.props.navigation.navigate('ProductListing', { categoryData: item, isFromExplore: true, screenName: item.name, isFromCategory: isFromCategory })
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    onPressExpandableView = (item, index) => {
        try {
            let localCategoryList = this.state.categoryList;
            let selectedIndex = localCategoryList.findIndex((catItem) => catItem.id === item.id);
            localCategoryList[selectedIndex].isExpanded = !item.isExpanded;
            this.setState({ categoryList: localCategoryList });
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    renderCategoryListCell = (item, index) => {
        item['subcategoryId'] = item.id;
        return (
            <TouchableOpacity onPress={() => this.onPressCategory(item, false)} style={styles.subCategoryCellContainer}>
                <Text style={styles.subCatText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    renderIndicator = (progress, indeterminate) => {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.bottleImage} />)
                    : (<Text>{progress * 100}</Text>)}
            </View>
        )
    }
    renderListItem = (item, index) => {
        if (!item.isExpanded) {
            return (
                <>
                    <TouchableOpacity onPress={() => this.onPressCategory(item, true)} style={styles.mainContainer}>
                        <View style={styles.left}>
                            <View style={styles.imageContainer2}>
                                <CachedImage
                                    resizeMode={"contain"}
                                    source={item.image}
                                    renderError={(error) => console.log(error)}
                                    renderIndicator={this.renderIndicator}
                                    style={styles.bottleImage}
                                />
                                {/* <LoadingImage
                                    resizeMode={"contain"}
                                    source={{uri: item.image}}
                                    renderError={(error)=>console.log(error)}
                                    renderIndicator={this.renderIndicator}
                                    style={styles.bottleImage} 
                                    /> */}
                                {/* <Image source={{uri: item.image}} style={styles.bottleImage} /> */}
                            </View>
                            <Text style={styles.categoryNameText}>{item.name}</Text>
                        </View>
                        {item.sub_categories.length > 0 && <TouchableOpacity onPress={() => this.onPressExpandableView(item, index)} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                            <Image source={IMG_CONST.RIGHT_ARROW} style={styles.rightArrow} />
                        </TouchableOpacity>}
                    </TouchableOpacity>
                    <View style={styles.line} />
                </>
            );
        } else {
            return (
                <>
                    <View style={styles.downContent}>
                        <View onPress={() => this.onPressCategory(item, true)} style={styles.downContainer}>
                            <View style={styles.left1}>
                                <View style={styles.imageContainer3}>
                                    <CachedImage
                                        resizeMode={"contain"}
                                        source={item.image}
                                        renderError={(error) => console.log(error)}
                                        renderIndicator={this.renderIndicator}
                                        style={styles.bottleImage}
                                    />
                                    {/* <Image source={{uri: item.image}} style={styles.bottleImage} /> */}
                                </View>
                                <Text style={styles.categoryNameText}>{item.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onPressExpandableView(item, index)} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
                                <Image source={IMG_CONST.DOWN_ARROW} style={styles.downArrow} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subCategoryLine} />
                        <View style={styles.subCategoryList}>
                            <FlatList
                                data={item.sub_categories}
                                renderItem={({ item, index }) => this.renderCategoryListCell(item, index)}
                            />
                        </View>
                        <View style={styles.line} />
                    </View>
                </>
            )
        }
    };

    refreshCart = async () => {
        console.log('refresh cart');
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
            uuid: DeviceInfo.getUniqueId(),
            userID: userID,
        }
        this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });
    }

    render() {
        return (
            <View style={styles.container}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#ffffff" isFocused={true} />
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.state.categoryList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return {
        cartHasProductFlag: state.cart.cartHasProduct,
        cartCount: state.cart.cartCount,
        showNotificationDot: state.cart.showNotificationDot,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
        startSpinner: () => dispatch(commonActions.startSpinner()),
        stopSpinner: () => dispatch(commonActions.stopSpinner()),
        getCategoryList: (data, successCallBack, failureCallBack) => dispatch(categoryActions.getCategoryList(data, successCallBack, failureCallBack)),
        cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);