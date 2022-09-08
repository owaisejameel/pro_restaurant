/**
 * Root Stack Screen
 */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../GetStart/SplashScreen/SplashScreen';
import LocationAccess from '../GetStart/LocationAccess/LocationAccess';
import NotificationAccess from '../GetStart/NotificationAccess/NotificationAccess';
import BottomTabsNavigator from './BottomTabNavigator';
import LoginScreen from '../authService/Index';
import VerifyAccount from '../authService/VerifyAccount';
import ForgotPassword from '../authService/ForgotPassword';
import CreateNewPassword from '../authService/CreateNewPassword';
import ProductDescription from '../productDescription/ProductDescription';
import ReviewListScreen from '../ReviewList/ReviewListScreen';
import SaveContactUsScreen from '../profile/SaveContactUs';
import { HeaderTitle } from '../../components/HeaderTitle';
import HelpCenter from '../profile/HelpCenter';
import FAQs from '../profile/FAQs';
import AboutUs from '../profile/AboutUs';
import ContactUs from '../profile/ContactUs';
import DeliveryReturns from '../profile/DeliveryReturns';
import HowItWorks from '../profile/HowItWorks';
import TermsOfService from '../profile/TermsOfService';
import PrivacyPolicy from '../profile/PrivacyPolicy';
import ProfileFAQ from '../profile/ProfileFAQ';
import ChangePassword from '../profile/ChangePassword';
import SavedAddresses from '../profile/SavedAddresses';
import AddNewAddress from '../profile/AddNewAddress';
import CheckoutScreen from '../profile/CheckoutScreen';
import Cart from '../profile/Cart';
import ConfirmOrderScreen from '../profile/ConfirmOrderScreen';
import BuyProductConfirmOrderScreen from '../profile/BuyProductConfirmOrderScreen';
import ConnectedAccounts from '../profile/ConnectedAccounts';
import MyOrders from '../profile/MyOrders';
import PreMyOrders from '../profile/PreMyOrders'
import MyOrderDetails from '../profile/MyOrderDetails';
import EditProfile from '../profile/EditProfile';
import { HeaderRight } from '../../components/HeaderRight';
import Filter from '../Filter/Filter'
import Location  from '../../screens/Location/Location';
import R from '../../R';
import PaymentInformation from '../profile/PaymentInformation'
import MedicineOrder from "../orderMedicines/MedicineOrder";
import UploadPrescription from "../orderMedicines/UploadPrescription";
import HomoeoPharmaNXT from "../orderMedicines/HomoeoPharmaNXT";
import NotificationScreen from '../../screens/Notifications/NotificationScreen';
import PaymentInformationScreen from '../../screens/PaymentInformation/PaymentInformation';
import NewCardScreen from '../../screens/NewCard/NewCard';
import ProductListing from '../ProductListing/ProductListing';
import SubscriptionOrderList from '../SubsciprtionOrderList/SubscriptionOrderList';
import VerifyPincode from '../GetStart/VerifyPincode/VerifyPincode';
import Wishlist from '../BottomTab/Wishlist';

const RootStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen options={{ gestureEnabled: false, headerShown: false, }} name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen options={{ gestureEnabled: false, headerShown: false, }} name="VerifyAccount" component={VerifyAccount} />
      <RootStack.Screen options={{ headerShown: false, }} name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen options={{ gestureEnabled: false, headerShown: false, }} name="CreateNewPassword" component={CreateNewPassword} />
      <RootStack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
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

