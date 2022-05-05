import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

// calendar
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

//component
import AddHousehold from './AddHouseHold/AddHousehold';

// function
import { useWindowDimensions } from '../../function/window';

// api
import { getAllHousehold, getHousehold } from '../../api/household';

// url
import { 
  indexUserId,
  householdIndex,
} from '../../urls';

// interface
import { User } from '../../interface';

// css
import style from './HouseHold.module.scss';

// image
import HouseholdBook from '../../image/householdBook.png';

interface Household {
  id: number;
  household_id: string;
  name: string;
  refernce_at: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

const HouseHold: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [households, setHouseholds] = useState([]);
  const [household, setHousehold] = useState([]);
  const [targetDate, setTargetDate] = useState(new Date());
  const [openPcHouseholdModal, setOpenHouseholdModal] = useState(false);

  const width = useWindowDimensions();

  const handleChangePcModal = () => {
    setOpenHouseholdModal(true);
  };
 
  const handleGetAllHousehold = async () => {
    if(!currentUser) return;
    const res = await getAllHousehold(currentUser.id);
    if(res?.status === 200) {
      setHouseholds(res.data);
    };
  };
  
  const handleGetHousehold = async (id: number) => {
    if (!currentUser) return;
    const res = await getHousehold(currentUser.id, id);
    if (res?.data) {
      setHousehold(res.data);
    }
    console.log('res', res);
    console.log('res.data', res?.data);
  };

  useEffect(() => {
      handleGetAllHousehold();
  }, [setHouseholds]);



  return (
    <div className={style.household}>
      <h2>ユーザー名</h2>
      <h3>{format(targetDate, 'M月')}: ¥100,000</h3>
      <div className={style.monthMove}>
        <span onClick={() => setTargetDate(current => subMonths(current, 1))}>&lsaquo; 前の月</span>
        <span onClick={() => setTargetDate(current => addMonths(current, 1))}>次の月 &rsaquo;</span>
      </div>
      <div className={style.householdMap}>
        {
          households.map((household: Household) => (
            <div key={household.id} className={style.householdBook}>
              <div className={style.householdName}>
                {household.name}
              </div>
              <div onClick={() => handleGetHousehold(household.id)}>
                <img src={HouseholdBook} alt='household book' />
              </div>
              <p className={style.amount}>¥10,000</p>
            </div>
          ))
        }
      </div>
      <div className={style.button}>
        { width < 1100
          ? (
            <Link to='/addhousehold'>
              あたらしい家計簿をつくる
            </Link>
          ) : (
            <div onClick={handleChangePcModal}>あたらしい家計簿をつくる</div>
          )
        }
      </div>
      {openPcHouseholdModal
        ? (
          <AddHousehold
            setOpenHouseholdModal={setOpenHouseholdModal}
          />
        ) : ''
      }
    </div>
  )
}

export default HouseHold