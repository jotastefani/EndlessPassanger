import { FavoritesProvider } from '@/contexts/favorites-context';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  
  
  return (
    <FavoritesProvider>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    </FavoritesProvider>
  );
}