import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { useHistory } from 'react-router-dom';
import style from './Loading.module.scss';

const Loading:React.FC = () => {
  const history = useHistory();
  const {
    loading,
    setLoading,
  } = useContext(AuthContext);

  

  return (
    <div className={style.loading}>
      <div className={style.spinner}></div>
    </div>

  )
}

export default Loading