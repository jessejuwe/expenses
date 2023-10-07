import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native';

type Props = {
  color: string;
  icon: any;
  onPress: () => void;
  size: number;
};

const IconButton: React.FC<Props> = ({ color, icon, onPress, size }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.button}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    marginHorizontal: 8,
    // marginVertical: 2,
    padding: 6,
  },
  pressed: { opacity: 0.75 },
});
