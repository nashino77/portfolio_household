import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../../App';

// api
import { createHousehold } from '../../../api/household';

// css
import style from './AddHousehold.module.scss';

// image
import MemoMark from '../../../image/nameMark.png';
import PriceMark from '../../../image/priceMark.png';

// interface
import { Household } from '../../../interface';

const AddHousehold: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const initialState = {
    name: '',
    amountPlanned: 0,
  };
  const [newHousehold, setNewHousehold] = useState(initialState);

  // 入力値の取得
  const handleInputChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setNewHousehold({ ...newHousehold, [input]: target.value});
  };

  // 家計簿の新規作成
  const handleCreateHousehold = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: Household ={
      name: newHousehold.name,
      amountPlanned: newHousehold.amountPlanned,
    }

    if(!currentUser) return;
    try {
      const res = await createHousehold(currentUser.id, params);
      if (res?.status === 200) {
        history.push('/');
      }
    } catch (err :any) {
      console.log(err);
      alert('登録ができませんでした')
    };
  };

  return (
    <>
      <div className={style.addhousehold}>
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
                value={newHousehold.name}
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
                value={newHousehold.amountPlanned}
                onChange={handleInputChange('amountPlanned')}
              />
            </div>
          </div>
          <div className={style.buttonform}>
            <button className={style.saveButton} onClick={handleCreateHousehold}>
              保存
            </button>
            <Link to='/' className={style.cancelButton}>
                キャンセル
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddHousehold