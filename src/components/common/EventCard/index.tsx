import {
    Image,
    Text,
    View,
} from 'react-native';

type Props = {
  title: string;
  location: string;
  date: string;
  image: string;
};

export function EventCard({
  title,
  location,
  date,
  image,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: '#1A1A1F',
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 20,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: '100%',
          height: 180,
        }}
      />

      <View
        style={{
          padding: 16,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          {title}
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
            color: '#7B61FF',
            fontWeight: '600',
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
}