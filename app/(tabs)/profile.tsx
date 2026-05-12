import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

import {
  Building2,
  LogOut,
  User,
} from 'lucide-react-native';

import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const {
    user,
    signOut,
  } = useAuth();

  function handleLogout() {
    signOut();

    router.replace('/(auth)/login');
  }

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0F0F11',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 18,
          }}
        >
          Usuário não encontrado
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
      }}
      contentContainerStyle={{
        padding: 24,
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 34,
          fontWeight: 'bold',
          marginBottom: 32,
        }}
      >
        Perfil
      </Text>

      {/* Avatar */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Image
          source={{
            uri:
              user.avatar ||
              'https://i.pravatar.cc/300',
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 999,
            marginBottom: 16,
          }}
        />

        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {user.type === 'CPF'
            ? user.name
            : user.companyName}
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginTop: 6,
          }}
        >
          {user.email}
        </Text>
      </View>

      {/* Tipo */}
      <View style={cardStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          {user.type === 'CPF' ? (
            <User
              color="#7B61FF"
              size={22}
            />
          ) : (
            <Building2
              color="#7B61FF"
              size={22}
            />
          )}

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            Tipo de conta
          </Text>
        </View>

        <Text
          style={{
            color: '#A0A0B2',
            fontSize: 16,
          }}
        >
          {user.type}
        </Text>
      </View>

      {/* Métricas */}
      <View style={cardStyle}>
        <Text style={sectionTitle}>
          Estatísticas
        </Text>

        <Text style={metricText}>
          Eventos criados: 12
        </Text>

        <Text style={metricText}>
          Interessados totais: 1.245
        </Text>

        <Text style={metricText}>
          Favoritos recebidos: 392
        </Text>
      </View>

      {/* Dashboard organizador */}
      {user.type === 'CNPJ' && (
        <View style={cardStyle}>
          <Text style={sectionTitle}>
            Dashboard do Organizador
          </Text>

          <Text style={metricText}>
            Evento mais popular:
            {' '}
            Festival Sunset
          </Text>

          <Text style={metricText}>
            Taxa de engajamento:
            {' '}
            84%
          </Text>

          <Text style={metricText}>
            Cliques no ingresso:
            {' '}
            2.430
          </Text>
        </View>
      )}

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FF4D6D',
          padding: 18,
          borderRadius: 16,
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <LogOut
          color="#FFFFFF"
          size={20}
        />

        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          Sair da conta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const cardStyle = {
  backgroundColor: '#1A1A1F',
  padding: 20,
  borderRadius: 20,
  marginBottom: 20,
};

const sectionTitle = {
  color: '#FFFFFF',
  fontSize: 22,
  fontWeight: 'bold' as const,
  marginBottom: 16,
};

const metricText = {
  color: '#A0A0B2',
  fontSize: 16,
  marginBottom: 10,
};