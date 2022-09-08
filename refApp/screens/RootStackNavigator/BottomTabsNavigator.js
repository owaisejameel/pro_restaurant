import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import R from '../../R';
import Wishlist from '../BottomTab/Wishlist';
import Home from '../BottomTab/Home/Home';
import Explore from '../BottomTab/Explore/Explore';
import Search from '../BottomTab/Search/Search';
import Profile from '../profile/Profile';
import scale, { verticalScale } from '../../utils/Scale';
import COLOR_CONST from '../../theme/ColorConstants';
import * as IMG_CONST from '../../theme/ImageConstants';

import { FONTS } from '../../theme/ColorConstants';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderTitle } from '../../components/HeaderTitle';
import { HeaderRight } from '../../components/HeaderRight';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const ProfileNvigator = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: R.colors.black,
        }}>
        <RootStack.Screen
          name="Profile"
          component={Profile}
          options={({ route, navigation }) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
            headerTitle: () => <HeaderTitle title={'Profile'} />,
            headerRight: () => <HeaderRight cart_black={true} />,
            route: { route },
            navigation: { navigation }
          })}
        />
      </RootStack.Navigator>
    );
  };

  const WishlistNavigator = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          // headerBackTitleVisible: false,
          headerTintColor: R.colors.black,
        }}>
        <RootStack.Screen
          name="Wishlist"
          component={Wishlist}
          options={({ route, navigation }) => ({
            headerTitle: () => <HeaderTitle title={'Wishlist'} />,
            headerRight: () => <HeaderRight cart_black={true} />,
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
            route: { route },
            navigation: { navigation }
          })
          }
        />
      </RootStack.Navigator>
    );
  };

  const SearchNavigator = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: R.colors.black,
        }}>

        <RootStack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: () => null,
            headerRight: () => <HeaderRight />,
          }}
        />
      </RootStack.Navigator>
    );
  };
  const ExploreList = () => {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: R.colors.black,
        }}>
        <RootStack.Screen
          name="Explore"
          component={Explore}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
            headerTitle: () => <HeaderTitle title={'Explore'} />,
            headerRight: () => <HeaderRight />,
          }}
        />
      </RootStack.Navigator>
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // title: 'Patient',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <Image
                  source={IMG_CONST.Home_INACTIVE}
                  style={{ marginLeft: 5, height: scale(24), width: scale(28.8) }}
                />
              );
            } else {
              return (
                <Image
                  source={IMG_CONST.HOME_ACTIVE}
                  style={{ marginLeft: 5, height: scale(24), width: scale(28.8) }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          // tabBarVisible: false,
          // title: 'Order History',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <Image
                  source={IMG_CONST.SEARCH_INACTIVE}
                  style={{ marginLeft: 5, height: scale(22.5), width: scale(22.4) }}
                />
              );
            } else {
              return (
                <Image
                  source={IMG_CONST.SEARCH_ACTIVE}
                  style={{ marginLeft: 5, height: scale(22.5), width: scale(22.4) }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreList}
        options={{
          // title: 'Catalogue',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <Image
                  source={IMG_CONST.EXPLORE_INACTIVE}
                  style={{ marginLeft: 5, height: scale(21.6), width: scale(21.6) }}
                />
              );
            } else {
              return (
                <Image
                  source={IMG_CONST.EXPLORE_ACTIVE}
                  style={{ marginLeft: 5, height: scale(21.6), width: scale(21.6) }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistNavigator}
        options={{
          // title: 'Inventory',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <Image
                  source={IMG_CONST.WISH_INACTIVE}
                  style={{ marginLeft: 5, height: scale(22), width: scale(24.2) }}
                />
              );
            } else {
              return (
                <Image
                  source={IMG_CONST.WISH_ACTIVE}
                  style={{ marginLeft: 5, height: scale(22), width: scale(23.9) }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNvigator}
        options={{
          // title: 'Profile',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <Image
                  source={IMG_CONST.ACCOUNT_INACTIVE}
                  style={{ marginLeft: 5, height: scale(24.1), width: scale(24.1) }}
                />
              );
            } else {
              return (
                <Image
                  source={IMG_CONST.ACCOUNT_ACTIVE}
                  style={{ marginLeft: 5, height: scale(24.1), width: scale(24.1) }}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}
