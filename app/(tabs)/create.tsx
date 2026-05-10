import { useState } from 'react';

import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const categories = [
  'Festa',
  'Bar',
  'Show',
  'Teatro',
  'Palestra',
  'Privado',
];
const genres = [
  'Sertanejo',
  'Funk',
  'Pagode',
  'Eletrônica',
  'Rock',
  'Trap',
  'Rap',
  'Pop',
];

const [genre, setGenre] =
  useState('Sertanejo');

const [artist, setArtist] =
  useState('');

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');

  const [description, setDescription] =
    useState('');

  const [category, setCategory] =
    useState('Festa');

  const [privateEvent, setPrivateEvent] =
    useState(false);

  const [image, setImage] = useState('');

  async function handleSelectImage() {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function handleCreateEvent() {
    const newEvent = {
      title,
      description,
      category,
      genre,
      artist,
      privateEvent,
      image,
    };

    console.log(newEvent);

    alert('Evento criado!');
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
      }}
      contentContainerStyle={{
        padding: 24,
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 32,
        }}
      >
        Criar Evento
      </Text>

      {/* Imagem */}
      <TouchableOpacity
        onPress={handleSelectImage}
        style={{
          backgroundColor: '#1A1A1F',
          height: 200,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
          overflow: 'hidden',
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ) : (
          <Text
            style={{
              color: '#777',
            }}
          >
            Selecionar imagem
          </Text>
        )}
      </TouchableOpacity>

      {/* Título */}
      <TextInput
        placeholder="Título do evento"
        placeholderTextColor="#777"
        value={title}
        onChangeText={setTitle}
        style={inputStyle}
      />

      {/* Descrição */}
      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#777"
        multiline
        value={description}
        onChangeText={setDescription}
        style={[
          inputStyle,
          {
            height: 120,
            textAlignVertical: 'top',
          },
        ]}
      />

      {/* Categorias */}
      <Text
        style={labelStyle}
      >
        Categoria
      </Text>
      <Text
        style={labelStyle}
      >
        Gênero Musical
      </Text>
      <TextInput
        placeholder="Artista / Palestrante / Comediante"
        placeholderTextColor="#777"
        value={artist}
        onChangeText={setArtist}
        style={inputStyle}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 24,
        }}
      >
        {genres.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setGenre(item)
            }
            style={{
              backgroundColor:
                genre === item
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
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        style={{
          marginBottom: 24,
        }}

      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setCategory(item)
            }
            style={{
              backgroundColor:
                category === item
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
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Evento privado */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text
          style={labelStyle}
        >
          Evento privado
        </Text>

        <Switch
          value={privateEvent}
          onValueChange={setPrivateEvent}
        />
      </View>

      {/* Botão */}
      <TouchableOpacity
        onPress={handleCreateEvent}
        style={{
          backgroundColor: '#7B61FF',
          padding: 18,
          borderRadius: 16,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          Publicar Evento
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const inputStyle = {
  backgroundColor: '#1A1A1F',
  color: '#FFFFFF',
  padding: 16,
  borderRadius: 14,
  marginBottom: 20,
};

const labelStyle = {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 'bold' as const,
  marginBottom: 12,
};