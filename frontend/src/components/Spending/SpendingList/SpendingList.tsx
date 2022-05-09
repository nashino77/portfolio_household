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
import { parse } from 'date-fns';


// css
import style from './SpendingList.module.scss';

// interface
import { GetSpending } from '../../../interface';

type Props = {
  targetDate: Date;
  calendar: Date[][];
  spendings: GetSpending[];
};


const SpendingList: React.FC<Props> = (props) => {
  const {
    targetDate,
    calendar,
    spendings,
  } = props;


  return (
    <div className={style.spending_list}>
      {
        calendar.map((weekRow, rowNum) => (
          <div key={rowNum}>
            {
              weekRow.map((date) => (
                <div
                className={style.spending_box}
                  key={getDay(date)} 
                >
                  <div className={style.spneding_date}>
                    {format(date, 'M月')}{getDate(date)}日
                  </div>
                  <div className={style.spending}>
                    {
                      spendings
                      .filter(val => {
                        const changeStringDate = parse(val.usedAt, 'yyyy-MM-dd', new Date());
                        const usedDate = format(changeStringDate, 'yyyy-MM-dd');
                        const calendarDate = format(date, 'yyyy-MM-dd');
                        if (usedDate === calendarDate) return val;
                        return null;
                      })
                      .map((spending) => (
                        <ul key={spending.id} className={style.spending_content}>
                          <li className={style.spending_memo}>{spending.memo}</li>
                          <li className={style.spending_amountUsed}>¥{spending.amountUsed}</li>
                        </ul>
                      ))
                    }
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