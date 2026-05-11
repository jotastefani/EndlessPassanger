import { useMemo, useState } from 'react';

import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { events } from '@/mocks/events';

import { EventCard } from '@/components/common/EventCard';

const genres = [
  'Todos',
  'Sertanejo',
  'Funk',
  'Pagode',
  'Eletrônica',
  'Rock',
  'Trap',
  'Rap',
  'Pop',
];

export default function HomeScreen() {
  const [search, setSearch] =
    useState('');

  const [selectedGenre, setSelectedGenre] =
    useState('Todos');

  const filteredEvents =
    useMemo(() => {
      return events.filter((event) => {
        const matchesSearch =
          event.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          event.artist
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          event.location
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesGenre =
          selectedGenre === 'Todos'
            ? true
            : event.genre ===
              selectedGenre;

        return (
          matchesSearch &&
          matchesGenre
        );
      });
    }, [search, selectedGenre]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
        paddingTop: 60,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 34,
            fontWeight: 'bold',
          }}
        >
          EndPass
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginTop: 4,
          }}
        >
          Descubra eventos próximos
        </Text>
      </View>

      {/* Busca */}
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="Buscar artista, cidade ou evento"
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: '#1A1A1F',
            color: '#FFFFFF',
            padding: 16,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Filtros */}
      <View
        style={{
          marginBottom: 24,
        }}
      >
        <FlatList
          horizontal
          data={genres}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedGenre(item)
              }
              style={{
                backgroundColor:
                  selectedGenre === item
                    ? '#7B61FF'
                    : '#1A1A1F',

                paddingVertical: 12,

                paddingHorizontal: 18,

                borderRadius: 14,

                marginRight: 12,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Eventos */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            location={item.location}
            date={item.date}
            image={item.image}
            artist={item.artist}
            genre={item.genre}
            interestedCount={
              item.interestedCount
            }
          />
        )}
      />
    </View>
  );
}