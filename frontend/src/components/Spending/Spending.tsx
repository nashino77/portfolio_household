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
  // 利用予定額と利用額との差額
  const balance = amountPlanned - currentTotalAmount;
  // カレンダーの月日情報
  const calendar  = getCalendarArray(targetDate);
  // ブラウザのwidth情報取得
  const width = useWindowDimensions();
  // 利用履歴一覧の取得処理
  const handleGetSpendings = async () => {
    if(!currentUser) return
    try {
      const res = await getAllSpending(currentUser?.id, Number(urlParams.householdId));
      if (res?.status !== 200) return;
      setSpendings(res.data);
    } catch (err: any) {
      console.log('利用履歴一覧取得エラー', err);
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
      console.log('利用金額合計', err);
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
      console.log(err);
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
      console.log(err);
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
      <div className={style.householdName}>
        <h2>
          <Link to={`/${Number(urlParams.householdId)}/edithousehold`}>{household?.name}</Link>
        </h2>
        {width < 1100 ? (
            <p>
              利用予定:
              <span className={style.amountPlanned}>¥{household?.amountPlanned}</span>
            </p>
          ) : '' }
      </div>
      <div className={style.monthbox}>
        <h3 className={style.month}>
          {format(targetDate, 'M月')}:
          <span className={balance >= 0 ? style.balanceBlue : style.balanceRed }>
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
      <div className={style.householdMain}>
        <Calendar
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          calendar={calendar}
          spendings={spendings}
          urlParams={urlParams}
        />
        { width < 1100 ? (
          <div className={style.button}>
            <div className={style.amountSave}>
              <Link to={`/${urlParams.householdId}/spendings/addspending`}>
                使った金額を記録する
              </Link>
            </div>
            <div className={style.householdDelete} onClick={handleDeleteHousehold}>
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
        <div className={style.buttonPc}>
          <div className={style.amountSave}>
            <Link to={`/${urlParams.householdId}/spendings/addspending`}>使った金額を記録する</Link>
          </div>
          <div className={style.householdDelete} onClick={handleDeleteHousehold}>
            家計簿を削除
          </div>
        </div>
      ) : '' }
    </div>
  )
}

export default Spending