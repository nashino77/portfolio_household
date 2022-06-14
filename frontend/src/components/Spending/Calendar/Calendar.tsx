import React from 'react';
// date-fns
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import { parse } from 'date-fns';
// css
import style from './Calendar.module.scss';
// interface
import { GetSpending } from '../../../interface'

type Props = {
  targetDate: Date;
  setTargetDate: React.Dispatch<React.SetStateAction<Date>>;
  calendar: Date[][];
  spendings: GetSpending[];
  urlParams: { householdId: string; };
};

const Calendar: React.FC<Props> = (props) => {
  const { setTargetDate, calendar, spendings } = props;

  return (
    <div className={style.calendar}>
      <div className={style.selectMonth}>
        <div className={style.selectbutton_month} onClick={() => setTargetDate(current => subMonths(current, 1))}>
          &lsaquo; 前の月
        </div>
        <div className={style.selectbutton_month} onClick={() => setTargetDate(new Date())}>
          今月
        </div>
        <div className={style.selectbuttonMonth} onClick={() => setTargetDate(current => addMonths(current, 1))}>
          次の月 &rsaquo;
        </div>
      </div>
      <table className={style.calendarBody}>
        <thead>
          <tr className={style.calendarDay}>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody className={style.calendarMain}>
          {
            calendar.map((weekRow, rowNum) => (
              <tr className={style.calendarWeek} key={rowNum}>
                {
                  weekRow.map((date) => (
                    <td key={getDay(date)} className={style.calendarDate}>
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
                      <div className={style.dateAmount}>
                        ¥
                        {
                          spendings
                          // eslint-disable-next-line array-callback-return
                          .filter(val => {
                            const changeStringDate = parse(val.usedAt, 'yyyy-MM-dd', new Date());
                            const usedDate = format(changeStringDate, 'yyyy-MM-dd');
                            const calendarDate = format(date, 'yyyy-MM-dd');
                            if (usedDate === calendarDate) return val;
                          })
                          .reduce((sum, spending) => sum + spending.amountUsed, 0)
                            }
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