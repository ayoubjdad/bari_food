import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { serverUrl } from '@/config/config';

const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        const { _id, name, email, isAdmin, token } = response.data;
        // Store the token in secure storage (e.g., AsyncStorage)
        // Update the user context
        onLoginSuccess({ _id, name, email, isAdmin });
      } else {
        alert('Email or password is incorrect.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Error during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Chargement...' : 'Connexion'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 80,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#2faa7a',
    padding: 12,
    borderRadius: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginForm;
