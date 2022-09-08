import axios from 'axios';
import { BASE_URL, TIMEOUT } from '../config/index.dev';
import AsyncStorage from '@react-native-community/async-storage';

export const getAxiosInstance = async() => {
  let userToken = await AsyncStorage.getItem('USER_TOKEN');
  console.log('@@@ Axios Token ============', userToken);

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: userToken ? {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
              } : {
                'content-type': 'application/json',
              }
  });

  return instance;
}

export const getAxiosInstanceImage = async() => {
  let userToken = await AsyncStorage.getItem('USER_TOKEN');
  console.log('@@@ Axios Token ============', userToken);

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: userToken ? {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + userToken
              } : {
                'Content-Type': 'multipart/form-data'
              }
  });

  return instance;
}