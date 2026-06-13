import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

export default function RegisterScreen() {
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
          marginBottom: 50,
          textAlign: 'center',
        }}
      >
        Escolha o tipo de conta
      </Text>

      <TouchableOpacity
        onPress={() =>
          router.push(
            '/(auth)/register-cpf'
          )
        }
        style={{
          backgroundColor: '#7B61FF',
          padding: 20,
          borderRadius: 18,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          Conta CPF
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(
            '/(auth)/register-cnpj'
          )
        }
        style={{
          backgroundColor: '#1A1A1F',
          padding: 20,
          borderRadius: 18,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          Conta CNPJ
        </Text>
      </TouchableOpacity>
    </View>
  );
}