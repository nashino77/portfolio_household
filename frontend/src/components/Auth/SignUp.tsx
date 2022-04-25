import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';

// api
import { signUp } from '../../api/auth';


// interface
import { SignUpParams } from '../../interface';


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
    <>
      <form>
        <input 
          name="name"
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          name="email"
          required
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          name="password"
          required
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input 
          name="passwordConfirmation"
          required
          type="text"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <button
          type="submit"
          disabled={
              !name || !email || !password || !passwordConfirmation 
              ? true 
              :false
            }
          onClick={handleSubmit}
        >
          送信
        </button>
      </form>
      <Link to="/signin">
        アカウント登録済みはこちら
      </Link>
    </>
  )
}

export default SignUp