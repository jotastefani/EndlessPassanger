import {
    Text,
    TouchableOpacity,
} from 'react-native';

type Props = {
  title: string;
};

export function CategoryCard({
  title,
}: Props) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#1A1A1F',
        paddingVertical: 12,
        paddingHorizontal: 20,
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
        {title}
      </Text>
    </TouchableOpacity>
  );
}