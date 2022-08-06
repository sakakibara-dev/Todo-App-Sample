import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faCalendarWeek, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
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
  let [tall, setTall] = useState(false);
  const today = dayjs();
  let [currentDate, setCurrentDate] = useState(dayjs(today));
  let [selectedDate, setSelectedDate] = useState(dayjs(today));
  
  useEffect(() => {
    
  console.log("####################")
  console.log(props)
    //if (props && props.onSelectDate) props.onSelectDate.dayjs(selectedDate);
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

  const changeCalender = () => {
    setCurrentDate(dayjs(selectedDate));
    setTall(!tall);
  }

  const beforeDate = () => {
    let date = selectedDate.subtract(1, 'day');
    setSelectedDate(dayjs(date));
    setCurrentDate(dayjs(date));
  }

  const nextDate = () => {
    let date = selectedDate.add(1, 'day');
    setSelectedDate(dayjs(date));
    setCurrentDate(dayjs(date));
  }

  return <>
    <div className="px-4 pb-0.5 pt-4 text-xl font-bold flex bg-white">
      <span className="mr-auto w-16">{ currentDate.year() }</span>
      {
        tall ? <span className="mx-auto flex">
          <span className="my-auto px-4" onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}><FontAwesomeIcon icon={faAngleLeft} /></span>
          <span className="my-auto px-1 w-24 text-center">{formatMonthName(currentDate.month())}</span>
          <span className="my-auto px-4" onClick={() => setCurrentDate(currentDate.add(1, 'month'))}><FontAwesomeIcon icon={faAngleRight} /></span>
        </span>:
        <span className="mx-auto flex">
          <span className="my-auto px-4" onClick={beforeDate}><FontAwesomeIcon icon={faAngleLeft} /></span>
          <span className="my-auto px-1 w-24 text-center">{`${selectedDate.month() + 1} / ${selectedDate.date()}`}</span>
          <span className="my-auto px-4" onClick={nextDate}><FontAwesomeIcon icon={faAngleRight} /></span>
        </span>
      }
      <span className="ml-auto cursor-pointer w-16 text-right">
        <FontAwesomeIcon icon={tall ? faCalendarWeek : faCalendarAlt } className="" onClick={changeCalender} />
      </span>
    </div>
    <div className="bg-coolGray-50 p-px">
      {
        tall && <div className={`grid grid-cols-7 gap-px`}>
          {['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'].map(v => <span className="text-xs text-coolGray-500 bg-white text-center leading-loose" key={v}>{v}</span>)}
        </div>
      }
      <div className={`grid grid-cols-7 gap-px auto-rows-fr ${tall ? 'h-80' : 'h-16'} transition-all`}>
        {
          (tall ? getCurrentMonth() : getCurrentWeek()).map((v, i) => <article className={`${v.month() !== currentDate.month() ? '' : 'bg-white'} flex flex-col border ${isSelectedDate(v) ? 'border-blue-300' : 'border-transparent'} hover:bg-blue-50 group transition-all`} key={i} onClick={() => setSelectedDate(dayjs(v))}>
            <div className={`mt-1.5 mx-auto w-6 h-6 rounded-full ${isToday(v) ? 'bg-blue-50' : ''} grid place-content-center text-xs font-extrabold ${v.day() ? v.day() === 6 ? 'text-blue-500' : 'text-slate-500' : 'text-red-500'} group-hover:text-blue-500`}>{v.date()}</div>
            <div className="m-auto flex">
              <span className="bg-blue-500 w-1 h-1 mx-0.5 rounded-full"></span>
              <span className="bg-yellow-500 w-1 h-1 mx-0.5 rounded-full"></span>
              <span className="bg-green-500 w-1 h-1 mx-0.5 rounded-full"></span>
              <span className="bg-red-500 w-1 h-1 mx-0.5 rounded-full"></span>
            </div>
          </article>)
        }
      </div>
    </div>
  </>
}
