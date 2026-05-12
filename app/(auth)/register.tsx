import { useState } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
  const {
    signUp,
  } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function handleRegister() {
    const success =
      await signUp(
        email,
        password
      );

    if (!success) {
      alert('Erro ao cadastrar');

      return;
    }

    router.replace('/(tabs)');
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 34,
          fontWeight: 'bold',
          marginBottom: 40,
        }}
      >
        Criar conta
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={inputStyle}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={inputStyle}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: '#7B61FF',
          padding: 18,
          borderRadius: 16,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  backgroundColor: '#1A1A1F',

  color: '#FFFFFF',

  padding: 16,

  borderRadius: 16,

  marginBottom: 16,
};