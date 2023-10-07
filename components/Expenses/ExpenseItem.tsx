import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Manage: { id: string };
  Tabs: undefined;
};

import GlobalStyles from '../../constants/styles';

type Props = { amount: number; date: string; description: string; id: string };

const ExpenseItem: React.FC<Props> = ({ amount, date, description, id }) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const params = { id };

  //   prettier-ignore
  const pressHandler = useCallback(() => navigate('Manage', params), [navigate]);

  return (
    <Pressable
      android_ripple={{ color: '#ccc' }}
      style={({ pressed }) => pressed && styles.pressed}
      onPress={pressHandler}
    >
      <View style={styles.topView}>
        <View style={styles.descriptionView}>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{date}</Text>
        </View>
        <View style={styles.amountView}>
          <Text style={[styles.textBase, styles.amount]}>
            ${amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  amount: { color: GlobalStyles.colors.primary500, fontFamily: 'LatoBold' },
  amountView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  description: { fontSize: 16, fontFamily: 'LatoBold' },
  descriptionView: { gap: 4 },
  pressed: { opacity: Platform.OS === 'ios' ? 0.75 : 1 },
  textBase: { color: GlobalStyles.colors.primary50, fontFamily: 'Lato' },
  topView: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 12,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
