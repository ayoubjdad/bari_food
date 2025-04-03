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

const SignupForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      if (response.data && response.data.token) {
        const { _id, name, email, isAdmin, token } = response.data;
        // Store the token in secure storage (e.g., AsyncStorage)
        // Update the user context
        onSignupSuccess({ _id, name, email, isAdmin });
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Error during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Chargement...' : "S'inscrire"}
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

export default SignupForm;
