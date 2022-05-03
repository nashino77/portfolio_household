import React from 'react';


// css
import style from './AddHousehold.module.scss';

const AddHousehold: React.FC = () => {
  return (
    <div className={style.addhousehold}>
      <form>
        <div className={style.input}>
          <h4>名前</h4>
          <input 
            type='text'
            name='名前'
            placeholder='名前を入力してください'
          />
        </div>
        <div className={style.input}>
          <h4>基準日</h4>
          <input 
            type='number'
            name='名前'
            placeholder='数字を入力してください'
            min='1'
            max='31'
          />
        </div>
        <div>
          <button >
            保存
          </button>
          <button >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddHousehold