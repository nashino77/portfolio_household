import React from 'react';
import { useHistory, Link } from 'react-router-dom';

// css
import style from './AddHousehold.module.scss';

// image
import MemoMark from '../../../image/nameMark.png';
import Date from '../../../image/calendar.png';

type Props = {
  setOpenHouseholdModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddHousehold: React.FC<Props> = (props) => {
  const {
    setOpenHouseholdModal
  } = props;

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
                placeholder='1'
              />
            </div>
          </div>
          <div className={style.buttonform}>
            <button className={style.saveButton}>
              保存
            </button>
            <div onClick={() => setOpenHouseholdModal(false)} className={style.cancelButton}>
              キャンセル
            </div>
          </div>
        </form>
      </div>
      <div onClick={() => setOpenHouseholdModal(false)} className={style.pcmodal_back}></div>
    </>
  )
}

export default AddHousehold