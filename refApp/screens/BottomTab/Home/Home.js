import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions, Linking, Text, Alert, BackHandler, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground, Modal } from 'react-native';
import CustomButton from '../../../components/CustomButton';
import GreenButton from '../../../components/GreenButton';
import { Category } from '../../../components/homeComponents/Category/Category';
import { ProductGrid } from '../../../components/homeComponents/ProductGrid/ProductGrid';
import { HeaderRight } from '../../../components/HeaderRight';
import * as IMG_CONST from '../../../theme/ImageConstants';
import * as STR_CONST from '../../../theme/StringConstants';
import LinearGradient from 'react-native-linear-gradient';
import ColorConstants, { FONTS } from '../../../theme/ColorConstants';
import styles from './HomeStyle';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import * as categoryActions from '../../../redux/actions/categoryActions';
import * as brandActions from '../../../redux/actions/brandActions';
import * as commonActions from '../../../redux/actions/commonActions';
import * as homeActions from '../../../redux/actions/homeActions';
import * as cartActions from '../../../redux/actions/cartActions';
import * as wishlistActions from '../../../redux/actions/wishlistActions';
import * as profileActions from '../../../redux/actions/profileActions';
import * as userActions from '../../../redux/actions/userActions';
import { fcmService } from '../../../../app/services/notifications/FCMService';
import { localNotificationService } from '../../../../app/services/notifications/LocalNotificationService';
import DeviceInfo from 'react-native-device-info';
import Swiper from 'react-native-swiper';
import R from '../../R';
import AsyncStorage from '@react-native-community/async-storage';
import { appObj } from '../../../../App';
import * as setOtp from '../../../redux/actions/setOtp'
import * as Validators from '../../../utils/Validators';
import scale from '../../../utils/Scale';
import CachedBanner from "../../../components/CachedBanner";
import Toast from 'react-native-simple-toast';
import * as Sentry from '@sentry/react-native';

// import PushNotification from 'react-native-push-notification';

