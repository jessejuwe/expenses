import axios from 'axios';

import Auth from '../model/Auth';

const API_KEY = 'AIzaSyDekmtEtO6Rbx16PhHdhv2d6WLKtq8ChU8';
const API_URL = 'https://expenses-23dfc-default-rtdb.firebaseio.com';

async function authenticate(mode: string, userData: Auth) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const authData = {
    email: userData.email,
    password: userData.password,
    returnSecureToken: true,
  };

  const res = await axios.post(url, authData);

  const token = res.data.idToken;

  return token as string;
}

export async function createUser(userData: Auth) {
  return await authenticate('signUp', userData);
}

export async function loginUser(loginData: Auth) {
  return await authenticate('signInWithPassword', loginData);
}
