import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Movies from '../screens/Movies';
import NewMovie from '../screens/NewMovie';
import SettingsScreen from '../screens/Settings';

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
        name="Movies"
        component={Movies}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icon name={'home'} size={21} color={'blue'} />,
        }}
        name="NewMovie"
        component={NewMovie}
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
