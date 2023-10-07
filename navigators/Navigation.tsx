import React, { useLayoutEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';
import RootStack from './RootStack';

import { AuthContext } from '../contexts/auth';

type Navigation = { initialState: any };

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const Navigation: React.FC<Navigation> = ({ initialState }) => {
  const { isAuthenticated, authenticate } = useContext(AuthContext);

  useLayoutEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem('TOKEN');

      !!token && authenticate(token);
    };

    verifyToken();
  }, []);

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      {isAuthenticated ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
