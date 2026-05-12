import { useState } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
  const { signUp } = useAuth();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [type, setType] =
    useState('CPF');

  async function handleRegister() {
    if (
      !name ||
      !email ||
      !password
    ) {
      alert(
        'Preencha todos os campos'
      );

      return;
    }

    const success =
      await signUp(
        name,
        email,
        password,
        type
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
        placeholder="Nome"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />

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
        onPress={() =>
          setType('CPF')
        }
        style={{
          backgroundColor:
            type === 'CPF'
              ? '#7B61FF'
              : '#1A1A1F',

          padding: 16,

          borderRadius: 16,

          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Conta CPF
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType('CNPJ')
        }
        style={{
          backgroundColor:
            type === 'CNPJ'
              ? '#7B61FF'
              : '#1A1A1F',

          padding: 16,

          borderRadius: 16,

          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Conta CNPJ
        </Text>
      </TouchableOpacity>

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