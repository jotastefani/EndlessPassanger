import {
  FlatList,
  Text,
  View,
} from 'react-native';

import { useFavorites } from '@/contexts/favorites-context';

import { EventCard } from '@/components/common/EventCard';

export default function FavoritesScreen() {
  const { favorites } =
    useFavorites();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
        padding: 20,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 24,
        }}
      >
        Favoritos
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
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