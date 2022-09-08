import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../R';
import { LatestProductList } from '../../theme/constants';
import styles from './WishlistStyle';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import InputSpinner from "react-native-input-spinner";
import GreenButton from '../../components/GreenButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import * as homeActions from '../../redux/actions/homeActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as wishlistActions from '../../redux/actions/wishlistActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import scale from '../../utils/Scale';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import LoadingImage from 'react-native-image-progress';
import LinearGradient from 'react-native-linear-gradient';
import { ProductGrid } from '../../components/homeComponents/ProductGrid/ProductGrid';
import Toast from 'react-native-simple-toast';
import * as Sentry from '@sentry/react-native';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShowModal: false,
      ShowModal: false,
      wishlist_item: [LatestProductList],
      RefreshFlatList: false,
      wishlistData: [],
      add_to_cart: [LatestProductList],
      noProductFound: false,
      pageCount: 1,
      limit: 15,
      loading: true,
      pageLoader: false,
      pullToRefresh: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      notFinalLoad: false,
    };
  }

  displayModal(value) {
    this.setState({ setShowModal: value })
  }

  onHeartPress(data) {
    try {
      if (!data.is_wishlisted)
        this.onAddToWishlist(data);
      else
        this.onRemoveFromWishlist(data);
    } catch (err) {
      Sentry.captureException(err);
    }
    // data.wishlist_item = !data.wishlist_item;
    // var index = this.state.wishlist_item.findIndex(x => x.key == data.key);
    // this.state.wishlist_item[index] = data;
    // // this.setState({wishlist_item:!this.state.wishlist_item});
    // this.setState({ RefreshFlatList: !this.state.RefreshFlatList });
  };

  onCartPress(data) {
    try {
      data.add_to_cart = !data.add_to_cart;
      var index = this.state.add_to_cart.findIndex(x => x.key == data.key);
      this.state.add_to_cart[index] = data;
      // setRememberPin(add_to_cart);
      this.setState({ RefreshFlatList: !this.state.RefreshFlatList });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      try {
        this.setNavigationHeaderConfiguration();
        this.refreshCart();
        this.setState({ wishlistData: [], noProductFound: false }, () => {
          this.getWishlistData();
        });
      } catch (err) {
        Sentry.captureException(err);
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  setNavigationHeaderConfiguration = () => {
    const { cartHasProductFlag, cartCount } = this.props;
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white },
      headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Wishlist</Text></View>),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Cart')}>
          <Image
            source={IMG_CONST.CART_BLACK_ICON}
            style={styles.wishlistCartIcon}
          />
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
                end: scale(15),
                justifyContent: 'center',
                alignItems: 'center'
              }}
            ><Text style={{ fontSize: scale(10), color: COLOR_CONST.white, fontFamily: FONTS.GTWalsheimProRegular }}>{cartCount}</Text></View>
          )}
        </TouchableOpacity>
      ),
    });
  }

  updatewishlistDatatAfterRemoveFromWishList=(productId)=>{
let filteredArray=this.state.wishlistData.filter((item)=>item.id!=productId)    
  this.setState({wishlistData:filteredArray});
}

