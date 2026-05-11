import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

type User = {
  email: string;

  name?: string;

  companyName?: string;

  avatar?: string;

  type: 'CPF' | 'CNPJ';
};

type AuthContextData = {
  user: User | null;

  signIn: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signUp: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signOut: () => void;
};

export const AuthContext =
  createContext<AuthContextData>(
    {} as AuthContextData
  );

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  async function signIn(
    email: string,
    password: string
  ) {
    try {
      setUser({
        email,

        name: 'Jeferson',

        avatar:
          'https://i.pravatar.cc/300',

        type: 'CPF',
      });

      return true;
    } catch {
      return false;
    }
  }

  async function signUp(
    email: string,
    password: string
  ) {
    try {
      setUser({
        email,

        name: 'Novo usuário',

        avatar:
          'https://i.pravatar.cc/300',

        type: 'CPF',
      });

      return true;
    } catch {
      return false;
    }
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}