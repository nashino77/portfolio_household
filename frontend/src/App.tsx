import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// component
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Home from './components/Layout/Home';
import Header from './components/Header/Header';

// api
import { getCurrentUser } from './api/auth';

// interface
import { User } from './interface';
import Calendar from './components/Calendar/Calendar';

// css
import style from './App.module.scss';

export const AuthContext = createContext(
  {} as {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isSignedIn: boolean,
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
    currentUser: User | undefined,
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>,
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 認証済みユーザー情報の取得関数
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        // console.log(res?.data.data);
      } else {
        console.log("No current user");
      };
    } catch (err : any) {
      console.log(err);
    }

    setLoading(false);
  };
  
  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // ユーザー認証済みの判定で表示ページの変更
  const Private = ({ children } : { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    };
  };

  return (
    <div className={style.body}>
      <Router>
        <AuthContext.Provider
          value={{
            loading,
            setLoading,
            isSignedIn,
            setIsSignedIn,
            currentUser,
            setCurrentUser,
            modalOpen,
            setModalOpen,
            }}
          >
          <Header />
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Private>
              <Route exact path="/" component={Home} />
            </Private>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
