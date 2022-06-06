import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App';
// api
import { editHousehold, getHousehold } from '../../../api/household';
// css
import style from './EditHousehold.module.scss';
// image
import MemoMark from '../../../image/nameMark.png';
import PriceMark from '../../../image/priceMark.png';
// interface
import { Household } from '../../../interface';

const EditHousehold: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const urlParams = useParams<{householdId: string;}>();
  const initialState = {
    name: '',
    amountPlanned: 0,
  };
  const [currentHousehold, setCurrentHousehold] = useState(initialState);
  // 入力値の取得
  const handleInputChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setCurrentHousehold({ ...currentHousehold, [input]: target.value});
  };
  // 家計簿の詳細取得
  const handleGetHousehold = async () => {
    if (!currentUser) return;
    try {
      const res = await getHousehold(currentUser.id, Number(urlParams.householdId));
      setCurrentHousehold(res?.data);
    } catch (err: any) {
      console.log("情報が取得できていません");
    }
  };
  // 家計簿の編集
  const handleEditHousehold = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: Household ={
      name: currentHousehold.name,
      amountPlanned: currentHousehold.amountPlanned,
    }
    if(!currentUser) return;
    try {
      const res = await editHousehold(currentUser.id, Number(urlParams.householdId), params);
      if (res?.status === 200) {
        history.push(`/${Number(urlParams.householdId)}/spendings`);
      }
    } catch (err :any) {
      alert('登録ができませんでした')
    };
  };
  useEffect(() => {
    handleGetHousehold();
  }, [])

  return (
    <>
      <div className={style.edithousehold}>
        <form>
          <div className={style.inputform}>
            <div className={style.input}>
              <div className={style.inputname}>
                <img src={MemoMark} alt='input name' />
                <h4>名前</h4>
              </div>
              <input 
                type='text'
                name='name'
                required
                placeholder='例: 電車代'
                value={currentHousehold.name}
                onChange={handleInputChange('name')}
              />
            </div>
            <hr />
            <div className={style.input}>
              <div className={style.inputname}>
                <img src={PriceMark} alt='input reference' />
                <h4>利用予定額</h4>
              </div>
              <input 
                type='number'
                name='plannedAmount'
                min='0'
                max='99999999'
                required
                value={currentHousehold.amountPlanned}
                onChange={handleInputChange('amountPlanned')}
              />
            </div>
          </div>
          <div className={style.buttonform}>
            <button className={style.saveButton} onClick={handleEditHousehold}>保存</button>
            <Link to='/' className={style.cancelButton}>キャンセル</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditHousehold