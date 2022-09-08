import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import R from "../../../R";
import { RecommendedProductList } from "../../../theme/constants";
import styles from "./ProductGridStyle";
import * as IMG_CONST from "../../../theme/ImageConstants";
import InputSpinner from "react-native-input-spinner";
import COLOR_CONST, { FONTS } from "../../../theme/ColorConstants";
import LoadingImage from "react-native-image-progress";
import GreenButton from "../../GreenButton";
import LinearGradient from "react-native-linear-gradient";
// import RNPickerSelect from "react-native-picker-select";
import scale, { verticalScale } from "../../../utils/Scale";
import Icon from "react-native-vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
// import {Picker} from '@react-native-picker/picker';
import ModalDropdown from "react-native-modal-dropdown";
import * as homeActions from '../../../redux/actions/homeActions'
import * as commonActions from '../../../redux/actions/commonActions';
import { connect } from 'react-redux';
import CachedImage from "../../CachedImage";
import * as Sentry from '@sentry/react-native';

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerKey: Math.random() * 1000,
      wishlist: true,
      showNotifiyModal: false,
      similarProducts: [],
      productData: props.item,
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
      // appState: AppState.currentState,
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
      slots: [{ id: 0, name: "Morning", availabity: true }, { id: 1, name: "Evening", availabity: true }],
      selectedVarient: {
        name: "",
        variant_property_id: -1
      },
      Qty: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      setQtyValue: 0
    };
  }

  componentDidMount() {
    try {
      this._retrieveData();
    } catch (err) {
      Sentry.captureException(err);
    }
    // this.setSelectedVarient();
  }

  _retrieveData = () => {
    try {
      if (this.props.selectedAttributes) {
        let selectedAttributes = {};
        this.props.selectedAttributes.product_variant_properties.map((property) => {
          selectedAttributes = {
            ...selectedAttributes,
            [property.variant_name]: property,
          };
        });
        this.setState({ selectedProduct: this.props.selectedAttributes, selectedAttributes: selectedAttributes })
      }
      else {
        this.setDefaultVarient();
      }
      // try {
      //   const value = await AsyncStorage.getItem('selectedAttributes');
      //   if (value !== null) {
      //     // We have data!!
      //     this.setState({
      //       selectedAttributes:JSON.parse(value)
      //     },()=>{
      //       console.log(`'selectedAttributesinside Retrive data from Redux >>>>****>>>>> '`, this.props.selectedAttributes)
      //       console.log('selectedAttributesinside Retrive data >>>>****>>>>> ',this.state.selectedAttributes);
      //     })
      //   }else{
      //     this.setDefaultVarient();
      //   }
      // } catch (error) {
      //   // Error retrieving data
      // }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  setSelectedVarient = () => {
    try {
      let isItemInCart = false;
      if (this.props.item && this.props.item.product_variants && this.props.item.product_variants.length != undefined && this.props.item.product_variants.length > 0) {
        this.props.item.product_variants.forEach((element, index) => {
          if (element.is_in_cart) {
            isItemInCart = true;

            let selectedAttributes = {};
            element.product_variant_properties.map((property) => {
              selectedAttributes = {
                ...selectedAttributes,
                [property.variant_name]: property,
              };
            });
            this.setState((prevState) => ({
              selectedAttributes: selectedAttributes,
              currentSelection: element,
              selectedProduct: element,
              productQuantity: element.cart_quantity
                ? element.cart_quantity
                : 1,
            }),
              () => {
                this.setSelectedProduct();
                this.setAvailbleAttributesForSelected();
              });
          }
        });

        if (!isItemInCart) {
          this.setDefaultVarient();
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  setDefaultVarient = () => {
    try {
      const { product_variants } = this.state.productData;

      // const {product_variants} = product;
      if (product_variants && product_variants.length > 0) {
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

  setAvailbleAttributesForSelected = () => {
    try {
      const { productData, selectedAttributes, currentSelection } = this.state;
      const { availabity, product_variants, product_attributes } = productData;
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
          // console.log('Selected items', this.state.selectedAttributes);
        })
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  renderRightComponent = () => {
    if (this.state.isVarientDropdownShown) {
      return (
        <Icon name="chevron-up" size={18} style={{ paddingLeft: scale(75), position: 'absolute' }} />
      );
    } else {
      return (
        <Icon
          name="chevron-down"
          size={18}
          style={{ paddingLeft: scale(75), position: 'absolute' }}
        />
      );
    }
  };

  getModalpicker = (data, attribute) => {
    {/* {this.renderSelectorTools()} */ }
    {/* <View style={{flex:1, marginRight:5,borderWidth:1, borderColor:'black' }}> */ }

    {/* <View
      style={{
        position: "absolute",
        paddingLeft: scale(33),
        alignSelf:"center"
      }}
    >
      {this.renderRightComponent()}
    </View> */}
    return (
      <ModalDropdown
        renderRightComponent={this.renderRightComponent}
        defaultValue={this.state.selectedAttributes[attribute] && this.state.selectedAttributes[attribute].property_name ? this.state.selectedAttributes[attribute].property_name :
          (this.state.selectedAttributes[attribute] && this.state.selectedAttributes[attribute].name ? this.state.selectedAttributes[attribute].name : "")}
        options={data}
        //  isFullWidth={true}
        renderRowText={this.renderRow}
        // renderRowProps={}
        // adjustFrame={style=>{
        //   console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
        //   style.height = scale(27) * data.length;

        //   return style;
        // }}
        renderButtonText={this.renderButtonText}
        dropdownStyle={{
          height: scale(35) * data.length,
          maxHeight: scale(105), width: scale(85)
        }}

        style={styles.modalstyle}
        defaultTextStyle={styles.selectedTextStyle}
        // dropdownTextStyle={styles.dropdownTextStyle}
        onSelect={(idx, val) => {
          console.log(`value of variety************`, idx, val);

          this.setState((prevState) => ({
            selectedAttributes: {
              ...prevState.selectedAttributes,
              [attribute]: val,
            },
            currentSelection: attribute,
          }),
            () => {
              this.setSelectedProduct();
              this.setAvailbleAttributesForSelected();
            });
        }}
      />
    );
  };


  setSelectedProduct = () => {
    try {
      const { productData, selectedAttributes } = this.state;
      const { product_variants } = productData;

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

  renderRow = (rowData, rowID, highlighted) => {
    return (
      <Text
        numberOfLines={1}
        style={[{
          padding: scale(4),
          // fontSize: 16,
          width: scale(90),
          // color: 'navy',
          textAlignVertical: 'center',
        }, highlighted && { color: COLOR_CONST.secondaryThemeGradient }]}>
        {rowData.name}
      </Text>
    )
  }

  renderButtonTextForQuantity = (rowData) => {
    return <Text style={[styles.addToCartContainer, {
      color: '#fff', fontSize: 14, fontWeight: 'bold',
      textAlign: 'center', fontFamily: FONTS.GTWalsheimProRegular,
      backgroundColor: 'transparent',
      paddingTop: scale(10)
    }]}
    >
      Qty: {rowData}
      {/* {this.state.setQtyValue} */}
    </Text>
  }

  renderButtonText = (rowData) => {
    return <Text style={styles.selectedTextStyle}
    >
      {rowData.name}
    </Text>
  }


  checkSelectedInAvailable = () => {
    try {
      const { selectedAttributes, availableAttributes } = this.state;
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
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  renderSelectorTools = () => {
    const { product_attributes } = this.state.productData;
    const { availableAttributes } = this.state;
    const isItemAvailable = this.checkSelectedInAvailable();
    if (product_attributes) {
      const attributes = Object.keys(product_attributes);
      attributes.sort();
      return (
        <View style={styles.selectorToolContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: 'wrap',
              // justifyContent: "space-evenly",
            }}
          >
            {attributes.map((attribute) => {
              const attributesPresent = product_attributes[attribute].length > 0;
              return (
                <>
                  {/* <View/> */}
                  {attributesPresent && <View style={{ marginLeft: scale(10), marginTop: scale(10) }}>
                    {this.getModalpicker(product_attributes[attribute], attribute)}

                  </View>}

                  {/* {attributesPresent && <Text style={styles.colorText}>{attribute}</Text>}  */}
                  {/* {attributesPresent && this.renderToolListSelector(
                //   product_attributes[attribute],
                //   attribute,
                //   false
                // )}*/}
                </>
              )
            }
            )}
          </View>
          <View style={styles.selectorToolMessageContainer}>
            {!isItemAvailable && (<Text style={styles.selectorToolMessage}>*This combination is not available</Text>)}
          </View>
        </View>
      )
    } else {
      return <View />
    }
  }
  renderIndicator = (progress, indeterminate) => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        {indeterminate ? (<Image source={IMG_CONST.LOGO_ICON} style={styles.BottalImage} />)
          : (<Text>{progress * 100}</Text>)}
      </View>
    )
  }

  render() {
    const { item } = this.props;
    const { productData, selectedProduct } = this.state;
    const price = selectedProduct ? selectedProduct.price_including_tax : productData.price_including_tax;
    
    let updatedSelectedProduct = selectedProduct;
    
    if (updatedSelectedProduct && updatedSelectedProduct.id) {
      for (let index = 0; index < item.product_variants.length; index++) {
        const element = item.product_variants[index];
        if (element.id == selectedProduct.id) {
          updatedSelectedProduct = element;
          // break;
        }
      }
    }
    
    
    let itemQuantity = 0;
    let itemImage = "";
    
    if (updatedSelectedProduct && updatedSelectedProduct.cart_quantity) {
      itemQuantity = updatedSelectedProduct.cart_quantity;
    }
    
    if (selectedProduct && selectedProduct.images && selectedProduct.images[0] && selectedProduct.images[0].image) {
      itemImage = selectedProduct.images[0].image
    }

    // if (item.product_variants.length > 0) {
    //   item.product_variants.forEach(element => {
    //     if(element.is_master){
    //       // itemQuantity = element.cart_quantity ? element.cart_quantity : 0;
    //       itemImage = element.images && element.images[0] && element.images[0].image ? element.images[0].image : ""
    //     }
    //   });
    //   }else{
    //     // itemQuantity = item.cart_quantity ? item.cart_quantity : 0 ;
    //   }

    if (this.props.isListHorizontal) {
      return (<TouchableOpacity
        onPress={() => this.props.onPress(item)}
        style={styles.productGridStyle1}
      >
        <TouchableOpacity
          onPress={() => this.props.onHeartPress(item)}
          style={styles.TouchableOpacityStyle}
        >
          {item.wishlist_item || item.is_wishlisted ? (
            <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
          ) : (
            <Image
              source={IMG_CONST.UN_SELECTED_HEART}
              style={styles.heartIcon}
            />
          )}
        </TouchableOpacity>

        <View>
          <View style={styles.imageMainContainer1}>
            <CachedImage
              resizeMode={"contain"}
              source={itemImage}
              // source={item.images[0] ? item.images[0].image : ''}
              renderError={(error) => console.log(error)}
              renderIndicator={this.renderIndicator}
              style={styles.BottalImage1}
            />
            {/* <LoadingImage
              resizeMode={"contain"}
              source={{ uri: item.images[0] ? item.images[0].image : '' }}
              renderError={(error)=>console.log(error)}
              renderIndicator={this.renderIndicator}
              style={styles.BottalImage}
             
            /> */}

            <View
              style={{
                padding: scale(5),
                paddingLeft: 0,
                paddingTop: scale(0),
                width: scale(150),
                // zIndex:99
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: scale(7),
                  paddingLeft: scale(10),
                  paddingTop: scale(0),
                }}
              >
                <Text style={[styles.titleNameStyle1]}>
                  {item.name}
                </Text>
              </View>
              {/* {this.getPicker()} */}
              {/* {this.getModalpicker()} */}
              {/* {this.getVarientMenu()} */}
              {this.renderSelectorTools()}
            </View>
          </View>
        </View>

        <View
          style={{
            // flexDirection: "row",
            justifyContent: "space-between",
            padding: scale(7),
            paddingLeft: scale(10),
            paddingTop: scale(0),
          }}
        >
          {selectedProduct && selectedProduct.on_sale ? (
            <View style={{ zIndex: 99, marginTop: verticalScale(5), }}>
              <View style={styles.discountRow}>
                <Text style={styles.price}>₹ {price}</Text>
              </View>
              <View style={styles.discountRow}>
                <Text style={styles.discountPrice1}> ₹ {selectedProduct.variant_actual_price}</Text>
                <Text style={styles.mrp1}>MRP</Text>
              </View>
              <Text style={styles.inclusiveTaxText1}>
                {" "}
                Inclusive of all taxes{" "}
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: verticalScale(5), }}>
              {/* <Text style={styles.mrp}>MRP</Text> */}
              <View>
                <Text style={styles.price}>₹ {price}</Text>
                <Text style={styles.inclusiveTaxText}>
                  {" "}
                  Inclusive of all taxes{" "}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* {this.state.setQtyValue || item.add_to_cart ? ( */}
        {/* {item.cart_quantity || item.add_to_cart ? ( */}
        {itemQuantity || item.add_to_cart ? (
          <>
            {/* <ModalDropdown 
                options={this.state.Qty}
                // isFullWidth={true}
                renderButtonText={this.renderButtonTextForQuantity}
              style={[styles.addToCartContainer, {
                backgroundColor: COLOR_CONST.primaryThemeGradient,
              
                alignSelf: 'center',
                position:'absolute',
                bottom: verticalScale(20)
              }]}
                dropdownStyle={{ width: scale(107), maxHeight: scale(115),}}
                defaultValue={
                  // item.cart_quantity ? `Qty: `+item.cart_quantity:
                  //  `Qty: `+this.state.setQtyValue}
                   `Qty: `+itemQuantity}
                defaultTextStyle={[styles.addToCartContainer,{color:'#fff', fontSize:14, fontWeight:'bold',
                  textAlign:'center', fontFamily: FONTS.GTWalsheimProRegular,
                  backgroundColor:'transparent',
                  paddingTop: scale(10)
                }]}
                dropdownTextStyle={{textAlign:'center', fontSize:14, fontWeight:'bold',
                textAlign:'center', fontFamily: FONTS.GTWalsheimProRegular,}}
                textStyle={{color:'#fff'}}
                onSelect={(idx, val) => {
                  if(this.state.productData.product_attributes){
                    if(this.state.selectedProduct && this.checkSelectedInAvailable()){
                      this.props.onChangeCartValue(val, item, true, this.state.selectedProduct);
                    }else{
                      this.setState({setQtyValue:0})
                      this.props.showErrorModal('Please select from available variants');
                    }
                  }else{
                    this.props.onChangeCartValue(val, item, true, this.state.selectedProduct);
                  }
                }}
                /> */}
            <InputSpinner
              height={Platform.OS === 'ios' ? scale(30) : scale(30)}
              key={this.state.spinnerKey}
              rounded={false}
              showBorder={true}
              editable={false}
              buttonStyle={{
                width: Platform.OS === 'ios' ? scale(30) : scale(30),
                borderWidth: 1,
                borderTopRightRadius: scale(30 / 5),
                borderBottomRightRadius: scale(30 / 5),
                borderTopLeftRadius: scale(30 / 5),
                borderBottomLeftRadius: scale(30 / 5),
                borderColor: COLOR_CONST.primaryThemeGradient, //COLOR_CONST.lightGreyText,
                // height:Platform.OS === 'ios' ? scale(30) : scale(30),
                backgroundColor: '#fff',
                // paddingBottom: Platform.OS === 'ios' ? verticalScale(3) : verticalScale(3),
              }}
              inputStyle={{
                borderWidth: scale(0),
                // borderLeftWidth: scale(0),
                // borderRightWidth: scale(0),
                height: scale(40),
                width: scale(10),
                paddingBottom: Platform.OS === 'ios' ? verticalScale(0) : verticalScale(8),
                fontFamily: FONTS.GTWalsheimProBold,
                fontSize: scale(17),
                lineHeight: scale(19),
              }}
              max={9}
              min={0}
              step={1}
              fontSize={15}
              fontWeight={'bold'}
              onMin={() => this.props.onCartPress(item, this.state.selectedVarient)}
              style={styles.spinner1}
              colorPress={COLOR_CONST.primaryThemeGradient}
             // colorMax={COLOR_CONST.primaryThemeGradient}
              background={COLOR_CONST.white}
             // colorMin={COLOR_CONST.white}
              color={COLOR_CONST.white}
              // prepend={<Text style={styles.qtyStyle}>{item.cart_quantity<10?'0':''}</Text>}
              buttonTextColor={COLOR_CONST.primaryThemeGradient}
              textColor={COLOR_CONST.primaryThemeGradient}
              value={itemQuantity == 0 ? 1 : itemQuantity}
              // value={item.cart_quantity ? item.cart_quantity : "0"}
              onDecrease={(num) => {
                // console.log('num ===== , ', num);
                // if (num === 0) {
                //   console.log('num ===== 0 == , ', num);
                //   this.onRemoveFromCart(num, item);
                //   return;
                // } 
                if (this.state.productData.product_attributes) {
                  if (this.state.selectedProduct && this.checkSelectedInAvailable()) {
                    if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                      itemQuantity = itemQuantity - 1
                      // item.cart_quantity = item.cart_quantity-1
                      this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                      return;
                    }
                    this.props.onChangeCartValue(num, item, false, this.state.selectedProduct);
                  } else {
                    // this.setState({setQtyValue:0})
                    itemQuantity = updatedSelectedProduct.cart_quantity
                    this.props.showErrorModal('Please select from available variants');
                  }
                } else {
                  if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                    itemQuantity = itemQuantity - 1
                    // item.cart_quantity = item.cart_quantity-1
                    this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                    return;
                  }
                  this.props.onChangeCartValue(num, item, false, this.state.selectedProduct);
                }
                // this.props.onChangeCartValue(num, item, false);
              }}
              onIncrease={(num) => {
                if (this.state.productData.product_attributes) {
                  if (this.state.selectedProduct && this.checkSelectedInAvailable()) {
                    if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                      console.log("bf item.cart_quantity ... ", item.cart_quantity);
                      // item.cart_quantity = item.cart_quantity - 1
                      console.log("af item.cart_quantity ... ", item.cart_quantity);
                      this.setState({ spinnerKey: Math.random() * 1000 })
                      this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                      return;
                    }
                    this.props.onChangeCartValue(num, item, true, this.state.selectedProduct);
                  } else {
                    // this.setState({setQtyValue:0})
                    itemQuantity = updatedSelectedProduct.cart_quantity
                    this.props.showErrorModal('Please select from available variants');
                  }
                } else {
                  if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                    console.log("bf item.cart_quantity ... 1", item.cart_quantity);
                    // item.cart_quantity = item.cart_quantity - 1
                    console.log("af item.cart_quantity ... 1", item.cart_quantity);
                    this.setState({ spinnerKey: Math.random() * 1000 })
                    this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                    return;
                  }
                  this.props.onChangeCartValue(num, item, true, this.state.selectedProduct);
                }
                // this.props.onChangeCartValue(num, item, true, this.state.selectedAttributes);
              }}
              onChange={(num) => {
                // onChangeCartValue(num, item)
              }}
            />
          </>
        ) : (
          <TouchableOpacity onPress={() => {
            this.props.onCartPress(item, this.state.selectedProduct)
            this.props.onChangeCartValue(1, item, false, this.state.selectedProduct);
          }}
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: verticalScale(10)
            }}>
            {/* <TouchableOpacity onPress={() => this.props.onCartPress(item, this.state.selectedAttributes)}> */}
            <LinearGradient
              colors={[
                COLOR_CONST.primaryThemeGradient,
                COLOR_CONST.secondaryThemeGradient,
              ]}
              style={styles.addToCartContainer1}
            >
              <TouchableOpacity onPress={() => {
                if (this.state.productData.product_attributes) {
                  if (this.state.selectedProduct && this.checkSelectedInAvailable()) {
                    this.props.setSelectedAttributes(this.state.selectedProduct)
                    this.props.onCartPress(item, this.state.selectedProduct)
                    this.props.onChangeCartValue(1, item, false, this.state.selectedProduct);
                  } else {
                    this.props.showErrorModal('Please select from available variants');
                  }
                } else {
                  this.props.onCartPress(item, this.state.selectedProduct)
                }
              }}>
                <Text style={styles.addToCartText}>Add</Text>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity onPress={() => props.onPress(item)} >
                         <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
                         <Text style={styles.addToCartText}>View Product</Text>
                         </LinearGradient>
                    </TouchableOpacity> */}

        {selectedProduct && selectedProduct.on_sale && (
          <View style={styles.labelSticker1}>
            <Text style={styles.stickerText}>
              Save {Number(selectedProduct.discount ? selectedProduct.discount : item.discount).toFixed(1)}%
            </Text>
          </View>
        )}
      </TouchableOpacity>)
    }

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(item)}
        style={styles.productGridStyle}
      >
        <TouchableOpacity
          onPress={() => this.props.onHeartPress(item)}
          style={styles.TouchableOpacityStyle}
        >
          {item.wishlist_item || item.is_wishlisted ? (
            <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
          ) : (
            <Image
              source={IMG_CONST.UN_SELECTED_HEART}
              style={styles.heartIcon}
            />
          )}
        </TouchableOpacity>

        <View
          style={
            {
              //   backgroundColor:'green',
            }
          }
        >
          <View style={styles.imageMainContainer}>
            <CachedImage
              resizeMode={"contain"}
              source={itemImage}
              // source={item.images[0] ? item.images[0].image : ''}
              renderError={(error) => console.log(error)}
              renderIndicator={this.renderIndicator}
              style={styles.BottalImage2}
            />
            {/* <LoadingImage
                resizeMode={"contain"}
                source={{ uri: item.images[0] ? item.images[0].image : '' }}
                renderError={(error)=>console.log(error)}
                renderIndicator={this.renderIndicator}
                style={styles.BottalImage}
               
              /> */}

            <View
              style={{
                padding: scale(5),
                paddingTop: scale(0),
                width: scale(250),
                // zIndex:99
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: scale(7),
                  paddingTop: scale(0),
                }}
              >
                <Text style={styles.titleNameStyle}>
                  {item.name}
                </Text>
              </View>
              {/* {this.getPicker()} */}
              {/* {this.getModalpicker()} */}
              {/* {this.getVarientMenu()} */}
              {this.renderSelectorTools()}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: scale(70),
            paddingTop: scale(10),
          }}
        >
          {selectedProduct && selectedProduct.on_sale ? (
            <View style={{ zIndex: 99, marginTop: verticalScale(5), marginLeft: scale(30) }}>

              <View style={styles.discountRow}>
                <Text style={styles.price}>₹ {price}</Text>
              </View>
              <View style={styles.discountRow}>
                <Text style={styles.discountPrice1}> ₹ {selectedProduct.variant_actual_price}</Text>
                <Text style={styles.mrp1}>MRP</Text>
              </View>
              <Text style={styles.inclusiveTaxText}>
                {" "}
                Inclusive of all taxes{" "}
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: verticalScale(5), marginLeft: scale(30) }}>
              <View>
                <Text style={styles.price}>₹ {price}</Text>
                {/* <Text style={styles.mrp}>MRP</Text> */}
                <Text style={styles.inclusiveTaxText}>
                  {" "}
                  Inclusive of all taxes{" "}
                </Text>
              </View>
              </View>
            )}
  
            
                {/* {this.state.setQtyValue || item.add_to_cart ? ( */}
                {/* {item.cart_quantity || itemelectedProduct.add_to_cart ? ( */}
                { itemQuantity || item.add_to_cart ? (
                  <>
                  {/* <ModalDropdown 
                  options={this.state.Qty}
                  // isFullWidth={true}
                  renderButtonText={this.renderButtonTextForQuantity}
                  style={[styles.addToCartContainer,{backgroundColor:COLOR_CONST.primaryThemeGradient}]}
                  dropdownStyle={{ width: scale(107), maxHeight: scale(115),}}
                  defaultValue={
                    // item.cart_quantity ? `Qty: `+item.cart_quantity:
                    //  `Qty: `+this.state.setQtyValue}
                     `Qty: `+itemQuantity}
                  defaultTextStyle={[styles.addToCartContainer,{color:'#fff', fontSize:14, fontWeight:'bold',
                    textAlign:'center', fontFamily: FONTS.GTWalsheimProRegular,
                    backgroundColor:'transparent',
                    paddingTop: scale(10)
                  }]}
                  dropdownTextStyle={{textAlign:'center', fontSize:14, fontWeight:'bold',
                  textAlign:'center', fontFamily: FONTS.GTWalsheimProRegular,}}
                  textStyle={{color:'#fff'}}
                  onSelect={(idx, val) => {
                    if(this.state.productData.product_attributes){
                      if(this.state.selectedProduct && this.checkSelectedInAvailable()){
                        this.props.onChangeCartValue(val, item, true, this.state.selectedProduct);
                      }else{
                        this.setState({setQtyValue:0})
                        this.props.showErrorModal('Please select from available variants');
                      }
                    }else{
                      this.props.onChangeCartValue(val, item, true, this.state.selectedProduct);
                    }
                  }}
                  /> */}
                    <InputSpinner
                      height={Platform.OS === 'ios' ? scale(30) : scale(30)}
                      key={this.state.spinnerKey}
                      rounded={false}
                      showBorder={true}
                      editable={false}
                      buttonStyle={{
                        width: Platform.OS === 'ios' ? scale(30) : scale(30),
                        borderWidth: 1,
                        borderTopRightRadius:scale(30/5),
                        borderBottomRightRadius:scale(30/5),
                        borderTopLeftRadius:scale(30/5),
                        borderBottomLeftRadius:scale(30/5),
                        borderColor: COLOR_CONST.primaryThemeGradient, //COLOR_CONST.lightGreyText,
                        height:scale(30),
                        backgroundColor:'#fff',
                        // paddingBottom: Platform.OS === 'ios' ? verticalScale(0) : verticalScale(3),
                      }}
                      inputStyle={{
                        borderWidth: scale(0),
                        // borderLeftWidth: scale(0),
                        // borderRightWidth: scale(0),
                        height:scale(40),
                        width:scale(10),
                        paddingBottom: Platform.OS === 'ios' ? verticalScale(0) : verticalScale(8),
                        fontFamily: FONTS.GTWalsheimProBold,
                        fontSize: scale(17),
                        lineHeight: scale(19)
                      }}
                      max={9}
                      min={0}
                      step={1}
                      fontSize={15}
                      fontWeight={'bold'}
                      onMin={() => this.props.onCartPress(item, this.state.selectedVarient)}
                      style={styles.spinner2}
                      colorPress={COLOR_CONST.primaryThemeGradient}
                      //colorMax={COLOR_CONST.primaryThemeGradient}
                      background={COLOR_CONST.white}
                    //colorMin={COLOR_CONST.white}
                      color={COLOR_CONST.white}
                     // prepend={<Text style={styles.qtyStyle}>{item.cart_quantity<10?'0':''}</Text>}
                      buttonTextColor={COLOR_CONST.primaryThemeGradient}
                      textColor={COLOR_CONST.primaryThemeGradient}
                      value={itemQuantity==0? 1 : itemQuantity}
              onDecrease={(num) => {
                // console.log('num ===== , ', num);
                // if (num === 0) {
                //   console.log('num ===== 0 == , ', num);
                //   this.onRemoveFromCart(num, item);
                //   return;
                // } 
                if(this.state.productData.product_attributes){
                  if (this.state.selectedProduct && this.checkSelectedInAvailable()) {
                    if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                      // item.cart_quantity = item.cart_quantity-1
                    itemQuantity = itemQuantity-1
                      this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                      return;
                    }
                    this.props.onChangeCartValue(num, item, false, this.state.selectedProduct);
                  }else{
                    // this.setState({setQtyValue:0})
                    itemQuantity = updatedSelectedProduct.cart_quantity
                    this.props.showErrorModal('Please select from available variants');
                  }
                } else {
                  if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                    // item.cart_quantity = item.cart_quantity-1
                    itemQuantity = itemQuantity-1
                    this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                    return;
                  }
                  // this.props.onChangeCartValue(num, item, false);
                }}}
                onIncrease={(num) => {
                  if (this.state.productData.product_attributes) {
                    if (this.state.selectedProduct && this.checkSelectedInAvailable()) {
                      if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                        console.log("bf item.cart_quantity ... ", item.cart_quantity);
                        // item.cart_quantity = item.cart_quantity - 1
                        console.log("af item.cart_quantity ... ", item.cart_quantity);
                        this.setState({ spinnerKey: Math.random() * 1000 })
                        this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                        return;
                      }
                      this.props.onChangeCartValue(num, item, true, this.state.selectedProduct);
                    } else {
                      // this.setState({setQtyValue:0})
                      itemQuantity = updatedSelectedProduct.cart_quantity
                      this.props.showErrorModal('Please select from available variants');
                    }
                  } else {
                    if (item.max_qty_to_be_sold !== 0 && (num > item.max_qty_to_be_sold)) {
                      console.log("bf item.cart_quantity ... 1", item.cart_quantity);
                      // item.cart_quantity = item.cart_quantity - 1
                      console.log("af item.cart_quantity ... 1", item.cart_quantity);
                      this.setState({ spinnerKey: Math.random() * 1000 })
                      this.props.showErrorModal(`You can't add more than ${item.max_qty_to_be_sold} qty of this item.`);
                      return;
                    }
                    this.props.onChangeCartValue(num, item, true, this.state.selectedProduct);
                  }
                  // this.props.onChangeCartValue(num, item, true, this.state.selectedAttributes);
                }}
                onChange={(num) => {
                  // onChangeCartValue(num, item)
                }}
              />
            </>
          ) : (
            <TouchableOpacity onPress={() => {
              this.props.onCartPress(item, this.state.selectedProduct)
              this.props.onChangeCartValue(1, item, false, this.state.selectedProduct);
            }}>
              {/* <TouchableOpacity onPress={() => this.props.onCartPress(item, this.state.selectedAttributes)}> */}
              <LinearGradient
                colors={[
                  COLOR_CONST.primaryThemeGradient,
                  COLOR_CONST.secondaryThemeGradient,
                ]}
                style={[styles.addToCartContainer, { marginLeft: scale(5) }]}
              >
                <TouchableOpacity onPress={() => {
                  if (this.state.productData.product_attributes) {
                    if (this.state.selectedProduct && this.checkSelectedInAvailable()) {
                      this.props.setSelectedAttributes(this.state.selectedProduct)
                      this.props.onCartPress(item, this.state.selectedProduct)
                      this.props.onChangeCartValue(1, item, false, this.state.selectedProduct);
                    } else {
                      this.props.showErrorModal('Please select from available variants');
                    }
                  } else {
                    this.props.onCartPress(item, this.state.selectedProduct)
                  }
                }}>
                  <Text style={styles.addToCartText}>Add</Text>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        {/* <TouchableOpacity onPress={() => props.onPress(item)} >
                           <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
                           <Text style={styles.addToCartText}>View Product</Text>
                           </LinearGradient>
                      </TouchableOpacity> */}

        {selectedProduct && selectedProduct.on_sale && (
          <View style={styles.labelSticker}>
            <Text style={styles.stickerText}>
              Save {Number(selectedProduct.discount ? selectedProduct.discount : item.discount).toFixed(1)}%
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartData: state.cart.cartData,
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
    profileData: state.profile.profileData,
    selectedAttributes: state.home.selectedAttributes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showErrorModal: (message, isFromError) => dispatch(commonActions.showErrorModal(message, isFromError)),
    hideErrorModal: () => dispatch(commonActions.hideErrorModal()),
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