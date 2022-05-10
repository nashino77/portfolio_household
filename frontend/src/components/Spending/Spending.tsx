import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
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
import { getHousehold, deleteHousehold } from '../../api/household';
import { getAllSpending } from '../../api/spending';

// function
import { useWindowDimensions } from '../../function/window';
import { getCalendarArray } from '../../function/calendar';

// css
import style from './Spending.module.scss';
import { RouteComponentProps } from 'react-router-dom';

// interface
import { GetHousehold } from '../../interface';
import AddSpending from './AddSpending/AddSpending';


const Spending: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const urlParams = useParams<{householdId: string}>();
  const [targetDate, setTargetDate] = useState(new Date());
  const [spendings, setSpendings] = useState([]);
  const [household, setHousehold] = useState<GetHousehold>();
  const [openPcSpendingModal, setOpenPcSpendingModal] = useState(false);

  const calendar  = getCalendarArray(targetDate);
  const width = useWindowDimensions();

  // 利用履歴一覧の取得処理
  const handleGetSpendings = async () => {
    if(!currentUser) return
    const id = Number(urlParams.householdId);
    const res = await getAllSpending(currentUser?.id, id);
    console.log('利用履歴一覧取得', res);

    try {
      if (res?.status !== 200) return;
      setSpendings(res.data);
    } catch (err: any) {
      console.log('利用履歴一覧取得エラー', err);
    }
  };

  // 家計簿の詳細取得
  const handleGetHousehold = async () => {
    if (!currentUser) return;
    try {
      const res = await getHousehold(currentUser.id, Number(urlParams.householdId));
      setHousehold(res?.data);
      console.log('家計簿詳細', res);
    } catch (err: any) {
      console.log(err);
    }
  };

  // 家計簿の削除処理
  const handleDeleteHousehold = async () => {
    const sure = window.confirm('削除してよろしいですか?');
    if(!sure) return;

    try {
      if(!currentUser) return;
      const res = await deleteHousehold(currentUser.id, Number(urlParams.householdId));
      console.log('家計簿削除', res);
      history.push('/');
    } catch (err: any) {
      console.log(err);
      alert('削除ができませんでした')
    };
  };

  // 利用履歴登録PCモーダルの表示判定切り替え
  const handleChangePcModal = () => {
    setOpenPcSpendingModal(true);
  };


  useEffect(() => {
    handleGetHousehold();
    handleGetSpendings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={style.spendings}>
      <div className={style.household_name}>
        <h2>{household?.name}</h2>
        {width < 1100 ? ( <p>基準日: {household?.referenceAt}</p> ) : '' }
      </div>
      <div className={style.monthbox}>
        <h3 className={style.month}>{format(targetDate, 'M月')}: ¥100,000</h3>
        {width > 1100 ? ( <p>基準日: {household?.referenceAt}</p> ) : '' }
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
            <div onClick={handleChangePcModal}>
              使った金額を記録する
            </div>
          </div>
          <div 
            className={style.household_delete}
            onClick={handleDeleteHousehold}
          >
            家計簿を削除
          </div>
        </div>
      ) : '' }
      {openPcSpendingModal
        ? (
          <AddSpending
            setOpenPcSpendingModal={setOpenPcSpendingModal}
          />
        ) : ''
      }
    </div>
  )
}

export default Spending