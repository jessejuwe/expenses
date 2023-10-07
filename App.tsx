import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Providers from './Providers';
import GlobalStyles from './constants/styles';
import Navigation from './navigators/Navigation';

SplashScreen.preventAutoHideAsync();

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

export default function App() {
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState();

  const [fontsLoaded] = useFonts({
    Lato: require('./assets/fonts/Lato-Regular.ttf'),
    LatoBold: require('./assets/fonts/Lato-Bold.ttf'),
  });

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined; // prettier-ignore

          if (state !== undefined) setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) restoreState();
  }, [isReady]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <ActivityIndicator />;
  if (!isReady) return <ActivityIndicator />;

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Providers>
          <Navigation initialState={initialState} />
        </Providers>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: GlobalStyles.colors.primary800, flex: 1 },
});
