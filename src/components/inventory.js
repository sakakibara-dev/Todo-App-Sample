import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import { dummyInventory } from '../scripts/dummy';
import Summary from "./summary"

export default function Inventory() {
  const data = dummyInventory;
  let [active, setActive] = useState(0);
  let [extraLarge, setExtraLarge] = useState('');
  return <>
    {/* <nav className="h-12 bg-white text-coolGray-500 px-4 py-2 flex items-end">
      <div className="flex text-orange-500 border-b border-current w-5/12 py-0.5 mx-auto">
        <FontAwesomeIcon icon={faSearch} className="mx-1 mt-1 align-baseline" />
        <input className="focus:outline-none w-full" />
      </div>
    </nav> */}
    <div className="w-full flex border divide-coolGray-200 divide-x divide-dotted mt-4 bg-white">
      {
        Object.keys(data).map((v, i) => <section key={i} className={`w-2/12 ${active === i ? 'flex-grow' : ''} transition-all`} onClick={() => setActive(i)}>
          <div className="w-full text-center whitespace-nowrap text-coolGray-500 font-bold bg-coolGray-200 sticky top-12" onDoubleClick={() => extraLarge === v ? setExtraLarge('') : setExtraLarge(v)}>
            {active === i ? v : <FontAwesomeIcon icon={faShippingFast} className="mx-1.5 mt-1" />}
            {active === i && <span className="absolute right-0">
              <FontAwesomeIcon icon={faWindowMaximize} className="mx-1.5" />
              <FontAwesomeIcon icon={faPlus} className="mx-1.5" />
            </span>}
          </div>
          {
            data[v].map((v, j) => <Summary key={j} item={v} large={active === i}/>)
          }
        </section>)
      }
    </div>
  </>
}
