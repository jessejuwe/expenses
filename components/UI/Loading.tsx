import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';

import GlobalStyles from '../../constants/styles';

type Props = { message?: string };

const Loading: React.FC<Props> = ({ message }) => {
  return (
    <View style={[styles.container, { padding: message ? 32 : 24 }]}>
      {message && <Text style={styles.message}>{message}</Text>}
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: GlobalStyles.colors.primary700,
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 16,
    marginBottom: 12,
  },
});
