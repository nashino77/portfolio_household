import React, { useContext, useState, useEffect, useCallback } from 'react'
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
import { getAllHousehold } from '../../api/household';
import { getSpendingTotal } from '../../api/spending';

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
};

const HouseHold: React.FC = () => {
  const initialHousehold = {
    id: 1,
    household_id: "",
   name: "",
   refernce_at: 1,
    user_id: 0,
    created_at: new Date(),
    updated_at: new Date()
  };

  const { currentUser } = useContext(AuthContext);
  const [households, setHouseholds] = useState([initialHousehold]);
  const [spendingTotal, setSpendingTotal] = useState(0);
  const [spendingTotals, setSpendingTotals] = useState([0]);
  const [targetDate, setTargetDate] = useState(new Date());
  const [openPcHouseholdModal, setOpenPcHouseholdModal] = useState(false);

  const width = useWindowDimensions();

  const handleChangePcModal = () => {
    setOpenPcHouseholdModal(true);
  };

  const handleGetAllHousehold = async () => {
    if(!currentUser) return;
    try {
      const res = await getAllHousehold(currentUser.id);
      if(res?.status === 200) {
        setHouseholds(res.data);
        console.log('家計簿一覧取得', res.data);
      };
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleGetSpendingTotal = async (householdId: number) => {
    if (!currentUser) return;
    try {
      const res = await getSpendingTotal(currentUser.id, householdId)
      console.log('利用金額合計取得', res);
      setSpendingTotal(res?.data);
    } catch (err: any) {
      console.log('利用金額合計取得', err);
    };
  };

   useEffect(() => {
      handleGetAllHousehold();
  }, []);

  return (
    <div className={style.household}>
      <h2>ユーザー名</h2>
      <h3>{format(targetDate, 'M月')}: ¥{}</h3>
      <div className={style.monthMove}>
        <span onClick={() => setTargetDate(current => subMonths(current, 1))}>&lsaquo; 前の月</span>
        <span onClick={() => setTargetDate(current => addMonths(current, 1))}>次の月 &rsaquo;</span>
      </div>
      <div className={style.householdMap}>
        {
          households.map((household: Household) => {
              return (
                <div key={household.id} className={style.householdBook}>
                  <div className={style.householdName}>
                    {household.name}
                  </div>
                  <div>
                    <Link to={`/${household.id}/spendings`}>
                      <img src={HouseholdBook} alt='household book' />
                    </Link>
                  </div>
                  <p className={style.amount}>¥{}</p>
                </div>
              )
            }
          )
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
            setOpenPcHouseholdModal={setOpenPcHouseholdModal}
          />
        ) : ''
      }
    </div>
  )
}

export default HouseHold