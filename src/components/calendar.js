import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import * as dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');

function formatMonthName(month) {
  return [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ][month];
}

export default function Calendar(props) {
  const today = dayjs();
  let [currentDate, setCurrentDate] = useState(dayjs(today));
  let [selectedDate, setSelectedDate] = useState(dayjs(today));
  
  useEffect(() => {
    if (props && props.onSelectDate) props.onSelectDate(selectedDate);
  }, [selectedDate])

  const getCurrentMonth = () => {
    let currentMonth = currentDate.set('date', 1);
    let nextMonth = currentMonth.add(1, 'month').set('date', 1);
    let start = currentMonth.subtract(currentMonth.day(), 'day');
    let end = nextMonth.add((7 - nextMonth.day()) % 7, 'day');
    let fullMonth = [];
    for (; start < end; start = start.add(1, 'day')) {
      fullMonth.push(start);
    }
    return fullMonth;
  }

  const getCurrentWeek = () => {
    let start = selectedDate.subtract(selectedDate.day(), 'day');
    let end = selectedDate.add(7 - selectedDate.day() % 7, 'day');
    let fullWeek = [];
    for (; start < end; start = start.add(1, 'day')) {
      fullWeek.push(start);
    }
    return fullWeek;
  }

  const isToday = (date) => {
    return date.date() === today.date()
        && date.month() === today.month()
        && date.year() === today.year();
  }

  const isSelectedDate = (date) => {
    return date.date() === selectedDate.date()
        && date.month() === selectedDate.month()
        && date.year() === selectedDate.year();
  }

  return <div>
    <div className="flex flex-col border border-slate-300 bg-white p-4">
      <div className="font-bold flex bg-white relative">
        <span className="mr-auto ml-2 w-8 absolute left-0">{ currentDate.year() }</span>
        <span className="mx-auto flex">
          <span className="my-auto px-4" onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}><FontAwesomeIcon icon={faAngleLeft} /></span>
          <span className="my-auto px-1 w-24 text-center">{formatMonthName(currentDate.month())}</span>
          <span className="my-auto px-4" onClick={() => setCurrentDate(currentDate.add(1, 'month'))}><FontAwesomeIcon icon={faAngleRight} /></span>
        </span>
      </div>
      <div className="bg-coolGray-50">
        <div className={`grid grid-cols-7 gap-2`}>
          {['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'].map(v => <span className="text-xs text-coolGray-500 text-center mt-2 mb-2" key={v}>{v}</span>)}
        </div>
        <div className={`grid grid-cols-7 gap-[6px] auto-rows-fr transition-all`}>
          {
            getCurrentMonth().map((v, i) => <article className={`w-8 h-8 flex flex-col cursor-pointer ${isSelectedDate(v) ? 'border-blue-300' : 'border-transparent'} hover:bg-blue-200 rounded-full group transition-all`} key={i} onClick={() => setSelectedDate(dayjs(v))}>
              <div className={`m-auto w-8 h-8 rounded-full ${isToday(v) ? 'bg-blue-100' : ''} group-hover:bg-blue-200 grid place-content-center text-xs font-bold ${v.day() ? v.day() === 6 ? 'text-blue-500' : 'text-slate-500' : 'text-red-500'} ${v.month() !== currentDate.month() ? 'text-slate-300' : ''}  group-hover:text-blue-50`}>{v.date()}</div>
            </article>)
          }
        </div>
      </div>
    </div>
  </div>
}
