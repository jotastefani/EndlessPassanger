import { useState } from 'react';

import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterCNPJScreen() {
  const [companyName, setCompanyName] =
    useState('');

  const [cnpj, setCnpj] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  function handleRegister() {
    console.log({
      type: 'CNPJ',
      companyName,
      cnpj,
      email,
      password,
    });
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
        onChangeText={setCompanyName}
        style={inputStyle}
      />

      <TextInput
        placeholder="CNPJ"
        placeholderTextColor="#777"
        value={cnpj}
        onChangeText={setCnpj}
        style={inputStyle}
      />

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
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
  );
}

const inputStyle = {
  backgroundColor: '#1A1A1F',
  color: '#FFFFFF',
  padding: 16,
  borderRadius: 12,
  marginBottom: 16,
};