import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AuthForm from './Form/AuthForm';
import GlobalStyles from '../../constants/styles';
import Button from '../UI/Button';
import { AuthStackParamList } from '../../types/navigation';

interface Credentials {
  email: string;
  password: string;
}

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

type Props = { isLogin?: boolean; onAuthenticate: (data: Credentials) => void };

const AuthContent: React.FC<Props> = ({ isLogin, onAuthenticate }) => {
  const { replace } = useNavigation<AuthNavigationProp>();

  // prettier-ignore
  const switchAuthModeHandler = () => isLogin ? replace('Signup') : replace('Login');

  const submitHandler = (credentials: Credentials) => {
    let { email, password } = credentials;

    onAuthenticate({ email, password });
  };

  return (
    <View style={styles.authContent}>
      <AuthForm isLogin={isLogin} onSubmit={submitHandler} />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Button>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 8,
    elevation: 2,
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