updatewishlistDataAfterAddInWishList=(productId)=>{

    let UpdatedArray=this.state.wishlistData.map((item)=>{
      if(item.id==productId){
        return Object.assign(item,{
          is_wishlisted:true
        })
      }
      return item;
    })
    this.setState({wishlistData:UpdatedArray});
  }

  updatewishlistDataAfterremoveFromCart=(value, productVarientId, productId)=>{
    let UpdatedArray=this.state.wishlistData.map((item)=>{
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
     this.setState({wishlistData:UpdatedArray});
  }
  updatewishlistDataAfterUpdateCart=(productVarientId, value)=>{
   
    let UpdatedArray=this.state.wishlistData.map((item)=>{
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
    this.setState({wishlistData:UpdatedArray});
  }

  updatewishlistDataAfterAddToCart=(productVarientId)=>{
    let UpdatedArray=this.state.wishlistData.map((item)=>{
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
    this.setState({wishlistData:UpdatedArray});
  }

  getWishlistData = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        pageCount: this.state.pageCount,
        userID: userID,
      }
      this.props.createCart(data, (res) => this.createCartSuccessCallBack(res), (error) => this.createCartFailureCallBack(error));
      this.props.getWishlistData(data, (res) => this.getWishlistDataSuccessCallBack(res), (error) => this.getWishlistDataFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createCartSuccessCallBack = (res) => {
    try {
      console.log('@@@ Create Cart Success CallBack ===================', res, this.props.cartData);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createCartFailureCallBack = (error) => {
    try {
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
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getWishlistDataSuccessCallBack = (res) => {
    try {
      console.log('@@@ wishlistData List ==========', this.state.pageCount)
      console.log('@@@ wishlistData List ==========', res.data)

      this.setState({
        wishlistData: this.state.wishlistData.concat(res.data),
        pageLoader: false,
        lastLoadCount: this.state.wishlistData.concat(res.data).length,
        onEndReachedCalledDuringMomentum: this.state.wishlistData.concat(res.data).length >= this.state.limit ? true : false,
        notFinalLoad: this.state.wishlistData.concat(res.data).length >= this.state.limit ? true : false
      }, () => {
        if (this.state.wishlistData.length === 0) {
          console.log('@@@ Wishlist ========', this.state.wishlistData)
          this.setState({ noProductFound: true });
        }
      });
      console.log('@@@ Get Wishlist List Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getWishlistDataFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Wishlist List Error CallBack ===================', error);
      if (error) {
        setTimeout(() => {
          this.setState({ noProductFound: true });
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

  onAddToWishlist = async (item) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        userID: userID,
      }
      this.props.addToWishlist(data, (res) => this.addToWishlistSuccessCallBack(res,item.id), (error) => this.addToWishlistFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToWishlistSuccessCallBack = (res, productId) => {
    this.updatewishlistDataAfterAddInWishList(productId);
    console.log('@@@ Add To WishList Success CallBack ===================', res);
    // this.setState({ wishlistData: [] }, () => {
    //   this.getWishlistData();
    // });
  }

  addToWishlistSuccessCallBack = (res) => {
    try {
      console.log('@@@ Add To WishList Success CallBack ===================', res);
      this.setState({ wishlistData: [] }, () => {
        this.getWishlistData();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToWishlistFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ noProductFound: true });
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

  onRemoveFromWishlist = async (item) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        userID: userID,
      }
      this.props.removeFromWishlist(data, (res) => this.removeFromWishlistSuccessCallBack(res,item.id), (error) => this.removeFromWishlistFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromWishlistSuccessCallBack = (res, productId) => {
    console.log('@@@ Remove From WishList Success CallBack ===================', res);
    setTimeout(() => {
      this.props.showErrorModal('The Item has been removed from the wishlist.');
      setTimeout(async() => {
        this.props.hideErrorModal();
      }, 2000);
    }, 0);
    this.updatewishlistDatatAfterRemoveFromWishList(productId);
    // this.setState({ wishlistData: [] }, () => {
    //   this.getWishlistData();
    // });
  }

  removeFromWishlistSuccessCallBack = (res) => {
    try {
      console.log('@@@ Remove From WishList Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('The Item has been removed from the wishlist.');
        setTimeout(async () => {
          this.props.hideErrorModal();
        }, 2000);
      }, 0);
      this.setState({ wishlistData: [] }, () => {
        this.getWishlistData();
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromWishlistFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ noProductFound: true });
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

  onAddToCart = async (value, item, selectedProduct) => {
    try {
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
        cartId: this.props.cartData.order.id
      }
      if (productVarientId) {
        data.product_variant_id = productVarientId;
      }
      console.log('@@@ onAdd Data ==========', data);
      this.props.addToCart(data, (res) => this.addToCartSuccessCallBack(res, productVarientId), (error) => this.addToCartFailureCallBack(error, productVarientId));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartSuccessCallBack = (res, productVarientId) => {
    try {
      console.log('@@@ Add to Cart Success CallBack ===================', res);
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      Toast.showWithGravity('Product Added to cart successfully.', Toast.SHORT, Toast.BOTTOM);
      this.refreshCart();
      this.updatewishlistDataAfterAddToCart(productVarientId);               
      // this.setState({ wishlistData: [] }, () => {
      //  // this.updatewishlistDataAfterAddToCart(productVarientId);
      //   this.getWishlistData();
      // });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartFailureCallBack = (error, productVarientId) => {
    try {
      this.refreshCart();
      // this.setState({ wishlistData: [], pageCount: 1, }, () => {
      //   this.getWishlistData();
      // });
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
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

  getOrderIdForProduct = (product) => {
    try {
      const { cartData } = this.props;
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
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onRemoveFromCart = async (value, item, selectedProduct) => {
      try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let productVarientId = undefined;
      if (item.product_variants.length > 0) {
        productVarientId = selectedProduct?.id;
      }
      const orderId = this.getOrderIdForProduct(item);
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        quantity: value,
        userID: userID,
        order_item_id: orderId,
        cartId: this.props.cartData.order.id
      }
      console.log('@@@ onRemove Data ==========', data);
      this.props.removeFromCart(data, (res) => this.removeFromCartSuccessCallBack(res,value,productVarientId,item.id), (error) => this.removeFromCartFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromCartSuccessCallBack = (res,value,productVarientId, productId) => {
    try {
      console.log('@@@ Remove From Cart Success CallBack ===================');
      this.refreshCart();
      // this.setState({ wishlistData: [] }, () => {
        this.updatewishlistDataAfterremoveFromCart(value,productVarientId, productId)
        Toast.showWithGravity('Product removed from cart successfully.', Toast.SHORT, Toast.BOTTOM);
        // this.getWishlistData();
      // });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromCartFailureCallBack = (error) => {
    try {
      this.refreshCart();
      // this.setState({ wishlistData: [], pageCount: 1, }, () => {
      //   this.getWishlistData();
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
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCart = async (value, item, selectedProduct) => {
    try {
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
        cartId: this.props.cartData.order.id
      }
      if (productVarientId) {
        data.product_variant_id = productVarientId;
      }
      console.log('@@@ onUpdateQuantity Data ==========', data);
      this.props.updateQuantiyInCart(data, (res) => this.updateQuantiyInCartSuccessCallBack(res,productVarientId,value), (error) => this.updateQuantiyInCartFailureCallBack(error,productVarientId));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartSuccessCallBack = (res, productVarientId,value) => {
    try {
      console.log('@@@ Update quantity in Cart Success CallBack ===================');
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
       Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
      this.updatewishlistDataAfterUpdateCart(productVarientId, value)
      // this.setState({ wishlistData: [] }, () => {
      //   Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
      //   this.getWishlistData();
      // });
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  updateQuantiyInCartFailureCallBack = (error, productVarientId) => {
    try {
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      // this.setState({ wishlistData: [], pageCount: 1, }, () => {
      //   this.getWishlistData();
      // });
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
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

  refreshCart = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        userID: userID,
      }
      this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onChangeCartValue = (value, item, isAdd) => {
    try {
      console.log('@@@ value =======', value, item)
      if (isAdd) {
        if (value > 1 && item.cart_quantity) {
          this.updateQuantiyInCart(value, item)
        } else {
          this.onAddToCart(value, item)
        }
      } else {
        if (value === 0)
          this.onRemoveFromCart(value, item)
        else
          this.updateQuantiyInCart(value, item)
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }
  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({ onEndReachedCalledDuringMomentum: false });
  onEndReached = () => {
    try {
      let categoryID = 1;
      console.log('@@@ On End Reached ==============', this.state.onEndReachedCalledDuringMomentum, this.state.lastLoadCount, this.state.limit, this.state.notFinalLoad)
      if (!this.state.onEndReachedCalledDuringMomentum) {
        this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
          // setTimeout(() => {
            if (
              this.state.lastLoadCount >= this.state.limit &&
              this.state.notFinalLoad
            ) {
              this.setState(
                {
                  pageLoader: true,
                  pageCount: this.state.pageCount + 1
                },
                async () => {
                  let userID = await AsyncStorage.getItem('USER_ID');
                  let data = {
                    uuid: DeviceInfo.getUniqueId(),
                    pageCount: this.state.pageCount,
                    userID: userID,
                  }
                  this.props.getWishlistData(data, (res) => this.getWishlistDataSuccessCallBack(res), (error) => this.getWishlistDataFailureCallBack(error));
                });
            }
          // }, 1500);
        });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDescription', { productData: item })} style={styles.productGridStyle}>
        <TouchableOpacity onPress={() => this.onHeartPress(item)} style={styles.touchableOpacityStyle}>
          {item.is_wishlisted ? (
            <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
          ) : (
            <Image source={IMG_CONST.UN_SELECTED_HEART} style={styles.heartIcon} />
          )}
        </TouchableOpacity>
        <View style={styles.imageMainContainer}>
          <LoadingImage resizeMode={'contain'} source={{ uri: item.images[0] ? item.images[0].image : '' }} style={styles.BottalImage} />
          <Text numberOfLines={1} style={styles.titleNameStyle}>{item.name}</Text>
          {item.on_sale ? (
            <View style={styles.discountRow}>
              <Text style={styles.price}>₹ {item.price_including_tax}</Text>
              <Text style={styles.discountPrice}> ₹ {item.actual_price}</Text>
            </View>
          ) : (
            <Text style={styles.price}>₹ {item.price_including_tax}</Text>
          )}
        </View>

        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDescription',{ productData: item })} >
                         <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
                         <Text style={styles.addToCartText}>View Product</Text>
                         </LinearGradient>
                    </TouchableOpacity> */}

        <TouchableOpacity onPress={() => this.onCartPress(item)}>
          <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
            {(item.cart_quantity || item.add_to_cart) ? (<>
              <InputSpinner
                rounded={false}
                showBorder={true}
                editable={false}
                max={9}
                min={0}
                step={1}
                fontSize={13}
                onMin={() => this.onCartPress(item)}
                style={styles.spinner}
                colorPress={COLOR_CONST.boderdarkishBlueTwo}
                colorMax={"#f04048"}
                background={COLOR_CONST.white}
                colorMin={COLOR_CONST.white}
                // colorMax={'red'}
                color={COLOR_CONST.white}
                prepend={<Text style={styles.qtyStyle}>Qty :</Text>}
                buttonTextColor={COLOR_CONST.coolGreyTwo}
                textColor={COLOR_CONST.charcoalGrey}
                value={item.cart_quantity ? item.cart_quantity : '0'}
                onDecrease={(num) => {
                  this.onChangeCartValue(num, item, false)
                }}
                onIncrease={(num) => {
                  this.onChangeCartValue(num, item, true)
                }}
                onChange={(num) => {
                  console.log(num);
                }}
              />
            </>) : (
              <TouchableOpacity onPress={() => this.onCartPress(item)}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </TouchableOpacity>
        {item.on_sale && <View style={styles.labelSticker}>
          <Text style={styles.stickerText}>Save {Number(item.discount).toFixed(1)}%</Text>
        </View>}
      </TouchableOpacity>
    );
  };

  renderEmptyDataView = () => {
    return (
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image source={IMG_CONST.EMPTY_WISHLIST_ICON} style={styles.emptyAddressIcon} />
          <Text style={styles.noAnyOrder}>Your wishlist is empty!</Text>
          <Text style={styles.youhave}>Explore more and shortlist some items</Text>
        </View>
        <GreenButton
          title="BROWSE PRODUCTS"
          customStyle={styles.loginButton}
          customTxtStyle={styles.loginText}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {!this.state.noProductFound ?
          <>
        {/* {<Text style={styles.showingResults}>Showing {this.state.wishlistData.length} Results</Text>} */}
        <View style={this.state.wishlistData.length ===1 ? styles.listContainerOne : styles.listContainer}>
        <ProductGrid 
              name={''} 
              data={this.state.wishlistData} 
              onPress={(item) => this.props.navigation.replace('ProductDescription', { productData: item })} 
              onPressProductListing={() => this.props.navigation.replace('ProductListing', { screenName: 'Similar Products'})} 
              onAddToCart={(value, item, selectedAttributes) => this.onAddToCart(value, item, selectedAttributes)}
              onRemoveFromCart={(value, item, selectedAttributes) => this.onRemoveFromCart(value, item, selectedAttributes)}
              updateQuantiyInCart={(value, item, selectedAttributes) => this.updateQuantiyInCart(value, item, selectedAttributes)}
              onAddToWishlist={(item) => this.onAddToWishlist(item)}
              onRemoveFromWishlist={(item) => this.onRemoveFromWishlist(item)}
              hideViewAll
              showErrorMessage={(msg)=>this.props.showErrorModal(msg)}
              onEndReached={() => this.onEndReached()}
              onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
              pageCount = {this.state.pageCount}
            />
         
          {/* <FlatList
            numColumns={2}
            extraData={this.state.RefreshFlatList}
            data={this.state.wishlistData}
            renderItem={this.renderListItem}
          /> */}
            </View>
          </> : this.renderEmptyDataView()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    cartCount: state.cart.cartCount,
    cartHasProductFlag: state.cart.cartHasProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getWishlistData: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.getWishlistData(data, successCallBack, failureCallBack)),
    addToWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.addToWishlist(data, successCallBack, failureCallBack)),
    removeFromWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.removeFromWishlist(data, successCallBack, failureCallBack)),
    getAllProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getAllProductList(data, successCallBack, failureCallBack)),
    getFilterProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getFilterProductList(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.addToCart(data, successCallBack, failureCallBack)),
    updateQuantiyInCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.updateQuantiyInCart(data, successCallBack, failureCallBack)),
    removeFromCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.removeFromCart(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    createCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    setSelectedAttributes: (data) => dispatch(homeActions.setSelectedAttributes(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
