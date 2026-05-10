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
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 16,
        }}
      >
        Criar Conta
      </Text>

      <Text
        style={{
          color: '#A0A0B2',
          marginBottom: 32,
        }}
      >
        Escolha o tipo da sua conta
      </Text>

      <TouchableOpacity
        onPress={() =>
          router.push('/register-cpf')
        }
        style={{
          backgroundColor: '#1A1A1F',
          padding: 20,
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          CPF
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginTop: 8,
          }}
        >
          Participar de eventos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push('/register-cnpj')
        }
        style={{
          backgroundColor: '#1A1A1F',
          padding: 20,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          CNPJ
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginTop: 8,
          }}
        >
          Criar e divulgar eventos
        </Text>
      </TouchableOpacity>
    </View>
  );
}