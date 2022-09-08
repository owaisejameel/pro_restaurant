import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Text, TextInput, FlatList, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import styles from '../Search/SearchStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import LoadingImage from 'react-native-image-progress';
import * as STR_CONST from '../../../theme/StringConstants';
import COLOR_CONST, { FONTS } from '../../../theme/ColorConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import scale, { verticalScale } from '../../../utils/Scale';
import { SearchItem } from '../../../theme/DataConstants';
import { CategoryList } from '../../../theme/constants';
import { connect } from 'react-redux';
import * as categoryActions from '../../../redux/actions/categoryActions';
import * as searchActions from '../../../redux/actions/searchActions';
import * as commonActions from '../../../redux/actions/commonActions';
import DeviceInfo from 'react-native-device-info';
import CachedImage from '../../../components/CachedImage';
import * as Sentry from '@sentry/react-native';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKeyBoard: false,
            searchData: '',
            categoryList: [],
            searchList: [],
            recentList: [],
            productSearchList: [],
            categorySearchList: [],
            subCategorySearchList: [],
            searchComplete: false,
            resultsCount: 0,
            inputKey: Math.random()
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            try {
                console.log('@@@ ======================', this.props.route)
                this.setState({ showKeyBoard: true, inputKey: Math.random() })
                // do something
                this.getSearchData();
            } catch (err) {
                Sentry.captureException(err);
            }
        });
        this.setNavigationHeaderConfiguration();
    }

    componentWillUnmount() {
        try {
            this._unsubscribe();
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getSearchData = () => {
        try {
            let data = {
                uuid: DeviceInfo.getUniqueId()
            }
            // this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                searchData: '', searchList: [], searchComplete: false, //categoryList: [], recentList: [], 
            }, () => {
                this.props.getRecentSearchList(data, (res) => this.getRecentSearchListSuccessCallBack(res), (error) => this.getRecentSearchListFailureCallBack(error));
                this.props.getCategoryList(data, (res) => this.getCategoryListSuccessCallBack(res), (error) => this.getCategoryListFailureCallBack(error));
            })
            // });
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getCategoryListSuccessCallBack = (res) => {
        try {
            console.log('@@@ Get Category List Success CallBack ===================');
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getCategoryListFailureCallBack = (error) => {
        try {
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

    onPressCategory = (item) => {
        try {
            this.props.navigation.navigate('SearchListing', { categoryData: item, isFromExplore: true, screenName: item.name, isFromCategory: true })
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    componentWillUnmount() {
        try {
            this._unsubscribe();
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    setNavigationHeaderConfiguration = () => {
        this.props.navigation.setOptions({
            headerStyle: { backgroundColor: COLOR_CONST.white, shadowColor: 'transparent', elevation: 0 },
        })
    }

    onSearchProduct = (searchData) => {
        try {
            this.setState({ searchComplete: false });
            if (searchData.trim() !== '') {
                setTimeout(() => {
                    // if(!this.props.isFetching)
                    //     this.props.startSpinner();
                    setTimeout(() => {
                        this.props.stopSpinner();
                    }, 2000);
                    let data = {
                        uuid: DeviceInfo.getUniqueId(),
                        searchData: searchData
                    }
                    this.props.searchProduct(data, (res) => this.searchProductSuccessCallBack(res), (error) => this.searchProductFailureCallBack(error));
                }, 0);
            } else {
                this.setState({ searchList: [], productSearchList: [], categorySearchList: [], subCategorySearchList: [] });
            }
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    searchProductSuccessCallBack = (res) => {
        try {
            console.log('@@@ Search Product Data List Success CallBack ===================', res);
            if (res.data.length === 0)
                this.setState({ searchList: [], productSearchList: [], categorySearchList: [], subCategorySearchList: [], searchComplete: true });
            else {
                let searchResponse = res.data.products;
                let localProductSearchList = searchResponse.filter((item) => item.class_name === 'Product');
                let localCategorySearchList = searchResponse.filter((item) => item.class_name === 'Category');
                let localSubCategorySearchList = searchResponse.filter((item) => item.class_name === 'SubCategory');
                this.setState({
                    searchList: res.data.products,
                    resultsCount: res.data.results_count,
                    searchComplete: true,
                    productSearchList: localProductSearchList,
                    categorySearchList: localCategorySearchList,
                    subCategorySearchList: localSubCategorySearchList,
                });
            }
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    searchProductFailureCallBack = (error) => {
        try {
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

    getRecentSearchListSuccessCallBack = (res) => {
        try {
            console.log('@@@ Recent Search Product Data List Success CallBack ===================', res);
            this.setState({ recentList: res.data.recent_search, categoryList: res.data.categories });
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    getRecentSearchListFailureCallBack = (error) => {
        try {
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

    saveSearchDetailsSuccessCallBack = (res) => {
        try {
            console.log('@@@ Save Search Details Success CallBack ===================', res);
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    saveSearchDetailsFailureCallBack = (error) => {
        try {
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

    onPressSearchData = (item) => {
        try {
            console.log("@@@ save search item ", item);
            let searchData = {
                class_name: item.class_name,
                class_id: item.class_id,
                query: item.name,
                results_count: this.state.resultsCount,
                uuid: DeviceInfo.getUniqueId(),
            }
            this.props.saveSearchDetails(searchData, (res) => this.saveSearchDetailsSuccessCallBack(res), (error) => this.saveSearchDetailsFailureCallBack(error));
            if (item.class_name === 'Product') {
                this.props.navigation.navigate('ProductDescription', { productData: { id: item.class_id } });
            } else {
                let data = {
                    id: item.class_name === 'SubCategory' ? item.category_id : item.class_id,
                    subcategoryId: item.class_name === 'SubCategory' ? item.class_id : ''
                }
                this.props.navigation.navigate('SearchListing', { categoryData: data, isFromExplore: true, screenName: item.name, isFromCategory: true, isFromSearch: true, })
            }
        } catch (err) {
            Sentry.captureException(err);
        }
    }

    renderSearchBar = () => {
        return (
            <View style={styles.SearchBarContainer}>
                <TextInput
                    style={styles.TextStyles}
                    autoFocus={this.state.showKeyBoard}
                    key={this.state.inputKey}
                    value={this.state.searchData}
                    onChangeText={(value) => this.setState({ searchData: value }, () => this.onSearchProduct(value))}
                    placeholder="Search here.."
                    placeholderTextColor={COLOR_CONST.coolGreyTwo}
                    fontFamily={FONTS.GTWalsheimProMedium}
                    underlineColorAndroid="transparent"
                    fontSize={scale(22)}
                    marginLeft={scale(23)}
                    autocomplete={false}
                    autoCapitalize={false}
                />
            </View>
        )
    }

    renderListItem = (item) => {
        if (item.name !== '') {
            return (
                <TouchableOpacity onPress={() => this.onPressSearchData(item)}>
                    <Text style={styles.itemStyle}>{item.name}</Text>
                    <View style={styles.ViewStrightLine} />
                </TouchableOpacity>
            )
        }
    }

    renderRecentSearch = () => {
        return (
            <View>
                <Text style={styles.recentText}>Recent Searches</Text>
                <View style={styles.recentContainer}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.recentList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>

            </View>
        )
    }

    renderSearchData = () => {
        return (
            <View style={this.state.searchList.length > 0 ? styles.searchDataStyle : styles.emptyStyle}>
                {this.state.searchList.length > 0 && <Text style={styles.recentText}>Products</Text>}
                <View style={styles.recentContainer}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.productSearchList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>
                {this.state.searchList.length > 0 && <Text style={styles.recentText}>Categories</Text>}
                <View style={styles.recentContainer}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.categorySearchList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>
                {this.state.searchList.length > 0 && <Text style={styles.recentText}>SubCategories</Text>}
                <View style={styles.recentContainer}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.subCategorySearchList}
                        renderItem={({ item, index }) => this.renderListItem(item, index)}
                    />
                </View>

            </View>
        )
    }
    renderIndicator = (progress, indeterminate) => {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.categoryImage} />)
                    : (<Text>{progress * 100}</Text>)}
            </View>
        )
    }
    renderListItemCat = (item) => {
        return (
            <TouchableOpacity onPress={() => this.onPressCategory(item)} style={styles.categoryContainer}>
                <View style={styles.categoryView}>
                    <CachedImage
                        resizeMode={"contain"}
                        source={item.image}
                        renderError={(error) => console.log(error)}
                        renderIndicator={this.renderIndicator}
                        style={styles.categoryImage}
                    />
                    {/* <LoadingImage
                        resizeMode={"contain"}
                        source={{uri: item.image}}
                        renderError={(error)=>console.log(error)}
                        renderIndicator={this.renderIndicator}
                        style={styles.categoryImage} 
                        /> */}
                    {/* <Image source={{ uri: item.image }} style={styles.categoryImage} /> */}
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    renderCategory = () => {
        return (
            <View>
                {this.state.categoryList.length > 0 && <Text style={styles.recentText}>Categories</Text>}
                <View style={styles.listContainer}>
                    <FlatList
                        numColumns={3}
                        data={this.state.categoryList}
                        renderItem={({ item, index }) => this.renderListItemCat(item, index)}
                    />
                </View>

            </View>
        )
    }

    renderEmptyDataView = () => {
        return (
            <View style={styles.emptyContainer}>
                <Image source={IMG_CONST.SEARCH_NO_RESULTS} style={styles.noResultImage} />
                <Text style={styles.noResultText}>No Results Found !</Text>
                <Text style={styles.tryText}>Try modifying your search to get relevant results.</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
                {this.renderSearchBar()}
                {this.state.searchComplete && this.state.productSearchList.length === 0 && this.state.categorySearchList.length === 0 && this.state.subCategorySearchList.length === 0 ? this.renderEmptyDataView() :
                    <ScrollView>
                        {this.state.recentList.length > 0 && this.state.searchData === '' && this.renderRecentSearch()}
                        {this.state.searchData !== '' && this.renderSearchData()}
                        {this.state.searchData === '' && this.renderCategory()}
                    </ScrollView>}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.common.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        stopSpinner: () => dispatch(commonActions.stopSpinner()),
        startSpinner: () => dispatch(commonActions.startSpinner()),
        showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
        hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
        getCategoryList: (data, successCallBack, failureCallBack) => dispatch(categoryActions.getCategoryList(data, successCallBack, failureCallBack)),
        searchProduct: (data, successCallBack, failureCallBack) => dispatch(searchActions.searchProduct(data, successCallBack, failureCallBack)),
        saveSearchDetails: (data, successCallBack, failureCallBack) => dispatch(searchActions.saveSearchDetails(data, successCallBack, failureCallBack)),
        getRecentSearchList: (data, successCallBack, failureCallBack) => dispatch(searchActions.getRecentSearchList(data, successCallBack, failureCallBack)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);