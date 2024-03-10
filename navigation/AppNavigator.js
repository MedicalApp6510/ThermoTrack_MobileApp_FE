// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import UploadScreen from '../screens/UploadScreen.js';
import SuccessScreen from '../screens/SuccessScreen.js';
import TabNavigator from './TabNavigator'; 

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth screen */}
        <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
        {/* Main app screen with bottom tabs */}
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
