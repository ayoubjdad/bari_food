import { Tabs } from 'expo-router';
import {
  Chrome as Home,
  ShoppingBag,
  Clock,
  User,
  House,
} from 'lucide-react-native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

export default function TabLayout() {
  const handlePress = () => {
    Linking.openURL('https://www.bari-food.com');
  };

  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: '#0a5440',
    //     tabBarInactiveTintColor: '#9E9E9E',
    //     tabBarStyle: styles.tabBar,
    //     tabBarLabelStyle: styles.tabBarLabel,
    //     headerShown: false,
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Menu',
    //       tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="cart"
    //     options={{
    //       title: 'Panier',
    //       tabBarIcon: ({ color, size }) => (
    //         <ShoppingBag size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="orders"
    //     options={{
    //       title: 'Commandes',
    //       tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: 'Profile',
    //       tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
    //     }}
    //   />
    // </Tabs>
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={require('../../assets/logo/bari-lion.png')}
        style={{ width: 240, height: 240 }}
      />
      <Text>Cette application sera disponible le 1er Avril 2025</Text>
      <Text>Visitez notre site pour plus d'informations</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          www.bari-food.com
        </Text>
      </TouchableOpacity>{' '}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 0,
    backgroundColor: '#e7f6ef',
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
