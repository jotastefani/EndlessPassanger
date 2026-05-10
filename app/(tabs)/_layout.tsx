import { Tabs } from 'expo-router';

import ChatIcon from '../../assets/icons/chatIcon.svg';
import HomeIcon from '../../assets/icons/homeIcon.svg';
import PlusIcon from '../../assets/icons/plusIcon.svg';
import ProfileIcon from '../../assets/icons/profileIcon.svg';
import SearchIcon from '../../assets/icons/searchIcon.svg';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',

          tabBarIcon: ({ color }) => (
            <SearchIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Criar',

          tabBarIcon: ({ color }) => (
            <PlusIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',

          tabBarIcon: ({ color }) => (
            <ChatIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color }) => (
            <ProfileIcon width={24} height={24} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}