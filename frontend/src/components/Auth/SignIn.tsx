import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';

// api
import { signIn } from '../../api/auth';
import { getTest } from '../../api/auth';

// interface
import { SignInParams } from '../../interface';

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
      console.log(res);

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

  const handleGetTest = async () => {
    try {
      const res = await getTest();
      console.log(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };


  return (
    <>
      <form>
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
        <button
          type="submit"
          disabled={
            !email || !password
            ? true
            : false
          }
          onClick={handleSubmit}
        >
          送信
        </button>
      </form>
      <Link to="/signup">
          未登録はこちら
      </Link>
    </>
  )
}

export default SignIn