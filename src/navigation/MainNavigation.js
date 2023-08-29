import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import Order from '../screens/Order';
import Login from '../screens/Login';
import Authentication from '../screens/Authenticaion';
import Store from '../screens/Store';
import Voucher from '../screens/Voucher';
import Other from '../screens/Other';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Tab1') {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
          } else if (route.name === 'Tab2') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Tab3') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Tab4') {
            iconName = focused
              ? 'ticket-confirmation'
              : 'ticket-confirmation-outline';
          } else if (route.name === 'Tab5') {
            iconName = 'menu';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Tab1"
        component={Home}
        options={{headerShown: false, tabBarLabel: 'Trang chủ'}}
      />
      <Tab.Screen
        name="Tab2"
        component={Order}
        options={{headerShown: false, tabBarLabel: 'Đặt hàng'}}
      />
      <Tab.Screen
        name="Tab3"
        component={Store}
        options={{headerShown: false, tabBarLabel: 'Cửa hàng'}}
      />
      <Tab.Screen
        name="Tab4"
        component={Voucher}
        options={{headerShown: false, tabBarLabel: 'Ưu đãi'}}
      />
      <Tab.Screen
        name="Tab5"
        component={Other}
        options={{headerShown: false, tabBarLabel: 'Ưu đãi'}}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
