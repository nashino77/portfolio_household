import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../App';

// calendar
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfWeek from 'date-fns/endOfWeek';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addDays from 'date-fns/addDays';


// component
import Calendar from './Calendar/Calendar';
import SpendingList from './SpendingList/SpendingList';

// api
import { getAllSpending } from '../../api/spending';

// function
import { useWindowDimensions } from '../../function/window';
import { getCalendarArray } from '../../function/calendar';

// css
import style from './Spending.module.scss';
import { RouteComponentProps } from 'react-router-dom';


const Spending: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const urlParams = useParams<{householdId: string}>();
  const [targetDate, setTargetDate] = useState(new Date());

  const initialSpendings = {
    amountUsed: 0,
    createdAt: null,
    householdId: 0,
    id: 0,
    memo: "",
    updatedAt: null,
    usedAt: null,
  };

  const [spendings, setSpendings] = useState([]);

  const calendar  = getCalendarArray(targetDate);

  const width = useWindowDimensions();

  const handleGetSpendings = async () => {
    if(!currentUser) return
    const res = await getAllSpending(currentUser?.id, Number(urlParams.householdId));
    console.log(res);

    try {
      if (res?.status !== 200) return;
      setSpendings(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetSpendings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSpendings = () => {
    console.log(spendings);
  };

  return (
    <div className={style.spendings}>
      <div className={style.household_name}>
        <h2>家計簿名</h2>
        <p>基準日: 12</p>
      </div>
      <h3 className={style.month}>{format(targetDate, 'M月')}: ¥100,000</h3>
      <div className={style.household_main}>
        <Calendar
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          calendar={calendar}
          spendings={spendings}
        />
        { width < 1100 ? (
          <div className={style.button}>
            <div className={style.amount_save}>
              <Link to={`/${urlParams.householdId}/spendings/addspending`}>
                使った金額を記録する
              </Link>
            </div>
            <div className={style.household_delete}>家計簿を削除</div>
          </div>
        ) : '' }
        <SpendingList
          targetDate={targetDate}
          calendar={calendar}
          spendings={spendings}
        />
      </div>
      {width >= 1100 ? (
        <div className={style.button_pc}>
          <div className={style.amount_save}>
            <Link to={`/${urlParams.householdId}/spendings/addspending`}>
              使った金額を記録する
            </Link>
          </div>
          <div className={style.household_delete}>家計簿を削除</div>
        </div>
      ) : '' }
    </div>
  )
}

export default Spending