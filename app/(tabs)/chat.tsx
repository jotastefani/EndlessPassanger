import {
    useEffect,
    useState,
} from 'react';

import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    useAuth,
} from '@/contexts/AuthContext';

import {
    listenMessages,
    sendMessage,
} from '@/services/chat/firebase-chat';

export default function ChatScreen() {
  const { user } =
    useAuth();

  const [text, setText] =
    useState('');

  const [messages, setMessages] =
    useState<any[]>([]);

  const chatId =
    'global-chat';

  useEffect(() => {
    const unsubscribe =
      listenMessages(
        chatId,
        setMessages
      );

    return () => unsubscribe();
  }, []);

  async function handleSend() {
    if (!text.trim()) {
      return;
    }

    if (!user) {
      return;
    }

    await sendMessage(
      chatId,
      user.uid,
      text
    );

    setText('');
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F0F11',
      }}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) =>
          item.id
        }
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => {
          const isMe =
            item.userId ===
            user?.uid;

          return (
            <View
              style={{
                alignSelf: isMe
                  ? 'flex-end'
                  : 'flex-start',

                backgroundColor:
                  isMe
                    ? '#7B61FF'
                    : '#1A1A1F',

                padding: 14,

                borderRadius: 18,

                marginBottom: 12,

                maxWidth: '80%',
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                }}
              >
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: '#1A1A1F',
        }}
      >
        <TextInput
          placeholder="Mensagem..."
          placeholderTextColor="#777"
          value={text}
          onChangeText={setText}
          style={{
            flex: 1,

            backgroundColor:
              '#1A1A1F',

            color: '#FFFFFF',

            borderRadius: 14,

            paddingHorizontal: 16,

            marginRight: 12,
          }}
        />

        <TouchableOpacity
          onPress={handleSend}
          style={{
            backgroundColor:
              '#7B61FF',

            paddingHorizontal: 20,

            justifyContent:
              'center',

            borderRadius: 14,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
          >
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}