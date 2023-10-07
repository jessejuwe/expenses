import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import Button from './Button';
import GlobalStyles from '../../constants/styles';

type Props = { message: string; onClose: () => void; onRetry?: () => void };

const Error: React.FC<Props> = ({ message, onClose, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong!</Text>
      <Text style={styles.error}>{message}</Text>

      <View style={styles.buttonGroup}>
        {!!onRetry && (
          <Text style={styles.retry} onPress={onRetry}>
            Retry
          </Text>
        )}
        <Button onPress={onClose}>Close</Button>
      </View>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    color: GlobalStyles.colors.primary700,
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    padding: 24,
  },
  error: {
    color: GlobalStyles.colors.error500,
    fontFamily: 'Lato',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: GlobalStyles.colors.error50,
    fontFamily: 'LatoBold',
    fontSize: 22,
    textAlign: 'center',
  },
  retry: {
    color: GlobalStyles.colors.primary100,
    fontFamily: 'LatoBold',
    fontSize: 14,
    textAlign: 'center',
  },
});
