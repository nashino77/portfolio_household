import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../App';

// date-fns
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

// css
import style from './Calendar.module.scss';

// const getCalendarArray = (date: Date) => {
//   const sundays = eachWeekOfInterval({
//     start: startOfMonth(date),
//     end: endOfMonth(date),
//   });

//   return sundays.map((sunday) => 
//     eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
//   );
// };

type Props = {
  targetDate: Date;
  setTargetDate: React.Dispatch<React.SetStateAction<Date>>;
  calendar: Date[][];
};

const Calendar: React.FC<Props> = (props) => {
  const {
    targetDate,
    setTargetDate,
    calendar
  } = props;

  return (
    <div className={style.calendar}>
      <div className={style.select_month}>
        <div 
          className={style.selectbutton_month} 
          onClick={() => setTargetDate(current => subMonths(current, 1))}
        >
          &lsaquo; 前の月
        </div>
        <div 
          className={style.selectbutton_month} 
          onClick={() => setTargetDate(new Date())}
        >
          今月
        </div>
        <div 
          className={style.selectbutton_month} 
          onClick={() => setTargetDate(current => addMonths(current, 1))}
        >
          次の月 &rsaquo;
        </div>
      </div>
      <table className={style.calendar_body}>
        <thead>
          <tr className={style.calendar_day}>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {
            calendar.map((weekRow, rowNum) => (
              <tr className={style.calendar_week} key={rowNum}>
                {
                  weekRow.map((date) => (
                    <td 
                      key={getDay(date)}
                      className={style.calendar_date}
                    >
                      <div 
                        className={`
                          ${style.date}
                          ${
                            getDay(date) === 0 ? style.sunday : '' || 
                            getDay(date) === 6 ? style.saturday : '' 
                          }`
                      }>
                        {getDate(date)}
                      </div>
                      <div className={style.date_amount}>
                        ¥,1200
                      </div>
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Calendar