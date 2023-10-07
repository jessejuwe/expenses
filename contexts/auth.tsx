import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = { children: React.ReactNode };

interface ContextObj {
  isAuthenticated: boolean;
  token: string | null;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<ContextObj>({
  isAuthenticated: false,
  token: '',
  authenticate: (token: string) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const authenticate = useCallback((token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem('TOKEN', token);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    AsyncStorage.removeItem('TOKEN');
  }, []);

  const contextValue: ContextObj = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
