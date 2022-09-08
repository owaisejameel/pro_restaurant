import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  StatusBar,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput
} from 'react-native';
import R from '../../R';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import GreenButton from '../../components/GreenButton';
import RangeSlider from 'rn-range-slider';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import styles from './FilterStyle';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import { BrandFilter } from '../../theme/DataConstants';
import { CategoryFilter } from '../../theme/DataConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import { connect } from 'react-redux';
import * as homeActions from '../../redux/actions/homeActions';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as filterActions from '../../redux/actions/filterActions';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: false,
      price: true,
      brand: false,
      tag: false,
      active: [CategoryFilter],
      active: [BrandFilter],
      RefreshFlatList: false,
      categoryFilterList: [],
      brandsFilterList: [],
      tagFilterList: [],
      searchedCategoryFilterList: [],
      discount: false,
      rangeLow: 0,
      rangeHigh: this.props.maxPrice,
      searchText: ''
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      try {
        const { filterBrands, filterTags, filterCategories, filterSubCategories, lastCategoryValue, filterDiscountedItems, filterLowRange, filterHighRange } = this.props.filterData;
        console.log('@@@ sub =========', filterTags);
        if (filterCategories.length === 0) {
          //*> When Filter Data is empty
          if (this.props.route.params && this.props.route.params.isFromExplore) {
            if (filterSubCategories.length === 0 || lastCategoryValue !== this.props.route.params.categoryID)
              this.getSubCategoryList();
            else {
              this.setState({
                //*> When Filter Data is not empty
                categoryFilterList: filterSubCategories,
                brandsFilterList: filterBrands,
                tagFilterList: filterTags,
                searchedCategoryFilterList: filterSubCategories,
                discount: filterDiscountedItems,
                rangeLow: filterLowRange,
                rangeHigh: filterHighRange,
              });
            }
          } else {
            this.setCategoryFilterList();
            this.setBrandsFilterList();
            this.setTagFilterList();
          }
  
          if (filterBrands.length === 0)
            this.setBrandsFilterList();
          if (filterTags.length === 0)
            this.setTagFilterList();
        } else {
          this._rangeSlider.setLowValue(filterLowRange);
          this._rangeSlider.setHighValue(filterHighRange);
          if (this.props.route.params && this.props.route.params.isFromExplore) {
            if (filterSubCategories.length === 0 || lastCategoryValue !== this.props.route.params.categoryID)
              this.getSubCategoryList();
            this.setState({
              //*> When Filter Data is not empty
              categoryFilterList: filterSubCategories,
              brandsFilterList: filterBrands,
              tagFilterList: filterTags,
              searchedCategoryFilterList: filterSubCategories,
              discount: filterDiscountedItems,
              rangeLow: filterLowRange,
              rangeHigh: filterHighRange,
            });
          } else {
            this.setState({
              //*> When Filter Data is not empty
              categoryFilterList: filterCategories,
              brandsFilterList: filterBrands,
              tagFilterList: filterTags,
              searchedCategoryFilterList: filterCategories,
              discount: filterDiscountedItems,
              rangeLow: filterLowRange,
              rangeHigh: filterHighRange,
            });
          }
        }
      } catch (err) {
        Sentry.captureException(err);
      }
      this.setNavigationHeaderConfiguration();
    });
  }

  getSubCategoryList = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let categoryID = this.props.route.params.categoryID;
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        userID: userID,
        id: categoryID,
      }
      this.props.getSubCategoryList(data, (res) => this.getSubCategoryListSuccessCallBack(res), (error) => this.getSubCategoryListFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  getSubCategoryListSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Sub Category List Success CallBack ===================', res);
      this.setState({ categoryFilterList: res.data }, () => {
        this.setCategoryFilterList();
        this.setBrandsFilterList();
        this.setTagFilterList();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubCategoryListFailureCallBack = (error) => {
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

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Filter</Text></View>),
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
      headerRight: () => (<TouchableOpacity onPress={() => this.clearFilterData()}><Text style={styles.clearText}>Clear</Text></TouchableOpacity>),
    })
  }

  setCategoryFilterList = () => {
    try {
      let localCategories = this.props.categoryList;
      let localFilterCategories = [];
      localCategories.map((item) => {
        let data = {
          id: item.id,
          active: false,
          name: item.name
        }
        localFilterCategories.push(data);
      });
      this.setState({
        categoryFilterList: localFilterCategories,
        searchedCategoryFilterList: localFilterCategories,
        discount: false,
        rangeLow: 0,
        rangeHigh: this.props.maxPrice,
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setBrandsFilterList = () => {
    try {
      let localBrands = this.props.brandsList;
      let localFilterBrands = [];
      localBrands.map((item) => {
        let data = {
          id: item.id,
          active: false,
          name: item.name
        }
        localFilterBrands.push(data);
      });
      this.setState({
        brandsFilterList: localFilterBrands,
        discount: false,
        rangeLow: 0,
        rangeHigh: this.props.maxPrice,
      }, () => {
        this.updateFilterData();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setTagFilterList = () => {
    try {
      let localTags = this.props.tagList;
      let localFilterTags = [];
      localTags.map((item) => {
        let data = {
          id: item.id,
          active: false,
          name: item.name
        }
        localFilterTags.push(data);
      });
      this.setState({
        tagFilterList: localFilterTags,
        discount: false,
        rangeLow: 0,
        rangeHigh: this.props.maxPrice,
      }, () => {
        console.log('@@@ Tag ==========', this.state.tagFilterList);
        this.updateFilterData();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateFilterData = () => {
    try {
      const { filterBrands, filterTags, filterCategories, filterSubCategories, filterDiscountedItems, filterLowRange, filterHighRange } = this.props.filterData;
      let filterData = {
        filterBrands: this.state.brandsFilterList,
        filterTags: this.state.tagFilterList,
        filterDiscountedItems: this.state.discount,
        filterLowRange: this.state.rangeLow,
        filterHighRange: this.state.rangeHigh,
      }
      if (this.props.route.params && this.props.route.params.isFromExplore) {
        filterData['filterSubCategories'] = this.state.categoryFilterList;
        filterData['filterCategories'] = filterCategories;
        filterData['lastCategoryValue'] = this.props.route.params.categoryID;
      } else {
        filterData['filterCategories'] = this.state.categoryFilterList;
        filterData['filterSubCategories'] = filterSubCategories;
      }
      this.props.setFilterData(filterData);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  clearFilterData = () => {
    try {
      this.setBrandsFilterList();
      this.setTagFilterList();
      this.setCategoryFilterList();
      this.props.removeFilterData();
      this.setState({ rangeLow: 0, rangeHigh: this.props.maxPrice });
      if (this._rangeSlider) {
        this._rangeSlider.setLowValue(0);
        this._rangeSlider.setHighValue(this.props.maxPrice);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  changeColor = (item) => {
    switch (item) {
      case 'price':
        if (this.state.price) return '#fff'
        break;

      case 'brand':
        if (this.state.brand) return '#fff'
        break;

      case 'tag':
        if (this.state.tag) return '#fff'
        break;

      case 'category':
        if (this.state.category) return '#fff'
        break;
    }
  };

  onCheckDiscoutTrue = () => {
    this.setState({ discount: !this.state.discount });
  }

  //*> Method to Filter Categories List based searched text
  searchFilterFunction = (text) => {
    try {
      let detail = this.state.categoryFilterList;
      const newData = detail.filter(function (item) {
        const itemData = item.name.toLowerCase();
        const textData = text.toLowerCase()
        return itemData.toString().indexOf(textData) > -1
      });
      this.setState({ searchedCategoryFilterList: newData });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  //*> Method to handle input searched text
  handleInputChange = (value) => {
    try {
      this.setState({ searchText: value });
      this.searchFilterFunction(value);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressApplyFilter = () => {
    try {
      this.updateFilterData();
      let localBrands = this.state.brandsFilterList;
      let localTags = this.state.tagFilterList;
      let localCategories = this.state.categoryFilterList;
      let queryParams = [];
      localBrands.map((item) => {
        if (item.active) {
          queryParams.push(`brand_id[]=${item.id}`);
        }
      })
      localTags.map((item) => {
        if (item.active) {
          queryParams.push(`tag=${item.name}`);
        }
      })
      if (this.props.route.params && this.props.route.params.isFromExplore) {
        localCategories.map((item) => {
          if (item.active) {
            queryParams.push(`sub_category_id[]=${item.id}`);
          }
        })
      } else {
        localCategories.map((item) => {
          if (item.active) {
            queryParams.push(`category_id[]=${item.id}`);
          }
        })
      }
      queryParams.push(`from=${this.state.rangeLow}`);
      queryParams.push(`to=${this.state.rangeHigh}`);
      this.state.discount && queryParams.push(`discounted_items=${this.state.discount}`);
      let finalQueryParams = queryParams.join('&');
      if (this.props.route.params.isFromSearchListing)
        this.props.navigation.navigate('SearchListing', { isFromFilter: true });
      else
        this.props.navigation.navigate('ProductListing', { isFromFilter: true });
      this.props.route.params.onPressFilter(finalQueryParams);
    } catch (err) {
      Sentry.captureException(err);
    }
  }


  renderPrice() {
    if (this.state.price == true)
      return (
        <View style={styles.rangeConatiner}>
          <Text style={styles.SelectPriceTitle}> Select a price range</Text>
          <View style={styles.rangeRow}>
            <Text style={styles.rangeText}>₹ {this.state.rangeLow}</Text>
            <Text style={styles.rangeText}>₹ {this.state.rangeHigh}</Text>
          </View>
          <RangeSlider
            ref={component => this._rangeSlider = component}
            style={styles.rangeContainer}
            gravity={'center'}
            labelStyle={'none'}
            thumbRadius={scale(8)}
            thumbBorderWidth={scale(3)}
            thumbColor={COLOR_CONST.google}
            thumbBorderColor={COLOR_CONST.white}
            min={0}
            max={this.props.maxPrice}
            initialLowValue={this.state.rangeLow}
            initialHighValue={this.state.rangeHigh}
            lineWidth={6}
            step={20}
            rangeEnabled={true}
            selectionColor={COLOR_CONST.google}
            blankColor={COLOR_CONST.whiteThree}
            onValueChanged={(low, high, fromUser) => {
              this.setState({ rangeLow: low, rangeHigh: high })
            }} />

          <View style={styles.checkBoxContainer}>
            <TouchableOpacity onPress={() => this.onCheckDiscoutTrue()}>
              {this.state.discount ? (
                <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
              ) : (
                <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
              )}
            </TouchableOpacity>
            <Text style={styles.DiscountedStyle}> Discounted Items </Text>
          </View>
        </View>
      );
  }

  onCheckPressCAregory(data) {
    try {
      let localFilterCategories = this.state.categoryFilterList;
      let selectedIndex = localFilterCategories.findIndex((item) => item.id === data.id);
      localFilterCategories[selectedIndex].active = !data.active;
      this.setState({ categoryFilterList: localFilterCategories });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderListItemCategory = (item) => {
    return (
      <View style={styles.CategoryFilterConatiner}>
        <TouchableOpacity onPress={() => this.onCheckPressCAregory(item)}>
          {item.active ? (
            <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
          ) : (
            <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
          )}
        </TouchableOpacity>
        <Text
          style={[styles.labelTitle, { color: item.active ? COLOR_CONST.google : COLOR_CONST.coolGreyTwo }]}>
          {item.name}
        </Text>
      </View>
    )
  }

  renderCategory() {
    if (this.state.category == true)
      return (
        <View style={styles.CategoryConatiner}>
          <View style={styles.searchCatgeory}>
            <Image source={IMG_CONST.SEARCH} style={styles.searchImage} />
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Search"
              underlineColorAndroid="transparent"
              value={this.state.searchText}
              onChangeText={(value) => this.handleInputChange(value)}
              autoCapitalize={false}
            />
          </View>
          <View style={styles.starightLine} />
          <FlatList
            data={this.state.searchedCategoryFilterList}
            extraData={this.state}
            renderItem={({ item, index }) => this.renderListItemCategory(item, index)}
          />
        </View>
      );
  }

  // onCheckPressBrand(data) {
  //   data.active = !data.active;
  //   var index = this.state.active.findIndex(x => x.key == data.key);
  //   this.state.active[index] = data;
  //   // this.setState({wishlist_item:!this.state.wishlist_item});
  //   this.setState({ RefreshFlatList: !this.state.RefreshFlatList });
  // };

  onCheckPressBrand(data) {
    try {
      let localFilterBrands = this.state.brandsFilterList;
      let selectedIndex = localFilterBrands.findIndex((item) => item.id === data.id);
      localFilterBrands[selectedIndex].active = !data.active;
      this.setState({ brandsFilterList: localFilterBrands });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderListItem = ({ item }) => {
    return (
      <View style={styles.BrandFilterConatiner}>
        <TouchableOpacity onPress={() => this.onCheckPressBrand(item)}>
          {item.active ? (
            <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
          ) : (
            <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
          )}
        </TouchableOpacity>
        <Text
          style={[styles.labelTitle, { color: item.active ? COLOR_CONST.google : COLOR_CONST.coolGreyTwo }]}>
          {item.name}
        </Text>
      </View>
    )
  }

  renderBrand() {
    if (this.state.brand == true)
      return (
        <View style={styles.BrandConatiner}>
          <View style={{ marginTop: scale(25.9) }} />
          <FlatList
            data={this.state.brandsFilterList}
            extraData={this.state}
            renderItem={this.renderListItem}
          />
        </View>
      );
  }

  onCheckPressTag(data) {
    try {
      let localFilterTags = this.state.tagFilterList;
      let selectedIndex = localFilterTags.findIndex((item) => item.id === data.id);
      localFilterTags[selectedIndex].active = !data.active;
      this.setState({ tagFilterList: localFilterTags }, () => {
        console.log('@@@ Tag ============', this.state.tagFilterList)
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderTagListItem = ({ item }) => {
    return (
      <View style={styles.BrandFilterConatiner}>
        <TouchableOpacity onPress={() => this.onCheckPressTag(item)}>
          {item.active ? (
            <Image source={IMG_CONST.CHECKED} style={styles.CheckIocnStyle} />
          ) : (
            <Image source={IMG_CONST.UNCHECKED} style={styles.CheckIocnStyle} />
          )}
        </TouchableOpacity>
        <Text
          style={[styles.labelTitle, { color: item.active ? COLOR_CONST.pastelRed : COLOR_CONST.coolGreyTwo }]}>
          {item.name}
        </Text>
      </View>
    )
  }

  renderTags() {
    console.log("@@@ Taglist =========", this.state.tagFilterList);
    if (this.state.tag == true)
      return (
        <View style={styles.BrandConatiner}>
          <View style={{ marginTop: scale(25.9) }} />
          <FlatList
            data={this.state.tagFilterList}
            extraData={this.state}
            renderItem={this.renderTagListItem}
          />
        </View>
      );
  }

  _onPressChange(value) {
    if (value == 'price') {
      this.setState({ price: true })
      this.setState({ brand: false })
      this.setState({ category: false })
      this.setState({ tag: false })
    }
    else if (value == 'brand') {
      this.setState({ price: false })
      this.setState({ brand: true })
      this.setState({ category: false })
      this.setState({ tag: false })
    }
    else if (value == 'tag') {
      this.setState({ price: false })
      this.setState({ brand: false })
      this.setState({ category: false })
      this.setState({ tag: true })
    }
    else {
      this.setState({ price: false })
      this.setState({ category: true })
      this.setState({ brand: false })
      this.setState({ tag: false })
    }
  }


  renderViewAll = () => {
    return (
      <>
        {/* <View style={styles.HeaderConatiner}>
          <View style={styles.LeftContainer}>
            <Image source={IMG_CONST.SORT_ICON} style={styles.imageSize} />
            <Text style={styles.sortStyle}>Sort</Text>
          </View>
          <View style={styles.verticleLine} />
          <TouchableOpacity style={styles.RightContainer} onPress={() => this.props.navigation.goBack()} >
            <Image source={IMG_CONST.FILTER_ICON} style={styles.imageSizeFilter} />
            <Text style={styles.FilterStyle}>Filter</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.containerFilter}>
          <View style={styles.LeftContainerFilter}>
            <TouchableOpacity
              style={{
                width: scale(119.2),
                height: scale(54.6),
                justifyContent: 'center',
                backgroundColor: this.changeColor('price'),
              }}
              onPress={() => this._onPressChange('price')}>
              <Text
                style={styles.priceRangeTitle}>
                Price Range
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: scale(119.2),
                height: scale(54.6),
                justifyContent: 'center',
                backgroundColor: this.changeColor('brand'),
              }}
              onPress={() => this._onPressChange('brand')}>
              <Text
                style={styles.priceRangeTitle}>
                Brand
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: scale(119.2),
                height: scale(54.6),
                justifyContent: 'center',
                backgroundColor: this.changeColor('tag'),
              }}
              onPress={() => this._onPressChange('tag')}>
              <Text
                style={styles.priceRangeTitle}>
                Tags
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: scale(119.2),
                height: scale(54.6),
                justifyContent: 'center',
                backgroundColor: this.changeColor('category'),
              }}
              onPress={() => this._onPressChange('category')}>
              <Text style={styles.priceRangeTitle}>Category</Text>
            </TouchableOpacity>
          </View>
          <View>
            {this.renderPrice()}
            {this.renderBrand()}
            {this.renderTags()}
            {this.renderCategory()}
          </View>
        </View>
        <View style={styles.ButtonConatiner}>
          <View style={styles.InnerConatiner}>
            <TouchableOpacity style={styles.buttonCustom} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.customTxtStyle}>CANCEL</Text>
            </TouchableOpacity>
            <GreenButton
              title="APPLY FILTER"
              customStyle={styles.buttonCustom}
              customTxtStyle={styles.customTxtStyle}
              onPress={() => this.onPressApplyFilter()}
            />
          </View>
        </View>
      </>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {this.renderViewAll()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryList: state.category.categoryList,
    brandsList: state.brands.brandsList.brands,
    maxPrice: state.brands.brandsList.max_product_value,
    tagList: state.brands.tagList,
    filterData: state.filters.filterData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    setFilterData: (data) => dispatch(filterActions.setFilterData(data)),
    removeFilterData: () => dispatch(filterActions.removeFilterData()),
    getProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getProductList(data, successCallBack, failureCallBack)),
    getSubCategoryList: (data, successCallBack, failureCallBack) => dispatch(categoryActions.getSubCategoryList(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

