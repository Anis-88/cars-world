import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CategoryPage from '../screens/CategoryPage';
import SearchPage from '../screens/SearchPage';         
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';   

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#123F35',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#DFF5EC' },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Category') iconName = 'car';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Category" component={CategoryPage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