class Home extends React.Component {
  static displayName = "CoolComponent";
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      latestProductsList: [],
      recommendedProductsList: [],
      bannerImages: [],
      isFetchingData: true,
      pincode: "",
      showAlertModal: false,
      errorMessage: "",
      loadOnce: 0,
    };
    this.notificationMessageId = "";
  }

  async componentDidMount() {
    try {
      this.setDeepLink();
      this.getHomeData();
      this.setupNotification();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  componentWillUnmount() {
    try {
      Linking.removeEventListener('url', this.handleOpenURL);
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setDeepLink = () => {
    try {
      Linking.getInitialURL().then((url) => {
        console.log('@@@ DEEPLINK ==================INITIAL HOME', url);
        if (url) {
          if (!appObj.state.isDeepLinkUtilised) {
            appObj.setState({ isDeepLinkUtilised: true }, () => {
              this.deepLinkNavigate(url);
            });
          }
        }
      });
      Linking.addEventListener('url', this.handleOpenURL);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  handleOpenURL = (event) => {
    try {
      console.log('@@@ DEEPLINK ==================HANDLE HOME', event.url);
      if (!appObj.state.isDeepLinkUtilised) {
        appObj.setState({ isDeepLinkUtilised: true }, () => {
          this.deepLinkNavigate(event.url);
        })
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  deepLinkNavigate = async (url) => {
    try {
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[0];
      console.log('@@@ Deep Link Data =========', url, id, routeName);
      if (routeName === 'product')
        this.props.navigation.navigate('ProductDescription', { productData: { id: Number(id) }, isFromDeepLink: true, });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerStyle: { backgroundColor: COLOR_CONST.LightlightNavy, shadowColor: 'transparent' },
      title: STR_CONST.MEDICINE_ORDER,
      headerLeft: () => (<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}><Image source={IMG_CONST.BACK_ICON_WHITE} style={styles.backIcon} /></TouchableOpacity>),
    })
  }

  setupNotification = () => {
    try {
      fcmService.register(
        (token) => this.onRegister(token),
        (notify) => this.onNotification(notify),
        (notify) => this.onOpenNotification(notify),
      );
      localNotificationService.configure((notify) =>
        this.onOpenNotification(notify),
      );
    } catch (error) {
      Sentry.captureException(error);
      console.log('@@@ FCM Error ==========', error);
    }
  };

  onRegister = async (token) => {
    try {
      console.log('@@@ FCM Registeration Token ==========', token);
      let fcmToken = await AsyncStorage.getItem('USER_FCM_TOKEN');
      let accessToken = await AsyncStorage.getItem('USER_TOKEN');
      let data = {
        access_token: accessToken,
        device_token: fcmToken,
      };
      this.props.sendDeviceToken(
        data,
        (res) => this.sendDeviceTokenSuccessCallBack(res),
        (error) => this.sendDeviceTokenFailureCallBack(error),
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onNotification = (notify) => {
    try {
      console.log('@@@ FCM Show Notification onNotification ==========', notify);
      // PushNotification.getChannels(function(channels) {
      //   console.log('getchannels gives us', channels);
      // });
      let uniquedNotifId = Math.floor((Math.random() * 1000) + 1);
      this.setState({ notificationStatus: notify });
      const options = {
        soundName: 'default',
        playSound: true,
      };
      if (notify.title) {
        if (this.notificationMessageId != notify.messageId) {
          localNotificationService.showNotification(uniquedNotifId, notify.title, notify.message, notify, options);
          this.notificationMessageId = notify.messageId;
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  onOpenNotification = (notify) => {
    try {
      console.log('@@@ FCM On onOpenNotification ==========', notify);
      let notificationData = notify.data.notification;
      if (notificationData) {
        let noificationKey = notify.data.data.notification_key;
        console.log('@@@ FCM IF ===================1');
        if (
          noificationKey === 'ORDER ITEM CONFIRMED' ||
          noificationKey === 'ORDER ITEM SHIPPED' ||
          noificationKey === 'ORDER ITEM DELIVERED' ||
          noificationKey === 'ORDER ITEM CANCELLED'
        ) {
          if (!notify.data.data) return;
          let productData = notify.data.data;
          this.props.navigation.navigate('MyOrderDetails', {
            orderData: { id: productData.order_id },
            mainOrderData: { id: productData.order_item_id },
          });
        } else if (noificationKey === 'PLACED' || noificationKey === 'CANCELLED' || noificationKey === 'CONFIRMED') {
          console.log('@@@ FCM IF ===================2');
          this.props.navigation.navigate('MyOrders');
        } else if (noificationKey === 'PRODUCT_IS_IN_STOCK') {
          if (!notify.data.data) return;
          let productData = notify.data.data;
          this.props.navigation.navigate('ProductDescription', { productData: { id: Number(productData.product_id) } });
        } else {
          console.log('@@@ FCM IF ===================3');
        }
      } else {
        notificationData = notify.notification;
        if (!notificationData) return;
        console.log('@@@ FCM ELSE ===================1', notificationData);
        let noificationKey = notify.data.notification_key;
        if (
          noificationKey === 'ORDER ITEM CONFIRMED' ||
          noificationKey === 'ORDER ITEM SHIPPED' ||
          noificationKey === 'ORDER ITEM DELIVERED' ||
          noificationKey === 'ORDER ITEM CANCELLED'
        ) {
          if (!notify.data) return;
          let productData = notify.data;
          this.props.navigation.navigate('MyOrderDetails', {
            orderData: { id: productData.order_id },
            mainOrderData: { id: productData.order_item_id },
          });
        } else if (noificationKey === 'PLACED' || noificationKey === 'CANCELLED' || noificationKey === 'CONFIRMED') {
          console.log('@@@ FCM ELSE ===================2');
          this.props.navigation.navigate('MyOrders');
        } else if (noificationKey === 'PRODUCT_IS_IN_STOCK') {
          if (!notify.data) return;
          let productData = notify.data;
          this.props.navigation.navigate('ProductDescription', { productData: { id: Number(productData.product_id) } });
        } else {
          console.log('@@@ FCM ELSE ===================3');
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  sendDeviceTokenSuccessCallBack = (res) => {
    try {
      console.log(
        '@@@ Send Device Token Success CallBack ===================',
        res,
      );
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  sendDeviceTokenFailureCallBack = (error) => {
    try {
      console.log('@@@ Send Device Token Failure CallBack ===================');
      if (error) {
        setTimeout(() => {
          // this.props.showErrorModal(error);
        }, 0);
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  handleBackButtonClick = () => {
    try {
      Alert.alert(
        'Exit App',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => { BackHandler.exitApp() } },
        ],
        { cancelable: false },
      );
      return true
    } catch (err) {
      Sentry.captureException(err);
    }
  }
//***************//
updateProductListAfterRemoveFromWishList=(productId, label)=>{
  if(label=='top offers'){
    let UpdatedArray=this.state.latestProductsList.map((item)=>{
      if(item.id==productId){
        return Object.assign(item,{
          is_wishlisted:false,
          wishlist_item:false,
        })
      }
      return item;
    })
    console.log(`RemoveFromWishList'top offers'>>>>>>>>>>>>>>>>>>`, 
    UpdatedArray)
    this.setState({latestProductsList:UpdatedArray});
  }
else{
  let UpdatedArray=this.state.recommendedProductsList.map((item)=>{
    if(item.id==productId){
      return Object.assign(item,{
        is_wishlisted:false,
        wishlist_item:false,
      })
    }
    return item;
  })
  console.log(`RemoveFromWishList'Best Deals for you.>>>>>>>>>>>>>>>>>>`, 
  UpdatedArray)
  this.setState({recommendedProductsList:UpdatedArray});
}
}

updateProductListAfterAddInWishList=(productId,label)=>{
  console.log(`productId>>>>>>>>>>>>>>>>>>`, productId,label)
if(label=='top offers'){
  let UpdatedArray=this.state.latestProductsList.map((item)=>{
    if(item.id==productId){
      return Object.assign(item,{
        is_wishlisted:true
      })
    }
    return item;
  })
  console.log(`AddWishList'top offers'.>>>>>>>>>>>>>>>>>>`, 
  UpdatedArray)
  this.setState({latestProductsList:UpdatedArray});
}
else{
  let UpdatedArray=this.state.recommendedProductsList.map((item)=>{
    if(item.id==productId){
      return Object.assign(item,{
        is_wishlisted:true
      })
    }
    return item;
  })
  console.log(`AddWishList'Best Deals for you.>>>>>>>>>>>>>>>>>>`, 
  UpdatedArray)
  this.setState({recommendedProductsList:UpdatedArray});
}
}
  updateProductListAfterremoveFromCart=(productVarientId, value, productId,label)=>{
        if(label=='top offers'){
          let UpdatedArray=this.state.latestProductsList.map((item)=>{
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
           console.log(`top offers remove from cart`, UpdatedArray)
           this.setState({latestProductsList:UpdatedArray});
        }
        else{
          let UpdatedArray=this.state.recommendedProductsList.map((item)=>{
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
           console.log(`best deals for you remove from cart`, 
           UpdatedArray)
           this.setState({recommendedProductsList:UpdatedArray});
        }  
  }
  updateProductListAfterUpdateCart=(productVarientId, value, label)=>{
    if(label=='top offers'){
      let UpdatedArray=this.state.latestProductsList.map((item)=>{
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
       console.log(`ProductListAfterUpdateCart'top offers>>>>>>>>>>>>>>`, 
       UpdatedArray)
       this.setState({latestProductsList:UpdatedArray});
    }
   else {
    let UpdatedArray=this.state.recommendedProductsList.map((item)=>{
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
     console.log(`ProductListAfterUpdateCart'Best deals for you'>>>>>>>>>>>>>>>>>>`, 
     UpdatedArray)
     this.setState({recommendedProductsList:UpdatedArray});
   }
  }

  updateProductListAfterAddToCart=(productVarientId,label)=>{
    console.log(`productVarientid and label`, productVarientId,label)
    if(label=='top offers'){
      let UpdatedArray=this.state.latestProductsList.map((item)=>{
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
       console.log(`AddToCArtlatestProductsList>>>>>>>>>>>>`, 
       UpdatedArray)
       this.setState({latestProductsList:UpdatedArray});
    }
   else{
    let UpdatedArray=this.state.recommendedProductsList.map((item)=>{
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
    console.log(`AddToCartrecommendedProductsList>>>>>>>>>>>>>>>>>>`,
    UpdatedArray)
     this.setState({recommendedProductsList:UpdatedArray});
   }
  }
//**************//
  getHomeData = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      try {
        let pincode = await AsyncStorage.getItem('pincode');
        if (pincode) {
          this.setState({
            pincode: pincode,
            showAlertModal: false,
            errorMessage: ""
          });
          this.props.setOTPfunction(pincode);
        }
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          uuid: DeviceInfo.getUniqueId(),
          userID: userID,
          showLoader: this.state.loadOnce < 1
        }
        this.props.createCart(data, (res) => this.createCartSuccessCallBack(res), (error) => this.createCartFailureCallBack(error));
        this.props.getBrandList(data, (res) => this.getBrandListSuccessCallBack(res), (error) => this.getBrandListFailureCallBack(error));
        this.props.getTagList(data, (res) => this.getTagListSuccessCallBack(res), (error) => this.getTagListFailureCallBack(error));
        this.props.getCategoryList(data, (res) => this.getCategoryListSuccessCallBack(res), (error) => this.getCategoryListFailureCallBack(error));
        this.props.cartHasProduct(data, (res) => { }, (error) => { });
        this.props.getProfileData(data, (res) => { }, (error) => this.getProfileFailureCallBack(error));
        this.props.getHomeBannerList(data, (res) => this.getHomeBannerListSuccessCallBack(res), (error) => this.getHomeBannerListFailureCallBack(error));
        this.props.getHomeProductList(data, (res) => this.getHomeProductListSuccessCallBack(res), (error) => this.getHomeProductListFailureCallBack(error));
      } catch (err) {
        Sentry.captureException(err);
      }
    });
  }

  getHomeBannerListSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Banner List Success CallBack ===================', res);
      this.setState({ bannerImages: res.data.banners });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHomeBannerListFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Banner List Failure CallBack ===================');
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

  getProfileFailureCallBack = async (error) => {
    try {
      console.log('@@@ Get Profile Failure CallBack ===================', error);
      if (error) {
        if (error === 'User not found with this id.') {
          await AsyncStorage.removeItem('USER_TOKEN');
          await AsyncStorage.removeItem('USER_ID');
          await AsyncStorage.removeItem('LOCATION_ACCESS');
          await AsyncStorage.removeItem('NOTIFICATION_ACCESS');
          this.props.navigation.replace('AuthNavigator');
        }
      } else {
        setTimeout(() => {
          this.props.showErrorModal('Network Error!');
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHomeProductListSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Home Product List Success CallBack ===================', res);
      this.setState({
        categoryList: res.data.categories,
        latestProductsList: res.data.all_products,
        recommendedProductsList: res.data.recommended_products,
        loadOnce: this.state.loadOnce + 1
      }, async () => {
        let userID = await AsyncStorage.getItem('USER_ID');
        let data = {
          uuid: DeviceInfo.getUniqueId(),
          userID: userID,
        }
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getHomeProductListFailureCallBack = (error) => {
    try {
      console.log('@@@ Get Home Product List Failure CallBack ===================');
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

  createCartSuccessCallBack = (res) => {
    try {
      console.log('@@@ Create Cart Success CallBack ===================', res, this.props.cartData);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  createCartFailureCallBack = (error) => {
    try {
      console.log('@@@ Create Cart Failure CallBack ===================', error);
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

  getBrandListSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Brand List Success CallBack ===================');
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getBrandListFailureCallBack = (error) => {
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

  getTagListSuccessCallBack = (res) => {
    try {
      console.log('@@@ Get Tag List Success CallBack ===================');
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getTagListFailureCallBack = (error) => {
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

  onAddToCart = async (value, item, selectedProduct,label) => {
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
      this.props.addToCart(data, (res) => this.addToCartSuccessCallBack(data,res, productVarientId,label), (error) => this.addToCartFailureCallBack(error, productVarientId));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartSuccessCallBack = (data,res, productVarientId,label) => {
    try {
      console.log('@@@ Add to Cart Success CallBack ===================', res);
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      Toast.showWithGravity('Product added to cart successfully.', Toast.SHORT, Toast.BOTTOM);
      //this.refreshHomeProductList();
      this.updateProductListAfterAddToCart(productVarientId,label)
      this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToCartFailureCallBack = (error, productVarientId) => {
    try {
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      this.refreshHomeProductList();
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

  onRemoveFromCart = async (value, item, selectedProduct,label) => {
    console.log(`value, item, selectedProduct, label>>>>>>>>`,value, item, selectedProduct,label )
    try {
      const orderId = this.getOrderIdForProduct(item);
      let userID = await AsyncStorage.getItem('USER_ID');
      let productVarientId = undefined;
      if (item.product_variants.length > 0) {
        productVarientId = selectedProduct?.id;
      }
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        order_item_id: orderId,
        quantity: value,
        userID: userID,
        cartId: this.props.cartData.order.id,
      }
      console.log('@@@ onRemove Data ==========', data);
      this.props.removeFromCart(data, (res) => this.removeFromCartSuccessCallBack(res,data, productVarientId, value, item.id, label), (error) => this.removeFromCartFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromCartSuccessCallBack = (res,data, productVarientId, value, productId, label) => {
    try {
      console.log('@@@ Remove From Cart Success CallBack ===================');
     // this.refreshHomeProductList();
     this.updateProductListAfterremoveFromCart(productVarientId, value,productId, label)
      Toast.showWithGravity('Product removed from cart successfully.', Toast.SHORT, Toast.BOTTOM);
      this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });

    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromCartFailureCallBack = (error) => {
    try {
      this.refreshHomeProductList();
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

  updateQuantiyInCart = async (value, item, selectedProduct,label) => {
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
      this.props.updateQuantiyInCart(data, (res) => this.updateQuantiyInCartSuccessCallBack(res, data, productVarientId, value, label), (error) => this.updateQuantiyInCartFailureCallBack(error, productVarientId));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartSuccessCallBack = (res, data, productVarientId, value,label) => {
    try {
      console.log('@@@ Update quantity in Cart Success CallBack ===================');
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      Toast.showWithGravity('Product quantity successfully updated.', Toast.SHORT, Toast.BOTTOM);
      //this.refreshHomeProductList();
      this.updateProductListAfterUpdateCart(productVarientId, value, label);
      this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });

    } catch (err) {
      Sentry.captureException(err);
    }
  }

  updateQuantiyInCartFailureCallBack = (error, productVarientId) => {
    try {
      if (productVarientId) {
        this.props.setSelectedAttributes(null);
      }
      this.refreshHomeProductList();
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

  onAddToWishlist = async (item,label) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        userID: userID,
      }
      this.props.addToWishlist(data, (res) => this.addToWishlistSuccessCallBack(res,item.id,label), (error) => this.addToWishlistFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToWishlistSuccessCallBack = async (res, productId,label) => {
    try {
      console.log('@@@ Add To WishList Success CallBack ===================', res);
      this.updateProductListAfterAddInWishList(productId,label)
      //this.refreshHomeProductList();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  addToWishlistFailureCallBack = (error) => {
    try {
      this.refreshHomeProductList();
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

  onRemoveFromWishlist = async (item, label) => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        product_id: item.id,
        userID: userID,
      }
      this.props.removeFromWishlist(data, (res) => this.removeFromWishlistSuccessCallBack(res,item.id,label), (error) => this.removeFromWishlistFailureCallBack(error));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromWishlistSuccessCallBack = async (res,productId,label) => {
    try {
      console.log('@@@ Remove From WishList Success CallBack ===================', res);
      setTimeout(() => {
        this.props.showErrorModal('The Item has been removed from the wishlist.');
        setTimeout(async () => {
          this.props.hideErrorModal();
        }, 2000);
      }, 0);
      this.updateProductListAfterRemoveFromWishList(productId,label)
     // this.refreshHomeProductList();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  removeFromWishlistFailureCallBack = (error) => {
    try {
      this.refreshHomeProductList();
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

  refreshHomeProductList = async () => {
    try {
      let userID = await AsyncStorage.getItem('USER_ID');
      let data = {
        uuid: DeviceInfo.getUniqueId(),
        userID: userID,
      }
      this.props.getHomeProductList(data, (res) => this.getHomeProductListSuccessCallBack(res), (error) => this.getHomeProductListFailureCallBack(error));
      this.props.cartHasProduct(data, (res) => { this.setNavigationHeaderConfiguration() }, (error) => { });
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onPressBanner = (item) => {
    try {
      if (item.url_id && item.url_type === 'category') {
        this.props.navigation.navigate('ProductListing', { categoryData: { id: item.url_id }, isFromExplore: true, screenName: item.url_name, isFromCategory: true });
      } else if (item.url_id && item.url_type === 'product') {
        this.props.navigation.navigate('ProductDescription', { productData: { id: item.url_id } });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  getiOSStyleForPin = () => {
    if (Platform.OS === 'ios') {
      return {
        padding: scale(10),

      }
    }
  }

  getiOSPinInputStyle = () => {
    if (Platform.OS === 'ios') {
      return {
        // borderBottomColor:ColorConstants.white,
        // borderColor: ColorConstants.white,
        // borderColor: this.state.errorMessage == "" ? ColorConstants.white : ColorConstants.error,
        // borderBottomWidth: 1,
        height: scale(30),
      }
    }
  }

  getPincode = () => {
    // if(this.state.pincode){
    return (
      <View style={[styles.pincodeStyle
        //, this.getiOSStyleForPin()
      ]}>
        <Text style={styles.pincodeTextTitle}>
          Pincode
        </Text>
        <TextInput
          value={this.state.pincode}
          style={[styles.pincodeText
            //   ,{
            //   color : this.state.errorMessage == "" ? ColorConstants.white : ColorConstants.error,
            // }
            , this.getiOSPinInputStyle()]}
          secureTextEntry={false}
          maxLength={6}
          keyboardType={'number-pad'}
          placeholder={this.state.pincode.length == 0 ? 'Please enter pincode' : this.state.pincode}
          placeholderTextColor={ColorConstants.white}
          // underlineColorAndroid={ColorConstants.white}
          // underlineColorAndroid={this.state.errorMessage == "" ? ColorConstants.white : ColorConstants.error}
          onChangeText={(value) => {
            this.setState({
              pincode: value,
              errorMessage: ""
            }, () => {
              if (this.state.pincode.length == 6) {
                this.onPressSendLink();
              }
            })
          }}
          autoCapitalize='none'
        />
        {/* <Text style={styles.pincodeText}>Pincode: {this.props.getOtp}</Text> */}
      </View>
    )
    // }
  }

  onPressSendLink = () => {
    try {
      if (this.state.pincode.trim().length === 0 || !Validators.isPincodeValid(this.state.pincode)) {
        this.setState({ emailError: true, errorMessage: 'Invalid Pincode', showAlertModal: true });
        return;
      }
      let data = {
        "zipcode": this.state.pincode
      }
      this.props.sendPincode(data, (res) => this.sendLinkSuccessCallBack(res), (err) => this.sendLinkFailureCallBack(err))
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendLinkSuccessCallBack = async (res) => {
    try {
      let setOtpforhome = this.state.pincode

      console.log('@@@ Send Pincode Success CallBack ===================', res);
      this.props.setOTPfunction(setOtpforhome)
      setTimeout(() => {
        AsyncStorage.setItem('pincode', this.state.pincode);
        this.props.showErrorModal("Delivery available for this location", false);
        setTimeout(async () => {
          this.props.hideErrorModal();
          // this.props.navigation.replace('AuthNavigator');
        }, 2000);
      }, 0);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  sendLinkFailureCallBack = (error) => {
    try {
      if (error) {
        setTimeout(() => {
          this.setState({ errorMessage: error }, () => {
            console.log('@@@ Send Pincode Failure CallBack ===================', error);
            this.setState({ showAlertModal: true }, () => {
              setTimeout(async () => {
                this.setState({ showAlertModal: false });
              }, 2000);
            });
          });
        }, 0);
      } else {
        setTimeout(() => {
          this.setState({ errorMessage: 'Network Error!' }, () => {
            console.log('@@@ Send Pincode Failure CallBack Network Error ===================');
            this.setState({ showAlertModal: true }, () => {
              setTimeout(async () => {
                this.setState({ showAlertModal: false });
              }, 2000);
            });
          });
        }, 0);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  headerTopView = () => {
    return (
      <View>
        <LinearGradient
          colors={[
            ColorConstants.primaryThemeGradient,
            ColorConstants.secondaryThemeGradient,
          ]}
          style={styles.headerContainer}>
          <View style={styles.locationContainer}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <Image source={R.images.logo_icon} style={styles.logoIcon} />
              {this.getPincode()}
            </View>

            <View style={{ position: 'absolute' }}>
              <HeaderRight
                showNotification={true}
                onPress={() =>
                  this.props.navigation.navigate('NotificationScreen')
                }
                {...this.props}
              />
            </View>
          </View>
          {/* <View style={styles.LocationStyle}>
              <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('Location')
              }>
                <Text style={styles.locationTitleText}>Location</Text>
                <Text style={styles.locationNameText}>Hunter Hills, San Francisco</Text>
              </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Search')}>
            <View style={styles.SectionStyle}>
              <Image source={IMG_CONST.SEARCH} style={styles.ImageStyle} />
              <Text style={styles.searchText}>
                Search by Products & Brands
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  }

  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Image resizeMode={"contain"} source={IMG_CONST.LOGO_ICON} style={styles.banner} />
      </View>
    );
  }

  renderSwiperView = (index) => {
    console.log('@@@ banner =============', this.state.bannerImages, this.state.bannerImages.length);
    return (
      <Swiper
        autoplay
        autoplayTimeout={6}
        style={styles.wrapper}
        key={this.state.bannerImages.length}
        showsButtons={false}
        paginationStyle={styles.pagination}
        activeDot={<View style={styles.activeDot} />}
        dot={<View style={styles.inActiveDot} />}
        removeClippedSubviews={false}
      >
        {this.state.bannerImages && this.state.bannerImages.length > 0 && this.state.bannerImages[index].images.map((imageItem, index) => {
          return (
            <TouchableOpacity onPress={() => this.onPressBanner(imageItem)} style={styles.slide1}
              key={index + 'imageItem'}
            >
              <CachedBanner
                resizeMode={"stretch"}
                source={imageItem.image}
                renderError={(error) => console.log(error)}
                renderIndicator={this.renderIndicator}
                style={styles.banner}
              />
              <Image
                resizeMode={'stretch'}
                source={{ uri: imageItem.image }}
                style={styles.banner} />
            </TouchableOpacity>
          )
        })}
      </Swiper>
    )
  }

  renderChatButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.props.navigation.push("ChatScreen")}
        style={styles.chatRoundView} >
        <Image
          source={IMG_CONST.MESSAGE_ICON}
          style={styles.chatIcon}
        />
      </TouchableOpacity>
    )
  }

  renderHomeView = () => {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wrapper}>
            {this.renderSwiperView(0)}
          </View>
          <Category categoryList={this.state.categoryList.slice(0, 9)} onPressProductListing={(item) => this.props.navigation.navigate('ProductListing', { categoryData: item, isFromExplore: true, screenName: item.name, isFromCategory: true })} {...this.props} />
          <ProductGrid
            name={'Top Offers'}
            horizontal={true}
            data={this.state.latestProductsList}
            onPress={(item) => this.props.navigation.navigate('ProductDescription', { productData: item })}
            onPressProductListing={() => this.props.navigation.navigate('ProductListing', { screenName: 'Top Offers' })}
            onAddToCart={(value, item, selectedAttributes) => this.onAddToCart(value, item, selectedAttributes, 'top offers')}
            onRemoveFromCart={(value, item,selectedAttributes) => this.onRemoveFromCart(value, item, selectedAttributes, 'top offers')}
            updateQuantiyInCart={(value, item, selectedAttributes) => this.updateQuantiyInCart(value, item, selectedAttributes,'top offers')}
            onAddToWishlist={(item) => this.onAddToWishlist(item,'top offers')}
            onRemoveFromWishlist={(item) => this.onRemoveFromWishlist(item, 'top offers')}
            showErrorMessage={(msg) => this.props.showErrorModal(msg)}
          />
          <View style={styles.wrapper}>
            {this.renderSwiperView(1)}
          </View>
          <View style={styles.productGridStyle}>
            <ProductGrid
              name={'Best Deals for you'}
              horizontal={true}
              data={this.state.recommendedProductsList}
              onPress={(item) => this.props.navigation.navigate('ProductDescription', { productData: item })}
              onPressProductListing={() => this.props.navigation.navigate('ProductListing', { screenName: 'Best Deals for you' })}
              onAddToCart={(value, item, selectedAttributes) => this.onAddToCart(value, item, selectedAttributes,'best deals for you')}
              onRemoveFromCart={(value, item,selectedAttributes) => this.onRemoveFromCart(value, item,selectedAttributes,'best deals for you')}
              updateQuantiyInCart={(value, item, selectedAttributes) => this.updateQuantiyInCart(value, item, selectedAttributes,'best deals for you')}
              onAddToWishlist={(item) => this.onAddToWishlist(item,'best deals for you')}
              onRemoveFromWishlist={(item) => this.onRemoveFromWishlist(item,'best deals for you')}
              showErrorMessage={(msg) => this.props.showErrorModal(msg)}
            />
          </View>
          <View style={styles.wrapper}>
            {this.renderSwiperView(2)}
          </View>
        </ScrollView>
      </View>
    )
  }

  onCloseAlertModal = () => {
    this.setState({ showAlertModal: false }, () => {
      // this.resetErrors();
    });
  }

  renderAlertModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showAlertModal}
        onRequestClose={() => {
          this.onCloseAlertModal();
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => this.onCloseAlertModal()} style={styles.modalContainer}>
          <View style={styles.bottomView}>
            <Text style={styles.alertText}>{this.state.errorMessage}</Text>
            <TouchableOpacity onPress={() => this.onCloseAlertModal()}>
              <Image source={IMG_CONST.CROSS_ICON1} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }


  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <FocusAwareStatusBar barStyle="light-content" backgroundColor={COLOR_CONST.primaryThemeGradient} isFocused={true} />
        {this.headerTopView()}
        {this.renderHomeView()}
        {/* {this.renderChatButton()} */}
        {this.renderAlertModal()}

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
    showNotificationDot: state.cart.showNotificationDot,
    getOtp: state.setOTP.otp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message, isShowError) => dispatch(commonActions.showErrorModal(message, isShowError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
    getCategoryList: (data, successCallBack, failureCallBack) => dispatch(categoryActions.getCategoryList(data, successCallBack, failureCallBack)),
    getBrandList: (data, successCallBack, failureCallBack) => dispatch(brandActions.getBrandList(data, successCallBack, failureCallBack)),
    getTagList: (data, successCallBack, failureCallBack) => dispatch(brandActions.getTagList(data, successCallBack, failureCallBack)),
    getRecommendedProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getRecommendedProductList(data, successCallBack, failureCallBack)),
    getHomeProductList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getHomeProductList(data, successCallBack, failureCallBack)),
    getHomeBannerList: (data, successCallBack, failureCallBack) => dispatch(homeActions.getHomeBannerList(data, successCallBack, failureCallBack)),
    createCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.createCart(data, successCallBack, failureCallBack)),
    addToCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.addToCart(data, successCallBack, failureCallBack)),
    updateQuantiyInCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.updateQuantiyInCart(data, successCallBack, failureCallBack)),
    removeFromCart: (data, successCallBack, failureCallBack) => dispatch(cartActions.removeFromCart(data, successCallBack, failureCallBack)),
    cartHasProduct: (data, successCallBack, failureCallBack) => dispatch(cartActions.cartHasProduct(data, successCallBack, failureCallBack)),
    addToWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.addToWishlist(data, successCallBack, failureCallBack)),
    removeFromWishlist: (data, successCallBack, failureCallBack) => dispatch(wishlistActions.removeFromWishlist(data, successCallBack, failureCallBack)),
    getProfileData: (data, successCallBack, failureCallBack) => dispatch(profileActions.getProfileData(data, successCallBack, failureCallBack)),
    sendDeviceToken: (data, successCallBack, failureCallBack) => dispatch(userActions.sendDeviceToken(data, successCallBack, failureCallBack)),
    setOTPfunction: (setOtpforhome) => dispatch(setOtp.setotpfrom_verifiedOTP(setOtpforhome)),
    sendPincode: (data, successCallBack, failureCallBack) => dispatch(userActions.sendPincode(data, successCallBack, failureCallBack)),
    setSelectedAttributes: (data) => dispatch(homeActions.setSelectedAttributes(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);