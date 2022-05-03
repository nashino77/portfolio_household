import React, {  useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';

// component
import { signOut } from '../../api/auth';
import MobileModal from './MobileModal/MobileModal';

//css
import style from './Header.module.scss';

// image
import MobileMenuButton from '../../image/mobileMenu.png';
import MobileMenuCrossButton from '../../image/mobilemenu_crossmark.png';


const Header: React.FC = () => {
  const history = useHistory();

  const { 
    isSignedIn, 
    setIsSignedIn, 
    modalOpen, 
    setModalOpen,
  } = useContext(AuthContext);

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
    }
  };

  return (
    <>
      <div className={style.header}>
        <h1>わたしの家計簿</h1>
        <div className={style.mobilemenu}>
          <img 
            onClick={handleModal} 
            className={modalOpen ? style.crossmark : style.mobilemenuBack }
            src={ modalOpen ? MobileMenuCrossButton : MobileMenuButton } 
            alt='header menu' 
          />
        </div>

        <ul className={style.pcmenu}>
          <li><Link to='/'>家計簿を選ぶ</Link></li>
          <li>{ isSignedIn ? <span onClick={handleSignout}>サインアウト</span> : <Link to='/signin'>サインイン</Link>}</li>
        </ul>
      </div>
      {
        modalOpen && (
          <>
            <div className={style.modalback} onClick={handleModal}></div>
          </>
        )
      }
      <MobileModal/>
    </>
  )
}

export default Header