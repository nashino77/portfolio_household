import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import Test from '../test/Test';

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {/* {
        isSignedIn && currentUser ? (
          <>
            <h1>サインイン成功しました</h1>
            <h2>{currentUser?.email}</h2>
            <h2>{currentUser?.name}</h2>
          </>
        ) : (
          <h1>サインインしていません</h1>
        )
      } */}
      <Test />
    </>
  )
}

export default Home