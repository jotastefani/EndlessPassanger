import {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import {
  getEvents,
} from '@/services/events/firebase-events';

export default function MapScreen() {
  const [events, setEvents] =
    useState<any[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data =
      await getEvents();

    setEvents(data);
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
                event.latitude ||
                -22.7338,

              longitude:
                event.longitude ||
                -47.6476,
            }}
            title={event.title}
            description={
              event.category
            }
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});