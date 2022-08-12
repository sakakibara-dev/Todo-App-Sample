import './App.css';
import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle, faUser } from '@fortawesome/free-regular-svg-icons';
import Calendar from './components/calendar';
import Weekly from "./components/weekly";
import Inventory from './components/inventory';
// import Editor from './components/editor';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillEditor() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill className='flex flex-col h-full flex-shrink flex-grow-0 max-h-full min-h-0 bg-white' preserveWhitespace theme="snow" value={value} onChange={setValue}/>
  );
}

function Modal(props) {
  let [shouldRender, setRender] = useState(false);

  useEffect(() => {
    if (props.show) setRender(true);
  }, [props.show]);

  return (props.show || shouldRender ) && <section className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex z-40 ${ (props.show && shouldRender) ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={props.onClose} onTransitionEnd={ () => { setRender(props.show) }}>
    <div className="w-screen h-screen fixed flex">
      <div className="bg-white m-auto mt-16 md:m-auto w-3/4 md:w-1/2 flex flex-col" onClick={(e) => e.stopPropagation() }>
        <FontAwesomeIcon icon={faTimesCircle} className="text-2xl mt-2 mr-2.5 ml-auto text-coolGray-500 cursor-pointer" onClick={props.onClose} />
        <form className="p-8 space-y-4 leading-loose font-thin text-coolGray-500">
          <div className="flex space-x-4">
            <label for="input-date" className="w-12">日付</label>
            <input type="date" id="input-date" className="px-2 flex-grow border rounded focus:border-orange-200 focus:outline-none" />
          </div>
          <div className="flex">
            <span className="w-12">タイプ</span>
            <span className="ml-4"><input type="radio" id="input-receiving" name="receiving-or-shipping"/><label for="input-receiving" className="ml-1">入荷</label></span>
            <span className="ml-4"><input type="radio" id="input-shipment" name="receiving-or-shipping" checked className="ml-2"/><label for="input-shipment" className="ml-1">出荷</label></span>
          </div>
          <div className="flex space-x-4">
            <label for="input-item-name">アイテム</label><input type="text" id="input-item-name" className="px-2 flex-grow border rounded focus:border-orange-200 focus:outline-none"/>
          </div>
          <div className="flex space-x-4">
            <label for="input-contact">連絡先</label><input type="text" id="input-contact" className="px-2 flex-grow border rounded focus:border-orange-200 focus:outline-none"/>
          </div>
          <div className="flex space-x-4 h-32">
            <label for="input-discription" className="w-12">詳細</label>
            <textarea id="input-discription" className="px-2 flex-grow border rounded focus:border-orange-200 focus:outline-none" />
          </div>
          <div className="flex justify-end space-x-2 text-xs">
            <button className="text-coolGray-400 w-24 h-8 rounded">キャンセル</button>
            <button className="text-white bg-orange-400 w-24 h-8 rounded">OK</button>
          </div>
        </form>
      </div>
    </div>
  </section>
}

function Sidebar(props) {
  let [shouldRender, setRender] = useState(false);

  useEffect(() => {
    if (props.show) setRender(true);
  }, [props.show]);

  return (props.show || shouldRender ) && <section className="z-40 h-screen w-screen pt-12 fixed flex" onClick={ props.onClose }>
    <nav className={`${ (props.show && shouldRender) ? 'w-64' : 'w-0'} min-w-0 overflow-hidden bg-orange-50 text-orange-400 text-lg font-thin space-y-2 shadow-lg transition-all`} onClick={(e) => e.stopPropagation()} onTransitionEnd={ () => { setRender(props.show) }}>
      <div className="w-full h-full p-6 space-y-1">
        <div className="cursor-pointer">
          ダッシュボード
        </div>
        <div className="cursor-pointer">
          アカウント
        </div>
        <div className="cursor-pointer">
          ヘルプ
        </div>
      </div>
    </nav>
  </section>
}

//export default function App() {
function Buckup() {
  let [showModal, setShowModal] = useState(false);
  let [showSidebar, setShowSidebar] = useState(false);
  let [selectedDate, setSelectedDate] = useState(null);

  return <div className="min-h-screen relative bg-gray-100">
    <Modal show={showModal} onClose={() => setShowModal(false)}/>
    <header className="flex h-12 w-full text-white bg-blue-600 z-10 fixed top-0 shadow-md shadow-blue-100">
      <FontAwesomeIcon icon={faBars} className="my-auto ml-4 align-baseline text-2xl" onClick={() => setShowSidebar(true)} />
      <h1 className="ml-2 my-auto mr-auto text-bold text-xl font-bold">inventory</h1>
      <span className="text-sm my-auto ml-auto cursor-pointer">ヘルプ</span>
      <div className="mx-4 my-auto rounded-full bg-white py-0.5 px-2 text-coolGray-700 text-base font-bold cursor-pointer">
        <FontAwesomeIcon icon={faUser} /> {"email"}
      </div>
    </header>
    <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)}/>
    <main className="flex flex-col md:flex-row md:px-4 lg:px-32 md:space-x-8 lg:space-x-32 bg-slate-100">
      <section className="pb-12 md:pt-16 pt-16 md:w-5/12 flex flex-col md:h-screen md:sticky top-0">
        <section className="bg-slate-50 shadow-lg shadow-sky-50 text-coolGray-700 text-lg">
          <Calendar onSelectDate={(v) => setSelectedDate(v)}/>
        </section>
        <section className="px-4 md:px-0 mt-12 h-52 flex-grow">
          <Weekly selectedDate={selectedDate}/>
        </section>
      </section>
      <section className="pb-8 pt-16 md:w-7/12">
        <Inventory />
      </section>
    </main>
    <button className="w-12 h-12 bottom-4 right-4 fixed bg-blue-500 text-white text-lg rounded-full focus:outline-none" onClick={() => setShowModal(true)}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  </div>
}


export default function App() {
  let [selectedDate, setSelectedDate] = useState(null);

  return <div className="min-h-screen max-h-screen relative bg-slate-100">
    <div className="flex w-full h-screen max-h-screen gap-8 p-8">
      <div className="h-full flex flex-col gap-8 max-h-full">
        <div className="flex gap-8">
          <Calendar onSelectDate={(v) => setSelectedDate(v)}/>
          <div className='bg-blue-300 w-80 h-full'></div>
        </div>
        <div className="max-h-full h-full flex-shrink min-h-0">
          <div className='w-full h-full flex flex-col max-h-full flex-shrink flex-grow-0 min-h-0 min-w-0'>
            <QuillEditor />
            <div className='border-b border-slate-300 h-16'></div>
          </div>
        </div>
      </div>
      <div className="quill h-full flex-grow shadow shadow-blue-50 bg-white">
        
      </div>
    </div>
  </div>
}