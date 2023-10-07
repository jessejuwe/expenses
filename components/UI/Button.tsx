import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

import GlobalStyles from '../../constants/styles';
type Props = {
  children: string;
  mode?: string;
  onPress: () => void;
  style?: {};
};

const Button: React.FC<Props> = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 4,
    padding: 8,
  },
  buttonText: { color: 'white', textAlign: 'center' },
  flat: { backgroundColor: 'transparent' },
  flatText: { color: GlobalStyles.colors.primary200 },
  pressed: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    opacity: 0.75,
  },
});
