import React, { useReducer, useEffect, useMemo, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { auth } from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { IAuthData } from './types';

interface AuthState {
  isLoading: boolean;
  isSignedOut: boolean;
  user: string | null;
}

type Action =
  | { type: 'RESTORE_USER'; user: string | null }
  | { type: 'SIGN_IN'; user: string }
  | { type: 'SIGN_OUT' };

const authReducer = (prevState: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'RESTORE_USER':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignedOut: false,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignedOut: true,
        user: null,
      };
    default:
      return prevState;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignedOut: false,
    user: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        dispatch({ type: 'RESTORE_USER', user: user ? JSON.parse(user) : null });
      } catch (e: any) {
        Alert.alert('Error', e.message);
      }
    };

    bootstrapAsync();
  }, []);

  const authContextDispatch = useMemo(() => ({
    signIn: async (data: IAuthData) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'SIGN_IN', user: JSON.stringify(user) });
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    },
    signOut: async () => {
      try {
        await firebaseSignOut(auth);
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' });
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    },
    signUp: async (data: IAuthData) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'SIGN_IN', user: JSON.stringify(user) });
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    },
  }), []);

  return (
    <AuthContext.Provider value={{ ...state, ...authContextDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
