import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import Test from '../test/Test';
import Calendar from '../Calendar/Calendar'

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      <Test />
      <Calendar />
    </>
  )
}

export default Home