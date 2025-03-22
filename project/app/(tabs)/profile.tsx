import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { useUser } from '@/context/UserContext';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

export default function ProfileScreen() {
  const { user, logout, login } = useUser();
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = (userData: any) => {
    login(userData);
  };

  const handleSignupSuccess = (userData: any) => {
    login(userData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <>
            <View style={styles.profileCard}>
              <Image
                source={{
                  uri:
                    // user?.avatar ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <LogOut size={20} color="#FF3B30" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {showLogin ? (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
              <SignupForm onSignupSuccess={handleSignupSuccess} />
            )}
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowLogin(!showLogin)}
            >
              <Text style={styles.toggleButtonText}>
                {showLogin
                  ? 'Need an account? Sign Up'
                  : 'Already have an account? Login'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.versionText}>Version 0.1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333333',
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 8,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  toggleButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2faa7a',
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 20,
  },
});
