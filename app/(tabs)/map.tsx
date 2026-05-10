import { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import * as Location from 'expo-location';

import { events } from '@/mocks/events';

export default function MapScreen() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(
      null
    );

  useEffect(() => {
    getUserLocation();
  }, []);

  async function getUserLocation() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert(
        'Permissão de localização negada'
      );

      return;
    }

    const currentLocation =
      await Location.getCurrentPositionAsync(
        {}
      );

    setLocation(currentLocation);
  }

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Carregando mapa...
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude:
          location.coords.latitude,

        longitude:
          location.coords.longitude,

        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      {/* Usuário */}
      <Marker
        coordinate={{
          latitude:
            location.coords.latitude,

          longitude:
            location.coords.longitude,
        }}
        title="Você está aqui"
      />

      {/* Eventos */}
      {events.map((event) => (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.latitude,
            longitude: event.longitude,
          }}
          title={event.title}
          description="Evento próximo de você"
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F0F11',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});