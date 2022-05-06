import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

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

// function
import { useWindowDimensions } from '../../function/window';
import { getCalendarArray } from '../../function/calendar';

// css
import style from './Spending.module.scss';

const Spending: React.FC = () => {
  const [targetDate, setTargetDate] = useState(new Date());

  const calendar  = getCalendarArray(targetDate);

  const width = useWindowDimensions();


  const handleCalendar = () => {
    console.log(calendar);
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
        />
        { width < 1100 ? (
          <div className={style.button}>
            <div className={style.amount_save}>
              使った金額を記録する
              {/* { width < 1100 ? (
                  <Link to='/addspending'>
                    使った金額を記録する
                  </Link>
                ): (
                  <Link to='/addspending'>
                    使った金額を記録する
                  </Link>
                ) 
              } */}
            </div>
            <div className={style.household_delete}>家計簿を削除</div>
          </div>
        ) : '' }
        <SpendingList
          targetDate={targetDate}
          calendar={calendar}
        />
      </div>
      {width >= 1100 ? (
        <div className={style.button_pc}>
          <div className={style.amount_save}>
            使った金額を記録する
            {/* { width < 1100 ? (
                <Link to='/addspending'>
                  使った金額を記録する
                </Link>
              ): (
                <Link to='/addspending'>
                  使った金額を記録する
                </Link>
              ) 
            } */}
          </div>
          <div className={style.household_delete}>家計簿を削除</div>
        </div>
      ) : '' }
    </div>
  )
}

export default Spending