import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';

// api
import { signIn } from '../../api/auth';

// interface
import { SignInParams } from '../../interface';

// image
import SignButton from '../../image/sign_button.png';

// css
import style from './Sign.module.scss';

const SignIn: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/");

        console.log("サインインしました");
      } else {
        alert("サインインできませんでした")
      }
    } catch (err: any) {
      alert("サインインできませんでした")
    };
  };


  return (
    <div className={style.sign}>
      <h2>登録したメール・パスワードを入力</h2>
      <div className={style.container}>
        <form className={style.signform}>
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
        <Link to="/signup">
            こちら
        </Link>
      </div>
    </div>
  )
}

export default SignIn