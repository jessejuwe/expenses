import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GlobalStyles from '../constants/styles';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import { AuthStackParamList } from '../types/navigation';

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

type Props = {};

const AuthStack: React.FC<Props> = props => {
  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary800,
        },
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTitleStyle: { fontFamily: 'Lato' },
        headerTintColor: '#fff',
        // presentation: 'modal',
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Signup" component={Signup} />
    </Navigator>
  );
};

export default AuthStack;
