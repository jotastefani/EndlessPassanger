import {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';

import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import {
  getEvents,
} from '@/services/events/firebase-events';

import type { Event } from '@/types/events';

export default function MapScreen() {
  const [events, setEvents] =
    useState<Event[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setError(null);
      setLoading(true);
      const data =
        await getEvents();

      setEvents(data ?? []);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : 'Falha ao carregar eventos do mapa.';

      setError(message);
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  }

  const hasValidEvents = events.some(
    (event) =>
      typeof event.latitude ===
        'number' &&
      typeof event.longitude ===
        'number',
  );

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.7338,
          longitude: -47.6476,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {events.map((event) => {
          const coordinate = {
            latitude:
              typeof event.latitude ===
              'number'
                ? event.latitude
                : -22.7338,

            longitude:
              typeof event.longitude ===
              'number'
                ? event.longitude
                : -47.6476,
          };

          return (
            <Marker
              key={event.id}
              coordinate={coordinate}
              title={event.title}
              description={event.category}
            />
          );
        })}
      </MapView>

      {!hasValidEvents && (
        <View
          style={styles.emptyOverlay}
          pointerEvents="none"
        >
          <Text style={styles.emptyText}>
            Nenhum evento com localização
            encontrado.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  container: {
    flex: 1,
  },

  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },

  emptyText: {
    color: '#4b5563',
    textAlign: 'center',
  },

  errorText: {
    color: '#b91c1c',
    textAlign: 'center',
  },

  map: {
    flex: 1,
  },
});
