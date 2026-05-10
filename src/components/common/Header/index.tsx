import { Text, View } from 'react-native';

export function Header() {
  return (
    <View
      style={{
        marginBottom: 24,
      }}
    >
      <Text
        style={{
          color: '#A0A0B2',
          fontSize: 16,
        }}
      >
        Bem-vindo ao
      </Text>

      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        EndPass
      </Text>
    </View>
  );
}