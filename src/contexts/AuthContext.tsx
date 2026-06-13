import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import { auth } from '@/services/firebase-config';

import {
  loginUser,
  logoutUser,
  registerUser,
} from '@/services/auth/firebase-auth';

import {
  createUserProfile,
  getUserProfile,
} from '@/services/users/firebase-users';

type UserData = {
  uid: string;

  email: string;

  name?: string;

  companyName?: string;

  cpf?: string;

  cnpj?: string;

  type: 'CPF' | 'CNPJ';

  avatar: string;
};

type SignUpData = {
  name?: string;

  companyName?: string;

  cpf?: string;

  cnpj?: string;

  email: string;

  password: string;

  type: 'CPF' | 'CNPJ';
};

type AuthContextData = {
  user: UserData | null;

  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signUp: (
    data: SignUpData
  ) => Promise<boolean>;

  signOutUser: () => Promise<void>;
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
    useState<UserData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          firebaseUser: User | null
        ) => {
          if (firebaseUser) {
            const profile =
              await getUserProfile(
                firebaseUser.uid
              );

            if (profile) {
              setUser(profile as UserData);
            }
          } else {
            setUser(null);
          }

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  async function signIn(
    email: string,
    password: string
  ) {
    const firebaseUser =
      await loginUser(
        email,
        password
      );

    if (!firebaseUser) {
      return false;
    }

    const profile =
      await getUserProfile(
        firebaseUser.uid
      );

    if (!profile) {
      return false;
    }

    setUser(profile as UserData);

    return true;
  }

  async function signUp(
    data: SignUpData
  ) {
    const firebaseUser =
      await registerUser(
        data.email,
        data.password
      );

    if (!firebaseUser) {
      return false;
    }

    const userData: UserData = {
      uid: firebaseUser.uid,

      email: data.email,

      name: data.name,

      companyName:
        data.companyName,

      cpf: data.cpf,

      cnpj: data.cnpj,

      type: data.type,

      avatar:
        'https://i.pravatar.cc/300',
    };

    await createUserProfile(
      firebaseUser.uid,
      userData
    );

    setUser(userData);

    return true;
  }

  async function signOutUser() {
    await logoutUser();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}