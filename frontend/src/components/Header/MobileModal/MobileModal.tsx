import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../App';

// component
import { signOut } from '../../../api/auth';

// css
import style from './MobileModal.module.scss';


type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileModal: React.FC<Props> = (props) => {
  const {
    modalOpen,
    setModalOpen
  } = props;

  const history = useHistory();
  const { isSignedIn, setIsSignedIn} = useContext(AuthContext);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await signOut();
  
      if(res.data.success === true) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
  
        setIsSignedIn(false);
        history.push("/signin");
  
        console.log('サインアウトしました')
      } else {
        console.log('サインアウトに失敗しました')
        alert('サインアウトできませんでした')
      }
    } catch (err: any) {
      console.log(err);
      alert('サインアウトできませんでした')
    };

    setModalOpen(false);
  };


  return (
    <div>
      <div className={`${style.mobilemodal} ${ modalOpen ? style.openmodal : '' }`}>
        <div className={style.inner}>
          <div className={style.list}>
            <p>
              <Link to='/'>
                <span onClick={() => setModalOpen(false)}>
                  家計簿を<br />選ぶ
                </span>
              </Link>
            </p>
            { isSignedIn ? <p onClick={handleSignout}>サイン<br />アウト</p> : <p><Link to='/singin'>サイン<br />イン</Link></p> }
          </div>
        </div>
      </div>
      <div 
        className={`${style.modalback} ${ modalOpen ? style.modalback_open : '' }`} 
        onClick={handleModal}
      >
      </div>
    </div>
  )
}

export default MobileModal