import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../App';

// url
import { 
  indexUser,
  indexUserId,
  householdIndex,
  householdIndexId,
  spendingIndex, 
  spendingIndexId,
  signInUser,
} from '../../urls';

// interface
import { User } from '../../interface';

interface Household {
  id: number;
  household_id: string;
  name: string;
  refernce_at: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

const Test: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [currentHouseholds, setCurrentHouseholds] = useState([]);


  const handleGetUser = () => {
    if (currentUser) {
      axios.get(`${indexUserId(currentUser.id)}`, { 
          headers: {
            "access-token": Cookies.get("_access_token") || "",
            "client": Cookies.get("_client") || "",
            "uid": Cookies.get("_uid") || "",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    };
  };

  const handleGetAllUser = () => {
    axios.get(indexUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleGetHousehold = (id: any) => {
    if (currentUser) {
      axios.get(`${householdIndex(currentUser.id)}/${id}`,{ 
        headers: {
          "access-token": Cookies.get("_access_token") || "",
          "client": Cookies.get("_client") || "",
          "uid": Cookies.get("_uid") || "",
        },
      })
        .then((res) => {
          console.log(res.data);
        })
    }
  }

  useEffect(() => {
    if (currentUser) {
      axios.get(householdIndex(currentUser.id),{ 
        headers: {
          "access-token": Cookies.get("_access_token") || "",
          "client": Cookies.get("_client") || "",
          "uid": Cookies.get("_uid") || "",
        },
      })
        .then((res) => {
          console.log(res.data);
          setCurrentHouseholds(res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    };
  }, [])

  return (
    <>
      <button onClick={handleGetUser} >テスト</button>
      <button onClick={handleGetAllUser} >Users</button>
      {
        currentHouseholds.map((household: Household) => (
          <div key={household.id}>
            {household.name}
            <button onClick={() => handleGetHousehold(household.id)}>送信</button>
          </div>
        ))
      }
    </>
  )
}

export default Test