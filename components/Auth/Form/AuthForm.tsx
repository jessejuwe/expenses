import { Formik, FormikErrors } from 'formik';
import { Alert, AlertButton, View } from 'react-native';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';

import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Auth from '../../../model/Auth';

type Props = {
  isLogin?: boolean;
  onSubmit: (cred: Auth) => void;
};

const initialValues: Auth = {
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
};

const AuthForm: React.FC<Props> = ({ isLogin, onSubmit }) => {
  const initialValues: Auth = isLogin
    ? { email: '', password: '' }
    : { email: '', confirmEmail: '', password: '', confirmPassword: '' };

  const submitHandler = (data: Auth) => onSubmit(data);

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors: FormikErrors<Auth> = {};

        const email = values.email.trim();
        const password = values.password.trim();

        const emailIsInvalid = email.length < 6 || !values.email.includes('@');
        const passwordIsInvalid = password.length < 6;

        if (emailIsInvalid) errors.email = 'invalid email';
        if (passwordIsInvalid) errors.password = 'invalid password';

        if (!isLogin) {
          const emailsDontMatch = !email || values.confirmEmail !== email;
          // prettier-ignore
          const passwordsDontMatch = !password || values.confirmPassword !== password;

          if (passwordsDontMatch) errors.confirmPassword = 'password mismatch';
          if (emailsDontMatch) errors.confirmEmail = 'email mismatch';
        }

        return errors;
      }}
      onSubmit={async (values, action) => {
        action.setSubmitting(true);

        const errors = await action.validateForm();

        // FIXME: make alert work
        if (errors.email || errors.password) {
          const title = 'Validation failed';
          const message = 'Make sure you entered the right information';

          Alert.alert(title, message, [{ text: 'Cancel', style: 'cancel' }]);
          return;
        }

        const email = values.email;
        const confirmEmail = values.confirmEmail;
        const password = values.password;
        const confirmPassword = values.confirmPassword;

        // prettier-ignore
        const signupData = new Auth(email, password, confirmEmail, confirmPassword);

        submitHandler(signupData);

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
        const emailInputConfig = {
          autoCapitalize: 'none' as any,
          autoCorrect: false,
          keyboardType: 'email-address' as KeyboardTypeOptions,
          onBlur: handleBlur('email'),
          onChangeText: handleChange('email'),
          value: values.email,
        };

        const confirmEmailInputConfig = {
          autoCapitalize: 'none' as any,
          autoCorrect: false,
          onBlur: handleBlur('confirmEmail'),
          onChangeText: handleChange('confirmEmail'),
          value: values.confirmEmail,
        };

        const passwordInputConfig = {
          autoCapitalize: 'none' as any,
          autoCorrect: false,
          onBlur: handleBlur('password'),
          onChangeText: handleChange('password'),
          secureTextEntry: true,
          value: values.password,
        };

        const confirmPasswordInputConfig = {
          autoCapitalize: 'none' as any,
          autoCorrect: false,
          onBlur: handleBlur('confirmPassword'),
          onChangeText: handleChange('confirmPassword'),
          secureTextEntry: true,
          value: values.confirmPassword,
        };

        return (
          <View style={styles.form}>
            <View style={styles.card}>
              <Input
                config={emailInputConfig}
                invalid={touched.email! && !!errors.email}
                label="Email"
              />
              {!isLogin && (
                <Input
                  config={confirmEmailInputConfig}
                  invalid={touched.confirmEmail! && !!errors.confirmEmail}
                  label="Confirm Email"
                />
              )}
              <Input
                config={passwordInputConfig}
                invalid={touched.password! && !!errors.password}
                label="Password"
              />
              {!isLogin && (
                <Input
                  config={confirmPasswordInputConfig}
                  invalid={touched.confirmPassword! && !!errors.confirmPassword}
                  label="Confirm Password"
                />
              )}
              <View style={styles.buttons}>
                <Button onPress={handleSubmit}>
                  {isLogin ? 'Log In' : 'Sign Up'}
                </Button>
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  card: {},
  form: {},
});
