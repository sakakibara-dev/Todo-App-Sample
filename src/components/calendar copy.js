// import React, { useEffect, useReducer, useState } from "react"
// import '../styles/tailwind.css'
// import '../styles/scrollbar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendarAlt, faCalendarWeek, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
// import * as dayjs from 'dayjs';

// function initialState() {
//   let today = dayjs();
//   return {
//     today: dayjs(today),
//     currentDate: dayjs(today),
//     selectedDate: dayjs(today)
//   }
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment-month':
//       return {...state, currentDate: state.currentDate.add(1, 'month')};
//     case 'decrement-month':
//       return {...state, currentDate: state.currentDate.subtract(1, 'month')};
//     case 'increment-year':
//       return {...state, currentDate: state.currentDate.add(1, 'year')};
//     case 'decrement-year':
//       return {...state, currentDate: state.currentDate.subtract(1, 'year')};
//     case 'select-date':
//       return {...state, selectedDate: state.currentDate.add(1, 'year')};
//     case 'reset':
//       return init(action.payload);
//     default:
//       throw new Error();
//   }
// }

// function useCalendar() {
//   let [today] = useState(dayjs());
//   let [currentDate, setCurrentDate] = useState(dayjs(today));

//   const getCurrentMonth = () => {
//     let currentMonth = currentDate.set('date', 1);
//     let nextMonth = currentMonth.add(1, 'month').set('date', 1);
//     let start = currentMonth.subtract(currentMonth.day(), 'day');
//     let end = nextMonth.add((7 - nextMonth.day()) % 7, 'day');
//     let fullMonth = [];
//     for (; start < end; start = start.add(1, 'day')) {
//       fullMonth.push(start);
//     }
//     return fullMonth;
//   }

//   const getCurrentWeek = () => {
//     let start = currentDate.subtract(currentDate.day(), 'day');
//     let end = currentDate.add(7 - currentDate.day() % 7, 'day');
//     let fullWeek = [];
//     for (; start < end; start = start.add(1, 'day')) {
//       fullWeek.push(start);
//     }
//     return fullWeek;
//   }

//   const isToday = (date) => {
//     return date.date() === today.date()
//         && date.month() === today.month()
//         && date.year() === today.year();
//   }

//   month() {
//     return this.formatMonthName(this.currentDate.month());
//   }

//   nextMonth() {
//     this.currentDate = this.currentDate.add(1, 'month');
//   }

//   beforeMonth() {
//     this.currentDate = this.currentDate.subtract(1, 'month');
//   }

//   formatMonthName(month) {
//     return [
//       'January', 'February', 'March', 'April',
//       'May', 'June', 'July', 'August',
//       'September', 'October', 'November', 'December'
//     ][month];
//   }

//   let nextMonth;
//   let beforeMonth;
//   useEffect(() => {
//     nextMonth = () => {
//       this.currentDate = this.currentDate.add(1, 'month');
//     }
  
//     beforeMonth() {
//       this.currentDate = this.currentDate.subtract(1, 'month');
//     }
//   }, []);
// }

// export default function Calendar() {
//   let [tall, setTall] = useState(false);
//   // let calendar = new Schedule();
//   let [state, dispatch] = useReducer(reducer, undefined, init);

//   return <>
//     <div className="bg-white px-4 py-0.5 mt-4 text-xl font-bold flex">
//       <span className="mr-auto w-16">2021</span>
//       <span className="mx-auto">
//         <span className="my-auto px-4" onClick={calendar.beforeMonth}><FontAwesomeIcon icon={faAngleLeft} /></span>
//         <span className="my-auto px-1">{calendar.month()}</span>
//         <span className="my-auto px-4" onClick={calendar.nextMonth}><FontAwesomeIcon icon={faAngleRight} /></span>
//       </span>
//       <span className="ml-auto cursor-pointer w-16 text-right">
//         <FontAwesomeIcon icon={tall ? faCalendarWeek : faCalendarAlt } className="" onClick={() => setTall(!tall) } />
//       </span>
//     </div>
//     <div className="bg-coolGray-50 p-px">
//       {
//         tall && <div className={`grid grid-cols-7 gap-px`}>
//           {['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'].map(v => <span className="text-xs text-coolGray-500 bg-white text-center leading-loose" key={v}>{v}</span>)}
//         </div>
//       }
//       <div className={`grid grid-cols-7 gap-px auto-rows-fr ${tall ? 'h-80' : 'h-16'} transition-all`}>
//         {
//           (tall ? calendar.getCurrentMonth() : calendar.getCurrentWeek()).map((v, i) => <article className={`${v.month() !== calendar.currentDate.month() ? '' : 'bg-white'} flex flex-col`} key={i}>
//             <div className={`mt-1.5 mx-auto w-6 h-6 rounded-full ${calendar.isToday(v) ? 'bg-orange-50' : ''} grid place-content-center text-xs font-extrabold ${v.day() ? v.day() === 6 ? 'text-blue-500' : 'text-coolGray-500' : 'text-red-500'}`}>{v.date()}</div>
//             <div className="m-auto flex">
//               <span className="bg-blue-500 w-1 h-1 mx-0.5 rounded-full"></span>
//               <span className="bg-yellow-500 w-1 h-1 mx-0.5 rounded-full"></span>
//               <span className="bg-green-500 w-1 h-1 mx-0.5 rounded-full"></span>
//               <span className="bg-red-500 w-1 h-1 mx-0.5 rounded-full"></span>
//             </div>
//           </article>)
//         }
//       </div>
//     </div>
//   </>
// }
