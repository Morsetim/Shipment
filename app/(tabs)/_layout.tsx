import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from "react-native";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5B4CCC",
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Shipments',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/boxes.png')}
              style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F5FCFF',
          },
        }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/barcode.png')}
              style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F5FCFF', 
          },
        }}
      />
      <Tabs.Screen
        name="-not-found"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/wallet.png')}
              style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F5FCFF', 
          },
        }}
      />
       <Tabs.Screen
        name="_not-found"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/profile.png')}
              style={{ width: 28, height: 28, resizeMode: 'contain', tintColor: color }}
            />
          ),
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F5FCFF',
          },
        }}
      />
    </Tabs>
  );
}
