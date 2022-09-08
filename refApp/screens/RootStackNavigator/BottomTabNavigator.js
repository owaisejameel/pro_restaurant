/**
 * Main Tab Screen
 */
import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import * as IMG_CONST from '../../theme/ImageConstants';
import ColorConstants from '../../theme/ColorConstants';
import styles from './BottomTabNavigatorStyle';
import { HeaderTitle } from '../../components/HeaderTitle';
import { HeaderRight } from '../../components/HeaderRight';

//*> Screens
import Wishlist from '../BottomTab/Wishlist';
import Home from '../BottomTab/Home/Home';
import Explore from '../BottomTab/Explore/Explore';
import Search from '../BottomTab/Search/Search';
import Profile from '../profile/Profile';
import SearchListing from '../SearchListing/SearchListing';
import ChatScreen from '../ChatScreen';
import Cart from '../profile/Cart';
import CartBadgeIcon from '../../components/CartBadgeIcon'
import ProductDescription from '../productDescription/ProductDescription';

//*> Stacks
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const ProfileStack = createStackNavigator();

//*> Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabScreen = (props) => (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        style: { position: 'absolute' },
        keyboardHidesTabBar: true
      }}  
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          listeners={{ focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton)
          ,blur: () => BackHandler.removeEventListener('hardwareBackPress',handleBackButton)
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreStackScreen}
        />
        {/* <Tab.Screen
          name="Wishlist"
          component={WishListStackScreen}
        /> */}
        <Tab.Screen
          name="HomeCart"
          component={WishListStackScreen}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
        />
    </Tab.Navigator>
);

const handleBackButton =  () => {
  BackHandler.exitApp();
  return true;
}

export default BottomTabScreen;

const renderBottomTabIcons = (iconIndex, isFocused) => {
  switch (iconIndex) {
    case 0:
      return <Image source={isFocused ? IMG_CONST.HOME_ACTIVE : IMG_CONST.HOME_INACTIVE} style={styles.homeIcons} />
    case 1:
      return <Image source={isFocused ? IMG_CONST.SEARCH_ACTIVE : IMG_CONST.SEARCH_INACTIVE} style={styles.searchIcons} />
    case 2:
      return <Image source={isFocused ? IMG_CONST.EXPLORE_ACTIVE : IMG_CONST.EXPLORE_INACTIVE} style={styles.exploreIcons} />
    case 3:
      return  <CartBadgeIcon isFocused={isFocused}/> 
        {/* <Image source={IMG_CONST.CART_BLACK_ICON} style={styles.cartIcon} /> */}
          {/* <Image source={isFocused ? IMG_CONST.CART_ACTIVE : IMG_CONST.CART_INACTIVE} style={styles.wishListIcons} /> */}
         
      
      // return <Image source={isFocused ? IMG_CONST.CART_ACTIVE : IMG_CONST.CART_INACTIVE} style={styles.wishListIcons} />
      // return <Image source={isFocused ? IMG_CONST.WISH_ACTIVE : IMG_CONST.WISH_INACTIVE} style={styles.wishListIcons} />
    case 4:
      return <Image source={isFocused ? IMG_CONST.ACCOUNT_ACTIVE : IMG_CONST.ACCOUNT_INACTIVE} style={styles.profileIcons} />
    default:
      break;
  }
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
      <SafeAreaView style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.outerContainer}
              key={index+'MyTabBar'}
            >
              <View style={[styles.tabContainer, { borderTopColor: isFocused ? ColorConstants.primaryThemeGradient : 'transparent' }]}>
                  {renderBottomTabIcons(index, isFocused)}
              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
  );
}

const HomeStackScreen = (props) => (
    <HomeStack.Navigator>
        <HomeStack.Screen 
            name="Home" 
            component={Home} 
            options={({route, navigation}) => ({
                headerTitleAlign: 'center',
                headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
                route: {route}, 
                navigation: {navigation},
                headerShown: false,
              })
            }
        />
        <HomeStack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route, navigation }) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
            route: { route },
            navigation: { navigation },
            headerShown: true
          })
          }
        />
    </HomeStack.Navigator>
);

const SearchStackScreen = (props) => (
    <SearchStack.Navigator>
        <SearchStack.Screen 
          name="Search" 
          component={Search} 
          options={({route, navigation}) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
              headerTitle: () => null,
              // headerRight: () => <HeaderRight />,
              route: {route}, 
              navigation: {navigation}})
          }
        />
         <SearchStack.Screen 
          name="SearchListing" 
          component={SearchListing} 
          options={({route, navigation}) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
              headerTitle: () => null,
              headerRight: () => <HeaderRight />,
              route: props.route, 
              navigation: props.navigation})
          }
        />
         <SearchStack.Screen  name="ProductDescription"
            options={{
              headerTitle: () => <HeaderTitle title={' '} />,
              headerRight: () => <HeaderRight cart_black={true} share={true}/>,
            }}
            component={ProductDescription} 
          />
    </SearchStack.Navigator>
);

const ExploreStackScreen = (props) => (
    <ExploreStack.Navigator>
        <ExploreStack.Screen 
            name="Explore" 
            component={Explore} 
            options={({route, navigation}) => ({
              headerTitleAlign: 'center',
              headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
              headerTitle: () => <HeaderTitle title={'Explore'} />,
              headerRight: () => <HeaderRight />,
              route: {route}, 
              navigation: {navigation}})
            }
        />
    </ExploreStack.Navigator>
);

const WishListStackScreen = (props) => (
    <WishlistStack.Navigator>
        <WishlistStack.Screen 
          name="HomeCart" 
          component={Cart}
          // name="Wishlist" 
          // component={Wishlist}  
          options={({route, navigation}) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
            headerTitle: () => <HeaderTitle title={'Cart'} />,
            // headerTitle: () => <HeaderTitle title={'Wishlist'} />,
            headerRight: () => <HeaderRight cart_black={true} />,
            route: {route}, 
            navigation: {navigation}})
          }
        />
    </WishlistStack.Navigator>
);

const ProfileStackScreen = (props) => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen 
          name="Profile" 
          component={Profile} 
          options={({route, navigation}) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: { textAlign: 'center',alignSelf:'center' },
            headerTitle: () => <HeaderTitle title={'Profile'} />,
            headerRight: () => <HeaderRight cart_black={true} />,
            route: {route}, 
            navigation: {navigation}})
          }
        />
    </ProfileStack.Navigator>
);
