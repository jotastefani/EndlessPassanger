import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function IndexScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.push('/(tabs)/index');
    } else {
      router.push('/(auth)/login');
    }
  }, [loading, user, router]);

  return null;
}
