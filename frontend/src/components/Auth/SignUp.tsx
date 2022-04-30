import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';

// api
import { signUp } from '../../api/auth';

// interface
import { SignUpParams } from '../../interface';

// image
import SignButton from '../../image/sign_button.png';

// css
import style from './Sign.module.scss';



const SignUp: React.FC = () => {
  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  
  // サインアップ用
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログイン処理
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/");

        console.log("サインアップしました");
      } else {
        alert('登録ができませんでした');
      };
    } catch (err: any) {
      console.log(err);
      alert('登録ができませんでした');
    };
  };
  

  return (
    <div className={style.sign}>
      <h2>登録したメール・パスワードを入力</h2>
      <div className={style.container}>
        <form className={style.signform}>
          <div className={style.input}>
            <h3>名前</h3>
            <input 
             name="name"
             required
             type="text"
             value={name}
             placeholder='名前を入力してください'
             onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <h3>メールアドレス</h3>
            <input 
              name="email"
              required
              type="email"
              placeholder='メールアドレスを入力してください'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <h3>パスワード</h3>
            <input 
              name="password"
              required
              type="text"
              placeholder='パスワードを入力してください'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <h3>パスワード(確認)</h3>
            <input 
              name="passwordConfirmation"
              required
              type="text"
              placeholder='パスワードもう1度を入力してください'
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button
            disabled={
              !email || !password
              ? true
              : false
            }
            onClick={handleSubmit}
          >
            <img src={SignButton} alt="sign button" />
            サインイン
          </button>
        </form>
      </div>
      <div className={style.changebutton}>
        登録していない場合は
        <Link to="/signin">
            こちら
        </Link>
      </div>
    </div>
  )
}

export default SignUp