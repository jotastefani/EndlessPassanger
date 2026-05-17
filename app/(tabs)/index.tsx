import {
  Text,
  TextInput,
  View,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#05070A',
      }}
    >
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        initialRegion={{
          latitude: -22.7338,
          longitude: -47.6476,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <Marker
          coordinate={{
            latitude: -22.7338,
            longitude: -47.6476,
          }}
          title="Festival Open Air"
          description="Evento próximo"
        />

        <Marker
          coordinate={{
            latitude: -22.721,
            longitude: -47.649,
          }}
          title="Show Sertanejo"
          description="Hoje às 22h"
        />
      </MapView>

      <View
        style={{
          position: 'absolute',
          top: 70,
          left: 20,
          right: 20,
          backgroundColor: '#111318',
          borderRadius: 24,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 16,
          }}
        >
          Qual sua próxima aventura?
        </Text>

        <TextInput
          placeholder="Pesquisar eventos..."
          placeholderTextColor="#777"
          style={{
            backgroundColor: '#1A1A1F',
            color: '#FFFFFF',
            padding: 16,
            borderRadius: 16,
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
}