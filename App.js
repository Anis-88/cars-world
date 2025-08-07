import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens 
import LoginScreen from './screens/LoginScreen.jsx';
import SignUpScreen from './screens/SignUpScreen.jsx';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.jsx';
import MainTabs from './navigators/MainTabs.jsx';
import CategoryPage from './screens/CategoryPage.jsx';
import CategoryDetailsScreen from './screens/CategoryDetailsScreen.jsx';
import CarDetailScreen from './screens/CarDetailScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import BookingScreen from './screens/BookingScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderHistoryScreen from './screens/OrderHistoryScreen.jsx';
import LanguageSettingsScreen from './screens/LanguageSettingsScreen.jsx';
import ThemeSettingsScreen from './screens/ThemeSettingsScreen.jsx';

// Context 
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import { HistoryProvider } from './context/HistoryContext.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <HistoryProvider>
          <ThemeProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="Category" component={CategoryPage} />
                <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
                <Stack.Screen name="CarDetail" component={CarDetailScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Booking" component={BookingScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
                <Stack.Screen name="Language" component={LanguageSettingsScreen} />
                <Stack.Screen name="Theme" component={ThemeSettingsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </HistoryProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
