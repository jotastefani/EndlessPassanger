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

  name: string;

  companyName?: string;

  type: string;

  avatar: string;
};

type AuthContextData = {
  user: UserData | null;

  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signUp: (
    name: string,
    email: string,
    password: string,
    type: string
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
    try {
      const response =
        await loginUser(
          email,
          password
        );

      if (!response) {
        return false;
      }

      const profile =
        await getUserProfile(
          response.user.uid
        );

      if (!profile) {
        return false;
      }

      setUser(profile as UserData);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async function signUp(
    name: string,
    email: string,
    password: string,
    type: string
  ) {
    try {
      const response =
        await registerUser(
          email,
          password
        );

      if (!response) {
        return false;
      }

      const userData = {
        uid: response.user.uid,

        name,

        email,

        type,

        avatar:
          'https://i.pravatar.cc/300',
      };

      await createUserProfile(
        response.user.uid,
        userData
      );

      setUser(userData);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
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