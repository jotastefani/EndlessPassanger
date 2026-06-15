import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MapView, {
    Marker,
    PROVIDER_GOOGLE,
} from 'react-native-maps';

import {
    getEvents,
} from '@/services/events/firebase-events';

import type { Event } from '@/types/event';

import { useAuth } from '@/contexts/AuthContext';

function isValidCoordinate(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatEventDescription(event: Event): string {
  const category = event.category?.trim();

  if (!category) {
    return event.privateEvent ? 'Evento privado' : 'Evento público';
  }

  return event.privateEvent
    ? `${category} • Privado`
    : category;
}

export default function MapScreen() {
  const { user } = useAuth();

  const [events, setEvents] =
    useState<Event[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data =
        await getEvents();

      const visibleEvents =
        (Array.isArray(data) ? data : [])
          .filter((event) => {
            if (
              !isValidCoordinate(event.latitude) ||
              !isValidCoordinate(event.longitude)
            ) {
              return false;
            }

            if (!user) {
              return event.privateEvent === false;
            }

            return true;
          });

      setEvents(visibleEvents);
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
  }, [user]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

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
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.title}
            description={
              event.category
                ? formatEventDescription(event)
                : undefined
            }
          />
        ))}
      </MapView>

      {events.length === 0 && (
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
