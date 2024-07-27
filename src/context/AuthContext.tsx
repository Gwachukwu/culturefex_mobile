import React, {createContext} from 'react';
import {AuthContextType, IAuthData} from './types';

const defaultAuthContextValue: AuthContextType = {
  isLoading: true,
  isSignedOut: true,
  user: null,
  signIn: async (data: IAuthData) => {},
  signOut: async () => {},
  signUp: async (data: IAuthData) => {},
};

// Create the context with the default value
export const AuthContext = createContext<AuthContextType>(
  defaultAuthContextValue,
);
