import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B8B',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarAccessibilityLabel: 'Main navigation',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ accessibilityLabel: 'Home screen' }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ accessibilityLabel: 'Events screen' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ accessibilityLabel: 'Profile settings' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
