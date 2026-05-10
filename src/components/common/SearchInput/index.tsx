import { TextInput } from 'react-native';

export function SearchInput() {
  return (
    <TextInput
      placeholder="Pesquisar eventos"
      placeholderTextColor="#777"
      style={{
        backgroundColor: '#1A1A1F',
        color: '#FFFFFF',
        padding: 16,
        borderRadius: 14,
        marginBottom: 24,
      }}
    />
  );
}