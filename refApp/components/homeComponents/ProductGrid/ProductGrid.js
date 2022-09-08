import React, {Component, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import R from '../../../R';
import {RecommendedProductList} from '../../../theme/constants';
import styles from './ProductGridStyle';
import * as IMG_CONST from '../../../theme/ImageConstants';
import InputSpinner from 'react-native-input-spinner';
import COLOR_CONST, {FONTS} from '../../../theme/ColorConstants';
import LoadingImage from 'react-native-image-progress';
import GreenButton from '../../GreenButton';
import LinearGradient from 'react-native-linear-gradient';
// import RNPickerSelect from "react-native-picker-select";
import scale from '../../../utils/Scale';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
// import {Picker} from '@react-native-picker/picker';
import ModalDropdown from 'react-native-modal-dropdown';
import Product from './Product';

export class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      add_to_cart: props.data,
      RefreshFlatList: false,
      wishlist_item: props.data,
      isVarientDropdownShown: false,
    };
  }

  setDefaultVarient = () => {
    const {product} = this.state.productData;
    const {product_variants} = product;
    if (product_variants.length > 0) {
      product_variants.map((varient) => {
        if (varient.is_master) {
          const {images} = varient;
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
              selectedImage: isVarientImage ? images[0].image : product.images[0].image,
              selectedProduct: varient,
              productQuantity: varient.cart_quantity ? varient.cart_quantity : 1,
            },
            () => {
              this.setAvailbleAttributesForSelected();
            },
          );
        }
      });
    }
  };

  setAvailbleAttributesForSelected = () => {
    const {productData, selectedAttributes, currentSelection} = this.state;
    const {availabity, product_variants, product_attributes} = productData.product;
    if (product_variants) {
      let availableAttributes = {};
      product_variants.map((item, index) => {
        const {product_variant_properties} = item;
        let attributeFound = false;
        let selectedVarientPropertyIds = [];
        let varientPropertyIds = [];
        product_variant_properties.map((variantProperty) => {
          varientPropertyIds.push(variantProperty.variant_property_id);
        });

        for (const attribute in selectedAttributes) {
          selectedVarientPropertyIds.push(selectedAttributes[attribute].variant_property_id);
        }

        attributeFound = selectedVarientPropertyIds.every((val) => varientPropertyIds.includes(val));

        if (attributeFound) {
          product_variant_properties.map((variantProperty) => {
            let varientPropertyArray = availableAttributes[variantProperty.variant_name] ? availableAttributes[variantProperty.variant_name] : [];
            varientPropertyArray.findIndex((item) => item.variant_property_id === variantProperty.variant_property_id) === -1 &&
              varientPropertyArray.push({
                name: variantProperty.property_name,
                variant_property_id: variantProperty.variant_property_id,
                product_variant_id: variantProperty.product_variant_id,
              });
            availableAttributes = {
              ...availableAttributes,
              [variantProperty.variant_name]: varientPropertyArray,
            };
          });
        }
      });
      this.setState(
        (prevState) => {
          if (Object.keys(availableAttributes).length === 0) {
            return;
          }
          return {availableAttributes};
        },
        () => {
          // console.log('Available attributes', this.state.availableAttributes);
          // console.log('Selected items', this.state.selectedAttributes);
        },
      );
    }
  };

  // const [selectedLanguage, setSelectedLanguage] = useState();
  // const [selectVarient, setSelectedselectVarient] = useState();
  onHeartPress = (data) => {
    if (!data.is_wishlisted) this.props.onAddToWishlist(data);
    else this.props.onRemoveFromWishlist(data);
    data.wishlist_item = !data.wishlist_item;
    const index = this.state.wishlist_item.findIndex((x) => x.id == data.id);

    let item = this.state.wishlist_item;
    item[index] = data;
    // this.state.wishlist_item[index] = data;
    this.setState({
      wishlist_item: item,
      RefreshFlatList: !this.state.RefreshFlatList,
    });
    // setwishlist_item(wishlist_item);
    // setRefreshFlatList(!RefreshFlatList);
  };
  onCartPress = (data, selectedVarient) => {
    console.log('CART PRESSED ', selectedVarient);

    // if(!selectedVarient.name){
    //   this.props.showSelectVarientError()
    //   return;
    // }

    data.add_to_cart = !data.add_to_cart;
    const index = this.state.add_to_cart.findIndex((x) => x.id == data.id);

    let item = this.state.add_to_cart;
    item[index] = data;

    this.setState({
      add_to_cart: item,
      RefreshFlatList: !this.state.RefreshFlatList,
    });
    // setRememberPin(add_to_cart);
    // setRefreshFlatList(!RefreshFlatList);
  };

  onChangeCartValue = (value, item, isAdd, selectedProduct) => {

    let isItemInCart = false;
    let cartQuantity = null;
    if (item.product_variants.length > 0) {
      if (selectedProduct) {
        item.product_variants.forEach((element) => {
          if (element.id == selectedProduct?.id) {
            isItemInCart = element.is_in_cart;
            cartQuantity = element.cart_quantity;
          }
        });
      }
    }

    let maxCartValue = item.max_qty_to_be_sold;

    if (maxCartValue !== 0 && value > maxCartValue) {
      this.props.showErrorMessage(`You can't add more than ${maxCartValue} qty of this item.`);
      return;
    }

    //   if(value > 1 && item.cart_quantity) {
    //     this.props.updateQuantiyInCart(value, item, selectedProduct);
    // } else {
    //     if(value === 0) {
    //       this.props.showErrorMessage('Please select product quantity.');
    //       return;
    //     }

if (value === 0) {
      this.props.onRemoveFromCart(value, item, selectedProduct);
      return;
    }

    if (selectedProduct) {
      if (isItemInCart == true && cartQuantity) {
        this.props.updateQuantiyInCart(value, item, selectedProduct);
      } else this.props.onAddToCart(value, item, selectedProduct);
    } else {
      if (isItemInCart && cartQuantity) this.props.updateQuantiyInCart(value, item, selectedProduct);
      else this.props.onAddToCart(value, item, selectedProduct);
    }
    // }

    // if (isAdd) {
    //   if (item.cart_quantity) {
    //     this.props.updateQuantiyInCart(value, item, selectedAttributes);
    //   } else {
    //     this.props.onAddToCart(value, item, selectedAttributes);
    //   }
    // } else {
    //   if (value === 0) this.props.onRemoveFromCart(value, item);
    //   else this.props.updateQuantiyInCart(value, item, selectedAttributes);
    // }
  };

  // const getPicker=()=>{
  //   return(

  //    <View style={{flex:1, flexDirection:'row'}}>
  //        <View  style={{flex: 1,
  //         height:40,

  //         borderWidth: 1,
  //         marginRight:5,
  //         borderColor:'black'}}>
  //       <Picker

  //       mode={"dialog"}
  //         selectedValue={selectedLanguage}
  //         onValueChange={(itemValue, itemIndex) =>
  //           setSelectedLanguage(itemValue)
  //         }>
  //         <Picker.Item label="varient" value="v1" />
  //         <Picker.Item label="varient2" value="v2" />
  //         <Picker.Item label="varient3" value="v3" />
  //         <Picker.Item label="varient4" value="v4" />
  //       </Picker>
  //        </View>
  //           <View  style={{flex: 1,
  //         height:40,
  //         borderWidth: 1,
  //         borderColor:'black'}}>
  //       <Picker

  //       mode={"dialog"}
  //         selectedValue={selectedLanguage}
  //         onValueChange={(itemValue, itemIndex) =>
  //           setSelectedLanguage(itemValue)
  //         }>
  //         <Picker.Item label="varient" value="v1" />
  //         <Picker.Item label="varient2" value="v2" />
  //         <Picker.Item label="varient3" value="v3" />
  //         <Picker.Item label="varient4" value="v4" />
  //       </Picker>
  //        </View>
  //     {/* <Picker
  //       style={styles.pickerStyle}
  //     mode={"dropdown"}
  //       selectedValue={selectVarient}
  //       onValueChange={(itemValue, itemIndex) =>
  //         setSelectedselectVarient(itemValue)
  //       }>
  //        <Picker.Item label="varient" value="v1" />
  //       <Picker.Item label="varient2" value="v2" />
  //       <Picker.Item label="varient3" value="v3" />
  //       <Picker.Item label="varient4" value="v4" />
  //     </Picker> */}
  //    </View>

  //   )
  // }

  getVarientMenu = () => {
    return (
      <View
        style={{
          // padding:scale(5),
          // backgroundColor:'blue',
          width: '90%',
          // maxWidth: '100%',
          paddingTop: scale(5),
          flexDirection: 'row',
          // justifyContent: "space-evenly",
          //  zIndex:99999
        }}>
        <DropDownPicker
          items={[
            {label: 'Javascript', value: 'Javascript'},
            {label: 'Java', value: 'Java'},
            {label: 'Python', value: 'Python'},
          ]}
          zIndex={9999}
          defaultValue={'Javascript'}
          containerStyle={[
            Platform.OS === 'ios' ? pickerSelectStyles.inputIOS : pickerSelectStyles.inputAndroid,
            {
              // zIndex:99999
            },
          ]}
          style={{
            backgroundColor: 'white',
            // zIndex:99999
          }}
          itemStyle={{
            justifyContent: 'flex-start',
            backgroundColor: 'red',
            // zIndex:999999
          }}
          arrowStyle={{
            alignSelf: 'center',
            // backgroundColor:'red',
            height: scale(15),
            marginLeft: scale(5),
            marginTop: scale(2),
          }}
          dropDownStyle={{backgroundColor: 'white'}}
          onChangeItem={(item) => {
            //       this.setState({
            //   })
          }}
        />
        {/* <DropDownPicker
          items={[
            { label: "Javascript", value: "usa", hidden: true },
            { label: "Java", value: "uk" },
            { label: "Pythin", value: "france" },
          ]}
          // zIndex={99999}
          defaultValue={"usa"}
          containerStyle={
            Platform.OS === "ios"
              ? pickerSelectStyles.inputIOS
              : pickerSelectStyles.inputAndroid
          }
          style={{ backgroundColor: "white" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          arrowStyle={{
            alignSelf: "center",
            // backgroundColor:'red',
            height: scale(15),
            marginLeft: scale(5),
            marginTop: scale(2),
          }}
          dropDownStyle={{ backgroundColor: "white" }}
          onChangeItem={(item) => {
            //       this.setState({
            //   })
          }}
        /> */}
      </View>
    );
  };

  renderRightComponent = () => {
    if (this.state.isVarientDropdownShown) {
      return <Icon name="chevron-up" size={18} style={{paddingLeft: scale(33)}} />;
    } else {
      return <Icon name="chevron-down" size={18} style={{paddingLeft: scale(33)}} />;
    }
  };

  getModalpicker = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          // justifyContent: "space-evenly",
        }}>
        {/* <View style={{flex:1, marginRight:5,borderWidth:1, borderColor:'black' }}> */}

        <View
          style={{
            position: 'absolute',
            paddingLeft: scale(33),
            alignSelf: 'center',
          }}>
          {this.renderRightComponent()}
        </View>
        <ModalDropdown
          // renderRightComponent={this.renderRightComponent}
          defaultValue={'varient'}
          options={['Tshirt 1', 'Tshirt 2', 'Tshirt 3', 'Tshirt 4']}
          dropdownStyle={styles.dropdownStyle}
          // isFullWidth={true}
          style={styles.modalstyle}
          defaultTextStyle={styles.defaultTextStyle}
          dropdownTextStyle={styles.dropdownTextStyle}
          onSelect={(idx) => {
            console.log(idx);
          }}
          // isDropdownShowned={isDropdownShowned=>{
          //   console.log(isDropdownShowned)
          //   // this.setState({isVarientDropdownShown:isDropdownShowned})
          // }}
          // // onDropdownWillShow={() => {
          //   this.child.current.show();
          //   console.log('dropdwon shown')
          //   this.setState({ isVarientDropdownShown: true })
          // }}
          // onDropdownWillHide={() => {
          //   alert('dropdwon hidden')
          //   this.setState({ isVarientDropdownShown: false })
          // }}
        />
      </View>
    );
  };

  renderListItem = ({item}) => {

    return (
      <Product
        item={item}
        isListHorizontal={this.props.horizontal ? true : false}
        onPress={(data) => this.props.onPress(data)}
        onCartPress={(data, selectedVarient) => {
          this.onCartPress(data, selectedVarient);
        }}
        onHeartPress={(data) => this.onHeartPress(data)}
        onChangeCartValue={(num, data, flag, selectedAttributes) => this.onChangeCartValue(num, data, flag, selectedAttributes)}
      />
    );

    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)} style={styles.productGridStyle}>
        <TouchableOpacity onPress={() => this.onHeartPress(item)} style={styles.TouchableOpacityStyle}>
          {item.wishlist_item || item.is_wishlisted ? (
            <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
          ) : (
            <Image source={IMG_CONST.UN_SELECTED_HEART} style={styles.heartIcon} />
          )}
        </TouchableOpacity>

        <View
          style={
            {
              //   backgroundColor:'green',
            }
          }>
          <View style={styles.imageMainContainer}>
            <LoadingImage resizeMode={'contain'} source={{uri: item.images[0] ? item.images[0].image : ''}} style={styles.BottalImage} />

            <View
              style={{
                // backgroundColor:"red",
                padding: scale(5),
                paddingTop: scale(0),
                width: scale(250),
                // zIndex:99
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: scale(7),
                  paddingTop: scale(0),
                }}>
                <Text numberOfLines={1} style={styles.titleNameStyle}>
                  {item.name}
                </Text>
              </View>
              {/* {this.getPicker()} */}
              {this.getModalpicker()}
              {/* {this.getVarientMenu()} */}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor:'skyblue',
            paddingLeft: scale(70),
            paddingTop: scale(10),
          }}>
          {item.on_sale ? (
            <View style={{zIndex: 99}}>
              <View style={styles.discountRow}>
                <Text style={styles.price}>₹ {item.price_including_tax}</Text>
                <Text style={styles.discountPrice}> ₹ {item.actual_price}</Text>
              </View>
              <Text style={styles.inclusiveTaxText}> Inclusive of all taxes </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.price}>₹ {item.price_including_tax}</Text>
              <Text style={styles.inclusiveTaxText}> Inclusive of all taxes </Text>
            </View>
          )}

          <TouchableOpacity onPress={() => this.onCartPress(item)}>
            <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
              {item.cart_quantity || item.add_to_cart ? (
                <>
                  <InputSpinner
                    rounded={false}
                    showBorder={true}
                    editable={false}
                    buttonStyle={{
                      // backgroundColor:'red',
                      width: scale(30),
                      borderWidth: 1,
                      borderColor: COLOR_CONST.lightGreyText,
                    }}
                    inputStyle={{
                      borderWidth: 1,
                      borderLeftWidth: scale(0),
                      borderRightWidth: scale(0),
                      borderColor: COLOR_CONST.lightGreyText,
                    }}
                    // skin="modern"
                    max={9}
                    min={0}
                    step={1}
                    fontSize={13}
                    onMin={() => this.onCartPress(item)}
                    style={styles.spinner}
                    colorPress={COLOR_CONST.primaryThemeGradient}
                    colorMax={'#f04048'}
                    background={COLOR_CONST.white}
                    colorMin={COLOR_CONST.white}
                    // colorMax={'red'}
                    color={COLOR_CONST.white}
                    prepend={<Text style={styles.qtyStyle}>Qty :</Text>}
                    buttonTextColor={COLOR_CONST.coolGreyTwo}
                    textColor={COLOR_CONST.charcoalGrey}
                    // value={this.state.number}
                    value={item.cart_quantity ? item.cart_quantity : '0'}
                    onDecrease={(num) => {
                      this.onChangeCartValue(num, item, false);
                    }}
                    onIncrease={(num) => {
                      this.onChangeCartValue(num, item, true);
                    }}
                    onChange={(num) => {
                      // onChangeCartValue(num, item)
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
        </View>

        {/* <TouchableOpacity onPress={() => props.onPress(item)} >
                         <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
                         <Text style={styles.addToCartText}>View Product</Text>
                         </LinearGradient>
                    </TouchableOpacity> */}

        {item.on_sale && (
          <View style={styles.labelSticker}>
            <Text style={styles.stickerText}>Save {Number(item.discount).toFixed(1)}%</Text>
          </View>
        )}
      </TouchableOpacity>

      // GRID VIEW
      //     <TouchableOpacity onPress={() => props.onPress(item)} style={styles.productGridStyle}>
      //         <TouchableOpacity onPress={() => onHeartPress(item)} style={styles.TouchableOpacityStyle}>
      //             {item.wishlist_item || item.is_wishlisted ? (
      //                 <Image source={IMG_CONST.SELECTED_HEART} style={styles.heartIcon} />
      //             ) : (
      //                     <Image source={IMG_CONST.UN_SELECTED_HEART} style={styles.heartIcon} />
      //                 )}
      //         </TouchableOpacity>
      //         <View style={styles.imageMainContainer}>
      //             <LoadingImage resizeMode={'contain'} source={{uri: item.images[0] ? item.images[0].image : ''}} style={styles.BottalImage} />
      //             <Text numberOfLines={1} style={styles.titleNameStyle}>{item.name}</Text>
      //         {item.on_sale ? (<View style={styles.discountRow}>
      //             <Text style={styles.price}>₹ {item.price_including_tax}</Text>
      //             <Text style={styles.discountPrice}> ₹ {item.actual_price}</Text>
      //             </View>) : (<Text style={styles.price}>₹ {item.price_including_tax}</Text>)}
      //         </View>
      //         {/* <TouchableOpacity onPress={() => props.onPress(item)} >
      //              <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
      //              <Text style={styles.addToCartText}>View Product</Text>
      //              </LinearGradient>
      //         </TouchableOpacity> */}
      //         <TouchableOpacity onPress={() => onCartPress(item)}>
      //             <LinearGradient colors={[COLOR_CONST.primaryThemeGradient, COLOR_CONST.secondaryThemeGradient]} style={styles.addToCartContainer}>
      //                 {(item.cart_quantity || item.add_to_cart) ? (<>
      //                     <InputSpinner
      //                         rounded={false}
      //                         showBorder={true}
      //                         editable={false}
      //                         max={9}
      //                         min={0}
      //                         step={1}
      //                         fontSize={13}
      //                         onMin={() => onCartPress(item)}
      //                         style={styles.spinner}
      //                         colorPress={COLOR_CONST.facebook}
      //                         colorMax={"#f04048"}
      //                         background={COLOR_CONST.white}
      //                         colorMin={COLOR_CONST.white}
      //                         // colorMax={'red'}
      //                         color={COLOR_CONST.white}
      //                         prepend={<Text style={styles.qtyStyle}>Qty :</Text>}
      //                         buttonTextColor={COLOR_CONST.coolGreyTwo}
      //                         textColor={COLOR_CONST.charcoalGrey}
      //                         // value={this.state.number}
      //                         value={item.cart_quantity ? item.cart_quantity : '0'}
      //                         onDecrease={(num) => {
      //                             onChangeCartValue(num, item, false)
      //                         }}
      //                         onIncrease={(num) => {
      //                             onChangeCartValue(num, item, true)
      //                         }}
      //                         onChange={(num) => {
      //                             // onChangeCartValue(num, item)
      //                         }}
      //                     />
      //                 </>) : (
      //                         <TouchableOpacity onPress={() => onCartPress(item)}>
      //                             <Text style={styles.addToCartText}>Add to Cart</Text>
      //                         </TouchableOpacity>
      //                     )}
      //             </LinearGradient>
      //         </TouchableOpacity>
      //         {item.on_sale && <View style={styles.labelSticker}>
      //             <Text style={styles.stickerText}>Save {Number(item.discount).toFixed(1)}%</Text>
      //         </View>}
      // </TouchableOpacity>
    );
  };

    // Footer loader for Pagination
    _renderSearchResultsFooter = () => {
      return (
        <View style={styles.activityIndicator}>{this.props?.pageLoader && this.props?.pageCount > 1 && <ActivityIndicator size="large" color={'#000000'} />}</View>
      );
    };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.gridTitleContainer, {marginTop: this.props.name ? scale(18) : scale(0)}]}>
          <Text style={styles.titleTextStyle}>{this.props.name}</Text>
          {!this.props.hideViewAll && (
            <TouchableOpacity onPress={this.props.onPressProductListing}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.gridListContainer}>
          <FlatList
            horizontal={this.props.horizontal ? true : false}
            extraData={this.props}
            // extraData={this.state.RefreshFlatList}
            showsHorizontalScrollIndicator={false}
            data={this.props.data}
            renderItem={(item) => this.renderListItem(item)}
            keyExtractor={(item, index) => item.id}
            onEndReachedThreshold={3}
            onEndReached={() => {
              if(this.props?.onEndReached){
                this.props.onEndReached();
              }
            }}
            // ListFooterComponent={() => this._renderSearchResultsFooter()}
            onMomentumScrollBegin={() => {
              if(this.props?.onMomentumScrollBegin){
                this.props.onMomentumScrollBegin()
              }
            }}
          />
          {/* {this.props?.pageLoader && this.props?.pageCount > 1 && this._renderSearchResultsFooter()} */}
        </View>
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: scale(110),
    height: scale(40),
    borderRadius: scale(4),
    borderColor: 'rgba(219, 219, 219, 0.5)',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  inputAndroid: {
    width: scale(110),
    height: scale(40),
    borderRadius: scale(4),
    borderColor: 'rgba(219, 219, 219, 0.5)',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});
