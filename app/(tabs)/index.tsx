import {
  ScrollView,
  Text
} from 'react-native';

import { Screen } from '@/components/common/Screen';

import { Header } from '@/components/common/Header';

import { SearchInput } from '@/components/common/SearchInput';

import { CategoryCard } from '@/components/common/CategoryCard';

import { EventCard } from '@/components/common/EventCard';

const categories = [
  'Festas',
  'Shows',
  'Teatro',
  'Bares',
  'Palestras',
  'Reuniões',
  'Boates',
  'Restaurantes',
  'Lanchonetes',
  'Adegas',
];

const events = [
  {
    id: '1',
    title: 'Festival Sunset',
    location: 'Piracicaba - SP',
    date: '12 Maio • 22:00',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
  },

  {
    id: '2',
    title: 'Noite Universitária',
    location: 'Campinas - SP',
    date: '18 Maio • 23:00',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
  },
];

export default function HomeScreen() {
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <SearchInput />

        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 16,
          }}
        >
          Categorias
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          style={{
            marginBottom: 32,
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category}
              title={category}
            />
          ))}
        </ScrollView>

        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 16,
          }}
        >
          Eventos próximos
        </Text>

        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            location={event.location}
            date={event.date}
            image={event.image}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}