import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { testUrl, indexUser, signInUser } from './urls';

const App: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(indexUser)
      .then((res) => {
        console.log(res.data)
      })

  }, []);


  return (
    <div>
    </div>
  );
}

export default App;
