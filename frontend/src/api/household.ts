import Cookies from 'js-cookie';
import axios from 'axios';


// url
import { 
  indexUserId,
  householdIndex,
  householdIndexId,
 } from '../urls';


export const getAllHousehold = (id: number) => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid") ) return;
  return axios.get(`${householdIndex(id)}`, { 
      headers: {
        "access-token": Cookies.get("_access_token") || "",
        "client": Cookies.get("_client") || "",
        "uid": Cookies.get("_uid") || "",
      },
    });
};