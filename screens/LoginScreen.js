import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

const BASE_URL = "http://192.168.1.7:8000/api"; // Updated base URL

const LoginScreen = ({ setUser }) => {
  const [operatorId, setOperatorId] = useState('');
  const [keycode, setKeycode] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      operator_id: operatorId,
      keycode: keycode
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    
    if (response.data.status === 'success') {
      setUser({ 
        name: response.data.data.name,
        operatorId: response.data.data.operator_id
      });
    } else {
      Alert.alert('Login Failed', response.data.message);
    }
  } catch (error) {
    Alert.alert('Error', error.response?.data?.message || 'Failed to connect to server');
    console.error(error);
  }
};

const handleRegister = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, {
      name: name,
      operator_id: operatorId,
      keycode: keycode
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    
    if (response.data.status === 'success') {
      setName('');
      setOperatorId('');
      setKeycode('');
      setIsRegister(false);
      Alert.alert('Success', 'Registered successfully. Please log in.');
    } else {
      Alert.alert('Registration Failed', response.data.message);
    }
  } catch (error) {
    Alert.alert('Error', error.response?.data?.message || 'Failed to connect to server');
    console.error(error);
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Operator ID"
        placeholderTextColor="#aaa"
        value={operatorId}
        onChangeText={setOperatorId}
      />
      <TextInput
        style={styles.input}
        placeholder="Keycode"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={keycode}
        onChangeText={setKeycode}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isRegister ? handleRegister : handleLogin}
      >
        <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Log In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.toggleText}>
          {isRegister ? 'Already registered? Log in' : 'New user? Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    width: '100%',
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});