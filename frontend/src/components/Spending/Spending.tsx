import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../App';
// calendar
import format from 'date-fns/format';
// component
import Calendar from './Calendar/Calendar';
import SpendingList from './SpendingList/SpendingList';
// api
import { getHousehold, deleteHousehold } from '../../api/household';
import { getAllSpending } from '../../api/spending';
import { getSpendingTotal } from '../../api/spending';
// function
import { useWindowDimensions } from '../../function/window';
import { getCalendarArray } from '../../function/calendar';
// css
import style from './Spending.module.scss';
// interface
import { GetHousehold } from '../../interface';

const Spending: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const urlParams = useParams<{householdId: string}>();
  const [targetDate, setTargetDate] = useState(new Date());
  const [spendings, setSpendings] = useState([]);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);
  const [amountPlanned, setAmountPlanned] = useState(0);
  const [household, setHousehold] = useState<GetHousehold>();
  const balance = amountPlanned - currentTotalAmount;
  const calendar  = getCalendarArray(targetDate);
  const width = useWindowDimensions();

  // 利用履歴一覧の取得処理
  const handleGetSpendings = async () => {
    if(!currentUser) return
    try {
      const res = await getAllSpending(currentUser?.id, Number(urlParams.householdId));
      if (res?.status !== 200) return;
      setSpendings(res.data);
    } catch (err: any) {
      console.log('情報が取得できていません');
    }
  };
  // 利用月別合計金額の合計
  const handleGetSpendingsTotal = async () => {
    if (!currentUser) return;
    const params = { targetDate: targetDate };
    try {
      const res = await getSpendingTotal(currentUser.id, Number(urlParams.householdId), params);
      setCurrentTotalAmount(res?.data);
    } catch (err: any) {
      console.log('情報が取得できていません');
    };
  };
  // 家計簿の詳細取得
  const handleGetHousehold = async () => {
    if (!currentUser) return;
    try {
      const res = await getHousehold(currentUser.id, Number(urlParams.householdId));
      setHousehold(res?.data);
      setAmountPlanned(res?.data.amountPlanned);
    } catch (err: any) {
      console.log('情報が取得できていません');
    }
  };
  // 家計簿の削除処理
  const handleDeleteHousehold = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const sure = window.confirm('削除してよろしいですか?');
    if(!sure) return;
    try {
      if(!currentUser) return;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await deleteHousehold(currentUser.id, Number(urlParams.householdId));
      history.push('/');
    } catch (err: any) {
      alert('削除ができませんでした')
    };
  };
  useEffect(() => {
    handleGetHousehold();
    handleGetSpendings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSpendings]);
  useEffect(() => {
    handleGetSpendingsTotal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

   return (
    <div className={style.spendings}>
      <div className={style.household_name}>
        <h2>
          <Link to={`/${Number(urlParams.householdId)}/edithousehold`}>
            {household?.name}
          </Link>
        </h2>
        {width < 1100 ? (
            <p>
              利用予定:
              <span
                className={style.amount_planned}
              >
                ¥{household?.amountPlanned}
              </span>
            </p>
          ) : '' }
      </div>
      <div className={style.monthbox}>
        <h3 className={style.month}>
          {format(targetDate, 'M月')}:
          <span
            className={balance >= 0 ? style.balance_blue : style.balance_red }
          >
            ¥{balance}
          </span>
        </h3>
        {width > 1100 ? (
            <p>
              利用予定: <span className={style.amount_planned}>{household?.amountPlanned}</span>
            </p>
          ) : '' }
        <p className={style.totalamount}>
          利用合計: <span className={style.totalnumber}>-{currentTotalAmount}</span>
        </p>
      </div>
      <div className={style.household_main}>
        <Calendar
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          calendar={calendar}
          spendings={spendings}
          urlParams={urlParams}
        />
        { width < 1100 ? (
          <div className={style.button}>
            <div className={style.amount_save}>
              <Link to={`/${urlParams.householdId}/spendings/addspending`}>
                使った金額を記録する
              </Link>
            </div>
            <div
              className={style.household_delete}
              onClick={handleDeleteHousehold}
            >
              家計簿を削除
            </div>
          </div>
        ) : '' }
        <SpendingList
          targetDate={targetDate}
          calendar={calendar}
          spendings={spendings}
          urlParams={urlParams}
        />
      </div>
      {width >= 1100 ? (
        <div className={style.button_pc}>
          <div className={style.amount_save}>
            <Link to={`/${urlParams.householdId}/spendings/addspending`}>
                使った金額を記録する
            </Link>
          </div>
          <div
            className={style.household_delete}
            onClick={handleDeleteHousehold}
          >
            家計簿を削除
          </div>
        </div>
      ) : '' }
    </div>
  )
}

export default Spending