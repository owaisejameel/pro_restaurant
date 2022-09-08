import React from 'react';
import {Image, View, Text} from 'react-native';
import R from '../R';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as IMG_CONST from '../theme/ImageConstants';
import scale from '../utils/Scale';
import ColorConstants, { FONTS } from '../theme/ColorConstants';

export const HeaderRight = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
        {props.share ? (
          <Image
            source={IMG_CONST.SHARE_ICON}
            style={{margin: scale(10), width: scale(15.9), height: scale(21)}}
          />
        ) : null}
      </TouchableOpacity>
      {props.showNotification ? (
        <TouchableOpacity onPress={() => props.onPress && props.onPress()}>
          {props.notifications_black ? (
            <Image
              source={R.images.notifications}
              style={{ marginTop: scale(10), width: scale(16), height: scale(19)}}
            />
          ) : (
            <>
              <Image
                source={R.images.notification}
                style={{margin: scale(10), width: scale(18), height: scale(20)}}
              />
              {props.showNotificationDot && (
                <View
                  style={{
                    height: scale(6),
                    width: scale(6),
                    borderRadius: scale(3),
                    backgroundColor: ColorConstants.greenish,
                    borderColor: 'white',
                    borderWidth: 0.9,
                    position: 'absolute',
                    top: scale(10),
                    end: scale(12),
                  }}
                />
              )}
            </>
          )}
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
      // onPress={() => props.navigation && props.navigation.navigate('Cart')}>
        onPress={() => props.navigation && props.navigation.navigate('Wishlist')}>
        {props.cart_black ? (
          <Image
          // source={R.images.cart_black}
            source={R.images.blackHeart}
            style={{ margin: scale(10), width: scale(22), height: scale(20)}}
          />
        ) : (
          <>
            <Image
              //  source={R.images.cart}
              source={R.images.whiteHeart}
              style={{marginRight: scale(25), marginTop: scale(10), width: scale(22), height: scale(20)}}
            />
            {/* {props.cartHasProductFlag && (
              <View
                style={{
                  height: scale(20),
                  width: scale(20),
                  borderRadius: scale(30),
                  backgroundColor: ColorConstants.greenish,
                  borderColor: 'white',
                  borderWidth: 0.9,
                  position: 'absolute',
                  top: scale(2),
                  end: scale(15),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              ><Text style={{ fontSize: scale(10), color: ColorConstants.white, fontFamily: FONTS.GTWalsheimProRegular}}>{props.cartCount}</Text></View>
            )} */}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
