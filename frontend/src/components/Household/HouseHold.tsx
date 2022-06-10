import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';
// calendar
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
// api
import { getAllHousehold, getMonthSpendingTotal } from '../../api/household';
// css
import style from './HouseHold.module.scss';
// interface
import { GetSpending } from '../../interface';
// image
import HouseholdBook from '../../image/householdBook.png';

interface Household {
  id: number;
  name: string;
  amountPlanned: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

const HouseHold: React.FC = () => {
  const initialHousehold = {
    id: 1,
    name: "",
    amountPlanned: 1,
    userId: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const { currentUser } = useContext(AuthContext);
  const [households, setHouseholds] = useState([initialHousehold]);
  const [spendings, setSpendings] = useState([]);
  const [allSpendingTotal, setAllSpendingTotal] = useState(0);
  const [allAmountPlanned, setAllAmountPlanned] = useState(0);
  const [targetDate, setTargetDate] = useState(new Date());
  // 利用予定額と利用額との差額
  const balance = allAmountPlanned - allSpendingTotal;
  // 家計簿一覧の取得
  const handleGetAllHousehold = async () => {
    if(!currentUser) return;
    try {
      const res = await getAllHousehold(currentUser.id);
      if(res?.status === 200) {
        setHouseholds(res.data);
      };
    } catch (err: any) {
      console.log(err);
    }
  };
  // 全家計簿の月別利用合計の取得
  const handleGetAllSpendingTotal = async () => {
    const params = { targetDate: targetDate };
    if (!currentUser)return;
    try {
      const res = await getMonthSpendingTotal(currentUser.id, params);
      setAllSpendingTotal(res?.data.total);
      setAllAmountPlanned(res?.data.allAmountPlanned)
      setSpendings(res?.data.allSpending);
    } catch (err: any) {
      console.log('月別全合計', err);
    };
  };
  useEffect(() => {
    handleGetAllHousehold();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    handleGetAllSpendingTotal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate])

  return (
    <div className={style.household}>
      <h2>{currentUser?.name}</h2>
      <div className={style.month}>
        <h3>{format(targetDate, 'M月')}:  <span className={balance >= 0 ? style.balance_amount_blue : style.balance_amount_red }>¥{balance}</span></h3>
        <h4 className={style.amount_total}>利用額: <span>-{allSpendingTotal}</span></h4>
      </div>
      <div className={style.monthMove}>
        <span onClick={() => setTargetDate(current => subMonths(current, 1))}>
          &lsaquo; 前の月
        </span>
        <span onClick={() => setTargetDate(new Date())}>
          今月
        </span>
        <span onClick={() => setTargetDate(current => addMonths(current, 1))}>
          次の月 &rsaquo;
        </span>
      </div>
      <div className={style.householdMap}>
        { households &&
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
                  <p className={style.amount}>
                    ¥ -
                      {spendings &&
                        // eslint-disable-next-line array-callback-return
                        spendings.filter((spending: GetSpending) => {
                          if (household.id === spending.householdId) return spending;
                        })
                        .reduce((sum, spending: GetSpending) => sum + spending.amountUsed, 0)
                      }
                  </p>
                </div>
              )
            })
        }
      </div>
      <div className={style.button}>
        <Link to='/addhousehold'>あたらしい家計簿をつくる</Link>
      </div>
    </div>
  )
}

export default HouseHold