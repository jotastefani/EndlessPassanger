import { Stack } from 'expo-router';

import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/favorites-context';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </FavoritesProvider>
    </AuthProvider>
  );
}