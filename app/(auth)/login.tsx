import { useState } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function handleLogin() {
    const success =
      await signIn(
        email,
        password
      );

    if (!success) {
      alert('Login inválido');

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
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 32,
        }}
      >
        Entrar
      </Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          backgroundColor: '#1A1A1F',
          color: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
        }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: '#1A1A1F',
          color: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          marginBottom: 24,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#7B61FF',
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push('/(auth)/register')
        }
      >
        <Text
          style={{
            color: '#7B61FF',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          Criar conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}