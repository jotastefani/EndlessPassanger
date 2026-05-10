import { Text } from 'react-native';

import { Screen } from '@/components/common/Screen';

export default function FavoritesScreen() {
  return (
    <Screen>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        Favoritos
      </Text>
    </Screen>
  );
}