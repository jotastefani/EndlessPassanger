import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
  type: 'CPF' | 'CNPJ';
};

type AuthContextData = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext =
  createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const userData = await AsyncStorage.getItem(
      '@endpass:user'
    );

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }

  async function signIn(
    email: string,
    password: string
  ) {
    // simulação login

    const fakeUser: User = {
      id: '1',
      name: 'Jeferson',
      email,
      type: 'CPF',
    };

    setUser(fakeUser);

    await AsyncStorage.setItem(
      '@endpass:user',
      JSON.stringify(fakeUser)
    );
  }

  async function signOut() {
    setUser(null);

    await AsyncStorage.removeItem(
      '@endpass:user'
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}