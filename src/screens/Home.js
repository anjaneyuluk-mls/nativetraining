import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './List';
import SettingsScreen from './Settings';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'yellow',
          display: 'none',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
