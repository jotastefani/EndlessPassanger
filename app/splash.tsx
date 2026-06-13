import { useEffect } from 'react';
import { Image, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export default function SplashScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // User is logged in, will redirect to tabs
      setTimeout(() => {}, 100);
    }
  }, [loading, user]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../assets/logos/logoendpass.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}
