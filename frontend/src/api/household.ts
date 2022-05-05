import Cookies from 'js-cookie';
import axios from 'axios';

import { client } from './client';


// url
import { 
  householdIndex,
 } from '../urls';

 // interface
 import { Household } from '../interface';

// 家計簿一覧の取得
export const getAllHousehold = (id: number) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.get(`${householdIndex(id)}`, { 
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        "client": Cookies.get("_client") || "",
        "uid": Cookies.get("_uid") || "",
      },
    });
};

// 家計簿の追加
export const createHousehold = (id: number, params: Household) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.post(`${householdIndex(id)}`, {
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || "",
    },
    params,
  });
};

// 家計簿詳細の取得
export const getHousehold = (userId: number, householdId: number) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.get(`${householdIndex(userId)}/${householdId}`,{ 
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || "",
    },
  })
};