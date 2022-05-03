import Cookies from 'js-cookie';
import axios from 'axios';
// interface
import { SignUpParams, SignInParams } from '../interface';
// url
import { AUTH, signInUser } from '../urls';

// サインアップ
export const signUp = (params: SignUpParams) => {
  return axios.post(AUTH, params)
};

//サインイン
export const signIn = (params: SignInParams) => {
  return axios.post(`${AUTH}/sign_in`, params);
};

// サインアウト
export const signOut = () => {
  return axios.delete(`${AUTH}/sign_out`, { 
      headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || "",
    },
  });
};

// 認証済みユーザーの取得

export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return axios.get(signInUser, {
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || "",
    },
  });
};

