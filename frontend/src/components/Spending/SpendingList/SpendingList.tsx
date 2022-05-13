import React from 'react';

// date-fns
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getDay from 'date-fns/getDay';
import { parse } from 'date-fns';

// css
import style from './SpendingList.module.scss';

// interface
import { GetSpending } from '../../../interface';
import { Link } from 'react-router-dom';

type Props = {
  targetDate: Date;
  calendar: Date[][];
  spendings: GetSpending[];
  urlParams: { householdId: string; };
};


const SpendingList: React.FC<Props> = (props) => {
  const {
    calendar,
    spendings,
    urlParams,
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
                  id="overFlowScrollArea"
                >
                  <div className={style.spneding_date}>
                    {format(date, 'M月')}{getDate(date)}日
                  </div>
                  <div className={style.spending}>
                      { spendings &&
                        spendings
                        // eslint-disable-next-line array-callback-return
                        .filter(val => {
                          const changeStringDate = parse(val.usedAt, 'yyyy-MM-dd', new Date());
                          const usedDate = format(changeStringDate, 'yyyy-MM-dd');
                          const calendarDate = format(date, 'yyyy-MM-dd');
                          if (usedDate === calendarDate) return val;
                        })
                        .map((spending) => (
                          <Link 
                            key={spending.id} 
                            to={`/${Number(urlParams.householdId)}/spendings/${spending.id}`}
                          >
                            <ul  className={style.spending_content}>
                              <li className={style.spending_memo}>{spending.memo}</li>
                              <li className={style.spending_amountUsed}>¥{spending.amountUsed}</li>
                            </ul>
                          </Link>
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