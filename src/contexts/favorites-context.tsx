import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoriteEvent = {
  id: string;

  title: string;

  location: string;

  date: string;

  image: string;

  artist: string;

  genre: string;

  interestedCount: number;
};

type FavoritesContextData = {
  favorites: FavoriteEvent[];

  addFavorite: (
    event: FavoriteEvent
  ) => void;

  removeFavorite: (
    id: string
  ) => void;

  isFavorite: (
    id: string
  ) => boolean;
};

const FavoritesContext =
  createContext({} as FavoritesContextData);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] =
    useState<FavoriteEvent[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const storage =
      await AsyncStorage.getItem(
        '@endpass:favorites'
      );

    if (storage) {
      setFavorites(JSON.parse(storage));
    }
  }

  async function saveFavorites(
    data: FavoriteEvent[]
  ) {
    setFavorites(data);

    await AsyncStorage.setItem(
      '@endpass:favorites',
      JSON.stringify(data)
    );
  }

  async function addFavorite(
    event: FavoriteEvent
  ) {
    const updated =
      [...favorites, event];

    saveFavorites(updated);
  }

  async function removeFavorite(
    id: string
  ) {
    const updated =
      favorites.filter(
        (item) => item.id !== id
      );

    saveFavorites(updated);
  }

  function isFavorite(id: string) {
    return favorites.some(
      (item) => item.id === id
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(
    FavoritesContext
  );
}