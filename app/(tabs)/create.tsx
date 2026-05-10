import { Text } from 'react-native';

import { Screen } from '@/components/common/Screen';

export default function CreateScreen() {
  return (
    <Screen>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        Criar Evento
      </Text>
    </Screen>
  );
}