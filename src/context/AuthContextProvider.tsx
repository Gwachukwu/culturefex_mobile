import React, {useReducer, useEffect, useMemo, ReactNode} from 'react';
import {AuthContext} from './AuthContext';
import {Alert} from 'react-native';
import {auth, db} from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import {IAuthData} from './types';
import {doc, setDoc} from 'firebase/firestore';
import {database} from '../firebase/database';

interface AuthState {
  isLoading: boolean;
  isSignedOut: boolean;
  user: User | null;
}

type Action =
  | {type: 'RESTORE_USER'; user: User | null}
  | {type: 'SIGN_IN'; user: User}
  | {type: 'SIGN_OUT'};

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

export default function AuthProvider({children}: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignedOut: false,
    user: null,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch({type: 'RESTORE_USER', user: user ? user : null});
      } else {
        dispatch({type: 'SIGN_OUT'});
      }
    });
    return unsub;
  }, []);

  const authContextDispatch = useMemo(
    () => ({
      signIn: async (data: IAuthData) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password,
          );
          const user = userCredential.user;
          dispatch({type: 'SIGN_IN', user: user});
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
      },
      signOut: async () => {
        try {
          await firebaseSignOut(auth);
          dispatch({type: 'SIGN_OUT'});
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
      },
      signUp: async (data: IAuthData) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password,
          );
          const user = userCredential.user;
          await setDoc(doc(db, database.users, user?.uid), {
            email: user?.email,
            userId: user?.uid,
          });
          dispatch({type: 'SIGN_IN', user: user});
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authContextDispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
