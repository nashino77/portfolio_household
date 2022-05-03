import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// component
import Loading from './components/Loading/Loading';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Header from './components/Header/Header';
import HouseHold from './components/Household/HouseHold';
import AddHousehold from './components/Household/AddHouseHold/AddHousehold';

// api
import { getCurrentUser } from './api/auth';

// interface
import { User } from './interface';

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

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(currentUser);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentUser]);

  // ユーザー認証済みの判定で表示ページの変更
  const Private = ({ children } :{ children: React.ReactElement } ) => {
    if (!loading) {
      if (isSignedIn) {
        return ( children )
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <Redirect to="/loading" />
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
            <Route exact path="/loading" component={Loading} />
              <Private>
                <Switch>
                  <Route exact path="/" component={HouseHold} />
                  <Route exact path="/addhousehold" component={AddHousehold} />
                </Switch>
              </Private>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
