// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen.js';
import HistoryScreen from '../screens/HistoryScreen.js';
import UploadScreen from '../screens/UploadScreen.js';
import SuccessScreen from '../screens/SuccessScreen.js';
import AskAiScreen from '../screens/AskAiScreen.js';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {backgroundColor: colors.primaryContainer },
      }}
    >
      {/* Home tab */}
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} 
      />
      {/* Ask AI tab */}
      <Tab.Screen 
        name="Ask AI" 
        component={AskAiScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat" color={color} size={size} />
          ),
        }} 
      />
      {/* History tab */}
      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          ),
        }} 
      />
      {/* Disabled these tabs */}
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen} 
        options={{ 
          tabBarButton: () => null, 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Success" 
        component={SuccessScreen} 
        options={{ 
          tabBarButton: () => null, 
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
