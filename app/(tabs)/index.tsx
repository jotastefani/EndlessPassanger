import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
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

      <View style={styles.overlay}>
        <Text style={styles.title}>
          Qual sua próxima aventura hoje?
        </Text>

        <Text style={styles.subtitulo}>
          Encontre o lugar com sua vibe para se acabar
        </Text>

        <Text style={styles.h6}>
          Are you ready?
        </Text>

        <TextInput
          placeholder="Pesquisar eventos..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070A',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,

    backgroundColor: '#111318',

    borderRadius: 24,

    padding: 22,

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 8,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 30,

    fontWeight: 'bold',

    lineHeight: 36,
  },

  subtitulo: {
    color: '#BFC6CC',

    fontSize: 14,

    marginTop: 10,

    lineHeight: 22,
  },

  h6: {
    color: '#7B61FF',

    fontSize: 13,

    marginTop: 8,

    fontWeight: '600',
  },

  searchInput: {
    backgroundColor: '#1A1A1F',

    color: '#FFFFFF',

    padding: 16,

    borderRadius: 16,

    fontSize: 16,

    marginTop: 18,
  },
});