const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColorl: R.colors.black,
      }}>
      <RootStack.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
        options={{ 
          gestureEnabled: false,
          headerShown: false }}
      />
      <RootStack.Screen
        name="HomoeoPharmaNXT"
        options={({ route, navigation }) => ({
          headerTintColor: R.colors.white,
          headerStyle: {
            backgroundColor: R.colors.LightlightNavy
          },
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          headerTitle: () => <HeaderTitle title={'Homoeo House'} textcolour={{ color: R.colors.white }} />,
          headerRight: () => <HeaderRight showNotification={true} />,
          route: { route },
          navigation: { navigation }
        })
        }
        component={HomoeoPharmaNXT}
      />
      <RootStack.Screen name="MedicineOrder"
        options={({ route, navigation }) => ({
          headerTintColor: R.colors.white,
          headerStyle: {
            backgroundColor: R.colors.LightlightNavy
          },
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          headerTitle: () => <HeaderTitle title={'Order Medicines'} textcolour={{ color: R.colors.white }} />,
          // headerRight: () => <HeaderRight showNotification={true} />,
          route: { route },
          navigation: { navigation }
        })}
        component={MedicineOrder} />

      <RootStack.Screen name="UploadPrescription"
        component={UploadPrescription}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Upload Prescription'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />

      <RootStack.Screen name="ReviewListScreen"
        component={ReviewListScreen}
        options={({ route, navigation }) => ({
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />

      <RootStack.Screen name="SaveContactUsScreen"
        component={SaveContactUsScreen}
        options={({ route, navigation }) => ({
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />

      <RootStack.Screen name="ProductDescription"
        options={{
          headerTitle: () => <HeaderTitle title={' '} />,
          headerRight: () => <HeaderRight cart_black={true} share={true}/>,
        }}
        component={ProductDescription} 
      />
      <RootStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ route, navigation }) => ({
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          headerTitle: () => <HeaderTitle title={'Edit Profile'} />,
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="ConnectedAccounts"
        component={ConnectedAccounts}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Connected Accounts'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Change Password'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="SavedAddresses"
        component={SavedAddresses}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Saved Addresses'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Saved Addresses'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Saved Addresses'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="MyOrders"
        component={MyOrders}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'My Orders'} />,
          headerRight: () => <HeaderRight cart_black={true} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }      
      />

<RootStack.Screen
        name="PreMyOrders"
        component={PreMyOrders}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'My Orders'} />,
          headerRight: () => <HeaderRight cart_black={true} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }      
      />
      <RootStack.Screen
        name="MyOrderDetails"
        component={MyOrderDetails}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Order Details'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="FAQs"
        component={FAQs}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }      
        />
      <RootStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="Cart"
        component={Cart}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Cart'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="ConfirmOrderScreen"
        component={ConfirmOrderScreen}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'ConfirmOrderScreen'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="BuyProductConfirmOrderScreen"
        component={BuyProductConfirmOrderScreen}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'BuyProductConfirmOrderScreen'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="DeliveryReturns"
        component={DeliveryReturns}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="ProfileFAQ"
        component={ProfileFAQ}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Help Center'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />

      <RootStack.Screen
        name="Location"
        component={Location}
        options={{ headerTitle: () => null }}
      />
      <RootStack.Screen
        name="PaymentInformation"
        component={PaymentInformation}
        options={{ headerTitle: () => <HeaderTitle title={'Payment Information'} /> }}
      />
      <RootStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Notifications'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="Wishlist"
        component={Wishlist}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Wishlist'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="PaymentInformationScreen"
        component={PaymentInformationScreen}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'Payment Information'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="NewCardScreen"
        component={NewCardScreen}
        options={({ route, navigation }) => ({
          headerTitle: () => <HeaderTitle title={'New Card'} />,
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="ProductListing"
        component={ProductListing}
        options={({ route, navigation }) => ({
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen
        name="Filter"
        component={Filter}
        options={({ route, navigation }) => ({
          headerTitleAlign: 'center',
          headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
          route: { route },
          navigation: { navigation }
        })
        }
      />
      <RootStack.Screen name="SubscriptionOrderList"
        component={SubscriptionOrderList}
        options={({ route, navigation }) => ({
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
const RootStackScreen = (props) => {
  return (
    <RootStack.Navigator headerMode='none'>
      <RootStack.Screen options={{ gestureEnabled: false }} name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen options={{ gestureEnabled: false }} name="VerifyPincode" component={VerifyPincode} />
      <RootStack.Screen name="LocationAccess" component={LocationAccess} />
      <RootStack.Screen name="NotificationAccess" component={NotificationAccess} />
      <RootStack.Screen options={{ gestureEnabled: false }} name="AuthNavigator" component={AuthNavigator} />
      <RootStack.Screen options={{ gestureEnabled: false }} name="MainNavigator" component={MainNavigator} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;