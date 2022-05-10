import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../../App';

// api
import { createHousehold } from '../../../api/household';

// function
import { useWindowDimensions } from '../../../function/window';

// css
import style from './AddHousehold.module.scss';

// image
import MemoMark from '../../../image/nameMark.png';
import Date from '../../../image/calendar.png';

// interface
import { Household } from '../../../interface';

type Props = {
  setOpenPcHouseholdModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddHousehold: React.FC<Props> = (props) => {
  const history = useHistory();
  const {
    setOpenPcHouseholdModal,
  } = props;
  const { currentUser } = useContext(AuthContext);
  const width = useWindowDimensions();

  const initialState = {
    name: '',
    referenceAt: 1,
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
      referenceAt: newHousehold.referenceAt,
    }
    console.log(params);
    if(!currentUser) return;

    try {
      const res = await createHousehold(currentUser.id, params);
      if (res?.status === 200) {
        console.log(res);
        if(width >= 1100) window.location.reload();
        history.push('/');
      }
    } catch (err :any) {
      console.log(err)
    };

    if (width >= 1100) setOpenPcHouseholdModal(false);
  };

  // 家計簿新規作成モーダルの表示判定
  const handleChangeOpenPcHouseholdModal = () => {
    setOpenPcHouseholdModal(false);
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
                name='名前'
                required
                placeholder='例: 電車代'
                value={newHousehold.name}
                onChange={handleInputChange('name')}
              />
            </div>
            <hr />
            <div className={style.input}>
              <div className={style.inputname}>
                <img src={Date} alt='input reference' />
                <h4>基準日</h4>
              </div>
              <input 
                type='number'
                name='名前'
                min='1'
                max='31'
                required
                value={newHousehold.referenceAt}
                onChange={handleInputChange('referenceAt')}
              />
            </div>
          </div>
          <div className={style.buttonform}>
            <button className={style.saveButton} onClick={handleCreateHousehold}>
              保存
            </button>
            {width < 1100 ? (
              <Link to='/' className={style.cancelButton}>
                キャンセル
              </Link>
            ) : (
              <div  onClick={handleChangeOpenPcHouseholdModal} className={style.cancelButton}>
                キャンセル
              </div>
            ) }
          </div>
        </form>
      </div>
      <div onClick={handleChangeOpenPcHouseholdModal} className={style.pcmodal_back}></div>
    </>
  )
}

export default AddHousehold