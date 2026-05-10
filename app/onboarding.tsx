import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

export default function OnboardingScreen() {
  async function handleContinue() {
    await AsyncStorage.setItem(
      '@endpass:onboarding',
      'true'
    );

    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView
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
        Descubra eventos próximos de você
      </Text>

      <Text
        style={{
          color: '#A0A0B2',
          fontSize: 16,
          marginBottom: 32,
        }}
      >
        Festas, bares, shows, teatro, palestras e eventos particulares em um único aplicativo.
      </Text>

      <TouchableOpacity
        onPress={handleContinue}
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
          Continuar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}