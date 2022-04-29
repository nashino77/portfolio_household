import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';

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

import style from './Calendar.module.scss';

const getCalendarArray = (date: Date) => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  return sundays.map((sunday) => 
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  );
};


const Calendar: React.FC = () => {
  const [targetDate, setTargetDate] = useState(new Date())
  const calendar = getCalendarArray(targetDate);
  
  return (
    <div  style={{ width: '700px', margin: '0 auto', userSelect: 'none' }}>
      <div style={{ textAlign: 'center' }}>Calendar</div>
      <div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setTargetDate(current => subMonths(current, 1))}>前の月</button>
          <button onClick={() => setTargetDate(new Date())}>今月</button>
          <button onClick={() => setTargetDate(current => addMonths(current, 1))}>次の月</button>
        </div>
        {format(targetDate, 'y年M月')}
        <table style={{ textAlign: 'center' }}>
          <thead>
            <tr>
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
                <tr key={rowNum}>
                  {
                    weekRow.map((date) => (
                      <td 
                        key={getDay(date)} 
                        
                      >
                        <div 
                          className={
                            getDay(date) === 0 ? style.day : '' || 
                            getDay(date) === 6 ? style.lastday : '' 
                        }>
                          {getDate(date)}
                        </div>
                        {/* <div style={{ width: '100px', height: '50px' }} className={style.calendar}>
                          {getDate(date)}
                        </div> */}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Calendar