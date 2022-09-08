import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import COLOR_CONST from '../../../app/theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';
import {HelpCenterList} from '../../theme/constants';
import GreenButton from '../../components/GreenButton';
import styles from './CartStyle';
import * as Animatable from 'react-native-animatable';
import {verticalScale} from '../../utils/Scale';
import R from '../../R';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import * as commonActions from '../../redux/actions/commonActions';
import * as cartActions from '../../redux/actions/cartActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import scale from '../../utils/Scale';
import LoadingImage from 'react-native-image-progress';
import CachedImage from '../../components/CachedImage';
import Toast from 'react-native-simple-toast';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myOrderList: [],
      productList: [],
      showCouponCodeModal: false,
      noProductFound: false,
      isFetchingData: true,
      cartQuantity: [],
      cartData: null,
      codeValue: '',
      isCouponApplied: false,
      isValidCoupon: false,
      finalAmount: 0,
      discountValue: 0,
      applyingCoupon: false,
      couponData: null,
      showGuestModal: false,
      couponCodeErrorMsg: '',
      availbleCouponList: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setNavigationHeaderConfiguration();
      this.getCartData();
      this.getAvailableCoupons();
      BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  getCartData = async () => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
      cartId: this.props.cartData.order.id,
    };
    this.props.showCartData(
      data,
      (res) => this.showCartDataSuccessCallBack(res),
      (error) => this.showCartDataFailureCallBack(error),
    );
    this.props.cartHasProduct(data, (res) => {}, (error) => {});
  };

  showCartDataSuccessCallBack = (res) => {
    let localCartValue = [];
    console.log('@@@ Show Cart Data Success CallBack ===================', res);
    let cartData = res.order;
    this.setState({ myOrderList: cartData.order_items, cartData: cartData,finalAmount: cartData.total }, () => {
        if (cartData.coupon) {
          this.setState({ couponData: cartData.coupon, isCouponApplied: true, isValidCoupon: true, codeValue: cartData.coupon.code, discountValue: cartData.applied_discount });
        }
        this.state.myOrderList.map((item) => {
          localCartValue.push({
            id: item.id,
            quantity: item.quantity,
            subscription_quantity: item.subscription_quantity,
          });
        });
        this.setState({cartQuantity: localCartValue});
        if (this.state.myOrderList.length === 0) {
          this.setState({noProductFound: true});
        } else {
          this.setState({isFetchingData: false, noProductFound: false});
        }
      },
    );
  };

  showCartDataFailureCallBack = (error) => {
    console.log('@@@ Show Cart Data Failure CallBack ===================',error);
    if (error) {
      setTimeout(() => {
        this.setState({noProductFound: true});
        // this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  getAvailableCoupons = async () => {
    let data = {};
    this.props.getAvailableCoupons(data, (res) => this.getAvailableCouponsSuccessCallBack(res),(error) => this.getAvailableCouponsFailureCallBack(error));
  };

  getAvailableCouponsSuccessCallBack = (res) => {
    console.log('@@@ Get Available Coupons Success CallBack ===================', res);
    this.setState({
      availbleCouponList: res.data.coupons
    })
  };

  getAvailableCouponsFailureCallBack = (error) => {
    console.log('@@@ Get Available Coupons Failure CallBack ===================',error);
    if (error) {
      setTimeout(() => {
        // this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  onUpdateCartValue = (isAdd, index, item) => {
    console.log(this.state.isCouponApplied);
    if (this.state.isCouponApplied) {
      console.log('coupon applied');
      this.removeCoupon();
    }
    let localCarts = this.state.cartQuantity;
    let selectedCart = localCarts.findIndex(
      (cartItem) => cartItem.id === item.id,
    );
    let value;
    console.log('@@@ Local Parts ============', item, localCarts[selectedCart]);
    if (item.subscription_package) {
      value = localCarts[selectedCart].subscription_quantity;
    } else {
      value = localCarts[selectedCart].quantity;
    }
    console.log('@@@ Value =========', value, item.max_qty_to_be_sold);
    if(isAdd && item.max_qty_to_be_sold !== 0 && (value >= item.max_qty_to_be_sold)) {
      this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
      return;
    }
    if (isAdd) {
      value = value + 1;
      if (item.subscription_package) {
        localCarts[selectedCart].subscription_quantity = value;
      } else {
        localCarts[selectedCart].quantity = value;
      }
      this.setState({cartQuantity: localCarts});
      this.onChangeCartValue(value, item, isAdd);
    } else {
      value = value - 1;
      if (value < 0) {
        return;
      }
      if (item.subscription_package) {
        localCarts[selectedCart].subscription_quantity = value;
      } else {
        localCarts[selectedCart].quantity = value;
      }
      this.setState({cartQuantity: localCarts});
      this.onChangeCartValue(value, item, isAdd);
    }
  };

  onChangeCartValue = (value, item, isAdd) => {
    console.log('Cahnge value', value);
    if (item.subscription_package) {
      if (isAdd) {
        if (item.subscription_quantity) {
          this.updateQuantiyInCart(value, item);
        } else {
          this.onAddToCart(value, item);
        }
      } else {
        if (value === 0) {
          this.onRemoveFromCart(value, item);
        } else {
          this.updateQuantiyInCart(value, item);
        }
      }
    } else {
      if (isAdd) {
        if (item.quantity) {
          this.updateQuantiyInCart(value, item);
        } else {
          this.onAddToCart(value, item);
        }
      } else {
        if (value === 0) {
          this.onRemoveFromCart(value, item);
        } else {
          this.updateQuantiyInCart(value, item);
        }
      }
    }
  };

  onAddToCart = async (value, item) => {
    if (item.subscription_package) {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.product.id,
        userID: userID,
        cartId: this.props.cartData.order.id,
        subscription_quantity: value,
        subscription_package: item.subscription_package,
        subscription_period: item.subscription_period,
      };
      console.log('@@@ onAdd Subscribe Data ==========', data);
      this.props.addToCart(data,(res) => this.addToCartSuccessCallBack(res),(error) => this.addToCartFailureCallBack(error));
    } else {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.product.id,
        quantity: value,
        userID: userID,
        cartId: this.props.cartData.order.id,
      };
      console.log('@@@ onAdd Data ==========', data);
      this.props.addToCart(data, (res) => this.addToCartSuccessCallBack(res), (error) => this.addToCartFailureCallBack(error));
    }
  };

  addToCartSuccessCallBack = (res) => {
    console.log('@@@ Add to Cart Success CallBack ===================', res);
    this.getCartData();
  };

  addToCartFailureCallBack = (error) => {
    this.getCartData();
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

  onRemoveFromCart = async (value, item) => {
    let isProductVarient = item.product_variant !== null;
    if (this.state.isCouponApplied) {
      this.removeCoupon();
    }
    console.log(item);
    let userID = await AsyncStorage.getItem('USER_ID');
    if (item.subscription_package) {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.product.id,
        order_item_id: item.id,
        userID: userID,
        cartId: this.props.cartData.order.id,
        subscription_quantity: value,
        subscription_package: item.subscription_package,
        subscription_period: item.subscription_period,
      };
      console.log('@@@ onRemove Subscribe Data ==========', data);
      this.props.removeFromCart(data, (res) => this.removeFromCartSuccessCallBack(res),(error) => this.removeFromCartFailureCallBack(error));
    } else {
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.product.id,
        order_item_id: item.id,
        quantity: value,
        userID: userID,
        cartId: this.props.cartData.order.id,
      };
      if (isProductVarient) {
        data.product_variant_id = item.product_variant.id;
      }
      console.log('@@@ onRemove Data ==========', data);
      this.props.removeFromCart(data,(res) => this.removeFromCartSuccessCallBack(res),(error) => this.removeFromCartFailureCallBack(error));
    }
  };

  removeFromCartSuccessCallBack = (res) => {
    console.log('@@@ Remove From Cart Success CallBack ===================');
    Toast.showWithGravity('Product removed from cart successfully.', Toast.SHORT, Toast.BOTTOM);
    this.getCartData();
  };

  removeFromCartFailureCallBack = (error) => {
    this.getCartData();
    if (error) {
      setTimeout(() => {
        // this.props.showErrorModal(error);
      }, 0);
    } else {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  updateQuantiyInCart = async (value, item) => {
    let isProductVarient = item.product_variant !== null;
    let userID = await AsyncStorage.getItem('USER_ID');
    if (item.subscription_package) {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.product.id,
        userID: userID,
        cartId: this.props.cartData.order.id,
        subscription_quantity: value,
        subscription_package: item.subscription_package,
        subscription_period: item.subscription_period,
      };
      console.log('@@@ onUpdateQuantity Subscribe Data ==========', data);
      this.props.updateQuantiyInCart(data,(res) => this.updateQuantiyInCartSuccessCallBack(res),(error) => this.updateQuantiyInCartFailureCallBack(error));
    } else {
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.product.id,
        quantity: value,
        userID: userID,
        cartId: this.props.cartData.order.id,
      };
      if (isProductVarient) {
        data.product_variant_id = item.product_variant.id;
      }
      console.log('@@@ onUpdateQuantity Data ==========', data);
      this.props.updateQuantiyInCart(data, (res) => this.updateQuantiyInCartSuccessCallBack(res), (error) => this.updateQuantiyInCartFailureCallBack(error));
    }
  };

  updateQuantiyInCartSuccessCallBack = (res) => {
    console.log('@@@ Update quantity in Cart Success CallBack ===================');
    this.getCartData();
    Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
  };

  updateQuantiyInCartFailureCallBack = (error) => {
    this.getCartData();
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

  onChangeCoupon = () => {
    console.log('@@@ state ========', this.state.cartData);
    this.setState({
      finalAmount: this.state.cartData.total,
      discountValue: 0,
      isCouponApplied: false,
      isValidCoupon: false,
    });
  };

  applyCoupon = () => {
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      cart_value: this.state.cartData.sub_total,
      code: this.state.codeValue,
      cart_id: this.props.cartData.order.id,
    };
    this.setState({applyingCoupon: true, couponData: null });
    console.log('@@@ apply Coupon Data ==========', data.cart_value);
    this.props.applyCoupon(data,(res) => this.applyCouponSuccessCallBack(res),(error) => this.applyCouponFailureCallBack(error));
  };

  applyCouponSuccessCallBack = (res) => {
    console.log('@@@ Apply Coupon Cart Success CallBack ===================',res);
    let couponData = res.data;
    this.setState({isCouponApplied: true, isValidCoupon: true, applyingCoupon: false},
      () => {
        setTimeout(() => {
          this.setState({showCouponCodeModal: false}, async () => {
            let userID = await AsyncStorage.getItem('USER_ID');
            let data = {
              uuid: DeviceInfo.getUniqueId(),
              userID: userID,
              cartId: this.props.cartData.order.id,
            };
            this.props.showCartData(
              data,
              (res) => this.showCartDataSuccessCallBack(res),
              (error) => this.showCartDataFailureCallBack(error),
            );
          });
        }, 2000);
      },
    );
  };

  applyCouponFailureCallBack = (error) => {
    console.log('@@@ Apply Coupon Cart Failure CallBack ===================',error);
    if (error) {
      this.setState({applyingCoupon: false});
      this.setState({
        isValidCoupon: false,
        isCouponApplied: true,
        finalAmount: this.state.cartData.sub_total,
        couponCodeErrorMsg: error,
      });
    } else {
      setTimeout(() => {
        this.setState({applyingCoupon: false});
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  removeCoupon = () => {
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      cart_id: this.props.cartData.order.id,
    };
    console.log('@@@ Remove Coupon Data ==========', data);
    this.props.removeCoupon(data,(res) => this.removeCouponSuccessCallBack(res),(error) => this.removeCouponFailureCallBack(error));
  };

  removeCouponSuccessCallBack = (res) => {
    console.log('@@@ Remove Coupon Cart Success CallBack ===================',res);
    let couponData = res.data;
    this.setState(
      {isCouponApplied: false, isValidCoupon: false, applyingCoupon: false, couponData: null },
      () => {
        setTimeout(() => {
          this.setState({showCouponCodeModal: false}, async () => {
            let userID = await AsyncStorage.getItem('USER_ID');
            let data = {
              uuid: DeviceInfo.getUniqueId(),
              userID: userID,
              cartId: this.props.cartData.order.id,
            };
            this.props.showCartData(
              data,
              (res) => this.showCartDataSuccessCallBack(res),
              (error) => this.showCartDataFailureCallBack(error),
            );
          });
        }, 2000);
      },
    );
  };

  removeCouponFailureCallBack = (error) => {
    console.log('@@@ Remove Coupon Cart Failure CallBack ===================', error);
    if (error) {
      setTimeout(() => {
        this.props.showErrorModal('Network Error!');
      }, 0);
    } else {
      setTimeout(() => {
        this.setState({applyingCoupon: false});
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  checkOrderItemAvailability = async () => {
    if (!this.props.profileData) {
      this.setState({showGuestModal: true});
      return;
    }
    // let userID = await AsyncStorage.getItem('USER_ID');
    // let data = {
    //   uuid: DeviceInfo.getUniqueId(),
    //   cartId: this.props.cartData.order.id,
    //   userID: userID,
    // };
    // this.setState({ applyingCoupon: true });
    // this.props.checkOrderItemAvailability(data, (res) => this.checkOrderItemAvailabilitySuccessCallBack(res), (error) => this.checkOrderItemAvailabilityFailureCallBack(error));
    this.props.navigation.navigate('ConfirmOrderScreen', {isFromBuyNow: false});
    // this.props.navigation.navigate('CheckoutScreen', {isFromBuyNow: false});
  };

  checkOrderItemAvailabilitySuccessCallBack = (res) => {
    console.log('@@@ Check Product Availability Success CallBack ===================',res);
    this.props.navigation.navigate('ConfirmOrderScreen');
    // this.props.navigation.navigate('CheckoutScreen', {isFromBuyNow: false});
  };

  checkOrderItemAvailabilityFailureCallBack = (error) => {
    console.log('@@@ Check Product Availability Failure CallBack ===================');
    if (error) {
      this.setState({applyingCoupon: false});
      this.setState({
        isValidCoupon: false,
        isCouponApplied: true,
        finalAmount: this.state.cartData.sub_total,
      });
    } else {
      setTimeout(() => {
        this.setState({applyingCoupon: false});
        this.props.showErrorModal('Network Error!');
      }, 0);
    }
  };

  setNavigationHeaderConfiguration = () => {
    const {showNotificationDot} = this.props;
    this.props.navigation.setOptions({
      headerStyle: {backgroundColor: COLOR_CONST.white},
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitleStyle}>Review Cart</Text>
        </View>
      ),
      headerLeft: () => (
        this.props.route.name == "HomeCart" ? <View/> :
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backButton}>
          <Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('NotificationScreen')}>
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
                end: scale(22),
              }}
            />
          )}
        </TouchableOpacity>
      ),
    });
  };

  renderEmptyDataView = () => {
    return (
      <View style={styles.emtpyAddressContainer}>
        <View style={styles.cartempty}>
          <Image
            source={IMG_CONST.CART_EMPTY_ICON}
            style={styles.emptyAddressIcon}
          />
          <Text style={styles.noAnyOrder}>Your cart is empty !</Text>
          <Text style={styles.youhave}>
            You haven’t added any items in your cart yet !
          </Text>
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

  onPressProduct = (item) => {
    console.log(item);
    this.props.navigation.navigate('ProductDescription', { productData: item.product });
  };

  getVarientString = (properties) => {
    console.log('@@@ Prop =============', properties);
    let varientString = '';
    if(properties) {
      properties.map((property, index) => {
        varientString = `${varientString}${property.variant_name}: ${property.property_name}`;
        if (!(index === properties.length - 1)) {
          varientString += `,${'\n'}`;
        }
      });
    }
    return varientString;
  };
  renderIndicator = (progress, indeterminate) => {
    return(
      <View style={{backgroundColor:'#fff'}}>
        {indeterminate?(<Image source={IMG_CONST.LOGO_ICON} style={styles.logo_image}/>)
        :(<Text>{progress * 100}</Text>)}
      </View>
    )
  }
  renderMyOrderCell = (item, index) => {
    console.log('@@@ item ============', index, item.product_variant);
    let isProductVarient = false;
    if(item.product_variant && item.product.product_variants && item.product.product_variants.length > 0){
      isProductVarient = true
    }
    let productImage = '';
    if (isProductVarient) {
      item.product_variant.images.map((variant) => {
        if(variant.is_default){
          productImage = variant.image;
          console.log('@@@ Product ==============', productImage, index)
        } else {
          productImage = item.product_variant.images[0].image;
        }
      })
    } else {
      productImage = item.product&&item.product.images[0]&&item.product.images[0].image;
    }
    return (
      <View style={styles.cellContainer}>
        <TouchableOpacity
          onPress={() => this.onPressProduct(item)}
          style={styles.rowContainer}>
          <View style={styles.row}>
            <CachedImage
                resizeMode={"contain"}
                source={productImage}
                renderError={(error)=>console.log(error)}
                renderIndicator={this.renderIndicator}
                style={styles.productImage}
              />
            {/* <LoadingImage
                resizeMode={"contain"}
                source={{ uri: productImage }} 
                renderError={(error)=>console.log(error)}
                renderIndicator={this.renderIndicator}
                style={styles.productImage}
               
              /> */}
            {/* <Image source={{ uri: productImage }} style={styles.productImage} /> */}
            <View style={styles.middleInfo}>
              <Text style={styles.prodName}>{item.product_name}</Text>
              {/* <Text style={styles.orderText}>Type</Text> */}
              <View style={styles.toolRow}>
               
                <Text style={styles.priceValue}>
                  ₹{' '}
                  {item.product_variant && item.product_variant.variant_actual_price ? item.product_variant.variant_actual_price : ""}
                  {/* {item.subscription_package
                    ? item.product.on_sale
                      ? item.product_sale_price
                      : item.unit_price_including_tax
                    : isProductVarient
                    ? item.product_variant_on_sale
                      ? item.product_variant_sale_price
                      : item.product_variant_price
                    : item.product.on_sale
                    ? item.product.sale_price
                    : item.unit_price_including_tax} */}
                </Text>
                {/* <View style={styles.tools1}>
                  <TouchableOpacity
                    style={styles.plusMinusContainer1}
                    onPress={() => this.onUpdateCartValue(false, index, item)}>
                    <Text style={styles.minus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.count}>
                    {item.subscription_package
                      ? item.subscription_quantity
                      : this.state.cartQuantity[index] && this.state.cartQuantity[index].quantity
                      ? this.state.cartQuantity[index].quantity
                      : '0'}
                  </Text>
                  <TouchableOpacity
                    style={styles.plusMinusContainer1}
                    onPress={() => this.onUpdateCartValue(true, index, item)}>
                    <Text style={styles.plus}>+</Text>
                  </TouchableOpacity>
                </View> */}
                <Text style={styles.mrp}>MRP</Text>
              </View>
              {/* <Text style={styles.excludingGST}>(Excluding GST)</Text> */}
              <View style={{flexDirection:'row'}}>

              {/* {item.subscription_package && (
                <View style={styles.changeRow}>
                    <Text style={styles.periodText}>{item.preferred_delivery_slot ? `${this.getSlotString(item.preferred_delivery_slot)} | ` : ""}
                    <Text style={styles.packageText}>{item.subscription_package.charAt(0).toUpperCase() +
                      item.subscription_package.slice(1)} for {item.subscription_period} Month</Text>
                    </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProductDescription', {
                        productData: item.product,
                      })
                    }>
                    <Text style={styles.changeText}>Change</Text>
                  </TouchableOpacity>
                </View>
              )} */}
              {isProductVarient && (
                <View style={styles.changeRow}>
                  <Text style={styles.periodText}>
                    {this.getVarientString(
                      item.product_variant.product_variant_properties,
                    )}
                  </Text>
                </View>
              )}
              
            </View>
            </View>

          {/* {item.subscription_package && (
            <View style={styles.labelSticker}>
              <Text style={styles.stickerText}>SUBSCRIPTION{Number(item.subscription_discount) > 0 ? `(${item.subscription_discount}%)`:''}</Text>
            </View>
          )} */}
          <View style={styles.tools1}>
                  <TouchableOpacity
                    style={styles.plusMinusContainer1}
                    onPress={() => this.onUpdateCartValue(false, index, item)}>
                    <Text style={styles.minus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.count}>
                    {item.subscription_package
                      ? item.subscription_quantity
                      : this.state.cartQuantity[index] && this.state.cartQuantity[index].quantity
                      ? this.state.cartQuantity[index].quantity
                      : '0'}
                  </Text>
                  <TouchableOpacity
                    style={styles.plusMinusContainer1}
                    onPress={() => this.onUpdateCartValue(true, index, item)}>
                    <Text style={styles.plus}>+</Text>
                  </TouchableOpacity>
                </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => this.onRemoveFromCart(0, item)}>
          <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.horizontalLine}/>
      </View>
    );
  };

  getSlotString = (slot) => {
    if (slot.includes("AM") || slot.includes("am")) return "Morning";
    return "Evening"
  }

  renderMyOrderList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.state.myOrderList}
          extraData={this.state}
          renderItem={({item, index}) => this.renderMyOrderCell(item, index)}
        />
      </View>
    );
  };

  renderBottomDetails = () => {
    if (this.state.cartData) {
      return (
        <View style={[styles.bottomDetails,{paddingBottom:verticalScale(30)}]}>
          <View style={styles.headerCart}>
            <Text style={styles.yourCart}>Your Cart</Text>
            <Text style={styles.amountText}>Amount</Text>
          </View>
          {this.state.myOrderList.map((item) => {
            const isProductVarient = item.product_variant != null;
            return (
              <View style={styles.list}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.price}>
                  ₹{' '}
                  {parseFloat(item.product_variant.price_including_tax * item.quantity).toFixed(2)}
                  {/* {item.subscription_package
                    ? item.product.on_sale
                      ? parseFloat(item.product_sale_price * item.subscription_days_count).toFixed(2)
                      : parseFloat(item.unit_price_including_tax * item.subscription_days_count).toFixed(2)
                    : isProductVarient
                    ? item.product_variant_on_sale
                      ? parseFloat(item.product_variant_sale_price * item.quantity).toFixed(2)
                      : parseFloat(item.product_variant_price * item.quantity).toFixed(2)
                    : item.product.on_sale
                    ? parseFloat(item.product.sale_price * item.quantity).toFixed(2)
                    : parseFloat(item.unit_price_including_tax * item.quantity).toFixed(2)} */}
                </Text>
              </View>
            );
          })}
          <View style={styles.horizontalLineLight}/>
          {/* <View style={styles.tax}>
            <Text style={styles.productName}>Taxes</Text>
            <Text style={styles.price}>₹ {parseFloat(this.state.cartData.total_tax).toFixed(2)}</Text>
          </View> */}
<View>

{/* <View style={styles.deliveryContainer}>
        <Text style={styles.productName}>Taxes</Text>
          <View style={styles.subTax}>
          <View style={styles.delivery}>
            <Text style={styles.subTaxTitle}>{`CGST (${this.state.cartData.total_cgst_percent})`}</Text>
            <Text style={styles.subTaxTitle}>₹{this.state.cartData.total_cgst
                ? this.state.cartData.total_cgst
                : '0'}</Text>
          </View>
          <View style={styles.delivery}>
            <Text style={styles.subTaxTitle}>{`SGST (${this.state.cartData.total_sgst_percent})`}</Text>
            <Text style={styles.subTaxTitle}>₹{this.state.cartData.total_sgst
                ? this.state.cartData.total_sgst
                : '0'}</Text>
          </View>
          <View style={styles.delivery}>
            <Text style={styles.subTaxTitle}>{`IGST (${this.state.cartData.total_igst_percent})`}</Text>
            <Text style={styles.subTaxTitle}>₹{this.state.cartData.total_igst
                ? this.state.cartData.total_igst
                : '0'}</Text>
          </View>
          </View>
        </View>
        <View style={styles.delivery}>
            <Text style={styles.productName}>Total Taxes</Text>
            <Text style={styles.price}>
            ₹{' '}
              {this.state.cartData.total_tax_amt_with_igst_sgst_cgst
                ? this.state.cartData.total_tax_amt_with_igst_sgst_cgst
                : '0'}
            </Text>
          </View> */}

            {/* <View style={styles.horizontalLineLight}/> */}
            
          {!this.state.isCouponApplied && (
            <View style={styles.applyCouponRow}>
              <Text style={styles.productName}>Sub Total</Text>
              <Text style={styles.subText}>₹ {parseFloat(this.state.cartData.sub_total).toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.delivery}>
            <Text style={styles.productName}>Delivery Charges</Text>
            <Text style={styles.price}>
              ₹{' '}
              {this.state.cartData.shipping_charges
                ? this.state.cartData.shipping_charges.shipping_total
                : '0'}
            </Text>
          </View>
          </View>
          
          <View style={styles.horizontalLineLight}/>

          {this.state.isValidCoupon && (
            <View style={styles.coupon}>
              <Text style={styles.couponText}>Coupon Applied</Text>
              <Text style={styles.couponPrice}>-₹ {this.state.discountValue}</Text>
            </View>
          )}
          {this.state.isValidCoupon && (
            <Text style={styles.couponText}>{this.state.codeValue}</Text>
          )}
          {!this.state.isCouponApplied && (
            <TouchableOpacity
              style={styles.applyCouponRow}
              onPress={() => this.setState({showCouponCodeModal: true})}>
              <Text style={styles.applyCouponText}>{'Apply Coupon'}</Text>
              {/* <Text style={styles.subText}>
                Sub Total ₹ {parseFloat(this.state.cartData.sub_total).toFixed(2)}
              </Text> */}
            </TouchableOpacity>
          )}
          
          {this.state.isValidCoupon && (
            <TouchableOpacity
              onPress={() => this.setState({showCouponCodeModal: true})}>
              <Text style={styles.changeCouponText}>Change Coupon</Text>
            </TouchableOpacity>
          )}
          {this.state.isValidCoupon && (
            <TouchableOpacity onPress={() => this.removeCoupon()}>
              <Text style={styles.changeCouponText}>Remove Coupon</Text>
            </TouchableOpacity>
          )}
{this.state.isValidCoupon && (
          <View style={styles.discount}>
            <Text style={styles.productName}>Total Discount</Text>
            <Text style={styles.couponPrice}>₹ {this.state.discountValue}</Text>
          </View>
          )}
<View style={styles.horizontalLineLight}/>

          <View style={styles.total}>
            <Text style={styles.couponText}>Total Amount</Text>
            <Text style={styles.couponPrice}>₹ {this.state.finalAmount}</Text>
          </View>
          <View style={styles.delivery}>
            <Text style={[styles.productName,{color: COLOR_CONST.cartGreen}]}>Total Savings</Text>
            <Text style={styles.couponPrice}>₹ {this.state.cartData.total_savings}</Text>
          </View>
        </View>
      );
    }
  };

  renderAvailableCouponsCell = (item, index) => {
    return (
      <View style={styles.couponCell}>
        <View style={styles.offRow}>
          <Text style={styles.offText}>{item.code}</Text>
          <TouchableOpacity onPress={() => this.setState({ codeValue: item.code }, () => this.onChangeCoupon())} style={styles.userButton}>
            <Text style={styles.useText}>USE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.couponDetails}>{item.description}</Text>
      </View>
    )
  }

  renderAvailableCoupons = () => {
    console.log('@@@ Coupons ==========', this.state.availbleCouponList)
    return (
      <View style={styles.availableCoupons}>
        <FlatList
          nestedScrollEnabled
          data={this.state.availbleCouponList}
          extraData={this.state}
          renderItem={({item, index}) => this.renderAvailableCouponsCell(item, index)}
        />
      </View>
    )
  }

  renderCouponCodeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showCouponCodeModal}
        onRequestClose={() => {
          this.setState({ codeValue: '', showCouponCodeModal: false, isCouponApplied: false },
          () => {
            if (this.state.couponData) {
              this.setState({
                isCouponApplied: true,
                isValidCoupon: true,
                codeValue: this.state.cartData.coupon.code,
                discountValue: this.state.cartData
                  .applied_discount,
                finalAmount: this.state.cartData.total,
              });
            }
          },
        )
        }}>
          <View style={{ flex: 1, backgroundColor: COLOR_CONST.modalTransparentBg }}>
          <View style={{ flex: 1, backgroundColor: COLOR_CONST.white, marginTop: verticalScale(0) }}>
            <Text style={styles.selectCouponCode}>Select Coupon Code</Text>
            {this.renderAvailableCoupons()}
            <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR_CONST.greyTextColor}} />
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{flex: 1}}>
              <TouchableOpacity activeOpacity={1}
                  onPress={() =>
                    this.setState({ codeValue: '', showCouponCodeModal: false, isCouponApplied: false },
                      () => {
                        if (this.state.couponData) {
                          this.setState({
                            isCouponApplied: true,
                            isValidCoupon: true,
                            codeValue: this.state.cartData.coupon.code,
                            discountValue: this.state.cartData
                              .applied_discount,
                            finalAmount: this.state.cartData.total,
                          });
                        }
                      },
                    )
                  } style={styles.modalContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.popup}>
                  {/* <Text style={styles.selectCouponCode}>Select Coupon Code</Text>
                  {this.renderAvailableCoupons()} */}
                  <Text style={styles.enterCouponText}>Enter Coupon Code</Text>
                  {this.state.isCouponApplied && !this.state.isValidCoupon && (
                    <Text style={styles.oopsText}>
                      {this.state.couponCodeErrorMsg}
                    </Text>
                  )}
                  {this.state.isCouponApplied && this.state.isValidCoupon && (
                    <Text style={styles.validText}>Great ! Coupon Code Applied</Text>
                  )}
                  <TextInput
                    style={[styles.couponInput,{ marginTop: this.state.isCouponApplied && !this.state.isValidCoupon? verticalScale(16) : verticalScale(41)}]}
                    placeholder="Enter your coupon code"
                    autoCapitalize='characters'
                    placeholderTextColor="#8b8f95"
                    value={this.state.codeValue}
                    onChangeText={(value) =>
                      this.setState({codeValue: value}, () => {
                        this.onChangeCoupon();
                      })
                    }
                  />
                  {this.state.applyingCoupon && (
                    <View style={{marginTop: 10}}>
                      <ActivityIndicator size="small" color={COLOR_CONST.charcoalGrey} />
                    </View>
                  )}
                  {!this.state.isValidCoupon ? (
                    <>
                      <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 50, right: 50}} onPress={() => this.applyCoupon()}>
                        <LinearGradient colors={[ COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.continueShoppingButton}>
                          <Text style={styles.applyText}>{'APPLY COUPON'}</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ codeValue: '', showCouponCodeModal: false, isCouponApplied: false },
                            () => {
                              if (this.state.couponData) {
                                this.setState({
                                  isCouponApplied: true,
                                  isValidCoupon: true,
                                  codeValue: this.state.cartData.coupon.code,
                                  discountValue: this.state.cartData
                                    .applied_discount,
                                  finalAmount: this.state.cartData.total,
                                });
                              }
                            },
                          )
                        }>
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    this.state.isValidCoupon && (
                      <TouchableOpacity
                        onPress={() => this.setState({showCouponCodeModal: false})}>
                        <Animatable.Image
                          animation="bounceIn"
                          duraton="1500"
                          source={IMG_CONST.COUPON_TICK}
                          style={styles.couponTick}
                        />
                      </TouchableOpacity>
                    )
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
        </View>
      </Modal>
    );
  };

  renderGuestModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={this.state.showGuestModal}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({showGuestModal: false});
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.modalContainer1}>
          <View style={styles.popup1}>
            <Text style={styles.deleteAddress1}>
              Please Sign Up/Log In first
            </Text>
            <Text style={styles.areYouSure1}>
              You need an account to perform this action.
            </Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity
                style={{flex: 1, alignItems: 'center'}}
                onPress={() => this.setState({showGuestModal: false})}>
                <Text style={styles.cancelText1}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine1} />
              <TouchableOpacity
                style={{flex: 1, alignItems: 'center'}}
                onPress={() =>
                  this.setState({showGuestModal: false}, () =>
                    this.props.navigation.replace('AuthNavigator'),
                  )
                }>
                <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
        {!this.state.noProductFound ? (
            <View style={{flex: 1, width:'100%', paddingHorizontal: scale(5)}}>
              <ScrollView keyboardShouldPersistTaps={'always'}>
                {!this.state.isFetchingData && this.renderMyOrderList()}
                {!this.state.isFetchingData && this.renderBottomDetails()}
                {!this.state.isFetchingData && this.renderCouponCodeModal()}
              </ScrollView>
              <GreenButton
                title="Checkout"
                customStyle={styles.loginButton}
                customTxtStyle={styles.loginText}
                onPress={() => this.checkOrderItemAvailability()}
              />
            </View>
        ) : (
          this.renderEmptyDataView()
        )}
        {/* {this.renderGuestModal()} */}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    showNotificationDot: state.cart.showNotificationDot,
    profileData: state.profile.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    showErrorModal: (message) => dispatch(commonActions.showErrorModal(message)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    createCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    showCartData: (data, successCallBack, failureCallBack) => dispatch(cartActions.showCartData(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.addToCart(data, successCallBack, failureCallBack)),
    updateQuantiyInCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.updateQuantiyInCart(data, successCallBack, failureCallBack)),
    removeFromCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.removeFromCart(data, successCallBack, failureCallBack)),
    applyCoupon: (data, successCallBack, failureCallBack) => dispatch(cartActions.applyCoupon(data, successCallBack, failureCallBack)),
    removeCoupon: (data, successCallBack, failureCallBack) => dispatch(cartActions.removeCoupon(data, successCallBack, failureCallBack)),
    getAvailableCoupons: (data, successCallBack, failureCallBack) => dispatch(cartActions.getAvailableCoupons(data, successCallBack, failureCallBack)),
    checkOrderItemAvailability: (data, successCallBack, failureCallBack) => dispatch(cartActions.checkOrderItemAvailability(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
