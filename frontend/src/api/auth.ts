import Cookies from 'js-cookie';
import { client } from './client';
// interface
import { SignUpParams, SignInParams } from '../interface';
// url
import { AUTH, signInUser } from '../urls';

// サインアップ
export const signUp = (params: SignUpParams) => { return client.post(AUTH, params) };
//サインイン
export const signIn = (params: SignInParams) => { return client.post(`${AUTH}/sign_in`, params); };
// サインアウト
export const signOut = () => {
  return client.delete(`${AUTH}/sign_out`, { 
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
  return client.get(signInUser, {
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || "",
    },
  });
};

