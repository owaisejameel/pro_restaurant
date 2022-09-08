import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  BackHandler,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import R from '../../R';
import {LatestProductList} from '../../theme/constants';
import styles from './ProductListingStyle';
import GreenButton from '../../components/GreenButton';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import InputSpinner from 'react-native-input-spinner';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import COLOR_CONST, {FONTS} from '../../theme/ColorConstants';
import {connect} from 'react-redux';
import * as homeActions from '../../redux/actions/homeActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as wishlistActions from '../../redux/actions/wishlistActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import scale from '../../utils/Scale';
import LoadingImage from 'react-native-image-progress';
import LinearGradient from 'react-native-linear-gradient';
import ProductOverlay from '../../components/ProductOverlay';
import OutOfStockButton from '../../components/OutOfStockButton';
import {ProductGrid} from '../../components/homeComponents/ProductGrid/ProductGrid';
import * as Animatable from "react-native-animatable";
import Toast from 'react-native-simple-toast';

class ProductListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      noProductFound: false,
      wishlist_item: [LatestProductList],
      RefreshFlatList: false,
      add_to_cart: [LatestProductList],
      showSortByModal: false,
      filterSelection: [
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
      ],
      pageCount: 1,
      limit: 15,
      loading: true,
      pageLoader: false,
      pullToRefresh: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      notFinalLoad: false,
      filterQueryParams: '',
      isSortByEnabled: false,
      lastFilterQuery: '',
      screenName: this.props.route.params ? this.props.route.params.screenName : '',
      isLoading:false


    };
  }

  componentDidMount() {
    this.getProductListData();
    this.props.startSpinnerForProduct();
    console.log(`object&***********>>>>>>>>>>>>>>>`, this.props.route.params.categoryData)

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // this.getProductListData();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setNavigationHeaderConfiguration();
      
      this.props.stopSpinner();

      if (!this.props.route.params.isFromFilter) {
        // this.setState({ productList: [], pageCount: 1, }, () => {
        // this.getProductListData();
        this.refreshCart();
        // });
      }
    });
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    this.setState({productList: [], pageCount: 1});
    this._unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  setNavigationHeaderConfiguration = () => {
    const {cartHasProductFlag, showNotificationDot, cartCount} = this.props;
    let screenName = this.props.route.params ? this.props.route.params.screenName : '';
    this.props.navigation.setOptions({
      headerStyle: {backgroundColor: COLOR_CONST.white, shadowColor: 'transparent', elevation: 0},
      headerTitle: () => (
        <Text numberOfLines={1} style={styles.headerTitleStyle}>
          {this.state.screenName}
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
          <Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationScreen')}>
            <Image source={IMG_CONST.NOTIFICATIONS_ICON} style={styles.notifIcon} />
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
            <Image source={IMG_CONST.CART_BLACK_ICON} style={styles.cartIcon} />
            {cartHasProductFlag && (
              <View
                style={{
                  height: scale(20),
                  width: scale(20),
                  borderRadius: scale(10),
                  backgroundColor: COLOR_CONST.primaryThemeGradient,
                  borderColor: 'white',
                  borderWidth: 0.9,
                  position: 'absolute',
                  top: scale(-10),
                  end: scale(-10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: scale(10), color: COLOR_CONST.white, fontFamily: FONTS.GTWalsheimProRegular}}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ),
    });
  };

  updateProductListAfterRemoveFromWishList=(productId)=>{
    
  let UpdatedArray=this.state.productList.map((item)=>{
    if(item.id==productId){
      return Object.assign(item,{
        is_wishlisted:false,
        wishlist_item:false,
      })
    }
    return item;
  })
  this.setState({productList:UpdatedArray});
}

updateProductListAfterAddInWishList=(productId)=>{

    let UpdatedArray=this.state.productList.map((item)=>{
      if(item.id==productId){
        return Object.assign(item,{
          is_wishlisted:true
        })
      }
      return item;
    })
    this.setState({productList:UpdatedArray});
  }

  updateProductListAfterremoveFromCart=(productVarientId, value, productId)=>{
        
    let UpdatedArray=this.state.productList.map((item)=>{
      console.log('productId == item.id ', productId , item.id);
      if(productId == item.id){
        item.product_variants.map((varientData)=>{
          if(varientData.id==productVarientId){
            return Object.assign(varientData, {
              cart_quantity:value,
              is_in_cart:false,
              add_to_cart: false
            })
          }
        })
      return Object.assign({}, item, {
        cart_quantity: null,
        is_in_cart:false,
        add_to_cart: false
      })
      }
     return item;
     })
     this.setState({productList:UpdatedArray});
  }
  updateProductListAfterUpdateCart=(productVarientId, value)=>{
    let UpdatedArray=this.state.productList.map((item)=>{
     item.product_variants.map((varientData)=>{
      if(varientData.id==productVarientId){
        return Object.assign(varientData, {
          cart_quantity: value,
          is_in_cart:true
        })
      }
     })
    return item;
    })
    this.setState({productList:UpdatedArray});
  }

  updateProductListAfterAddToCart=(productVarientId)=>{
    let UpdatedArray=this.state.productList.map((item)=>{
     item.product_variants.map((varientData)=>{
      if(varientData.id==productVarientId){
        return Object.assign(varientData, {
          cart_quantity:1,
          is_in_cart:true
        })
      }
     })
    
    return item;

    })
    this.setState({productList:UpdatedArray});
  }
  onAddToWishlist = async (item) => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.id,
      userID: userID,
    };
    this.props.addToWishlist(
      data,
      (res) => this.addToWishlistSuccessCallBack(res, item.id),
      (error) => this.addToWishlistFailureCallBack(error),
    );
  };

  addToWishlistSuccessCallBack = async (res, productId) => {
    console.log('@@@ Add To WishList Success CallBack ===================', res);
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
    };
   // this.setState({pageCount: 1}, () => {
      if (!this.props.route.params.isFromFilter){
      this.updateProductListAfterAddInWishList(productId)

      } 
      //this.getProductListData();
      else {this.onPressFilter(this.state.lastFilterQuery);}
   // });
  };

  addToWishlistFailureCallBack = (error) => {
    if (error) {
      setTimeout(() => {
        this.setState({noProductFound: true});
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  onRemoveFromWishlist = async (item) => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.id,
      userID: userID,
    };
    this.props.removeFromWishlist(
      data,
      (res) => this.removeFromWishlistSuccessCallBack(res, item.id),
      (error) => this.removeFromWishlistFailureCallBack(error),
    );
  };

  removeFromWishlistSuccessCallBack = (res, productId) => {
    console.log('@@@ Remove From WishList Success CallBack ===================', res);
    setTimeout(() => {
      this.props.showErrorModal('The Item has been removed from the wishlist.');
      setTimeout(async () => {
        this.props.hideErrorModal();
      }, 2000);
    }, 0);
   // this.setState({pageCount: 1}, () => {
      if (!this.props.route.params.isFromFilter){
        this.updateProductListAfterRemoveFromWishList(productId)
      } else {
        this.onPressFilter(this.state.lastFilterQuery);
      }
      //this.getProductListData();
   // });
  };

  removeFromWishlistFailureCallBack = (error) => {
    if (error) {
      setTimeout(() => {
        this.setState({noProductFound: true});
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  getProductListData = () => {
    this.setState({isLoading:true})


    let categoryID = 1;
    let subCategoryId = '';
    this.createCart();
    const screenName = this.props.route?.params?.screenName;
    if (this.props.route.params && this.props.route.params.isFromExplore) {
      if (this.props.route.params.isFromCategory) categoryID = this.props.route.params.categoryData.id;
      else categoryID = this.props.route.params.categoryData.category_id;

      if (this.props.route.params.categoryData && this.props.route.params.categoryData.subcategoryId) {
        subCategoryId = `&sub_category_id=${this.props.route.params.categoryData.subcategoryId}`;
      }
      let data = {
        id: categoryID,
        uuid: DeviceInfo.getUniqueId(),
        pageCount: this.state.pageCount,
        subcategoryParam: subCategoryId,
      };
      this.props.getProductList(
        data,
        (res) => this.getProductListSuccessCallBack(res),
        (error) => this.getProductListFailureCallBack(error),
      );
    } else {
      if (screenName === 'Top Offers') {
        console.log('@@@ Product listing select filter new products');
        this.onSelectFilter(0);
      } else if (screenName === 'Best Deals for you') {
        console.log('@@@ Product listing select filter Recommended products');
        this.onSelectFilter(6);
      } else {
        let data = {
          uuid: DeviceInfo.getUniqueId(),
          pageCount: this.state.pageCount,
        };
        this.setState({pageCount: 1}, () => {
          this.props.getAllProductList(
            data,
            (res) => this.getProductListSuccessCallBack(res),
            (error) => this.getProductListFailureCallBack(error),
          );
        });
      }
    }
  };

  createCart = async () => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
    };
    this.props.createCart(
      data,
      (res) => this.createCartSuccessCallBack(res),
      (error) => this.createCartFailureCallBack(error),
    );
  };

  createCartSuccessCallBack = (res) => {
    console.log('@@@ Create Cart Success CallBack ===================', res, this.props.cartData);
  };

  createCartFailureCallBack = (error) => {
    console.log('@@@ Create Cart Failure CallBack ===================');
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

  getProductListSuccessCallBack = (res) => {
    this.setState(
      {
        productList: this.state.productList.concat(res.data),
        pageLoader: false,
        lastLoadCount: this.state.productList.concat(res.data).length,
        onEndReachedCalledDuringMomentum: this.state.productList.concat(res.data).length >= this.state.limit ? true : false,
        notFinalLoad: this.state.productList.concat(res.data).length >= this.state.limit ? true : false,
      },
      () => {
        this.setState({isLoading:false})
        this.props.stopSpinnerForProduct()
        if (this.state.productList.length === 0) {
          this.setState({noProductFound: true});
        }
      },
    );
    console.log('@@@ Get Product List Success CallBack ===================', res.data);
  };

  getProductListFailureCallBack = (error) => {
    this.setState({isLoading:false})
    this.props.stopSpinnerForProduct()
    if (error) {
      setTimeout(() => {
        this.setState({noProductFound: true});
        this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  getFilterProductListSuccessCallBack = (res) => {
    console.log('@@@ Product List before filter ==========', this.state.productList);
    console.log('@@@ Product List after filter & page count ==========', res.data, this.state.pageCount);
   // return false;
    this.setState(
      {
        productList: this.state.productList.concat(res.data),
        pageLoader: false,
        lastLoadCount: this.state.productList.concat(res.data).length,
        onEndReachedCalledDuringMomentum: this.state.productList.concat(res.data).length >= this.state.limit ? true : false,
        notFinalLoad: this.state.productList.concat(res.data).length >= this.state.limit ? true : false,
      },
      () => {
        this.setState({isLoading:false,})
        this.props.stopSpinnerForProduct()
        if (this.state.productList.length === 0) {
          this.setState({noProductFound: true});
        }
      },
    );
    console.log('@@@ filter List after filter after  ==========', this.state.productList, this.state.pageCount);

    console.log('@@@ Get Filter Product List Success CallBack ===================');
  };

  getFilterProductListFailureCallBack = (error) => {
    this.setState({isLoading:false,})
    this.props.stopSpinnerForProduct()
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

  onPressFilter = (filterQueryParams) => {
    console.log(`yes onPressFilter is calling...`, this.state.productList)
    let categoryID = '';
    this.setState({screenName: ''}, () => {
      this.clearSortBy();
      this.setState({productList: [],pageCount: 1}, () => {
    console.log(`yes onPressFilter is calling...`, this.state.productList)
       // return false;
        if (this.props.route.params.categoryData) {
          if (this.props.route.params.isFromCategory) {
            categoryID = this.props.route.params.categoryData.id;
            filterQueryParams = filterQueryParams + `&category_id[]=${categoryID}`;
          } else {
            categoryID = this.props.route.params.categoryData.category_id;
            filterQueryParams = filterQueryParams + `&category_id[]=${categoryID}`;
          }
        }
        // let updatedFilterParams = this.state.filterQueryParams === '' ? filterQueryParams : this.state.filterQueryParams + '&' + filterQueryParams;
        let updatedFilterParams = filterQueryParams;
        let data = {
          uuid: DeviceInfo.getUniqueId(),
          filterQueryParams: updatedFilterParams,
          pageCount: 1,
        };
        this.setState({filterQueryParams: updatedFilterParams, lastFilterQuery: updatedFilterParams});
        this.props.getFilterProductList(
          data,
          (res) => this.getFilterProductListSuccessCallBack(res),
          (error) => this.getFilterProductListFailureCallBack(error),
        );
      });
    });
  };

  onHeartPress(data) {
    if (!data.is_wishlisted) {
      this.onAddToWishlist(data);
    } else {
      this.onRemoveFromWishlist(data);
    }
    // let localProductList = this.state.productList;
    // let selectedProductIndex = localProductList.findIndex((item) => item.id === data.id)
    // localProductList[selectedProductIndex].is_wishlisted = !data.is_wishlisted;
    // this.setState({ productList: localProductList });
  }

  onCartPress(data) {
    data.add_to_cart = !data.add_to_cart;
    var index = this.state.add_to_cart.findIndex((x) => x.id == data.id);
    this.state.add_to_cart[index] = data;
    // setRememberPin(add_to_cart);
    this.setState({RefreshFlatList: !this.state.RefreshFlatList});
  }

  clearSortBy = () => {
    let localFilterSelection = this.state.filterSelection;
    let filterIndex = localFilterSelection.findIndex((item) => item.isSelected === true);
    if (filterIndex >= 0) localFilterSelection[filterIndex].isSelected = false;
    this.setState({filterSelection: localFilterSelection});
  };

  onSelectFilter = (itemIndex) => {
    let localFilterSelection = this.state.filterSelection;
    let filterIndex = localFilterSelection.findIndex((item) => item.isSelected === true);
    localFilterSelection[itemIndex].isSelected = !localFilterSelection[itemIndex].isSelected;
    if (filterIndex >= 0) localFilterSelection[filterIndex].isSelected = false;
    this.setState({filterSelection: localFilterSelection}, () => {
      this.setState({showSortByModal: false}, () => {
        this.onApplySortByFilter();
      });
    });
  };

  onApplySortByFilter = () => {
    let filterIndex = this.state.filterSelection.findIndex((item) => item.isSelected === true);
    let filterQueryParams = '';
    let subCategoryId = '';
    let categoryID = 1;
    if (filterIndex !== -1) {
      this.setState({productList: [], pageCount: 1}, () => {
        filterQueryParams = this.getSoryByFilterParams(filterIndex);
        console.log('@@@ URL =======1', filterQueryParams);
        if (this.props.route.params.categoryData) {
          if (this.props.route.params.isFromCategory) {
            categoryID = this.props.route.params.categoryData.id;
            filterQueryParams = filterQueryParams + `&category_id[]=${categoryID}` + `&${this.state.lastFilterQuery}`;
          } else {
            categoryID = this.props.route.params.categoryData.category_id;
            if (this.props.route.params.categoryData && this.props.route.params.categoryData.subcategoryId) {
              subCategoryId = this.props.route.params.categoryData.subcategoryId;
            }
            filterQueryParams = filterQueryParams + `&sub_category_id[]=${subCategoryId}` + `&${this.state.lastFilterQuery}`;
          }
        } else {
          if (this.state.filterQueryParams !== '' && this.props.route.params.isFromFilter)
            filterQueryParams = filterQueryParams + `&${this.state.lastFilterQuery}`;
        }
        let data = {
          uuid: DeviceInfo.getUniqueId(),
          filterQueryParams: filterQueryParams,
          pageCount: 1,
        };
        this.setState({isSortByEnabled: true, filterQueryParams: filterQueryParams});
        this.setState({productList: [], pageCount: 1}, () => {
          this.props.getFilterProductList(
            data,
            (res) => this.getFilterProductListSuccessCallBack(res),
            (error) => this.getFilterProductListFailureCallBack(error),
          );
        });
      });
    } else {
      this.setState({productList: [], pageCount: 1, isSortByEnabled: false}, () => {
        if (this.props.route.params.categoryData) {
          if (this.props.route.params.isFromCategory) categoryID = this.props.route.params.categoryData.id;
          else categoryID = this.props.route.params.categoryData.category_id;
        }
        let subCategoryId = '';
        if (this.props.route.params.categoryData && this.props.route.params.categoryData.subcategoryId) {
          subCategoryId = `&sub_category_id=${this.props.route.params.categoryData.subcategoryId}`;
        }
        let data = {
          id: categoryID,
          uuid: DeviceInfo.getUniqueId(),
          pageCount: this.state.pageCount,
          subcategoryParam: subCategoryId,
        };
        if (this.state.isSortByEnabled) {
          data = {
            id: categoryID,
            uuid: DeviceInfo.getUniqueId(),
            pageCount: 1,
            filterQueryParams: this.state.filterQueryParams,
          };
          this.props.getFilterProductList(
            data,
            (res) => this.getFilterProductListSuccessCallBack(res),
            (error) => this.getFilterProductListFailureCallBack(error),
          );
        } else {
          if (!this.props.route.params.isFromFilter) {
            if (this.props.route.params && this.props.route.params.isFromExplore)
              this.props.getProductList(
                data,
                (res) => this.getProductListSuccessCallBack(res),
                (error) => this.getProductListFailureCallBack(error),
              );
            else
              this.props.getAllProductList(
                data,
                (res) => this.getProductListSuccessCallBack(res),
                (error) => this.getProductListFailureCallBack(error),
              );
          } else {
            data = {
              id: categoryID,
              uuid: DeviceInfo.getUniqueId(),
              pageCount: 1,
              filterQueryParams: this.state.filterQueryParams,
            };
            this.props.getFilterProductList(
              data,
              (res) => this.getFilterProductListSuccessCallBack(res),
              (error) => this.getFilterProductListFailureCallBack(error),
            );
          }
        }
      });
    }
  };

  getSoryByFilterParams = (itemIndex) => {
    let filterQueryParams = '';
    switch (itemIndex) {
      case 0:
        filterQueryParams = 'order_field=latest';
        break;
      case 1:
        filterQueryParams = 'order_field=popular';
        break;
      case 2:
        filterQueryParams = 'order_field=name';
        break;
      case 3:
        filterQueryParams = 'order_field=name&order_by=desc';
        break;
      case 4:
        filterQueryParams = 'order_field=price&rder_by=asc';
        break;
      case 5:
        filterQueryParams = 'order_field=price&order_by=desc';
        break;
      case 6:
        filterQueryParams = 'order_field=recommended';
        break;

      default:
        break;
    }
    return filterQueryParams;
  };

  onEndReached = () => {
    let categoryID = 1;
    console.log(
      '@@@ On End Reached ==============',
      this.state.onEndReachedCalledDuringMomentum,
      this.state.lastLoadCount,
      this.state.limit,
      this.state.notFinalLoad,
    );
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true}, () => {
        // setTimeout(() => {
          if (this.state.lastLoadCount >= this.state.limit && this.state.notFinalLoad) {
            this.setState(
              {
                pageLoader: true,
                pageCount: this.state.pageCount + 1,
              },
              () => {
                if (this.props.route.params.categoryData) {
                  if (this.props.route.params.isFromCategory) categoryID = this.props.route.params.categoryData.id;
                  else categoryID = this.props.route.params.categoryData.category_id;
                }
                let subCategoryId = '';
                if (this.props.route.params.categoryData && this.props.route.params.categoryData.subcategoryId) {
                  subCategoryId = `&sub_category_id=${this.props.route.params.categoryData.subcategoryId}`;
                }
                let data = {
                  id: categoryID,
                  uuid: DeviceInfo.getUniqueId(),
                  pageCount: this.state.pageCount,
                  subcategoryParam: subCategoryId,
                };
                if (this.state.isSortByEnabled) {
                  let filterQueryParams = this.state.filterQueryParams;
                  if (this.props.route.params.categoryData) {
                    if (this.props.route.params.isFromCategory) {
                      categoryID = this.props.route.params.categoryData.id;
                      filterQueryParams = this.state.filterQueryParams + `&category_id[]=${categoryID}`;
                    } else {
                      categoryID = this.props.route.params.categoryData.category_id;
                      filterQueryParams = this.state.filterQueryParams + `&category_id[]=${categoryID}`;
                    }
                  }
                  data = {
                    id: categoryID,
                    uuid: DeviceInfo.getUniqueId(),
                    pageCount: this.state.pageCount,
                    filterQueryParams: filterQueryParams,
                  };
                  this.props.getFilterProductList(
                    data,
                    (res) => this.getFilterProductListSuccessCallBack(res),
                    (error) => this.getFilterProductListFailureCallBack(error),
                  );
                } else {
                  if (!this.props.route.params.isFromFilter) {
                    if (this.props.route.params && this.props.route.params.isFromExplore)
                      this.props.getProductList(
                        data,
                        (res) => this.getProductListSuccessCallBack(res),
                        (error) => this.getProductListFailureCallBack(error),
                      );
                    else
                      this.props.getAllProductList(
                        data,
                        (res) => this.getProductListSuccessCallBack(res),
                        (error) => this.getProductListFailureCallBack(error),
                      );
                  } else {
                    data = {
                      id: categoryID,
                      uuid: DeviceInfo.getUniqueId(),
                      pageCount: this.state.pageCount,
                      filterQueryParams: this.state.filterQueryParams,
                    };
                    this.props.getFilterProductList(
                      data,
                      (res) => this.getFilterProductListSuccessCallBack(res),
                      (error) => this.getFilterProductListFailureCallBack(error),
                    );
                  }
                }
              },
            );
          }
        // }, 1500);
      });
    }
  };

  // Key Extractor
  _keyExtractor = (item, index) => item.id;

  // Check if list has started scrolling
  _onMomentumScrollBegin = () => this.setState({onEndReachedCalledDuringMomentum: false});

  refreshCart = async () => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
    };
    this.props.cartHasProduct(
      data,
      (res) => {
        this.setNavigationHeaderConfiguration();
      },
      (error) => {},
    );
  };

  onAddToCart = async (value, item, selectedProduct) => {
    console.log(`onAddToCart>>>>>>>>>>>>>>`, value, item)
    let productVarientId = undefined;
    if (item.product_variants.length > 0) {
      if (selectedProduct) {
        productVarientId = selectedProduct.id;
      } else {
        this.props.showErrorModal('Please select from available variants');
        return;
      }
    }
    // let productVarientId = undefined;
    // if (item.product_variants.length > 0) {
    //   if (item.product_variants[0]) {
    //     console.log('@@@ Selected Product Varient ===== ', item.product_variants[0]);
    //     productVarientId = item.product_variants[0].id;
    //   }
    //   // else {
    //   //   this.props.showErrorModal('Please select from available variants');
    //   //   return;
    //   // }
    // }
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.id,
      quantity: value,
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    if (productVarientId) {
      data.product_variant_id = productVarientId;
    }
    console.log('@@@ onAdd Data ==========', data);
    this.props.addToCart(
      data,
      (res) => this.addToCartSuccessCallBack(res, productVarientId),
      (error) => this.addToCartFailureCallBack(error, productVarientId),
    );
  };

  addToCartSuccessCallBack = (res, productVarientId) => {
    console.log('@@@ Add to Cart Success CallBack ===================', res);
    if (productVarientId) {
      this.props.setSelectedAttributes(null);
    }
    this.refreshCart();
    Toast.showWithGravity('Product Added to cart successfully.', Toast.SHORT, Toast.BOTTOM);
//this.setState({pageCount: 1}, () => {
      if (!this.props.route.params.isFromFilter){
      this.updateProductListAfterAddToCart(productVarientId);

      } 
      //this.getProductListData();
      else {
        this.onPressFilter(this.state.lastFilterQuery);
      }
   // });
  };

  addToCartFailureCallBack = (error, productVarientId) => {
    if (productVarientId) {
      this.props.setSelectedAttributes(null);
    }
      this.refreshCart();
    // this.setState({pageCount: 1}, () => {
    //   if (!this.props.route.params.isFromFilter) this.getProductListData();
    //   else this.onPressFilter(this.state.lastFilterQuery);
    // });
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

  getOrderIdForProduct = (product) => {
    const {cartData} = this.props;
    let orderId = '';
    cartData.order.order_items.map((order) => {
      console.log(order.product.id);
      console.log(product.id);
      if (order.product.id === product.id) {
        orderId = order.id;
        return;
      }
    });
    return orderId;
  };

  onRemoveFromCart = async (value, item, selectedProduct) => {
    let productVarientId = undefined;
    if (item.product_variants.length > 0) {
      productVarientId = selectedProduct?.id;
       
    }
    let userID = await AsyncStorage.getItem('USER_ID');
    const orderId = this.getOrderIdForProduct(item);
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.id,
      quantity: value,
      order_item_id: orderId,
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    console.log('@@@ onRemove Data ==========', data);
    this.props.removeFromCart(
      data,
      (res) => this.removeFromCartSuccessCallBack(res, productVarientId, value, item.id),
      (error) => this.removeFromCartFailureCallBack(error),
    );
  };

  removeFromCartSuccessCallBack = (res, productVarientId, value, productId) => {
    console.log('@@@ Remove From Cart Success CallBack ===================', res);
    this.refreshCart();
    Toast.showWithGravity('Product removed from cart successfully.', Toast.SHORT, Toast.BOTTOM);
   // this.setState({pageCount: 1}, () => {
      if (!this.props.route.params.isFromFilter){
      this.updateProductListAfterremoveFromCart(productVarientId, value, productId)

      } 
      //this.getProductListData();
      else {this.onPressFilter(this.state.lastFilterQuery);}
   // });
  };

  removeFromCartFailureCallBack = (error) => {
    this.refreshCart();
    // this.setState({pageCount: 1}, () => {
    //   if (!this.props.route.params.isFromFilter) this.getProductListData();
    //   else this.onPressFilter(this.state.lastFilterQuery);
    // });
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

  updateQuantiyInCart = async (value, item, selectedProduct) => {
    console.log(`updateQuantiyInCart>>>>>>>>>>>>>`, item, value)
    let productVarientId = undefined;
    if (item.product_variants.length > 0) {
      if (selectedProduct) {
        productVarientId = selectedProduct.id;
      } else {
        this.props.showErrorModal('Please select from available variants');
        return;
      }
    }
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      product_id: item.id,
      quantity: value,
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    if (productVarientId) {
      data.product_variant_id = productVarientId;
    }
    console.log('@@@ onUpdateQuantity Data ==========', data);
    this.props.updateQuantiyInCart(
      data,
      (res) => this.updateQuantiyInCartSuccessCallBack(res, productVarientId, value),
      (error) => this.updateQuantiyInCartFailureCallBack(error, productVarientId),
    );
  };

  updateQuantiyInCartSuccessCallBack = (res, productVarientId, value) => {
    if (productVarientId) {
      this.props.setSelectedAttributes(null);
    }
    console.log('@@@ Update quantity in Cart Success CallBack ===================', res);
    Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
   // this.setState({pageCount: 1}, () => {
      if (!this.props.route.params.isFromFilter){
        this.updateProductListAfterUpdateCart(productVarientId, value)
      }
      else {
        this.onPressFilter(this.state.lastFilterQuery);
      }
      //this.getProductListData();
   // });
  };

  updateQuantiyInCartFailureCallBack = (error, productVarientId) => {
    if (productVarientId) {
      this.props.setSelectedAttributes(null);
    }
    // this.refreshCart();
    // this.setState({pageCount: 1}, () => {
    //   if (!this.props.route.params.isFromFilter) this.getProductListData();
    //   else this.onPressFilter(this.state.lastFilterQuery);
    // });
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

  onChangeCartValue = (value, item, isAdd) => {
    if (isAdd) {
      if (item.cart_quantity) {
        this.updateQuantiyInCart(value, item);
      } else {
        this.onAddToCart(value, item);
      }
    } else {
      if (value === 0) this.onRemoveFromCart(value, item);
      else this.updateQuantiyInCart(value, item);
    }
  };

  // Footer loader for Pagination
  _renderSearchResultsFooter = () => {
    return (
      <View style={styles.activityIndicator}>{this.state.pageLoader && this.state.pageCount > 1 && <ActivityIndicator size="large" color={'#000000'} />}</View>
    );
  };

  renderSortByModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showSortByModal}
        onRequestClose={() => {
          this.setState({showSortByModal: false});
        }}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.sortByContiner}>
            <View style={styles.sortRow}>
              <Text style={styles.sortByText}>Sort by</Text>
              <TouchableOpacity onPress={() => this.setState({showSortByModal: false}, () => this.onApplySortByFilter())}>
                <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.onSelectFilter(0)} style={styles.filterRow}>
              <View style={styles.innerRow}>
                {/* <Image source={IMG_CONST.DOLLAR_DOWN} style={styles.dollarDown} /> */}
                <Text style={styles.filterText}>Featured</Text>
              </View>
              {this.state.filterSelection[0].isSelected && <Image source={IMG_CONST.TICK_CORRECT_ICON} style={styles.tickCorrect} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSelectFilter(1)} style={styles.filterRow}>
              <View style={styles.innerRow}>
                {/* <Image source={IMG_CONST.DOLLAR_DOWN} style={styles.dollarDown} /> */}
                <Text style={styles.filterText}>Best Selling</Text>
              </View>
              {this.state.filterSelection[1].isSelected && <Image source={IMG_CONST.TICK_CORRECT_ICON} style={styles.tickCorrect} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSelectFilter(2)} style={styles.filterRow}>
              <View style={styles.innerRow}>
                {/* <Image source={IMG_CONST.NEW_ICON} style={styles.newIcon} /> */}
                <Text style={styles.filterText}>Alphabetically, A-Z</Text>
              </View>
              {this.state.filterSelection[2].isSelected && <Image source={IMG_CONST.TICK_CORRECT_ICON} style={styles.tickCorrect} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSelectFilter(3)} style={styles.filterRow}>
              <View style={styles.innerRow}>
                {/* <Image source={IMG_CONST.POPULARITY_ICON} style={styles.popularityIcon} /> */}
                <Text style={styles.filterText}>Alphabetically, Z-A</Text>
              </View>
              {this.state.filterSelection[3].isSelected && <Image source={IMG_CONST.TICK_CORRECT_ICON} style={styles.tickCorrect} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSelectFilter(4)} style={styles.filterRow}>
              <View style={styles.innerRow}>
                {/* <Image source={IMG_CONST.POPULARITY_ICON} style={styles.popularityIcon} /> */}
                <Text style={styles.filterText}>Price, Low to High</Text>
              </View>
              {this.state.filterSelection[4].isSelected && <Image source={IMG_CONST.TICK_CORRECT_ICON} style={styles.tickCorrect} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSelectFilter(5)} style={styles.filterRow}>
              <View style={styles.innerRow}>
                {/* <Image source={IMG_CONST.POPULARITY_ICON} style={styles.popularityIcon} /> */}
                <Text style={styles.filterText}>Price, High to Low</Text>
              </View>
              {this.state.filterSelection[5].isSelected && <Image source={IMG_CONST.TICK_CORRECT_ICON} style={styles.tickCorrect} />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  renderListItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDescription', {productData: item})} style={styles.productGridStyle}>
        <TouchableOpacity onPress={() => this.onHeartPress(item)} style={styles.touchableOpacityStyle}>
          {item.is_wishlisted ? (
            <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
          ) : (
            <Image source={IMG_CONST.UN_SELECTED_HEART} style={styles.heartIcon} />
          )}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <LoadingImage resizeMode={'contain'} source={{uri: item.images[0] ? item.images[0].image : ''}} style={styles.BottalImage} />
          <Text numberOfLines={1} style={styles.titleNameStyle}>
            {item.name}
          </Text>
          {item.on_sale ? (
            <View style={styles.discountRow}>
              <Text style={styles.price}>₹ {item.price_including_tax}</Text>
              <Text style={styles.discountPrice}> ₹ {item.actual_price}</Text>
            </View>
          ) : (
            <Text style={styles.price}>₹ {item.price_including_tax}</Text>
          )}
        </View>
        {/* {(item.current_availability == "out_of_stock") && <ProductOverlay/>} */}

        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDescription', { productData: item })}>
                         <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
                         <Text style={styles.addToCartText}>View Product</Text>
                         </LinearGradient>
                    </TouchableOpacity> */}

        {/* {item.current_availability == "out_of_stock" ? 
                        <OutOfStockButton/>
                : */}
        <TouchableOpacity onPress={() => this.onCartPress(item)}>
          <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
            {item.cart_quantity || item.add_to_cart ? (
              <>
                <InputSpinner
                  rounded={false}
                  showBorder={true}
                  editable={false}
                  max={100}
                  min={0}
                  step={1}
                  fontSize={13}
                  onMin={() => this.onCartPress(item)}
                  style={styles.spinner}
                  colorPress={COLOR_CONST.boderdarkishBlueTwo}
                  colorMax={'#f04048'}
                  background={COLOR_CONST.white}
                  colorMin={COLOR_CONST.white}
                  // colorMax={'red'}
                  color={COLOR_CONST.white}
                  prepend={<Text style={styles.qtyStyle}>Qty :</Text>}
                  buttonTextColor={COLOR_CONST.coolGreyTwo}
                  textColor={COLOR_CONST.charcoalGrey}
                  value={item.cart_quantity ? item.cart_quantity : '0'}
                  onDecrease={(num) => {
                    this.onChangeCartValue(num, item, false);
                  }}
                  onIncrease={(num) => {
                    this.onChangeCartValue(num, item, true);
                  }}
                  onChange={(num) => {
                    // console.log(num);
                  }}
                />
              </>
            ) : (
              <TouchableOpacity onPress={() => this.onCartPress(item)}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </TouchableOpacity>
        {/* } */}
        {item.on_sale && (
          <View style={styles.labelSticker}>
            <Text style={styles.stickerText}>Save {Number(item.discount).toFixed(1)}%</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  renderEmptyDataView = () => {
    return (
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image source={IMG_CONST.NOT_FOUND_ICON} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>No Products found</Text>
          <Text style={styles.youhave}>Try searching with a different terms or browse other categories.</Text>
        </View>
        <GreenButton
          title="BROWSE PRODUCTS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  };

  getStyleForiOS = () => {
    if (Platform.OS === 'ios') {
      return {
        marginBottom: scale(10),
      };
    } else {
      // return {paddingBottom: scale(35)};
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.mainContainer, this.getStyleForiOS()]}>
        { 
        // (this.state.isLoading && !this.props.isFetching) ?
        //     <View style={styles.loaderContainer}>
        //     <Animatable.Image
        //       source={IMG_CONST.APP_LOADER_LOGO_ICON}
        //       animation="pulse"
        //       easing="ease-out"
        //       iterationCount="infinite"
        //       style={styles.loader}
        //     />
        //   </View> :
           !this.state.noProductFound ? (
          <>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
            <View style={styles.sortHeader}>
              <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', flexDirection: 'row', height: hp('6%')}}
                onPress={() => this.setState({showSortByModal: true})}>
                <Image source={R.images.filter} style={{height: hp('2%'), width: hp('2%'), alignSelf: 'center'}} />
                <Text style={styles.TitleSort}>Sort</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}
                onPress={() => {
                  if (this.props.route.params && this.props.route.params.isFromExplore) {
                    this.props.navigation.navigate('Filter', {
                      onPressFilter: (filterQueryParams) => this.onPressFilter(filterQueryParams),
                      isFromSearchListing: false,
                      isFromExplore: this.props.route.params.isFromExplore,
                      categoryID: this.props.route.params.isFromCategory
                        ? this.props.route.params.categoryData.id
                        : this.props.route.params.categoryData.category_id,
                    });
                  } else {
                    this.props.navigation.navigate('Filter', {
                      onPressFilter: (filterQueryParams) => this.onPressFilter(filterQueryParams),
                      isFromSearchListing: false,
                      isFromExplore: this.props.route.params.isFromExplore,
                    });
                  }
                }}>
                <Image source={R.images.short} style={{height: hp('2.5%'), width: hp('2.1%'), alignSelf: 'center'}} />
                <Text style={styles.TitleSort}>Filter</Text>
              </TouchableOpacity>
            </View>
            {this.props.route.params.isFromSearch && <Text style={styles.showingResults}>Showing {this.state.productList.length} Results</Text>}
            {this.renderSortByModal()}
            {
            
            this.state.productList.length > 0 ? 
              <View style={styles.productGrid}>
                <ProductGrid
                  name={''}
                  data={this.state.productList}
                  onPress={(item) => this.props.navigation.navigate('ProductDescription', {productData: item})}
                  onPressProductListing={() => this.props.navigation.replace('ProductListing', {screenName: 'Similar Products'})}
                  onAddToCart={(value, item, selectedAttributes) => this.onAddToCart(value, item, selectedAttributes)}
                  onRemoveFromCart={(value, item, selectedAttributes) => this.onRemoveFromCart(value, item,selectedAttributes)}
                  updateQuantiyInCart={(value, item, selectedAttributes) => this.updateQuantiyInCart(value, item, selectedAttributes)}
                  onAddToWishlist={(item) => this.onAddToWishlist(item)}
                  onRemoveFromWishlist={(item) => this.onRemoveFromWishlist(item)}
                  hideViewAll
                  showErrorMessage={(msg) => this.props.showErrorModal(msg)}

                 
                  onEndReached={() => this.onEndReached()}
                  // ListFooterComponent={() => this._renderSearchResultsFooter()}
                  onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
                  pageLoader = {this.state.pageLoader}
                  pageCount = {this.state.pageCount}
                />
              </View> : null
            }
            {/* <View style={this.state.productList.length ===1 ? styles.listContainerOne : styles.listContainer}>
                    <FlatList
                        numColumns={2}
                        extraData={this.state}
                        data={this.state.productList}
                        renderItem={this.renderListItem}
                        keyExtractor={this._keyExtractor}
                        contentContainerStyle={styles.contentContainer}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => this.onEndReached()}
                        // ListFooterComponent={() => this._renderSearchResultsFooter()}
                        onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
                    />
                    {this.state.pageLoader && this.state.pageCount > 1 && this._renderSearchResultsFooter()}
                </View> */}
          </>
        ) : (
          this.renderEmptyDataView()
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    showNotificationDot: state.cart.showNotificationDot,
    cartCount: state.cart.cartCount,
    isFetchingProduct: state.common.isFetchingProduct
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getProductList(data, successCallBack, failureCallBack)),
    getAllProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getAllProductList(data, successCallBack, failureCallBack)),
    getFilterProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getFilterProductList(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.addToCart(data, successCallBack, failureCallBack)),
    updateQuantiyInCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.updateQuantiyInCart(data, successCallBack, failureCallBack)),
    removeFromCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.removeFromCart(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    createCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    addToWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.addToWishlist(data, successCallBack, failureCallBack)),
    removeFromWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.removeFromWishlist(data, successCallBack, failureCallBack)),
    setSelectedAttributes: (data) => dispatch(homeActions.setSelectedAttributes(data)),
    startSpinnerForProduct: () => dispatch(commonActions.startSpinnerForProduct()),
    stopSpinnerForProduct: () => dispatch(commonActions.stopSpinnerForProduct()),
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
