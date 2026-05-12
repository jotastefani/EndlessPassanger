import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import {
  loginUser,
  logoutUser,
  registerUser,
} from '@/services/auth/firebase-auth';

type AuthContextData = {
  user: any;

  signIn: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signUp: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signOut: () => Promise<void>;
};

export const AuthContext =
  createContext({} as AuthContextData);

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<any>(null);

  async function signIn(
    email: string,
    password: string
  ) {
    try {
      const response =
        await loginUser(
          email,
          password
        );

      setUser(response.user);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async function signUp(
    email: string,
    password: string
  ) {
    try {
      const response =
        await registerUser(
          email,
          password
        );

      setUser(response.user);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async function signOut() {
    await logoutUser();

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