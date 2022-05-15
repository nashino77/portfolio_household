import React, { useState, useEffect, useContext} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App';

// function
import { useWindowDimensions } from '../../../function/window';

// css
import style from './EditSpending.module.scss';

// api
import { updateSpending, getSpending, deleteSpending } from '../../../api/spending';

// interface
import { Spending } from '../../../interface';

// image
  import MemoMark from '../../../image/nameMark.png';
  import Date from '../../../image/calendar.png';
  import PriceMark from '../../../image/priceMark.png';

const EditSpending: React.FC = () => {
  const history = useHistory();
  const urlParams = useParams<{householdId: string; spendingId: string}>();
  const { currentUser } = useContext(AuthContext);
  // const width = useWindowDimensions();

  // 利用履歴初期値
  const initialSpending = {
    memo: "",
    amountUsed: 0,
    usedAt: "",
  };
  const [currentSpending, setCurrentSpending] = useState(initialSpending);

  // 入力値の取得
  const handleInputChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setCurrentSpending({ ...currentSpending, [input]: target.value});
  };

  // 利用履歴の編集
  const handleUpdateSpending = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: Spending ={
      memo: currentSpending.memo,
      amountUsed: currentSpending.amountUsed,
      usedAt: currentSpending.usedAt,
    }
    console.log(params);
    if(!currentUser) return;

    try {
      const res = await updateSpending(
        currentUser.id,
        Number(urlParams.householdId),
        Number(urlParams.spendingId), 
        params
      );

      if (res?.status === 200) {
        console.log('利用履歴編集', res);
        history.push(`/${Number(urlParams.householdId)}/spendings`);
      }
    } catch (err :any) {
      console.log('利用履歴編集', err);
      alert('登録ができませんでした');
    };

  };

  // 利用履歴詳細の取得
  const handleGetSpending = async () => {
    if (!currentUser) return;
    try {
      const res = await getSpending(
        currentUser.id,
        Number(urlParams.householdId),
        Number(urlParams.spendingId)
      );

      console.log('利用履歴詳細', res?.data);
      setCurrentSpending(res?.data);
    } catch (err :any) {
      console.log('利用履歴詳細', err)
    };
  };

  // 利用履歴の削除
  const handleDeleteSpending = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentUser) return;
    const sure = window.confirm('削除してよろしいですか?')
    if (!sure) return;
    try {
      const res = await deleteSpending(
        currentUser.id,
        Number(urlParams.householdId),
        Number(urlParams.spendingId)
      );
      console.log('利用履歴削除', res);
      history.push(`/${Number(urlParams.householdId)}/spendings`);
    } catch (err: any) {
      console.log(err);
      alert('削除ができませんでした');
    };
  };

  useEffect(() => {
    handleGetSpending();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className={style.addspending}>

        <form>
          <div className={style.inputform}>
            <div className={style.input}>
              <div className={style.inputname}>
                <img src={Date} alt='input usedAt' />
                <h4>日付</h4>
              </div>
              <input 
                type='date'
                name='usedAt'
                required
                value={currentSpending.usedAt}
                onChange={handleInputChange('usedAt')}
              />
            </div>
            <hr />
            <div className={style.input}>
              <div className={style.inputname}>
                <img src={PriceMark} alt='input amountUsed' />
                <h4>金額</h4>
              </div>
              <input 
                type='number'
                name='amountUsed'
                min='0'
                required
                value={currentSpending.amountUsed}
                onChange={handleInputChange('amountUsed')}
              />
            </div>
            <hr />
            <div className={style.input}>
              <div className={style.inputname}>
                <img src={MemoMark} alt='input memo' />
                <h4>名前</h4>
              </div>
              <input 
                type='text'
                name='memo'
                required
                placeholder='例: 電車代'
                value={currentSpending.memo}
                onChange={handleInputChange('memo')}
              />
            </div>
          </div>
          <div className={style.buttonform}>
            <button 
              className={style.saveButton}
              onClick={handleUpdateSpending}
            >
              保存
            </button>
            <div className={style.button_cancels}>
              <button
                type="button"
                className={style.button_delete}
                onClick={handleDeleteSpending}
              >
                履歴を削除
              </button>
              <Link 
                to={`/${Number(urlParams.householdId)}/spendings`} 
                className={style.button_cancel}
              >
                キャンセル
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditSpending