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
  getTicketmasterEvents,
} from '../../src/services/ticketmaster/ticketmaster-events';

import type {
  TicketmasterMapEvent,
} from '../../src/services/ticketmaster/ticketmaster-events';

export default function HomeScreen() {
  const [events, setEvents] =
    useState<TicketmasterMapEvent[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState('');

  const [
    selectedEvent,
    setSelectedEvent,
  ] =
    useState<TicketmasterMapEvent | null>(
      null
    );

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents(
    keyword = ''
  ) {
    try {
      setLoading(true);

      const data =
        await getTicketmasterEvents({
          keyword,
          countryCode: 'BR',
          size: 50,
        });

      setEvents(data);

      if (data.length > 0) {
        setSelectedEvent(data[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    loadEvents(search);
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
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 8,
          longitudeDelta: 8,
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
            pinColor="#7B61FF"
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
          Encontre eventos públicos no mapa
        </Text>

        <Text style={styles.h6}>
          Powered by Ticketmaster Discovery
        </Text>

        <TextInput
          placeholder="Pesquisar show, festa, artista..."
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>
            Buscar eventos
          </Text>
        </TouchableOpacity>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator
              color="#7B61FF"
            />

            <Text style={styles.counter}>
              Buscando eventos...
            </Text>
          </View>
        ) : events.length === 0 ? (
          <Text style={styles.counter}>
            Nenhum evento público encontrado.
          </Text>
        ) : (
          <Text style={styles.counter}>
            {events.length} eventos encontrados
          </Text>
        )}
      </View>

      {selectedEvent && (
        <View style={styles.eventCard}>
          <Text style={styles.eventSource}>
            TICKETMASTER
          </Text>

          <Text style={styles.eventTitle}>
            {selectedEvent.title}
          </Text>

          <Text style={styles.eventDescription}>
            {selectedEvent.description}
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
              Ver evento
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

  searchButton: {
    backgroundColor: '#7B61FF',

    padding: 14,

    borderRadius: 14,

    alignItems: 'center',

    marginTop: 12,
  },

  searchButtonText: {
    color: '#FFFFFF',

    fontWeight: 'bold',
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

    marginBottom: 6,
  },

  eventDescription: {
    color: '#7B61FF',

    fontSize: 14,

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