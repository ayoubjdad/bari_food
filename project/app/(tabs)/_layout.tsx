import { Tabs } from 'expo-router';
import { Chrome as Home, ShoppingBag, Clock, User } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a5440',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
