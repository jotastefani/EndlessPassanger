import { colors } from '@/theme/colors';
import { TextInput } from 'react-native';

export function Input() {
  return (
    <TextInput
      placeholder="Digite aqui"
      placeholderTextColor="#777"
      style={{
        backgroundColor: colors.surface,
        color: colors.text,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    />
  );
}