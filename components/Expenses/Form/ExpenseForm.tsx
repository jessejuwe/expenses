import { Formik, FormikErrors } from 'formik';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';

import Button from '../../UI/Button';
import Expense from '../../../model/Expense';
import { formatDate } from '../../../utils/dateFormatter';
import GlobalStyles from '../../../constants/styles';
import Input from '../../UI/Input';

type Props = {
  defaultValues: Expense | undefined;
  btnLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: Expense) => void;
};

interface InitialValues {
  amount: string;
  date: string;
  description: string;
}

const ExpenseForm: React.FC<Props> = props => {
  const { btnLabel, onCancel, onSubmit, defaultValues } = props;

  const initialValues: InitialValues = {
    amount: defaultValues?.amount.toString() || '',
    date: (defaultValues && formatDate(defaultValues.date)) || '',
    description: defaultValues?.description || '',
  };

  const submitHandler = useCallback((data: Expense) => onSubmit(data), []);

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors: FormikErrors<InitialValues> = {};

        const amountIsValid = !isNaN(+values.amount) && +values.amount > 0;
        const dateIsValid = new Date(values.date).toString() !== 'Invalid Date';
        const descriptionIsValid = values.description.trim().length > 2;

        if (!amountIsValid) errors.amount = 'invalid';
        if (!dateIsValid) errors.date = 'invalid';
        if (!descriptionIsValid) errors.description = 'invalid';

        return errors;
      }}
      onSubmit={(values, action) => {
        action.setSubmitting(true);

        const amount = +values.amount;
        const date = new Date(values.date);
        const description = values.description;

        const expenseData = new Expense(amount, date, description);

        submitHandler(expenseData);

        action.setSubmitting(false);
        action.resetForm();
      }}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
      }) => {
        const amountInputConfig = {
          keyboardType: 'decimal-pad' as KeyboardTypeOptions,
          onBlur: handleBlur('amount'),
          onChangeText: handleChange('amount'),
          value: values.amount,
        };

        const dateInputConfig = {
          maxLength: 10,
          onBlur: handleBlur('date'),
          onChangeText: handleChange('date'),
          placeholder: 'YYYY-MM-DD',
          placeholderTextColor: GlobalStyles.colors.primary200,
          value: values.date,
        };

        const descriptionInputConfig = {
          maxLength: 20,
          multiline: true,
          onBlur: handleBlur('description'),
          onChangeText: handleChange('description'),
          value: values.description,
        };

        return (
          <View style={styles.container}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.innerContainer}>
              <Input
                config={amountInputConfig}
                invalid={touched.amount! && !!errors.amount}
                label="Amount"
                style={styles.input}
              />
              <Input
                config={dateInputConfig}
                invalid={touched.date! && !!errors.date}
                label="Date"
                style={styles.input}
              />
            </View>
            <Input
              config={descriptionInputConfig}
              invalid={touched.description! && !!errors.description}
              label="Description"
            />

            {/* {touched && !isValid && (
              <Text style={styles.error}>
                Validation failed. Fill the form correctly.
              </Text>
            )} */}

            <View style={styles.buttons}>
              <Button mode="flat" onPress={onCancel} style={styles.button}>
                Cancel
              </Button>
              <Button onPress={handleSubmit} style={styles.button}>
                {btnLabel}
              </Button>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  container: { paddingTop: 40 },
  error: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
  },
  input: { flex: 1 },
  title: {
    color: 'white',
    fontFamily: 'LatoBold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
});
