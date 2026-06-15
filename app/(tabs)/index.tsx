import {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import {
  getSymplaEvents,
} from '../../src/services/sympla/sympla-events';

import type {
  SymplaMapEvent,
} from '../../src/services/sympla/sympla-events';

export default function HomeScreen() {
  const [events, setEvents] =
    useState<SymplaMapEvent[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedEvent, setSelectedEvent] =
    useState<SymplaMapEvent | null>(
      null
    );

  useEffect(() => {
    loadSymplaEvents();
  }, []);

  async function loadSymplaEvents() {
    try {
      setLoading(true);

      const data =
        await getSymplaEvents();

      setEvents(data);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenTicket() {
    if (!selectedEvent?.ticketLink) {
      alert(
        'Este evento não possui link disponível.'
      );

      return;
    }

    Linking.openURL(
      selectedEvent.ticketLink
    );
  }

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
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude:
                event.latitude,

              longitude:
                event.longitude,
            }}
            title={event.title}
            description={
              event.location
            }
            onPress={() =>
              setSelectedEvent(event)
            }
          />
        ))}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.title}>
          Qual sua próxima aventura hoje?
        </Text>

        <Text style={styles.subtitulo}>
          Encontre eventos da Sympla próximos de você
        </Text>

        <Text style={styles.h6}>
          Are you ready?
        </Text>

        <TextInput
          placeholder="Pesquisar eventos..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator
              color="#7B61FF"
            />

            <Text style={styles.counter}>
              Buscando eventos da Sympla...
            </Text>
          </View>
        ) : (
          <Text style={styles.counter}>
            {events.length} eventos encontrados
          </Text>
        )}
      </View>

      {selectedEvent && (
        <View style={styles.eventCard}>
          <Text style={styles.eventSource}>
            SYMPLA
          </Text>

          <Text style={styles.eventTitle}>
            {selectedEvent.title}
          </Text>

          <Text style={styles.eventInfo}>
            {selectedEvent.location}
          </Text>

          <Text style={styles.eventInfo}>
            {selectedEvent.date}
          </Text>

          <TouchableOpacity
            onPress={handleOpenTicket}
            style={styles.ticketButton}
          >
            <Text style={styles.ticketText}>
              Ver ingresso
            </Text>
          </TouchableOpacity>
        </View>
      )}
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

  loadingBox: {
    marginTop: 12,

    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  counter: {
    color: '#BFC6CC',

    marginTop: 12,

    fontSize: 13,
  },

  eventCard: {
    position: 'absolute',

    left: 20,

    right: 20,

    bottom: 110,

    backgroundColor: '#111318',

    borderRadius: 24,

    padding: 20,

    elevation: 10,
  },

  eventSource: {
    color: '#7B61FF',

    fontSize: 12,

    fontWeight: 'bold',

    marginBottom: 8,
  },

  eventTitle: {
    color: '#FFFFFF',

    fontSize: 20,

    fontWeight: 'bold',

    marginBottom: 8,
  },

  eventInfo: {
    color: '#BFC6CC',

    fontSize: 14,

    marginBottom: 4,
  },

  ticketButton: {
    backgroundColor: '#7B61FF',

    padding: 14,

    borderRadius: 14,

    alignItems: 'center',

    marginTop: 16,
  },

  ticketText: {
    color: '#FFFFFF',

    fontWeight: 'bold',
  },
});