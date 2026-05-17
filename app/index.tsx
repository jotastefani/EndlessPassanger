import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#05070A',
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View />

      <Image
        source={require('../assets/logos/logoendpass.png')}
        style={{
          width: 240,
          height: 240,
          resizeMode: 'contain',
        }}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          gap: 12,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            router.push('/(auth)/login')
          }
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingVertical: 16,
            borderRadius: 14,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            LOG IN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push('/(auth)/register')
          }
          style={{
            flex: 1,
            backgroundColor: '#7B61FF',
            paddingVertical: 16,
            borderRadius: 14,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}