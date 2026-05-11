import {
  createContext,
  useContext,
  useState,
} from 'react';

import { users } from '@/mocks/users';

type User = {
  id: string;

  type: string;

  email: string;

  password: string;

  name?: string;

  avatar?: string;

  companyName?: string;
};

type AuthContextData = {
  user: User | null;

  signIn: (
    email: string,
    password: string
  ) => boolean;

  signOut: () => void;
};

export const AuthContext =
  createContext({} as AuthContextData);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  function signIn(
    email: string,
    password: string
  ) {
    const foundUser = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!foundUser) {
      return false;
    }

    setUser(foundUser);

    return true;
  }

  function signOut() {
    setUser(null);
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

export function useAuth() {
  return useContext(AuthContext);
}