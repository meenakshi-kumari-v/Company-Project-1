import axios from 'axios';
import {apiUrl, apiUrl2, apiUrl3} from './apiEndPoints';
import bcrypt from 'react-native-bcrypt';
import CryptoJS from 'react-native-crypto-js';
const secretKey = 'demoKey';

export const encryptionText = async (text: any) => {
  try {
    const saltRounds = 5; 
    const hash = await bcrypt.hashSync(text, saltRounds);
    console.log('HASHDATA: ', hash, text);
    return hash;
  } catch (error) {
    console.error('Encryption error:', error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

export const apiGetMethod = async (url: string, data: any) => {
  console.log('URLPARAMETERS', data, url);
  let urlWithParams = `${
    apiUrl + url + encodeURIComponent(JSON.stringify(data))
  }`;
  console.log('GET Response:', urlWithParams);
  let res = await axios.get(urlWithParams);
  return res;
};

export const apiPostMethod = async (url: string, data: any) => {
  let urlWithParams = `${
    apiUrl + url + encodeURIComponent(JSON.stringify(data))
  }`;
  console.log('post method data', urlWithParams, data);
  let res = await axios.post(urlWithParams);
  console.log('POST Response:', res, data);
  return res;
};

export const apiPostMethod2 = async (url: string, data: any, formData: any) => {
  let urlWithParams = `${
    apiUrl + url + encodeURIComponent(JSON.stringify(data))
  }`;
  console.log('apiPostMethod3', data, urlWithParams);
  let res = await axios.post(urlWithParams, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('POST Response2:', res);
  return res;
};

