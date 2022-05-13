import Cookies from 'js-cookie';
import { client } from './client';


// url
import { 
  householdIndex,
 } from '../urls';

 // interface
 import { Household, TargetDate } from '../interface';

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

// 家計簿月別利用金額合計の取得
export const getMonthSpendingTotal = (id: number, params: TargetDate) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.get(`${householdIndex(id)}/total`, {
      params,
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
  return client.post(`${householdIndex(id)}`, 
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

// 家計簿の削除
export const deleteHousehold = (userId: number, householdId: number) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return client.delete(`${householdIndex(userId)}/${householdId}`,{
    headers: {
      "access-token": Cookies.get("_access_token") || "",
      "client": Cookies.get("_client") || "",
      "uid": Cookies.get("_uid") || "",
    },
  });
};