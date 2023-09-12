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
import Favorite from '../screens/Favorite';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WeatherIcon from '../components/WeatherIcon';
import VoucherIcon from '../components/VoucherIcon';
import NoticeIcon from '../components/NoticeIcon';
import Points from '../screens/Points';
import OrderHistory from '../screens/OrderHistory';
import SignUp from '../screens/SignUp';
import Information from '../screens/Information';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  const navigation = useNavigation();

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
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={Order}
        options={{
          headerShown: true,
          headerTitle: 'Danh mục',
          headerTitleAlign: 'left',
          tabBarLabel: 'Đặt hàng',
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={Store}
        options={{
          headerShown: true,
          headerTitle: 'Cửa hàng',
          headerTitleAlign: 'left',
          headerRight: () => (
            <>
              <View style={{flexDirection: 'row', marginRight: 10}}>
                <VoucherIcon />
                <NoticeIcon />
              </View>
            </>
          ),
          tabBarLabel: 'Cửa hàng',
        }}
      />
      <Tab.Screen
        name="Tab4"
        component={Voucher}
        options={{
          headerShown: true,
          headerTitle: 'Ưu đãi của bạn',
          tabBarLabel: 'Ưu đãi',
        }}
      />
      <Tab.Screen
        name="Tab5"
        component={Other}
        options={{
          headerShown: true,
          headerTitle: 'Khác',
          headerTitleAlign: 'left',
          headerRight: () => (
            <>
              <View style={{flexDirection: 'row', marginRight: 10}}>
                <VoucherIcon />
                <NoticeIcon />
              </View>
            </>
          ),
          tabBarLabel: 'Khác',
        }}
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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{headerShown: true, title: 'Yêu thích'}}
      />
      <Stack.Screen
        name="Points"
        component={Points}
        options={{headerShown: true, title: 'Mã tích điểm'}}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{headerShown: true, title: 'Lịch sử đơn hàng'}}
      />
      <Stack.Screen
        name="Info"
        component={Information}
        options={{headerShown: true, title: 'Cập nhật thông tin'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
