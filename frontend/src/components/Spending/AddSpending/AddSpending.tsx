import React, { useState, useEffect, useContext} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App';

// function
import { useWindowDimensions } from '../../../function/window';

// css
import style from './AddSpending.module.scss';

// api
import { createSpending, getSpending } from '../../../api/spending';

// interface
import { Spending } from '../../../interface';

// image
  import MemoMark from '../../../image/nameMark.png';
  import Date from '../../../image/calendar.png';
  import PriceMark from '../../../image/priceMark.png';

  type Props = {
    setOpenPcSpendingModal: React.Dispatch<React.SetStateAction<boolean>>;
  };

const AddSpending: React.FC<Props> = (props) => {
  const history = useHistory();
  const {
    setOpenPcSpendingModal,
  } = props;

  const urlParams = useParams<{householdId: string; spendingId: string}>();

  const { currentUser } = useContext(AuthContext);
  const width = useWindowDimensions();

  // 利用履歴初期値
  const initialSpending = {
    memo: "",
    amountUsed: 0,
    usedAt: "",
  };
  const [newSpending, setNewSpending] = useState(initialSpending);

  // 入力値の取得
  const handleInputChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setNewSpending({ ...newSpending, [input]: target.value});
  };

  // 利用履歴の新規作成
  const handleCreateSpending = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: Spending ={
      memo: newSpending.memo,
      amountUsed: newSpending.amountUsed,
      usedAt: newSpending.usedAt,
    }
    console.log(params);
    if(!currentUser) return;

    try {
      const res = await createSpending(currentUser.id, Number(urlParams.householdId), params);
      if (res?.status === 200) {
        console.log('利用履歴登録', res);
        history.push(`/${Number(urlParams.householdId)}/spendings`);
      }
    } catch (err :any) {
      console.log('利用履歴登録', err)
    };

    if (width >= 1100) setOpenPcSpendingModal(false);
  };

  // // 利用履歴詳細の取得
  // const handleGetSpending = async () => {
  //   if (!currentUser) return;
  //   try {
  //     const res = await getSpending(
  //       currentUser.id,
  //       Number(urlParams.householdId),
  //       Number(urlParams.spendingId)
  //     );

  //     console.log('利用履歴詳細', res?.data);
  //     setNewSpending(res?.data);
  //   } catch (err :any) {
  //     console.log('利用履歴詳細', err)
  //   };
  // };

  // useEffect(() => {
  //   handleGetSpending();
  // }, []);

  const handleSpending = () => {
    console.log(newSpending);
  };

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
                value={newSpending.usedAt}
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
                value={newSpending.amountUsed}
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
                value={newSpending.memo}
                onChange={handleInputChange('memo')}
              />
            </div>
          </div>
          <div className={style.buttonform}>
            <button 
              className={style.saveButton}
              onClick={handleCreateSpending}
            >
              保存
            </button>
            {width < 1100 ? (
              <Link to={`/${Number(urlParams.householdId)}/spendings`} className={style.cancelButton}>
                キャンセル
              </Link>
            ) : (
              <div onClick={() => setOpenPcSpendingModal(false)} className={style.cancelButton}>
                <Link to={`/${Number(urlParams.householdId)}/spendings`} className={style.cancelButton}>
                キャンセル
              </Link>
              </div>
            ) }
          </div>
        </form>
      </div>
      <div onClick={() => setOpenPcSpendingModal(false)} className={style.pcmodal_back}></div>
    </>
  )
}

export default AddSpending