import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const AddSpending: React.FC = () => {
  const urlParams = useParams<{householdId: string}>();

  const handleUrl = () => {
    console.log(urlParams);
  };

  return (
    <div onClick={handleUrl}>
      AddSpending
    </div>
  )
}

export default AddSpending