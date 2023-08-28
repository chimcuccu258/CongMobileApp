import {View, Text} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Order from '../screens/Order';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Tab1') {
            iconName = focused
              ? 'information'
              : 'information-outline';
          } else if (route.name === 'Tab2') {
            iconName = focused ? 'information' : 'information-outline';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen 
        name="Tab1" 
        component={Home} 
        options={{headerShown: false}} 
      />
      <Tab.Screen
        name="Tab2"
        component={Order}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
