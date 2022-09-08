import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import COLOR_CONST, { FONTS } from '../theme/ColorConstants';
import { connect } from "react-redux";
import * as IMG_CONST from '../theme/ImageConstants';
import scale from '../utils/Scale';
export class CartBadgeIcon extends Component {
  constructor(props){
      super(props);
  }
    render() {
        return (
            <>
                <Image source={this.props.isFocused ? IMG_CONST.CART_ACTIVE :
                    IMG_CONST.CART_INACTIVE} style={{ width: scale(25), height: scale(22) }} />
                {this.props.cartHasProductFlag ?
                    (<View
                        style={{
                            height: scale(20),
                            width: scale(20),
                            borderRadius: scale(10),
                            backgroundColor: COLOR_CONST.primaryThemeGradient,
                            borderColor: 'white',
                            borderWidth: 0.9,
                            position: 'absolute',
                            top: scale(8),
                            end: scale(10),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                    <Text style={{ fontSize: scale(10), color: COLOR_CONST.white,
                     fontFamily: FONTS.GTWalsheimProRegular }}>{this.props.cartCount}
                     </Text>
                    </View>
                    ) : null}
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    cartHasProductFlag: state.cart.cartHasProduct,
    cartCount: state.cart.cartCount,
})
export default connect(mapStateToProps)(CartBadgeIcon)
