import { useState } from 'react';

import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';

export default function RegisterCPFScreen() {
  const { signUp } = useAuth();

  const [name, setName] =
    useState('');

  const [cpf, setCpf] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [successModalVisible, setSuccessModalVisible] =
    useState(false);

  async function handleRegister() {
    if (
      !name ||
      !cpf ||
      !email ||
      !password
    ) {
      alert(
        'Preencha todos os campos'
      );

      return;
    }

    if (password.length < 6) {
      alert(
        'A senha deve possuir no mínimo 6 caracteres'
      );

      return;
    }

    const success =
      await signUp({
        name,
        cpf,
        email,
        password,
        type: 'CPF',
      });

    if (!success) {
      alert(
        'Erro ao criar conta'
      );

      return;
    }

    setSuccessModalVisible(true);
  }

  function handleGoToLogin() {
    setSuccessModalVisible(false);

    router.replace('/(auth)/login');
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#0F0F11',
          padding: 24,
          justifyContent: 'center',
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
          Cadastro CPF
        </Text>

        <TextInput
          placeholder="Nome completo"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
          style={inputStyle}
        />

        <TextInput
          placeholder="CPF"
          placeholderTextColor="#777"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          style={inputStyle}
        />

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={inputStyle}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={inputStyle}
        />

        <TouchableOpacity
          onPress={handleRegister}
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
            }}
          >
            Criar Conta
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor:
              'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: '#1A1A1F',
              width: '100%',
              borderRadius: 20,
              padding: 24,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 12,
              }}
            >
              Cadastro realizado
            </Text>

            <Text
              style={{
                color: '#AAAAAA',
                fontSize: 16,
                marginBottom: 24,
              }}
            >
              Sua conta foi criada com sucesso.
            </Text>

            <TouchableOpacity
              onPress={handleGoToLogin}
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
                }}
              >
                Ir para login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const inputStyle = {
  backgroundColor: '#1A1A1F',

  color: '#FFFFFF',

  padding: 16,

  borderRadius: 12,

  marginBottom: 16,
};