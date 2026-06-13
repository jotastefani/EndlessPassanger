declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';

  const content: (props: SvgProps) => React.ReactNode;

  export default content;
}

declare module '*.png' {
  const content: React.FC<{
    width?: number;
    height?: number;
    fill?: string;
  }>;

  export default content;
}
