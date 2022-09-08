import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  Share,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  AppState,
  BackHandler
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GreenButton from '../../components/GreenButton';
import R from '../../R';
import { RecommendedProductList } from '../../theme/constants';
import { ProductGrid } from '../../components/homeComponents/ProductGrid/ProductGrid';
import * as IMG_CONST from '../../theme/ImageConstants';
import * as STR_CONST from '../../theme/StringConstants';
import COLOR_CONST, { FONTS } from '../../theme/ColorConstants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import styles from './ProductDescriptionStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as commonActions from '../../redux/actions/commonActions';
import * as homeActions from '../../redux/actions/homeActions';
import * as productActions from '../../redux/actions/productActions';
import * as cartActions from '../../redux/actions/cartActions';
import * as wishlistActions from '../../redux/actions/wishlistActions';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';
import ReadMore from 'react-native-read-more-text';
import scale, { verticalScale } from '../../utils/Scale';
import LoadingImage from 'react-native-image-progress';
import CachedImage from '../../components/CachedImage';
import Toast from 'react-native-simple-toast';
import * as Sentry from '@sentry/react-native';
// const slots = [{ id: 0, name: "Morning" }, { id: 1, name: "Evening" }];

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: true,
      showNotifiyModal: false,
      similarProducts: [],
      productData: null,
      zipCode: '',
      isAvailabilityChecked: false,
      isAvailable: false,
      availableMessage: '',
      productQuantity: 1,
      cartHasProduct: false,
      subscriptionCartHasProduct: false,
      buyNowData: false,
      showAddCartModal: false,
      ratingList: [1, 1, 1, 1, 1],
      appState: AppState.currentState,
      subscriptionQuantity: 1,
      subscriptionPackage: '',
      subscriptionPeriod: 1,
      subscriptionDiscount: 0,
      subscriptionPackageData: [],
      subscriptionPeriodData: [],
      subscriptionTimeSlotData: [],
      productSubscriptions: [],
      invalidSubscriptionPackage: false,
      invalidSubscriptionPeriod: false,
      invalidateSubscriptionTimeSlot: false,
      isDailySelected: false,
      isWeeklySelected: false,
      isMonthySelected: false,
      period: '',
      showGoToCart: false,
      showGuestModal: false,
      selectedAttributes: {},
      availableAttributes: null,
      selectedProduct: null,
      currentSelection: null,
      selectedImage: null,
      selectedSlotId: null,
      selectedTimeSlot: null,
      slots: [{ id: 0, name: "Morning", availabity: true }, { id: 1, name: "Evening", availabity: true }]
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setNavigationHeaderConfiguration();
      try {
        this.setState({ productData: null, showGoToCart: false, }, () => {
          console.log('@@@ MOUNT ++++=================', this.props.route.params.productData)
          this.getProductDescription();
        })
      } catch (err) {
        Sentry.captureException(err);
      }
    });
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    try {
      AppState.removeEventListener('change', this._handleAppStateChange);
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.imageStyle} />)
          : (<Text>{progress * 100}</Text>)}
      </View>
    )
  }
  renderIndicatorForVarientImage = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.variantImage} />)
          : (<Text>{progress * 100}</Text>)}
      </View>
    )
  }
  _handleAppStateChange = (nextAppState) => {
    try {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('@@@ MOUNT ++++=================', this.props.route.params.productData.id)
        this.getProductDescription();
        console.log('App has come to the foreground!')
      }
      this.setState({ appState: nextAppState });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setNavigationHeaderConfiguration = () => {
    const { cartHasProductFlag, cartCount } = this.props;
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.white, shadowColor: 'transparent', elevation: 0, },
      headerLeft: () => (<TouchableOpacity onPress={() => this.onPressBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON} style={styles.backIcon} /></TouchableOpacity>),
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => this.onShare()}><Image source={IMG_CONST.SHARE_ICON} style={styles.shareIcon} resizeMode="contain" /></TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}>
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
                  end: scale(10),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              ><Text style={{ fontSize: scale(10), color: COLOR_CONST.white, fontFamily: FONTS.GTWalsheimProRegular }}>{cartCount}</Text></View>
            )}
          </TouchableOpacity>
        </View>
      ),
    })
  }
  onPressBack = () => {
    if (this.props.route.params && this.props.route.params.isFromDeepLink)
      this.props.navigation.navigate('Home')
    else
      this.props.navigation.goBack();
  }

  handleBackButtonClick = () => {
    if (this.props.route.params && this.props.route.params.isFromDeepLink) {
      this.props.navigation.navigate('Home');
      return true;
    } else {
      this.props.navigation.goBack();
      return true;
    }
  }


  getProductDescription = async () => {
    try {
      let productData = this.props.route.params.productData;
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        userID: userID,
        productId: productData.id,
      }
      // this.props.createCart(data, (res) => this.createCartSuccessCallBack(res), (error) => this.createCartFailureCallBack(error));
      this.props.getProductDescription(data, (res) => this.getProductDescriptionSuccessCallBack(res), (error) => this.getProductDescriptionFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createCartSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Create Cart Success CallBack ===================', res, this.props.cartData);
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        userID: userID,
      }
      this.props.cartHasProduct(data, (res) => this.cartHasProductSuccessCallBack(res), (error) => { });
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

  onRefreshProductDescription = async () => {
    try {
      let productData = this.props.route.params.productData;
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        productId: productData.id,
        userID: userID,
        shouldShowLoader:true,
      }
      // this.props.cartHasProduct(data, (res) => this.cartHasProductSuccessCallBack(res), (error) => {});
      this.props.getProductDescription(data, (res) => this.getProductDescriptionSuccessCallBack(res), (error) => this.getProductDescriptionFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  cartHasProductSuccessCallBack = () => {
    this.setNavigationHeaderConfiguration();
  }

  getProductDescriptionSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Product Description Success CallBack ===================', res.data);
      this.setState({
        similarProducts: res.data.similar_products,
        productData: res.data,
        subscriptionQuantity: res.data.product.subscription_quantity ? res.data.product.subscription_quantity : 1,
        productQuantity: res.data.product.cart_quantity ? res.data.product.cart_quantity : 1,
        cartHasProduct: res.data.product.cart_quantity ? true : false,
        subscriptionCartHasProduct: res.data.product.subscription_quantity ? true : false,
        availableAttributes: res.data.product.product_attributes,
      }, async () => {
        this.setDefaultVarient()
        this.setSubscriptionData()
        let productData = this.props.route.params.productData;
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          uuid: DeviceInfo.getUniqueId(),
          userID: userID,
          productId: productData.id,
        }
        this.props.createCart(data, (res) => this.createCartSuccessCallBack(res), (error) => this.createCartFailureCallBack(error));
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setDefaultVarient = () => {
    try {
      const { product } = this.state.productData;
      const { product_variants } = product;
      if (product_variants.length > 0) {
        product_variants.map((varient) => {
          if (varient.is_master) {
            const { images } = varient;
            let isVarientImage = images.length > 0;
            let selectedAttributes = {};
            varient.product_variant_properties.map((property) => {
              selectedAttributes = {
                ...selectedAttributes,
                [property.variant_name]: property,
              };
            });
            this.setState(
              {
                selectedAttributes: selectedAttributes,
                selectedImage: isVarientImage
                  ? images[0].image
                  : product.images[0].image,
                selectedProduct: varient,
                productQuantity: varient.cart_quantity
                  ? varient.cart_quantity
                  : 1,
              },
              () => {
                this.setAvailbleAttributesForSelected();
              },
            );
          }
        });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  setSubscriptionData = () => {
    try {
      this.setState({ invalidSubscriptionPackage: false, invalidSubscriptionPeriod: false });
      const { available_subscription, subscription_package, subscription_quantity, subscription_period, is_subscription_available, available_slots } = this.state.productData.product;
      console.log('@@@ Subscription ===========', available_subscription);
      if (!is_subscription_available)
        return;
      if (available_subscription) {
        let localSubscriptionPeriodData = [];
        let localSubscriptionPackageData = [];
        let indexValue = 0;
        let packageKeys = Object.keys(available_subscription);
        if (subscription_package) {
          indexValue = packageKeys.findIndex((item) => item.toLowerCase() === subscription_package.toLowerCase())
        }
        packageKeys.map((item, index) => {
          localSubscriptionPackageData.push({
            id: index,
            name: item.charAt(0).toUpperCase() + item.slice(1),
            isSelected: false,
          })
        })
        available_subscription[packageKeys[indexValue]].map((item) => {
          localSubscriptionPeriodData.push({
            label: `${item} Month`, value: item
          })
        })
        this.setState({
          subscriptionPackageData: localSubscriptionPackageData,
          subscriptionPeriodData: localSubscriptionPeriodData,
          productSubscriptions: available_subscription,
          // subscriptionTimeSlotData: available_slots
        }, () => {
          if (subscription_package) {
            localSubscriptionPackageData = this.state.subscriptionPackageData;
            let selectedIndex = localSubscriptionPackageData.findIndex((packageItem) => packageItem.name === subscription_package);
            let defaultSelectedIndex = localSubscriptionPackageData.findIndex((packageItem) => packageItem.isSelected === true);
            if (defaultSelectedIndex !== -1)
              localSubscriptionPackageData[defaultSelectedIndex].isSelected = false;
            localSubscriptionPackageData[selectedIndex].isSelected = true;
            this.setState({ subscriptionPackage: localSubscriptionPackageData[selectedIndex].name, subscriptionPackageData: localSubscriptionPackageData });
          }
          if (subscription_period) {
            let subscriptionPeriod = subscription_period.split(' ');
            this.setState({ period: subscriptionPeriod[0] }, () => {
              console.log('@@@ period ===========', this.state.period, this.state.subscriptionPeriodData);
            });
          } else {
            this.setState({ period: '' });
          }
        });
      }
    } catch (err) {
      Sentry.captureException(err);
    }

  }

  getProductDescriptionFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Product Description Failure CallBack ===================');
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

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.productData.product.deep_link,
        // url: this.state.productData.product.deep_link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Sentry.captureException(error);
      alert(error.message);
    }
  }

  heartIcon = () => {
    this.setState({ wishlist: !this.state.wishlist });
  }

  onHeartPress(isWishlited) {
    try {
      let productData = this.props.route.params.productData;
      if (!isWishlited)
        this.onAddToWishlist(productData);
      else
        this.onRemoveFromWishlist(productData);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onCheckProductAvailability = () => {
    try {
      let productData = this.props.route.params.productData;
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        zipcode: this.state.zipCode,
        productId: productData.id
      }
      this.props.checkProductAvailability(data, (res) => this.checkProductAvailabilitySuccessCallBack(res), (error) => this.checkProductAvailabilityFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  checkProductAvailabilitySuccessCallBack = (res) => {
    try {
      console.log('@@@ Check Product Availability Success CallBack ===================', res);
      this.setState({
        isAvailabilityChecked: true,
        isAvailable: true,
        availableMessage: `Shipping available at ${this.state.zipCode}`
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  checkProductAvailabilityFailureCallBack = (error) => {
    try {
      console.log('@@@ Check Product Availability Failure CallBack ===================');
      this.setState({
        isAvailabilityChecked: true,
        isAvailable: false,
        availableMessage: `Shipping is not available at ${this.state.zipCode}`
      });
      if (error) {
        // setTimeout(() => {
        //     this.props.showErrorModal(error);
        // }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  notifyMeAboutProduct = () => {
    try {
      let productData = this.props.route.params.productData;
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        zipcode: this.state.zipCode,
        productId: productData.id
      }
      this.props.notifyMeAboutProduct(data, (res) => this.notifyMeAboutProductSuccessCallBack(res), (error) => this.notifyMeAboutProductFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  notifyMeAboutProductSuccessCallBack = (res) => {
    try {
      setTimeout(() => {
        this.setState({ showNotifiyModal: true });
      }, 0);
      console.log('@@@ Notify Me About Product Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  notifyMeAboutProductFailureCallBack = (error) => {
    try {
      console.log('@@@ Notify Me About Product Failure CallBack ===================');
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

  notifyMeAboutVariantProduct = () => {
    try {
      console.log('@@@ Selected Product===============', this.state.selectedProduct);
      let productData = this.props.route.params.productData;
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        productId: productData.id,
        product_variant_id: this.state.selectedProduct.id
      }
      this.props.notifyMeAboutVariantProduct(data, (res) => this.notifyMeAboutVariantProductSuccessCallBack(res), (error) => this.notifyMeAboutVariantProductFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  notifyMeAboutVariantProductSuccessCallBack = (res) => {
    try {
      setTimeout(() => {
        this.setState({ showNotifiyModal: true });
      }, 0);
      console.log('@@@ Notify Me About Product Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  notifyMeAboutVariantProductFailureCallBack = (error) => {
    try {
      console.log('@@@ Notify Me About Product Failure CallBack ===================');
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

  onChangeSubscriptionQuantity = (isFromAdd) => {
    try {
      if (isFromAdd) {
        this.setState({ subscriptionQuantity: this.state.subscriptionQuantity + 1 });
      } else {
        if (this.state.subscriptionQuantity === 1)
          return;
        else
          this.setState({ subscriptionQuantity: this.state.subscriptionQuantity - 1 });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressSubscribeAddToCart = () => {
    try {
      if (this.state.subscriptionPackage.trim().length === 0) {
        this.setState({ invalidSubscriptionPackage: true });
        return;
      } else if (this.state.period.trim().length === 0) {
        this.setState({ invalidSubscriptionPeriod: true });
        return;
      } else if (!this.state.selectedTimeSlot && this.state.invalidateSubscriptionTimeSlot) {
        return;
      }
      this.setState({ showAddCartModal: false, }, () => {
        this.onChangeCartValue(this.state.subscriptionQuantity, this.state.productData.product, true);
      })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onChangeCartValue = (value, item, isFromSubscribe = false) => {
    try {
      let maxCartValue = this.state.productData.product.max_qty_to_be_sold;
      if (item.is_in_cart && (item.cart_quantity === value || value === 0)) {
        this.props.navigation.navigate('Cart');
        return;
      }
      console.log('@@@ On Change cart value ======', maxCartValue, value, item, this.state.cartHasProduct);
      if (maxCartValue !== 0 && (value > maxCartValue)) {
        this.props.showErrorModal(`You can't add more than ${maxCartValue} qty of this item.`);
        return;
      }
      if (isFromSubscribe) {
        if (value > 1 && item.subscription_quantity) {
          this.updateQuantiyInCart(value, item, isFromSubscribe);
        } else {
          if (value === 0) {
            this.props.showErrorModal('Please select product quantity.');
            return;
          }
          if (this.state.subscriptionCartHasProduct)
            this.updateQuantiyInCart(value, item, isFromSubscribe);
          else
            this.onAddToCart(value, item, isFromSubscribe);
        }
      } else {
        if (value > 1 && item.cart_quantity) {
          this.updateQuantiyInCart(value, item, isFromSubscribe);
        } else {
          if (value === 0) {
            this.refs._scrollView.scrollTo(0);
            this.props.showErrorModal('Please select product quantity.');
            return;
          }
          if (item.is_in_cart && item.cart_quantity)
            this.updateQuantiyInCart(value, item, isFromSubscribe);
          else
            this.onAddToCart(value, item, isFromSubscribe);
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscriptionPackage = () => {
    try {
      let localSubscriptionPackageData = this.state.subscriptionPackageData;
      let defaultSelectedIndex = localSubscriptionPackageData.findIndex((packageItem) => packageItem.isSelected === true);
      return localSubscriptionPackageData[defaultSelectedIndex].name;
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getSubscriptionPeriod = () => {
    return Number(this.state.period);
  }

  getSubcriptionSlot = () => {
    const { subscriptionTimeSlotData } = this.state;
    // let deliverySlot = null;
    // subscriptionTimeSlotData.map((item) => {
    //   if (item.isSelected)
    //     deliverySlot = item.name;
    // });
    return this.state.selectedTimeSlot;
  }



  onAddToCartFromGrid = async (value, item, selectedProduct) => {
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
      // const {productData, selectedProduct, selectedAttributes} = this.state;
      // let data, productVarientId = undefined;
      // if (productData.product.product_variants.length > 0) {
      //   if (selectedProduct) {
      //     console.log(selectedProduct);
      //     productVarientId = selectedProduct.id;
      //   } else {
      //     this.props.showErrorModal('Please select from available variants');
      //     return;
      //   }
      // }
      // if (isFromSubscribe) {
      //   let subscriptionPackage = this.getSubscriptionPackage();
      //   let subscriptionPeriod = this.getSubscriptionPeriod();
      //   let subscriptionSlot = this.getSubcriptionSlot();
      //   data = {
      //     uuid: DeviceInfo.getUniqueId(),
      //     product_id: selectedProduct ? productData.product.id : item.id,
      //     userID: userID,
      //     subscription_quantity: value,
      //     cartId: this.props.cartData.order.id,
      //     subscription_package: subscriptionPackage,
      //     subscription_period: subscriptionPeriod,
      //     preferred_delivery_slot: subscriptionSlot,
      //     subscription_discount: this.state.subscriptionDiscount
      //   };
      // } else {
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        quantity: value,
        userID: userID,
        cartId: this.props.cartData.order.id
      };
      // }
      if (productVarientId) {
        data.product_variant_id = productVarientId;
      }
      console.log('@@@ onAdd Data ==========', data);
      this.props.addToCart(
        data,
        (res) => this.addToCartFromGridSuccessCallBack(res, productVarientId),
        (error) => this.addToCartFromGridFailureCallBack(error, productVarientId),
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartFromGridSuccessCallBack = (res, productVarientId) => {
    try {
      // const { name } = this.state.productData.product;
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      console.log('@@@ Add to Cart Success CallBack ===================', res);
      this.onRefreshProductDescription();
      // this.setState({ showGoToCart: true });
      // if(isFromSubscribe) {
      //   setTimeout(() => {
      //     this.props.showErrorModal(`${name} subscribed successfully.`, false);
      //     setTimeout(() => {
      //       this.props.hideErrorModal();
      //     }, 2000);
      // }, 0);
      // }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartFromGridFailureCallBack = (error, productVarientId) => {
    try {
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

  onAddToCart = async (value, item, isFromSubscribe) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      const { productData, selectedProduct, selectedAttributes } = this.state;
      let data, productVarientId = undefined;
      if (productData.product.product_variants.length > 0) {
        if (selectedProduct) {
          console.log(selectedProduct);
          productVarientId = selectedProduct.id;
        } else {
          this.props.showErrorModal('Please select from available variants');
          return;
        }
      }
      if (isFromSubscribe) {
        let subscriptionPackage = this.getSubscriptionPackage();
        let subscriptionPeriod = this.getSubscriptionPeriod();
        let subscriptionSlot = this.getSubcriptionSlot();
        data = {
          uuid: DeviceInfo.getUniqueId(),
          product_id: selectedProduct ? productData.product.id : item.id,
          userID: userID,
          subscription_quantity: value,
          cartId: this.props.cartData.order.id,
          subscription_package: subscriptionPackage,
          subscription_period: subscriptionPeriod,
          preferred_delivery_slot: subscriptionSlot,
          subscription_discount: this.state.subscriptionDiscount
        };
      } else {
        data = {
          uuid: DeviceInfo.getUniqueId(),
          product_id: selectedProduct ? productData.product.id : item.id,
          quantity: value,
          userID: userID,
          cartId: this.props.cartData.order.id
        };
      }
      if (productVarientId) {
        data.product_variant_id = productVarientId;
      }
      console.log('@@@ onAdd Data ==========', data);
     // this.props.startSpinner();
      this.props.addToCart(
        data,
        (res) => this.addToCartSuccessCallBack(res, isFromSubscribe),
        (error) => this.addToCartFailureCallBack(error),
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartSuccessCallBack = (res, isFromSubscribe = false) => {
    try {
      const { name } = this.state.productData.product;
      console.log('@@@ Add to Cart Success CallBack ===================', res);
      Toast.showWithGravity('Product Added to cart successfully.', Toast.SHORT, Toast.BOTTOM);
      this.onRefreshProductDescription();
      this.setState({ showGoToCart: true });
      if (isFromSubscribe) {
        setTimeout(() => {
          this.props.showErrorModal(`${name} subscribed successfully.`, false);
          setTimeout(() => {
            this.props.hideErrorModal();
          }, 2000);
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartFailureCallBack = (error) => {
    try {
      this.onRefreshProductDescription();
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

  onRemoveFromCart = async (value, item) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
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
      this.props.removeFromCart(data, (res) => this.removeFromCartSuccessCallBack(res), (error) => this.removeFromCartFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromCartSuccessCallBack = (res) => {
    try {
      console.log('@@@ Remove From Cart Success CallBack ===================');
      Toast.showWithGravity('Product removed from cart successfully.', Toast.SHORT, Toast.BOTTOM);
      this.onRefreshProductDescription();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromCartFailureCallBack = (error) => {
    try {
      this.onRefreshProductDescription();
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

  updateQuantiyInCartFromGrid = async (value, item, selectedProduct) => {
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
      // const {productData, selectedProduct, selectedAttributes} = this.state;
      // let data, productVarientId;
      // if (productData.product.product_variants.length > 0) {
      //   if (selectedProduct) {
      //     console.log(selectedProduct);
      //     productVarientId = selectedProduct.id;
      //   } else {
      //     this.props.showErrorModal('Please selected from available varients');
      //     return;
      //   }
      // }
      // if(isFromSubscribe) {
      //   let subscriptionPackage = this.getSubscriptionPackage();
      //   let subscriptionPeriod = this.getSubscriptionPeriod();
      //     data = {
      //       uuid: DeviceInfo.getUniqueId(),
      //       product_id: selectedProduct ? productData.product.id : item.id,
      //       subscription_quantity: value,
      //       userID: userID,
      //       cartId: this.props.cartData.order.id,
      //       subscription_package: subscriptionPackage,
      //       subscription_period: subscriptionPeriod,
      //       subscription_discount: this.state.subscriptionDiscount
      //     }
      // } else {
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        quantity: value,
        userID: userID,
        cartId: this.props.cartData.order.id
      }
      // }
      if (productVarientId) {
        data.product_variant_id = productVarientId;
      }
     // this.props.startSpinner();
      console.log('@@@ onUpdateQuantity Data ==========', data);
      this.props.updateQuantiyInCart(data, (res) => this.updateQuantiyInCartFromGridSuccessCallBack(res, productVarientId), (error) => this.updateQuantiyInCartFromGridFailureCallBack(error, productVarientId));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartFromGridSuccessCallBack = (res, productVarientId) => {
    try {
      // const { name } = this.state.productData.product;
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      console.log('@@@ Update quantity in Cart Success CallBack ===================');
      Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
      this.onRefreshProductDescription();
      // this.setState({ showGoToCart: true });
      // if(isFromSubscribe) {
      //   setTimeout(() => {
      //     this.props.showErrorModal(`${name} subscribed successfully.`, false);
      //     setTimeout(() => {
      //       this.props.hideErrorModal();
      //     }, 2000);
      // }, 0);
      // }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartFromGridFailureCallBack = (error, productVarientId) => {
    try {
      this.onRefreshProductDescription();
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

  updateQuantiyInCart = async (value, item, isFromSubscribe) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      const { productData, selectedProduct, selectedAttributes } = this.state;
      let data, productVarientId;
      if (productData.product.product_variants.length > 0) {
        if (selectedProduct) {
          console.log(selectedProduct);
          productVarientId = selectedProduct.id;
        } else {
          this.props.showErrorModal('Please selected from available varients');
          return;
        }
      }
      if (isFromSubscribe) {
        let subscriptionPackage = this.getSubscriptionPackage();
        let subscriptionPeriod = this.getSubscriptionPeriod();
        data = {
          uuid: DeviceInfo.getUniqueId(),
          product_id: selectedProduct ? productData.product.id : item.id,
          subscription_quantity: value,
          userID: userID,
          cartId: this.props.cartData.order.id,
          subscription_package: subscriptionPackage,
          subscription_period: subscriptionPeriod,
          subscription_discount: this.state.subscriptionDiscount
        }
      } else {
        data = {
          uuid: DeviceInfo.getUniqueId(),
          product_id: selectedProduct ? productData.product.id : item.id,
          quantity: value,
          userID: userID,
          cartId: this.props.cartData.order.id
        }
      }
      if (productVarientId) {
        data.product_variant_id = productVarientId;
      }
      console.log('@@@ onUpdateQuantity Data ==========', data);
      this.props.updateQuantiyInCart(data, (res) => this.updateQuantiyInCartSuccessCallBack(res, isFromSubscribe), (error) => this.updateQuantiyInCartFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartSuccessCallBack = (res, isFromSubscribe = false) => {
    try {
      const { name } = this.state.productData.product;
      console.log('@@@ Update quantity in Cart Success CallBack ===================');
      Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
      this.onRefreshProductDescription();
      this.setState({ showGoToCart: true });
      if (isFromSubscribe) {
        setTimeout(() => {
          this.props.showErrorModal(`${name} subscribed successfully.`, false);
          setTimeout(() => {
            this.props.hideErrorModal();
          }, 2000);
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartFailureCallBack = (error) => {
    try {
      this.onRefreshProductDescription();
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

  onAddToWishlist = async (item) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        userID: userID,
      }
      this.props.addToWishlist(data, (res) => this.addToWishlistSuccessCallBack(res), (error) => this.addToWishlistFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToWishlistSuccessCallBack = async (res) => {
    try {
      console.log('@@@ Add To WishList Success CallBack ===================', res);
      let productData = this.props.route.params.productData;
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        productId: productData.id,
      }
      this.props.getProductDescription(data, (res) => this.getProductDescriptionSuccessCallBack(res), (error) => this.getProductDescriptionFailureCallBack(error));
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
      this.props.removeFromWishlist(data, (res) => this.removeFromWishlistSuccessCallBack(res), (error) => this.removeFromWishlistFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromWishlistSuccessCallBack = async (res) => {
    try {
      this.props.hideErrorModal();
      console.log('@@@ Remove From WishList Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('The Item has been removed from the wishlist.');
        setTimeout(async () => {
          this.props.hideErrorModal();
        }, 2000);
      }, 3000);
      let productData = this.props.route.params.productData;
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        productId: productData.id,
      }
      this.props.getProductDescription(data, (res) => this.getProductDescriptionSuccessCallBack(res), (error) => this.getProductDescriptionFailureCallBack(error));
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

  onUpdateCartValue = (isFromAdd) => {
    if (isFromAdd) {
      this.setState({ productQuantity: this.state.productQuantity + 1 });
    } else {
      if (this.state.productQuantity === 0)
        return;
      this.setState({ productQuantity: this.state.productQuantity - 1 });
    }
  }

  checkOrderItemAvailability = async (buyNowResponse, isFromSubscribe = false) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        cartId: buyNowResponse.data.order.id,
        userID: userID
      }
      this.setState({ applyingCoupon: true });
      this.props.checkOrderItemAvailability(data, (res) => this.checkOrderItemAvailabilitySuccessCallBack(res, buyNowResponse, isFromSubscribe), (error) => this.checkOrderItemAvailabilityFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  checkOrderItemAvailabilitySuccessCallBack = (res, buyNowResponse, isFromSubscribe = false) => {
    try {
      let productData = this.state.productData;
      productData['cart_quantity'] = this.state.productQuantity;
      console.log('@@@ Check Product Availability Success CallBack ===================', res);
      this.props.navigation.navigate('BuyProductConfirmOrderScreen', { productData: productData, buyNowResponse: buyNowResponse, isFromSubscribe: isFromSubscribe });
      // this.props.navigation.navigate('CheckoutScreen', { isFromBuyNow: true, productData: productData, buyNowResponse: buyNowResponse, isFromSubscribe: isFromSubscribe });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  checkOrderItemAvailabilityFailureCallBack = (error) => {
    try {
      console.log('@@@ Check Product Availability Failure CallBack ===================');
      if (error) {
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressBuyNow = async (isFromSubscribe = false) => {
    try {
      const { productData, selectedProduct, selectedAttributes } = this.state;
      let maxCartValue = this.state.productData.product.max_qty_to_be_sold;
      let countValue = 0;
      if (isFromSubscribe) {
        countValue = this.state.subscriptionQuantity;
      } else {
        countValue = this.state.productQuantity;
      }
      console.log('@@@ On Change cart value ======', maxCartValue, countValue, this.state.cartHasProduct);
      if (maxCartValue !== 0 && (countValue > maxCartValue)) {
        this.props.showErrorModal(`You can't add more than ${maxCartValue} qty of this item.`);
        return;
      }
      let productVarientId = undefined;
      if (productData.product.product_variants.length > 0) {
        if (selectedProduct) {
          console.log(selectedProduct);
          productVarientId = selectedProduct.id;
        } else {
          this.props.showErrorModal('Please select from available variants');
          return;
        }
      }
      if (isFromSubscribe) {
        if (this.state.subscriptionPackage.trim().length === 0) {
          this.setState({ invalidSubscriptionPackage: true });
          return;
        } else if (this.state.period.trim().length === 0) {
          this.setState({ invalidSubscriptionPeriod: true });
          return;
        } else if (!this.state.selectedTimeSlot && this.state.invalidateSubscriptionTimeSlot) {
          return;
        }
      }
      this.setState({ showAddCartModal: false, }, async () => {
        let userID = await AsyncStorage.getItem('USER_ID');
        let data;
        if (isFromSubscribe) {
          let subscriptionPackage = this.getSubscriptionPackage();
          let subscriptionPeriod = this.getSubscriptionPeriod();
          let deliverySlot = this.getSubcriptionSlot();
          data = {
            uuid: DeviceInfo.getUniqueId(),
            productId: this.state.productData.product.id,
            subscription_quantity: this.state.subscriptionQuantity,
            userID: userID,
            subscription_package: subscriptionPackage,
            subscription_period: subscriptionPeriod,
            preferred_delivery_slot: deliverySlot,
            subscription_discount: this.state.subscriptionDiscount
          }
          this.props.buyProduct(data, (res) => this.buyProductSuccessCallBack(res, isFromSubscribe), (error) => this.buyProductFailureCallBack(error));
        } else {
          if (this.state.productQuantity === 0) {
            this.props.showErrorModal('Please select product quantity.');
          } else {
            if (!this.props.profileData) {
              this.setState({ showGuestModal: true });
              return;
            }
            data = {
              uuid: DeviceInfo.getUniqueId(),
              productId: this.state.productData.product.id,
              userID: userID,
              quantity: this.state.productQuantity
            }
            if (productVarientId) {
              data.product_variant_id = productVarientId;
            }
            this.props.buyProduct(data, (res) => this.buyProductSuccessCallBack(res), (error) => this.buyProductFailureCallBack(error));
          }
        }
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  buyProductSuccessCallBack = (res, isFromSubscribe = false) => {
    try {
      let productData = this.state.productData;
      productData['cart_quantity'] = this.state.productQuantity;
      this.props.navigation.navigate('BuyProductConfirmOrderScreen', { productData: productData, buyNowResponse: res, isFromSubscribe: isFromSubscribe });
      // this.props.navigation.navigate('CheckoutScreen', { isFromBuyNow: true, productData: productData, buyNowResponse: res, isFromSubscribe: isFromSubscribe });
      console.log('@@@ Buy Now Product Success CallBack ===================', res);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  buyProductFailureCallBack = (error) => {
    try {
      console.log('@@@ Buy Now Product Failure CallBack ===================');
      if (error) {
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressTool = (item, attribute, isFromColor) => {
    try {
      this.setState((prevState) => ({
        selectedAttributes: {
          ...prevState.selectedAttributes,
          [attribute]: item,
        },
        currentSelection: attribute,
      }),
        () => {
          this.setSelectedProduct();
          this.setAvailbleAttributesForSelected();
        });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  setSelectedProduct = () => {
    try {
      const { productData, selectedAttributes } = this.state;
      const { product_variants } = productData.product;

      let selectedVarientPropertyIds = [];
      let isSelectedFound = false;
      for (const attribute in selectedAttributes) {
        selectedVarientPropertyIds.push(
          selectedAttributes[attribute].variant_property_id,
        );
      }
      product_variants.map((item, index) => {
        let varientPropertyIds = [];
        const { product_variant_properties } = item;
        product_variant_properties.map((variantProperty) => {
          varientPropertyIds.push(variantProperty.variant_property_id);
        });
        if (isSelectedFound) {
          return;
        }
        if (varientPropertyIds.length === selectedVarientPropertyIds.length) {
          // console.log('length equal');
          // console.log(selectedVarientPropertyIds);
          // console.log(varientPropertyIds);
          if (
            selectedVarientPropertyIds.every((val) =>
              varientPropertyIds.includes(val),
            )
          ) {
            // console.log('Ids equal');
            // console.log('selected product', item);
            isSelectedFound = true;
            this.setState({
              selectedProduct: item,
              selectedImage: item.images.length > 0 ?
                item.images[0].image
                : "",
              productQuantity: item.cart_quantity ? item.cart_quantity : 1
            });
          } else {
            // console.log('Ids not equal');
            this.setState({ selectedProduct: undefined });
          }
        } else {
          // console.log('selected product not found');
          this.setState({ selectedProduct: undefined })
        }
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  setAvailbleAttributesForSelected = () => {
    try {
      const { productData, selectedAttributes, currentSelection } = this.state;
      const { availabity, product_variants, product_attributes } = productData.product;
      if (product_variants) {
        let availableAttributes = {};
        product_variants.map((item, index) => {
          const { product_variant_properties } = item;
          let attributeFound = false;
          let selectedVarientPropertyIds = [];
          let varientPropertyIds = [];
          product_variant_properties.map((variantProperty) => {
            varientPropertyIds.push(variantProperty.variant_property_id);
          })

          for (const attribute in selectedAttributes) {
            selectedVarientPropertyIds.push(selectedAttributes[attribute].variant_property_id);
          }

          attributeFound = selectedVarientPropertyIds.every(val => varientPropertyIds.includes(val));

          if (attributeFound) {
            product_variant_properties.map((variantProperty) => {
              let varientPropertyArray = availableAttributes[
                variantProperty.variant_name
              ]
                ? availableAttributes[variantProperty.variant_name]
                : [];
              varientPropertyArray.findIndex((item) => item.variant_property_id === variantProperty.variant_property_id) === -1 &&
                varientPropertyArray.push({
                  name: variantProperty.property_name,
                  variant_property_id: variantProperty.variant_property_id,
                  product_variant_id: variantProperty.product_variant_id
                })
              availableAttributes = {
                ...availableAttributes,
                [variantProperty.variant_name]: varientPropertyArray
              }
            });
          }
        });
        this.setState((prevState) => {
          if (Object.keys(availableAttributes).length === 0) {
            return;
          }
          return { availableAttributes };
        }, () => {
          // console.log('Available attributes', this.state.availableAttributes);
          // console.log('Selected items', this.state.selectedAttributes);
        })
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onPressSubscription = (index) => {
    this.setState({ invalidSubscriptionPackage: false });
    switch (index) {
      case 0:
        this.setState({ isDailySelected: true, isWeeklySelected: false, isMonthySelected: false });
        break;
      case 1:
        this.setState({ isDailySelected: false, isWeeklySelected: true, isMonthySelected: false });
        break;
      case 2:
        this.setState({ isDailySelected: false, isWeeklySelected: false, isMonthySelected: true });
        break;

      default:
        break;
    }
  }

  onSelectSubscriptionPackage = (item) => {
    try {
      let localSubscriptionPackageData = this.state.subscriptionPackageData;
      let selectedIndex = localSubscriptionPackageData.findIndex((packageItem) => packageItem.id === item.id);
      let defaultSelectedIndex = localSubscriptionPackageData.findIndex((packageItem) => packageItem.isSelected === true);
      if (defaultSelectedIndex !== -1)
        localSubscriptionPackageData[defaultSelectedIndex].isSelected = false;
      localSubscriptionPackageData[selectedIndex].isSelected = true;

      let localSubscriptionPeriodData = [];
      let localProductSubscriptions = this.state.productSubscriptions;
      localProductSubscriptions[localSubscriptionPackageData[selectedIndex].name.toLowerCase()].map((item) => {
        localSubscriptionPeriodData.push({
          label: `${item} month`, value: item
        })
      });
      this.setState({
        period: localSubscriptionPeriodData[0].value, invalidSubscriptionPackage: false,
        subscriptionPackage: localSubscriptionPackageData[selectedIndex].name,
        subscriptionPackageData: localSubscriptionPackageData,
        subscriptionPeriodData: localSubscriptionPeriodData,
        selectedSlotId: 0
      }, () => this.setSubSlots(0));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onSelectSubscriptionPeriod = (item) => {
    try {
      this.setState({ invalidSubscriptionPeriod: false, period: item.value, invalidSubscriptionPeriod: false }, () => this.setSubSlots(0));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setSubSlots = (slotId) => {
    try {
      const { subscriptionPackage, productData, period } = this.state;
      const { product_subscriptions } = productData.product;
      let id = slotId;
      let localSubscriptionSlots = [], morningSlotsData = [], eveningSlotsData = [];
      let localSlots = this.state.slots;

      if (subscriptionPackage && period) {
        product_subscriptions.map((sub) => {
          if (sub.subscription_package === subscriptionPackage.toLowerCase() && sub.subscription_period === period + " month") {
            const morningSlot = sub.morning_slot ? JSON.parse(sub.morning_slot) : null;
            const eveningSlot = sub.evening_slot ? JSON.parse(sub.evening_slot) : null;
            this.setState({ subscriptionDiscount: sub.discount });
            morningSlot.map((item) => {
              if (item !== "") {
                morningSlotsData.push({ label: item, value: item });
              }
            })
            eveningSlot.map((item) => {
              if (item !== "") {
                eveningSlotsData.push({ label: item, value: item });
              }
            })

            if (morningSlotsData.length > 0) {
              localSlots.map((item) => {
                if (item.id === 0) {
                  item.availabity = true
                }
              })
            } else {
              localSlots.map((item) => {
                if (item.id === 0) {
                  item.availabity = false
                }
              })
            }

            if (eveningSlotsData.length > 0) {
              localSlots.map((item) => {
                if (item.id === 1) {
                  item.availabity = true
                }
              })
            } else {
              localSlots.map((item) => {
                if (item.id === 1) {
                  item.availabity = false
                }
              })
            }

            if (id === 0) {
              localSubscriptionSlots = morningSlotsData;
              if (!morningSlotsData.length > 0) id = 1;
            }

            if (id === 1) {
              localSubscriptionSlots = eveningSlotsData;
            }

          }
        })
      }

      this.setState({
        subscriptionTimeSlotData: localSubscriptionSlots,
        selectedSlotId: id,
        selectedTimeSlot: localSubscriptionSlots.length > 0 ? localSubscriptionSlots[0].value : null,
        invalidateSubscriptionTimeSlot: false,
        slots: localSlots
      })
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onSelectSubscriptionTimeSlot = (item) => {
    this.setState({ invalidateSubscriptionTimeSlot: false, selectedTimeSlot: item.value });
  }

  onPressSubscriptionButton = () => {
    if (!this.props.profileData) {
      this.setState({ showGuestModal: true });
      return;
    } else {
      this.setState({ showAddCartModal: true });
    }
  }

  renderButton = () => {
    const { is_subscription_available, cart_quantity, product_variants } = this.state.productData.product;
    const { productQuantity, selectedProduct } = this.state;
    const is_in_cart = selectedProduct ? selectedProduct.is_in_cart : this.state.productData.product.is_in_cart;
    const isUpdate = selectedProduct ? selectedProduct.cart_quantity !== productQuantity & productQuantity !== 0 : cart_quantity !== productQuantity & productQuantity !== 0;
    const product = selectedProduct ? selectedProduct : this.state.productData.product;
    return (
      <View style={styles.InnerConatiner}>
        <TouchableOpacity onPress={() => this.onChangeCartValue(this.state.productQuantity, product)}>
          <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={is_subscription_available ? styles.AddbuttonCustom : styles.AddbuttonCustom1}>
            <Text style={styles.AddcustomTxtStyle}>{(!is_in_cart || !cart_quantity) ? 'ADD TO CART' : isUpdate ? "UPDATE CART" : 'GO TO CART'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        {is_subscription_available && <TouchableOpacity style={{ opacity: is_subscription_available ? 1 : 0.5 }} disabled={!is_subscription_available} onPress={() => this.onPressSubscriptionButton()}>
          <LinearGradient colors={[COLOR_CONST.facebook, COLOR_CONST.facebook]} style={styles.AddbuttonCustom}>
            <Text style={styles.AddcustomTxtStyle}>SUBSCRIBE</Text>
          </LinearGradient>
        </TouchableOpacity>}
        <TouchableOpacity onPress={() => this.onPressBuyNow()}>
          <LinearGradient colors={[COLOR_CONST.loginSignup, COLOR_CONST.loginSignup]} style={is_subscription_available ? styles.BUYbuttonCustom : styles.BUYbuttonCustom1}>
            <Text style={styles.BUYcustomTxtStyle}>BUY NOW</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }

  renderNotification = () => {
    const isNotified = this.state.selectedProduct ? this.state.selectedProduct.is_notify_product : this.state.productData.product.is_notify_product;
    return (
      <View style={styles.InnerConatinerNOTIFICATION}>
        {
          isNotified ? <Text style={styles.getNotified}>You will get notified once the product is back in stock.</Text> :
            <>
              <View style={styles.NotificationTitle}>
                <Text style={styles.currentlyOut}>The Item is currently not deliverable.</Text>
              </View>

              <TouchableOpacity onPress={() => this.state.selectedProduct ? this.notifyMeAboutVariantProduct() : this.notifyMeAboutProduct()} >
                <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.primaryThemeGradient]} style={styles.BUYbuttonCustom}>
                  <Text style={styles.BUYcustomTxtStyle}>NOTIFY ME</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>}
      </View>
    )
  }

  checkSelectedInAvailable = () => {
    const { selectedAttributes, availableAttributes } = this.state;
    console.log('@@@ Selected ===========', selectedAttributes)
    console.log('@@@ Selected ===========1', availableAttributes)
    let selectedVarientPropertyIds = [];
    let availablePropertIds = [];
    for (const attribute in selectedAttributes) {
      selectedVarientPropertyIds.push(selectedAttributes[attribute].variant_property_id);
    }
    if (availableAttributes) {
      for (const attribute in availableAttributes) {
        availableAttributes[attribute].map((item) => {
          availablePropertIds.push(item.variant_property_id);
        })
      }
      return selectedVarientPropertyIds.every(val => availablePropertIds.includes(val));
    }
    return true;
  }


  renderToolItem = (item, attribute, isFromColor) => {
    const { selectedAttributes, availableAttributes } = this.state;
    const isSelected = selectedAttributes[attribute] && selectedAttributes[attribute].variant_property_id === item.variant_property_id ? true : false;
    const available = availableAttributes[attribute] ? availableAttributes[attribute].filter((attribute) => attribute.variant_property_id === item.variant_property_id) : [];
    const isAvailable = available[0] ? true : false;
    return (
      <TouchableOpacity
        onPress={() => this.onPressTool(item, attribute, isFromColor)}
        style={[isFromColor ? styles.toolItemCell : styles.toolItemSizeCell, { backgroundColor: isSelected ? COLOR_CONST.charcoalGrey : COLOR_CONST.white }]}
      >
        <Text style={[styles.labelText, { color: isSelected ? COLOR_CONST.white : COLOR_CONST.charcoalGrey }]}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderToolListSelector = (attributeData, attribute, isFromColor) => {
    return (
      <View style={styles.listSelector}>
        <FlatList
          horizontal
          extraData={this.state}
          data={attributeData}
          renderItem={({ item, index }) => this.renderToolItem(item, attribute, isFromColor)}
        />
      </View>
    )
  }

  renderHSNCode = (selectedProduct) => {
    if (selectedProduct && selectedProduct.hsn_code) {
      return (
        <View style={styles.expiryReadStyle}>
          <Text style={styles.specifictaionTitle}>HSN Code</Text>
          <Text style={styles.DiscantaintType}>{selectedProduct.hsn_code}</Text>
        </View>
      )
    }
  }

  renderSelectorTools = () => {
    const { product_attributes } = this.state.productData.product;
    const { availableAttributes } = this.state;
    const isItemAvailable = this.checkSelectedInAvailable();
    if (product_attributes) {
      const attributes = Object.keys(product_attributes);
      attributes.sort();
      return (
        <View style={styles.selectorToolContainer}>
          {attributes.map((attribute) => {
            const attributesPresent = product_attributes[attribute].length > 0;
            return (
              <>
                {attributesPresent && <Text style={styles.colorText}>{attribute}</Text>}
                {attributesPresent && this.renderToolListSelector(
                  product_attributes[attribute],
                  attribute,
                  false
                )}
              </>
            )
          }
          )}
          <View style={styles.selectorToolMessageContainer}>
            {!isItemAvailable && (<Text style={styles.selectorToolMessage}>*This combination is not available</Text>)}
          </View>
        </View>
      )
    } else {
      return <View />
    }
  }


  renderNotifiyModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showNotifiyModal}
        onRequestClose={() => {
          this.setState({ showNotifiyModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.deleteAddress}>Request Processed</Text>
            <Text style={styles.areYouSure}>{STR_CONST.NOTIFY_MSG} </Text>
            <View style={styles.bottomPopupView}>
              <TouchableOpacity onPress={() => this.setState({ showNotifiyModal: false }, () => this.onRefreshProductDescription())}>
                <Text style={styles.cancelText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  getStarImage = (index, ratingValue) => {
    if (index < ratingValue) {
      let diffValue = ratingValue - index;
      if (diffValue < 1) {
        if (diffValue < 0.5) {
          console.log('@@@ Star Image Half Smaller =================');
          return IMG_CONST.LOWER_SELECTED_STAR;
        } else if (diffValue === 0.5) {
          console.log('@@@ Star Image Half =================');
          return IMG_CONST.HALF_SELECTED_STAR;
        } else {
          console.log('@@@ Star Image Half Greater =================');
          return IMG_CONST.UPPER_SELECTED_STAR;
        }
      }
      return IMG_CONST.SELECTED_STAR;
    } else {
      return IMG_CONST.UNSELECTED_STAR;
    }
  }

  renderProductReviewView = () => {
    console.log('@@@ Product data ========', this.state.productData.product.average_rating, this.state.productData.product);
    if (!this.state.productData.product.average_rating)
      return;
    let ratingNo = (Math.round(this.state.productData.product.average_rating * 100) / 100).toFixed(1);
    return (
      <View style={styles.reviewContainer}>
        <View style={styles.productRow}>
          <Text style={styles.leftHeading}>PRODUCT RATING</Text>
          <Text style={styles.rightHeading}>Product Rating</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.leftView}>
            <Text style={styles.biggerRatingText}>{String(ratingNo) === '5.0' ? 5 : ratingNo} / 5</Text>
            <View style={styles.starContainer}>
              {this.state.ratingList.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => { }}>
                    <Image source={this.getStarImage(index, this.state.productData.product.average_rating)} style={styles.star} />
                  </TouchableOpacity>
                )
              })}
            </View>
            {this.state.productData.product.reviews && <Text style={styles.basedText}>{`Based on ${this.state.productData.product.reviews.length} Ratings\n& Reviews`}</Text>}
          </View>
          <View style={styles.verticalLine} />
          <View style={[styles.rightView, {
            width: scale(170),
          }]}>
            <View style={styles.starRow}>
              <Text style={styles.no}>5</Text>
              <Image source={IMG_CONST.UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={[styles.filled1, {
                  width: this.state.productData.product.rating_details[5] ? `${this.state.productData.product.rating_details[5]}%` : 0
                }]} />
                <View style={[styles.unfilled1, {
                  width: this.state.productData.product.rating_details[5] ? (`${(100 - this.state.productData.product.rating_details[5])}%`) : '100%'
                }]} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>4</Text>
              <Image source={IMG_CONST.UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={[styles.filled2, {
                  width: this.state.productData.product.rating_details[4] ? `${this.state.productData.product.rating_details[4]}%` : 0
                }]} />
                <View style={[styles.unfilled2, {
                  width: this.state.productData.product.rating_details[4] ? (`${(100 - this.state.productData.product.rating_details[4])}%`) : '100%'
                }]} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>3</Text>
              <Image source={IMG_CONST.UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={[styles.filled3, {
                  width: this.state.productData.product.rating_details[3] ? `${this.state.productData.product.rating_details[3]}%` : 0
                }]} />
                <View style={[styles.unfilled3, {
                  width: this.state.productData.product.rating_details[3] ? (`${(100 - this.state.productData.product.rating_details[3])}%`) : '100%'
                }]} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>2</Text>
              <Image source={IMG_CONST.UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={[styles.filled4, {
                  width: this.state.productData.product.rating_details[2] ? `${this.state.productData.product.rating_details[2]}%` : 0
                }]} />
                <View style={[styles.unfilled4, {
                  width: this.state.productData.product.rating_details[2] ? (`${(100 - this.state.productData.product.rating_details[2])}%`) : '100%'
                }]} />
              </View>
            </View>
            <View style={styles.starRow}>
              <Text style={styles.no}>{" "}1</Text>
              <Image source={IMG_CONST.UNSELECTED_STAR} style={styles.innerStar} />
              <View style={styles.progressContainer}>
                <View style={[styles.filled5, {
                  width: this.state.productData.product.rating_details[1] ? `${this.state.productData.product.rating_details[1]}%` : 0
                }]} />
                <View style={[styles.unfilled5, {
                  width: this.state.productData.product.rating_details[1] ? (`${(100 - this.state.productData.product.rating_details[1])}%`) : '100%'
                }]} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {this.renderReviewList()}
      </View>
    )
  }

  renderReviewCell = (item, index) => {
    return (
      <View style={styles.reviewCell}>
        <View style={styles.nameRow}>
          <Text style={styles.reviewName}>{item.user_name}</Text>
          <Text style={styles.dateText}>{item.review_date}</Text>
        </View>
        <View style={styles.starListContainer}>
          {this.state.ratingList.map((starItem, index) => {
            return (
              <TouchableOpacity onPress={() => { }}>
                <Image source={index < item.rating ? IMG_CONST.SELECTED_STAR : IMG_CONST.UNSELECTED_STAR} style={styles.listStar} />
              </TouchableOpacity>
            )
          })}
        </View>
        <Text style={styles.reviewText}>{item.comment}</Text>
        <View style={styles.listHorizontalLine} />
      </View>
    )
  }

  renderReviewList = () => {
    if (!this.state.productData.product.reviews)
      return;
    if (this.state.productData.product.reviews.length === 0)
      return;
    let sliceLength = 0;
    if (this.state.productData.product.reviews.length <= 3)
      sliceLength = this.state.productData.product.reviews.length;
    else
      sliceLength = 3;
    return (
      <View style={styles.reviewListContainer}>
        <FlatList
          data={this.state.productData.product.reviews.slice(0, sliceLength)}
          extraData={this.state}
          renderItem={({ item, index }) => this.renderReviewCell(item, index)}
        />
        {(this.state.productData.product.reviews.length > 3) && <Text onPress={() => this.props.navigation.navigate('ReviewListScreen', { productData: this.state.productData })} style={styles.allTen}>All {this.state.productData.product.reviews.length} Reviews</Text>}
      </View>
    )
  }

  renderAddToCartModal = () => {
    if (!this.state.productData)
      return;
    const { name, images, description, price_including_tax, current_availability, is_wishlisted, stock_qty, subscription_package, subscription_period, subscription_quantity, on_sale, sale_price } = this.state.productData.product;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showAddCartModal}
        onRequestClose={() => {
          this.setState({ showAddCartModal: false })
        }}
      >
        <View activeOpacity={1} onPress={() => this.setState({ showAddCartModal: false })} style={styles.cartModalContainer}>
          <View style={styles.cartContainer}>
            <View style={styles.selectRow}>
              <Text style={styles.selectQuantityText}>Select Quantity</Text>
              <View style={styles.tools}>
                <TouchableOpacity onPress={() => this.onChangeSubscriptionQuantity(false)}>
                  <Text style={styles.minus}>-</Text>
                </TouchableOpacity>
                <Text style={styles.count}>{this.state.subscriptionQuantity}</Text>
                <TouchableOpacity onPress={() => this.onChangeSubscriptionQuantity(true)}>
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.selectSubscription}>SELECT SUBSCRIPTION PACKAGE</Text>
            <View style={styles.subscriptionRow}>
              {
                this.state.subscriptionPackageData.map((item) => {
                  return (
                    <TouchableOpacity onPress={() => this.onSelectSubscriptionPackage(item)} style={styles.packageRow}>
                      <Image source={item.isSelected ? IMG_CONST.RADIO_SELECTED : IMG_CONST.RADIO_UNSELECTED} style={styles.radio} />
                      <Text style={styles.dailyText}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            {this.state.invalidSubscriptionPackage && <Text style={styles.emptyText}>Please select subscription package.</Text>}
            <Text style={styles.selectSubscriptionPeriod}>SELECT SUBSCRIPTION PERIOD</Text>
            <DropDownPicker
              items={this.state.subscriptionPeriodData}
              defaultValue={this.state.period}
              containerStyle={styles.pickerContainer}
              labelStyle={styles.labelStyle}
              style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 1, }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.onSelectSubscriptionPeriod(item)}
            />
            {this.state.invalidSubscriptionPeriod && <Text style={styles.emptyText}>Please select subscription period.</Text>}
            {this.state.subscriptionTimeSlotData.length > 0 && <Text style={styles.selectSubscription}> PREFERRED TIME SLOT </Text>}
            <View style={styles.subscriptionRow}>
              {this.state.subscriptionTimeSlotData.length > 0 && this.state.slots.map((item) => {
                if (item.availabity) {
                  return (
                    <TouchableOpacity onPress={() => this.setSubSlots(item.id)} style={styles.packageRow}>
                      <Image source={item.id === this.state.selectedSlotId ? IMG_CONST.RADIO_SELECTED : IMG_CONST.RADIO_UNSELECTED} style={styles.radio} />
                      <Text style={styles.dailyText}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                }
              })
              }
            </View>
            {this.state.subscriptionTimeSlotData.length > 0 && <DropDownPicker
              items={this.state.subscriptionTimeSlotData}
              defaultValue={this.state.selectedTimeSlot}
              containerStyle={styles.pickerContainer}
              labelStyle={styles.labelStyle}
              style={{ backgroundColor: '#fff', borderWidth: 0, borderBottomWidth: 1, }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.onSelectSubscriptionTimeSlot(item)}
            />}
            {this.state.invalidateSubscriptionTimeSlot && <Text style={styles.emptyText}>Please select delivery time slot.</Text>}
            <View style={styles.totalPriceRow}>
              <Text style={styles.totalPrice}>Total Price</Text>
              <Text style={styles.priceValue}>₹ {on_sale ? parseFloat(price_including_tax * this.state.subscriptionQuantity).toFixed(2) : parseFloat(price_including_tax * this.state.subscriptionQuantity).toFixed(2)}</Text>
            </View>
            <View style={styles.cartButtonContainer}>
              <TouchableOpacity onPress={() => this.onPressSubscribeAddToCart()}>
                <LinearGradient colors={[COLOR_CONST.buttonColor, COLOR_CONST.buttonColor]} style={styles.cartButtonCustom}>
                  <Text style={styles.AddcustomTxtStyle}>ADD TO CART</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onPressBuyNow(true)}>
                <LinearGradient colors={[COLOR_CONST.buyNowButton, COLOR_CONST.buyNowButton]} style={styles.cartButtonCustom}>
                  <Text style={styles.BUYcustomTxtStyle}>BUY NOW</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.setState({ showAddCartModal: false })}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderVariantItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.variantCell}>
        <Image source={IMG_CONST.PRODUCT_ASSET} style={styles.variantImage} />
      </TouchableOpacity>
    )
  }

  renderTruncatedFooter = (handlePress) => {
    //<Text style={styles.readmore}>Read More</Text>
    return (
      <Text style={styles.readmore} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.readmore} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  handleTextReady = () => {
    // ...
  };

  renderVarientImageItems = (item, index) => {
    console.log('Images', item);
    return (
      <TouchableOpacity
        style={styles.variantCell}
        onPress={() => {
          this.setState({ selectedImage: item.image });
        }}>
        <CachedImage
          resizeMode={"contain"}
          source={item.image}
          renderError={(error) => console.log(error)}
          renderIndicator={this.renderIndicator}
          style={styles.variantImage}
        />
        {/* <LoadingImage
                resizeMode={"contain"}
                source={{uri: item.image}}
                renderError={(error)=>console.log(error)}
                renderIndicator={this.renderIndicatorForVarientImage}
                style={styles.variantImage} 
               
              /> */}
        {/* <Image source={{uri: item.image}} style={styles.variantImage} /> */}
      </TouchableOpacity>
    );
  };

  renderViewAll = () => {
    console.log('@@@ Selected Product ========', this.state.selectedProduct)
    const { productData, selectedProduct, selectedImage } = this.state;
    const { product } = productData;
    const { name, images, description, current_availability, is_wishlisted, product_variants } = product;
    const price = selectedProduct ? selectedProduct.price_including_tax : product.price_including_tax;
    const stock_qty = selectedProduct ? selectedProduct.stock_qty : product.stock_qty;
    const on_sale = selectedProduct ? selectedProduct.on_sale : product.on_sale;
    const sale_price = selectedProduct ? selectedProduct.sale_price : product.sale_price;
    const isVarientImages = selectedProduct && selectedProduct.images.length > 0;
    return (
      <>
        <ScrollView ref='_scrollView' style={{ marginBottom: verticalScale(50) }}>
          <View style={styles.productImageContainer}>
            <CachedImage
              resizeMode={"contain"}
              source={
                this.state.selectedImage
                  ? selectedImage
                  : product.images && product.images.length > 0
                    ? product.images[0].image
                    : null
              }
              renderError={(error) => console.log(error)}
              renderIndicator={this.renderIndicator}
              style={styles.imageStyle}
            />
            {/* <LoadingImage
                resizeMode={"contain"}
                source={
                  this.state.selectedImage
                    ? {uri: selectedImage}
                    : product.images && product.images.length > 0
                    ? {uri: product.images[0].image}
                    : null
                }
                renderError={(error)=>console.log(error)}
                renderIndicator={this.renderIndicator}
                style={styles.imageStyle} 
               
              /> */}
            {/* <LoadingImage resizeMode={'contain'} source={
                this.state.selectedImage
                  ? {uri: selectedImage}
                  : product.images && product.images.length > 0
                  ? {uri: product.images[0].image}
                  : null
              } style={styles.imageStyle} /> */}
          </View>
          <View style={styles.variantList}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              extraData={this.state}
              data={isVarientImages
                ? selectedProduct.images
                : product.images
              }
              renderItem={({ item, index }) => this.renderVarientImageItems(item, index)}
            />
          </View>
          <View style={styles.productNameContainer}>
            <TouchableOpacity style={styles.heartConatiner} onPress={() => this.onHeartPress(is_wishlisted)}>
              {!is_wishlisted ? (
                <Image source={IMG_CONST.HEARTWISHLIST} style={styles.heart} />
              ) : (
                <Image source={IMG_CONST.REDHEART} style={styles.heart} />
              )
              }
            </TouchableOpacity>
            <Text style={styles.productName}>{name}</Text>
            <View style={styles.priceRow}>
              {on_sale ? (<View style={styles.discountRow}>
                <Text style={styles.price}>₹ {price}</Text>
              </View>) : (<Text style={styles.price}>₹ {price}</Text>)}
              {selectedProduct ? selectedProduct.current_availability === 'in_stock' ? <>
                <Image source={IMG_CONST.STOCK_TICK} style={styles.stockTick} />
                <Text style={styles.inStockText}>In stock online</Text>
              </> :
                <>
                  <View style={styles.outStock}>
                    <Image source={IMG_CONST.SOLD_OUT_ICON} style={styles.stockTick} />
                    <Text style={styles.soldOutText}>Out Of Stock</Text>
                  </View>
                </> : <View />}

              {selectedProduct ? selectedProduct.current_availability === 'in_stock' &&
                <View style={[styles.tools, { marginLeft: 10 }]}>
                  <TouchableOpacity onPress={() => this.onUpdateCartValue(false)}>
                    <Text style={styles.minus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.count}>{this.state.productQuantity}</Text>
                  <TouchableOpacity onPress={() => this.onUpdateCartValue(true)}>
                    <Text style={styles.plus}>+</Text>
                  </TouchableOpacity>
                </View> : <View />}
              {!selectedProduct ? current_availability === 'in_stock' ? <>
                <Image source={IMG_CONST.STOCK_TICK} style={styles.stockTick} />
                <Text style={styles.inStockText}>In stock online</Text>
              </> :
                <>
                  <View style={styles.outStock}>
                    <Image source={IMG_CONST.SOLD_OUT_ICON} style={styles.stockTick} />
                    <Text style={styles.soldOutText}>Out Of Stock</Text>
                  </View>
                </> : <View />}

              {!selectedProduct ? current_availability === 'in_stock' &&
                <View style={[styles.tools, { marginLeft: 10 }]}>
                  <TouchableOpacity onPress={() => this.onUpdateCartValue(false)}>
                    <Text style={styles.minus}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.count}>{this.state.productQuantity}</Text>
                  <TouchableOpacity onPress={() => this.onUpdateCartValue(true)}>
                    <Text style={styles.plus}>+</Text>
                  </TouchableOpacity>
                </View> : <View />}
            </View>
            {on_sale ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.discountPrice}> ₹ {selectedProduct ? selectedProduct.variant_actual_price : product.actual_price}</Text>
                <Text style={styles.mrp}>MRP</Text>
              </View>
              : null}
          </View>
          {this.renderSelectorTools()}
          <View style={styles.descrpitionStyle}>
            {/* <View style={styles.skuReadStyle}>
              <Text style={styles.specifictaionTitle}>SKU / Barcode</Text>
              <Text style={styles.DiscantaintType}>{this.props.route.params.productData.system_sku ? this.props.route.params.productData.system_sku : '--'}</Text>
            </View> */}

            {this.renderHSNCode(selectedProduct)}
            <View style={styles.expiryReadStyle}>
              <Text style={styles.specifictaionTitle}>Expiry Date</Text>
              <Text style={styles.DiscantaintType}>{selectedProduct && selectedProduct.expiry_date ? selectedProduct.expiry_date : "--"}</Text>
              {/* <Text style={styles.DiscantaintType}>{this.props.route.params.productData.expiry_date ? this.props.route.params.productData.expiry_date : "--"}</Text> */}
            </View>
            <View style={styles.expiryReadStyle}>
              <Text style={styles.specifictaionTitle}>Brand</Text>
              <Text style={styles.DiscantaintType}>{this.props.route.params.productData.brand && this.props.route.params.productData.brand.name ?
                this.props.route.params.productData.brand.name : "--"}</Text>
            </View>
            {description ? <View style={styles.descrpitionReadStyle}>
              <Text style={styles.specifictaionTitle}>DESCRIPTION</Text>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={this.renderTruncatedFooter}
                renderRevealedFooter={this.renderRevealedFooter}
                onReady={this._handleTextReady}>
                <Text style={styles.DiscantaintType}>
                  {description
                    ? description
                    : ""}
                </Text>
              </ReadMore>
            </View> : null}
          </View>
          {this.renderProductReviewView()}
          {/*<View style={styles.ShippingContainer}>
            <View style={styles.shippingStyle}>
              <Text style={styles.specifictaionTitle}>SHIPPING OPTIONS</Text>
              {/* <Text style={styles.pincode}>You haven’t selected a shipping location. Please enter your pincode to continue.</Text> */}
          {/*<View style={styles.inputField}>
            <TextInput
              style={[styles.textPincode, { color: this.state.isAvailabilityChecked ? this.state.isAvailable ? COLOR_CONST.charcoalGrey : COLOR_CONST.pastelRed : COLOR_CONST.charcoalGrey}]}
              secureTextEntry={false}
              value={this.state.isAvailabilityChecked ? this.state.availableMessage : this.state.zipCode}
              onChangeText={(value) => this.setState({ zipCode: value, isAvailabilityChecked: false })}
              keyboardType={'number-pad'}
              placeholder={this.state.isAvailabilityChecked ? this.state.availableMessage : "Pincode"}
              placeholderTextColor={COLOR_CONST.coolGreyTwo}
              underlineColorAndroid="transparent"
            />
              <TouchableOpacity>
                <Image source={IMG_CONST.LOCATION_GREEN} style={styles.imagesstyle} />
              </TouchableOpacity>
            </View>

            <GreenButton
              disabled={this.state.zipCode === ''}
              title={this.state.isAvailabilityChecked ? 'CHANGE ZIPCODE' : "CHECK"}
              customStyle={[styles.buttonCustom, { opacity: this.state.zipCode === '' ? 0.5 : 1}]}
              customTxtStyle={styles.customTxtStyle}
              onPress={() => {
                if(this.state.isAvailabilityChecked)
                  this.setState({ isAvailabilityChecked: false })
                else
                  this.onCheckProductAvailability()
              }}
            />
            </View>
            </View>*/}
          {this.state.similarProducts.length > 0 &&
            <View style={styles.productGrid}>
              <ProductGrid
                name={'Similar Product'}
                data={this.state.similarProducts}
                onPress={(item) => this.props.navigation.push('ProductDescription', { productData: item })}
                onPressProductListing={() => this.props.navigation.replace('ProductListing', { screenName: 'Similar Products' })}
                onAddToCart={(value, item, selectedAttributes) => this.onAddToCartFromGrid(value, item, selectedAttributes)}
                onRemoveFromCart={(value, item) => this.onRemoveFromCart(value, item)}
                updateQuantiyInCart={(value, item, selectedAttributes) => this.updateQuantiyInCartFromGrid(value, item, selectedAttributes)}
                onAddToWishlist={(item) => this.onAddToWishlist(item)}
                onRemoveFromWishlist={(item) => this.onRemoveFromWishlist(item)}
                hideViewAll
                showErrorMessage={(msg) => this.props.showErrorModal(msg)}
              />
            </View>}
        </ScrollView>
        {!selectedProduct && <View style={styles.ButtonConatiner}>
          {current_availability === 'in_stock' ? (this.renderButton()) : (this.renderNotification())}
        </View>}
        {selectedProduct && <View style={styles.ButtonConatiner}>
          {selectedProduct.current_availability === 'in_stock' ? (this.renderButton()) : (this.renderNotification())}
        </View>}
      </>
    )
  }

  refreshCart = async () => {
    let userID = await AsyncStorage.getItem('USER_ID');
    let data = {
      uuid: DeviceInfo.getUniqueId(),
      userID: userID,
    }
    this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });
  };

  renderGuestModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={this.state.showGuestModal}
        visible={this.state.showGuestModal}
        onRequestClose={() => {
          this.setState({ showGuestModal: false })
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => { }} style={styles.modalContainer1}>
          <View style={styles.popup1}>
            <Text style={styles.deleteAddress1}>Please Sign Up/Log In first</Text>
            <Text style={styles.areYouSure1}>You need an account to perform this action.</Text>
            <View style={styles.bottomPopupView1}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showGuestModal: false })}>
                <Text style={styles.cancelText1}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine1} />
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => this.setState({ showGuestModal: false }, () => this.props.navigation.replace('AuthNavigator'))}>
                <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" isFocused={true} />
        {this.state.productData && this.renderViewAll()}
        {this.state.showNotifiyModal && this.renderNotifiyModal()}
        {this.renderAddToCartModal()}
        {this.renderGuestModal()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
    profileData: state.profile.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    startSpinner: () => dispatch(commonActions.startSpinner()),
    stopSpinner: () => dispatch(commonActions.stopSpinner()),
    getProductDescription: (data, successCallBack, failureCallBack) => dispatch(productActions.getProductDescription(data, successCallBack, failureCallBack)),
    checkProductAvailability: (data, successCallBack, failureCallBack) => dispatch(productActions.checkProductAvailability(data, successCallBack, failureCallBack)),
    notifyMeAboutProduct: (data, successCallBack, failureCallBack) => dispatch(productActions.notifyMeAboutProduct(data, successCallBack, failureCallBack)),
    notifyMeAboutVariantProduct: (data, successCallBack, failureCallBack) => dispatch(productActions.notifyMeAboutVariantProduct(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.addToCart(data, successCallBack, failureCallBack)),
    updateQuantiyInCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.updateQuantiyInCart(data, successCallBack, failureCallBack)),
    removeFromCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.removeFromCart(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    createCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    addToWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.addToWishlist(data, successCallBack, failureCallBack)),
    removeFromWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.removeFromWishlist(data, successCallBack, failureCallBack)),
    checkOrderItemAvailability: (data, successCallBack, failureCallBack) => dispatch(cartActions.checkOrderItemAvailability(data, successCallBack, failureCallBack)),
    buyProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.buyProduct(data, successCallBack, failureCallBack)),
    setSelectedAttributes: (data) => dispatch(homeActions.setSelectedAttributes(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);