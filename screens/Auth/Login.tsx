import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AuthContent from '../../components/Auth/AuthContent';
import Error from '../../components/UI/Error';
import Loading from '../../components/UI/Loading';

import { AuthContext } from '../../contexts/auth';
import Auth from '../../model/Auth';
import { AuthStackParamList } from '../../types/navigation';
import { loginUser } from '../../utils/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login: React.FC<Props> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const { authenticate } = useContext(AuthContext);

  // prettier-ignore
  const loginHandler = useCallback(async (userData: Auth) => {
    setIsLoading(true);

    try {
      const token = await loginUser(userData);
      authenticate(token);
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [authenticate, loginUser]);

  const onClose = () => setError(null);

  return (
    <>
      {isLoading && <Loading message="Logging you in ..." />}
      {!isLoading && !!error && <Error message={error} onClose={onClose} />}
      {!isLoading && !error && (
        <AuthContent isLogin onAuthenticate={loginHandler} />
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
