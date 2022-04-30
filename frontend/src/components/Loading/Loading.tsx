import React from 'react';
import style from './Loading.module.scss';

const Loading:React.FC = () => {
  return (
    <div className={style.loading}>
      <div className={style.spinner}></div>
    </div>
  )
}

export default Loading