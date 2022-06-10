import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { useHistory } from 'react-router-dom';
// css
import style from './Loading.module.scss';

const Loading:React.FC = () => {
  const history = useHistory();
  const { loading } = useContext(AuthContext);
  const redirect = useCallback(() => {
    return history.push('/');
  }, [history])
  useEffect(() => {
    if (loading) return;
    redirect();
  }, [loading, redirect])

  return (
    <div className={style.loading}>
      <div className={style.spinner}></div>
    </div>
  )
}

export default Loading