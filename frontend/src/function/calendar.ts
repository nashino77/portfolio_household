import React, { useState, useEffect, useContext } from 'react';
// date-fns
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import endOfWeek from 'date-fns/endOfWeek';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

export const getCalendarArray = (date: Date) => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
  return sundays.map((sunday) =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  );
};