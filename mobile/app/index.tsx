import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { LogoIcon } from '@/components/LogoIcon';

export default function ComingSoonScreen() {
  const handleOpenGoogle = async () => {
    await WebBrowser.openBrowserAsync('https://www.google.com');
  };

  return (
    <View style={styles.container}>
      <LogoIcon size={120} color="#007AFF" />
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>Our app will be available soon!</Text>
      <Pressable onPress={handleOpenGoogle} style={styles.link}>
        <Text style={styles.linkText}>Visit Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 24,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  link: {
    marginTop: 32,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});