import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AuthContent from '../../components/Auth/AuthContent';
import Error from '../../components/UI/Error';
import Loading from '../../components/UI/Loading';

import { AuthContext } from '../../contexts/auth';
import Auth from '../../model/Auth';
import { AuthStackParamList } from '../../types/navigation';
import { createUser } from '../../utils/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup: React.FC<Props> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const { authenticate } = useContext(AuthContext);

  const signupHandler = async (userData: Auth) => {
    setIsLoading(true);

    try {
      const token = await createUser(userData);
      authenticate(token);
      navigation.replace('Login');
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const onClose = () => setError(null);

  return (
    <>
      {isLoading && <Loading message="Creating your account ..." />}
      {!isLoading && !!error && <Error message={error} onClose={onClose} />}
      {!isLoading && !error && <AuthContent onAuthenticate={signupHandler} />}
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({});
