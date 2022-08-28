import './App.css';
import React, { useEffect, useState, useRef } from "react"
import Calendar from './components/calendar';
import { nanoid } from 'nanoid';
import sanitizeHtml from 'sanitize-html';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillEditor(props) {
  const [value, setValue] = useState('');
  useEffect(() => {
    if(!!props.onChange) {props.onChange(value)};
  }, [value]);

  return <ReactQuill className='flex flex-col h-full flex-shrink flex-grow-0 max-h-full min-h-0 bg-white' preserveWhitespace theme="snow" onChange={setValue} />
}

function TodoCard(props) {
  const [visible, setVisible] = useState(false);

  function onDelete() {
    if (!visible && props.onDelete) props.onDelete()
  }

  useEffect(() => {
    setVisible(true)
  }, [props]);
  return (
    <article className={'relative z-10 w-full px-4 py-2 bg-white shadow shadow-blue-100 rounded-lg shrink-0 flex flex-col group hover:shadow-lg transition-all duration-200 ' + (visible ? 'min-h-[12em] max-h-full opacity-100' : 'min-h-0 max-h-0 opacity-0')} onTransitionEnd={onDelete}>
      <div className='w-full flex gap-4 border-slate-100 border-b'>
        <span className='text-xl overflow-hidden whitespace-nowrap text-ellipsis'>{props.title || ""}</span>
        <button className='px-2 ml-auto opacity-0 group-hover:opacity-100 transition-all' onClick={() => setVisible(false)}>✖</button>
      </div>
      <div className='flex-grow overflow-hidden' dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.todo || "")}}></div>
      <div className='flex gap-4'>
        <span className='text-slate-500 text-sm ml-0 overflow-hidden whitespace-nowrap text-ellipsis'>{props.place || ""}</span>
        <span className='text-slate-500 text-sm mr-0 ml-auto whitespace-nowrap'>{props.date || ""}</span>
      </div>
    </article>
  )
}


export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [submitEnable, setSubmitEnable] = useState(false);

  useEffect(() => {
    if ((value !== '<p><br></p>' && value !== '') || title !== '' || place !== '') { 
      setSubmitEnable(true);
    }
    else {
      setSubmitEnable(false);
    }
  }, [value, title, place]);

  return <div className="max-h-screen h-screen w-screen min-h-[600px] min-w-[800px] flex-grow relative bg-slate-100 pt-10">
    <header className='bg-blue-500 h-10 w-full absolute top-0 flex'>
      <h1 className='text-white text-lg my-auto ml-4'>Todo App</h1>
    </header>
    <div className='flex h-full p-8 gap-6'>
      <div className="flex flex-col max-w-xl flex-shrink-0 w-full mx-auto h-full max-h-full">
        <div className="h-full flex w-full flex-col gap-8 max-h-full">
          <div className="flex gap-8 w-full">
            <Calendar onSelectDate={setSelectedDate} />
            <div className='flex-grow h-full flex flex-col gap-6'>
              <span className='text-xl font-extrabold mt-4 text-slate-900'>{selectedDate && selectedDate.format('YYYY/MM/DD')}</span>
              <div className='h-full flex flex-col gap-8 border p-2'>
                <span className='text-slate-500 text-sm'>option</span>
                <input className='border-b border-slate-300 text-lg text-slate-700 bg-opacity-0 bg-white py-1 px-2 w-full focus:border-orange-300 focus:outline-none' placeholder='title' onChange={e => setTitle(e.target.value)}/>
                <input className='border-b border-slate-300 text-lg text-slate-700 bg-opacity-0 bg-white py-1 px-2 w-full focus:border-orange-300 focus:outline-none' placeholder='place' onChange={e => setPlace(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="max-h-full h-full flex-shrink min-h-0">
            <div className='w-full h-full flex flex-col max-h-full flex-grow min-h-0 min-w-0'>
              <QuillEditor onChange={setValue} />
              <div className='flex'>
                <button type="button" className='ml-auto px-2 py-0.5 disabled:opacity-20' disabled={!submitEnable} onClick={() => setTodoList([...todoList, {date: selectedDate.format('YYYY-MM-DD'), todo: value, title: title, place: place, id: nanoid(7)}])}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 20 20" width="20px" fill="#334155"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='h-full max-h-full overflow-y-auto px-2 flex-grow flex flex-col gap-4 min-w-[20em]'>
        {todoList.length ? 
            todoList.map((v, i) => <TodoCard key={v.id} todo={v.todo} title={v.title} place={v.place} date={v.date} onDelete={() => setTodoList([...todoList.filter((_, j) => i !== j)])}/>)
          : <div className='h-full grid place-items-center text-slate-900'>タスクはありません</div>}
      </section>
    </div>
  </div>
}