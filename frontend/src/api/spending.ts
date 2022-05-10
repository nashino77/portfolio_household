import Cookies from 'js-cookie';
import { client } from './client';


// url
import { 
  householdIndex,
 } from '../urls';

 // interface
 import { Spending } from '../interface';

// 利用履歴一覧の取得
export const getAllSpending = (userId: number, householdId: number) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.get(`${householdIndex(userId)}/${householdId}/spendings`, { 
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        "client": Cookies.get("_client") || "",
        "uid": Cookies.get("_uid") || "",
      },
    });
};

// 利用履歴の登録
export const createSpending = (userId: number, householdId: number, params: Spending) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.post(`${householdIndex(userId)}/${householdId}/spendings`, 
    params, 
    {
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        "client": Cookies.get("_client") || "",
        "uid": Cookies.get("_uid") || "",
      },
    },
  );
};


// 利用履歴一覧の取得
export const getSpending = (userId: number, householdId: number, spendingId: number) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.get(`${householdIndex(userId)}/${householdId}/spendings/${spendingId}`, { 
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        "client": Cookies.get("_client") || "",
        "uid": Cookies.get("_uid") || "",
      },
    });
};