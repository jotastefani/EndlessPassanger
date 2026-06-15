import { useEffect, useState } from 'react';

import {
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import * as Location from 'expo-location';

import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';

import {
  createEvent,
} from '@/services/events/firebase-events';

import {
  useAuth,
} from '@/contexts/AuthContext';

const categories = [
  'Festa',
  'Show',
  'Teatro',
  'Palestra',
  'Festival',
  'Stand-up',
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

type CreateFormState = {
  title: string;
  description: string;
  category: string;
  genre: string;
  ticketLink: string;
  artist: string;
  privateEvent: boolean;
  image: string;
  latitude: number;
  longitude: number;
  submitting: boolean;
};

const initialFormState: CreateFormState = {
  title: '',
  description: '',
  category: 'Festa',
  genre: 'Sertanejo',
  ticketLink: '',
  artist: '',
  privateEvent: false,
  image: '',
  latitude: 0,
  longitude: 0,
  submitting: false,
};

export default function CreateEventScreen() {
  const { user } = useAuth();

  const [form, setForm] = useState<CreateFormState>(initialFormState);

  useEffect(() => {
    requestLocation();
  }, []);

  async function requestLocation() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Habilite a localização para vincular o evento a um ponto no mapa.'
      );

      return;
    }

    const position =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

    setForm((prev) => ({
      ...prev,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }));
  }

  async function handleSelectImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão negada',
        'Autorize o acesso à galeria para selecionar a imagem do evento.'
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        allowsEditing: true,
      });

    if (!result.canceled && result.assets[0]) {
      setForm((prev) => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  }

  async function handleCreateEvent() {
    if (!form.title.trim() || !form.description.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Informe título e descrição para publicar o evento.'
      );

      return;
    }

    setForm((prev) => ({ ...prev, submitting: true }));

    const isPrivate =
      user?.type === 'CPF'
        ? true
        : form.privateEvent;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      genre: form.genre,
      ticketLink: form.ticketLink.trim() || undefined,
      artist: form.artist.trim() || undefined,
      privateEvent: isPrivate,
      type: isPrivate
        ? 'PRIVATE'
        : 'PUBLIC',
      image: form.image,
      latitude: form.latitude,
      longitude: form.longitude,
      date: new Date().toISOString(),
      createdBy: user?.uid,
      interestedCount: 0,
      ticketClasses: [],
    };

    const eventId = await createEvent(payload);

    if (!eventId) {
      Alert.alert(
        'Publicação indisponível',
        'Não foi possível criar o evento. Tente novamente mais tarde.'
      );

      setForm((prev) => ({ ...prev, submitting: false }));

      return;
    }

    setForm(initialFormState);

    Alert.alert('Evento criado', 'Seu evento foi publicado com sucesso!');

    router.push('/(tabs)/index');
  }

  const isSubmitting = form.submitting;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Criar Evento</Text>
      <Text style={styles.subtitle}>
        Preencha os dados para publicar
      </Text>

      <TouchableOpacity
        onPress={handleSelectImage}
        activeOpacity={0.85}
        style={styles.imagePicker}
      >
        {form.image ? (
          <Image
            source={{ uri: form.image }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Selecionar imagem de capa
            </Text>
            <Text style={styles.imageHint}>
              JPG, PNG ou foto da galeria
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Título do evento</Text>
        <TextInput
          placeholder="Ex.: Festa Open Bar"
          placeholderTextColor="#777"
          value={form.title}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, title: text }))
          }
          style={styles.input}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Conte um pouco sobre o evento"
          placeholderTextColor="#777"
          value={form.description}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, description: text }))
          }
          multiline
          style={[styles.input, styles.textArea]}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Artista / Palestrante</Text>
        <TextInput
          placeholder="Quem vai apresentar?"
          placeholderTextColor="#777"
          value={form.artist}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, artist: text }))
          }
          style={styles.input}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Link do ingresso</Text>
        <TextInput
          placeholder="https://..."
          placeholderTextColor="#777"
          value={form.ticketLink}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, ticketLink: text }))
          }
          autoCapitalize="none"
          keyboardType="url"
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gênero</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.chipRow}>
            {genres.map((item) => {
              const isActive = form.genre === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() =>
                    setForm((prev) => ({ ...prev, genre: item }))
                  }
                  style={[
                    styles.chip,
                    isActive && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isActive && styles.chipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categoria</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.chipRow}>
            {categories.map((item) => {
              const isActive = form.category === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() =>
                    setForm((prev) => ({ ...prev, category: item }))
                  }
                  style={[
                    styles.chip,
                    isActive && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isActive && styles.chipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visibilidade</Text>

        {user?.type === 'CPF' ? (
          <View style={styles.accessCard}>
            <View style={styles.accessInfoRow}>
              <Text style={styles.accessTitle}>
                Evento Privado
              </Text>
              <Text style={styles.accessBadge}>CPF</Text>
            </View>
            <Text style={styles.accessDescription}>
              Contas CPF publicam apenas eventos privados e essa opção
              não pode ser alterada.
            </Text>
          </View>
        ) : (
          <View style={styles.accessRow}>
            <View style={styles.accessTextBlock}>
              <Text style={styles.accessTitle}>
                Evento público
              </Text>
              <Text style={styles.accessHint}>
                {form.privateEvent
                  ? 'Evento privado.'
                  : 'Evento público. Qualquer pessoa poderá ver este evento.'}
              </Text>
            </View>
            <Switch
              value={form.privateEvent}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  privateEvent: value,
                }))
              }
            />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleCreateEvent}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>
              Publicar Evento
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerHint}>
          Após publicar, você verá o evento nas abas principais.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F11',
  },

  content: {
    padding: 24,
    paddingBottom: 36,
    gap: 22,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },

  subtitle: {
    color: '#A0A0B2',
    fontSize: 15,
    marginTop: 6,
  },

  imagePicker: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#141418',
    borderWidth: 1,
    borderColor: '#23232B',
  },

  imagePreview: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  imagePlaceholderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  imageHint: {
    color: '#777',
    fontSize: 13,
  },

  fieldGroup: {
    gap: 8,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  input: {
    backgroundColor: '#1A1A1F',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#23232B',
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  section: {
    gap: 10,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  chipRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },

  chip: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#1A1A1F',
    borderWidth: 1,
    borderColor: '#23232B',
  },

  chipActive: {
    backgroundColor: '#7B61FF',
    borderColor: '#7B61FF',
  },

  chipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  chipTextActive: {
    color: '#FFFFFF',
  },

  accessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1F',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#23232B',
  },

  accessTextBlock: {
    flex: 1,
    paddingRight: 16,
  },

  accessTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  accessHint: {
    color: '#A0A0B2',
    fontSize: 13,
    marginTop: 4,
  },

  accessCard: {
    backgroundColor: '#1A1A1F',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#23232B',
    gap: 10,
  },

  accessInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  accessBadge: {
    color: '#7B61FF',
    fontSize: 13,
    fontWeight: '700',
    backgroundColor: 'rgba(123,97,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },

  accessDescription: {
    color: '#A0A0B2',
    fontSize: 14,
  },

  footer: {
    gap: 10,
    paddingTop: 6,
  },

  submitButton: {
    backgroundColor: '#7B61FF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footerHint: {
    color: '#A0A0B2',
    fontSize: 13,
    textAlign: 'center',
  },
});
