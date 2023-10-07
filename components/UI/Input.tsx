import React from 'react';
import { Text, TextInput, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { TextInputProps, StyleProp } from 'react-native';

import GlobalStyles from '../../constants/styles';

type Props = {
  config: TextInputProps;
  invalid: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
};

const Input: React.FC<Props> = ({ config, invalid, label, style }) => {
  const inputStyles = [styles.input];

  if (config && config.multiline) inputStyles.push(styles.inputMultiline);
  if (invalid) inputStyles.push(styles.invalidInput);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidText]}>{label}</Text>
      <TextInput {...config} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: { marginVertical: 8 }, // FIXME: add marginHorizontal: 4,
  label: {
    color: GlobalStyles.colors.primary100,
    fontFamily: 'Lato',
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    fontFamily: 'Lato',
    fontSize: 18,
  },
  inputMultiline: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    fontFamily: 'Lato',
    fontSize: 18,
    minHeight: 100,
    padding: 6,
    textAlignVertical: 'top',
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    fontFamily: 'Lato',
    fontSize: 18,
    padding: 6,
  },
  invalidText: {
    color: GlobalStyles.colors.error500,
  },
});
