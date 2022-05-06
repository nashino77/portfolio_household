import React, { useContext } from 'react';
import axios from 'axios';
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
import style from './SpendingList.module.scss';

type Props = {
  targetDate: Date;
  calendar: Date[][];
};


const SpendingList: React.FC<Props> = (props) => {
  const {
    targetDate,
    calendar,
  } = props;


  return (
    <div className={style.spending_list}>
      {
        calendar.map((weekRow, rowNum) => (
          <div key={rowNum}>
            {
              weekRow.map((date) => (
                <div
                  key={getDay(date)} 
                >
                  <div className={style.spneding_date}>
                    {format(date, 'M月')}{getDate(date)}日
                  </div>
                  <div className={style.spending}>
                    <div>
                      <ul>
                        <li>食費</li>
                        <li>¥550</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default SpendingList