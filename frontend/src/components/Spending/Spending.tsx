import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// calendar
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';


// component
import Calendar from './Calendar/Calendar';

// function
import { useWindowDimensions } from '../../function/window';
import SpendingList from './SpendingList/SpendingList';

const Spending: React.FC = () => {
  const [targetDate, setTargetDate] = useState(new Date());

  const width = useWindowDimensions();


  return (
    <div>
      <h2>家計簿名</h2>
      <p>基準日</p>
      <h3>{format(targetDate, 'M月')}: ¥100,000</h3>
      <Calendar targetDate={targetDate}  setTargetDate={setTargetDate} />
      <div>使った金額を記録する</div>
      {/* { width < 1100 ? (
          <Link to='/addspending'>
            使った金額を記録する
          </Link>
        ): (
          <Link to='/addspending'>
            使った金額を記録する
          </Link>
        ) 
      } */}
      <SpendingList />
    </div>
  )
}

export default Spending