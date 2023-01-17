import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from '../screens/List';
import SettingsScreen from '../screens/Settings';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function BottomTabBar({ navigation }) {
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
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icon name={'home'} size={21} color={'blue'} />,
        }}
        name="List"
        component={List}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name={'user-circle'} size={21} color={'blue'} />
          ),
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
