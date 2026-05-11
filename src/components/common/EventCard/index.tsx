import React, { useState } from 'react';

import {
  Heart
} from 'lucide-react-native';


import { useFavorites } from '@/contexts/favorites-context';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  title: string;
  location: string;
  date: string;
  image: string;

  artist: string;

  genre: string;

  interestedCount: number;
};

export function EventCard({
  title,
  location,
  date,
  image,
  artist,
  genre,
  interestedCount,
}: Props) {
  const [interested, setInterested] =
    useState(false);

  const [count, setCount] =
    useState(interestedCount);

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const favorite =
    isFavorite(title);

  function handleInterest() {
    if (interested) {
      setCount((prev) => prev - 1);
    } else {
      setCount((prev) => prev + 1);
    }

    setInterested(!interested);
  }

  function handleFavorite() {
    const eventData = {
      id: title,

      title,

      location,

      date,

      image,

      artist,

      genre,

      interestedCount: count,
    };

    if (favorite) {
      removeFavorite(title);
    } else {
      addFavorite(eventData);
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#1A1A1F',
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: '100%',
          height: 200,
        }}
      />

      <View
        style={{
          padding: 18,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: '#7B61FF',
            marginBottom: 6,
            fontWeight: '600',
          }}
        >
          {artist}
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginBottom: 4,
          }}
        >
          {genre}
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginBottom: 4,
          }}
        >
          {location}
        </Text>

        <Text
          style={{
            color: '#A0A0B2',
            marginBottom: 16,
          }}
        >
          {date}
        </Text>

        {/* Interesse */}
        <TouchableOpacity
          onPress={handleFavorite}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            zIndex: 999,
          }}
        >
          <Heart
            size={28}
            color={
              favorite
                ? '#FF4D6D'
                : '#FFFFFF'
            }

            fill={
              favorite
                ? '#FF4D6D'
                : 'transparent'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleInterest}
          style={{
            backgroundColor: interested
              ? '#7B61FF'
              : '#2A2A30',

            padding: 14,

            borderRadius: 14,

            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
          >
            {interested
              ? 'Interessado'
              : 'Tenho interesse'}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: '#A0A0B2',
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          {count} pessoas interessadas
        </Text>
      </View>
    </View>
  );
}