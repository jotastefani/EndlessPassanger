import { useState } from 'react';

import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { auth } from '@/services/firebase-config';

import {
  createUserProfile,
} from '@/services/users/firebase-users';

import {
  useAuth,
} from '@/contexts/AuthContext';

export default function RegisterCNPJScreen() {
  const { signUp } =
    useAuth();

  const [companyName, setCompanyName] =
    useState('');

  const [cnpj, setCnpj] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [successModalVisible,
    setSuccessModalVisible] =
      useState(false);

  async function handleRegister() {
    if (
      !companyName ||
      !cnpj ||
      !email ||
      !password
    ) {
      alert(
        'Preencha todos os campos'
      );

      return;
    }

    const success =
      await signUp({
        companyName,
        cnpj,
        email,
        password,
        type: 'CNPJ',
      });

    if (!success) {
      alert(
        'Erro ao criar conta'
      );

      return;
    }

    const currentUser =
      auth.currentUser;

    if (!currentUser) {
      alert(
        'Erro ao obter usuário'
      );

      return;
    }

    await createUserProfile(
      currentUser.uid,
      {
        uid:
          currentUser.uid,

        companyName,

        cnpj,

        email,

        type: 'CNPJ',

        accountType:
          'CNPJ',

        avatar:
          'https://i.pravatar.cc/300',

        bio: '',

        phone: '',

        isPremium:
          false,

        isVerifiedOrganizer:
          false,

        createdAt:
          new Date(),
      }
    );
    setSuccessModalVisible(true);
  }

  function handleGoToLogin() {
    setSuccessModalVisible(false);

    router.replace(
      '/(auth)/login'
    );
  }

  return (
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
        Cadastro CNPJ
      </Text>

      <TextInput
        placeholder="Nome da empresa"
        placeholderTextColor="#777"
        value={companyName}
        onChangeText={
          setCompanyName
        }
        style={inputStyle}
      />

      <TextInput
        placeholder="CNPJ"
        placeholderTextColor="#777"
        value={cnpj}
        onChangeText={setCnpj}
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

      <Modal
        visible={
          successModalVisible
        }
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
              backgroundColor:
                '#1A1A1F',

              width: '100%',

              borderRadius: 20,

              padding: 24,

              alignItems: 'center',
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
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              Sua conta empresarial foi
              criada com sucesso.
            </Text>

            <TouchableOpacity
              onPress={
                handleGoToLogin
              }
              style={{
                backgroundColor:
                  '#7B61FF',

                paddingVertical: 14,

                paddingHorizontal: 32,

                borderRadius: 14,
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
    </View>
  );
}

const inputStyle = {
  backgroundColor: '#1A1A1F',

  color: '#FFFFFF',

  padding: 16,

  borderRadius: 12,

  marginBottom: 16,
};