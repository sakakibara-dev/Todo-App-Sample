import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function Summary(props) {
  const large = props.large;
  const item = props.item;
  return <article className="flex py-1">
    { large && <FontAwesomeIcon icon={faCaretRight} className="mx-2 mt-1.5 align-bottom text-coolGray-400 text-xs md:text-sm" />}
    <div className="flex-grow flex-shrink  min-w-0">
      <div className="px-1 flex items-start text-sm md:text-base">
        <span className="ml-0 mr-auto pr-1 overflow-ellipsis whitespace-nowrap overflow-hidden text-coolGray-900">{item.name}</span>
        <span className="text-right font-bold text-coolGray-700 mx-1">{item.quantity}</span>  
      </div>
      <div className="px-1 leading-none">
        <span className="text-xs text-coolGray-400 font-thin whitespace-nowrap overflow-ellipsis overflow-hidden">{large ? '詳細　説明' : '...'}</span>
      </div>
      <div className="px-1 leading-none">
        <span className="text-xs text-coolGray-400 font-thin whitespace-nowrap overflow-ellipsis overflow-hidden">{large ? '連絡先' : '...'}</span>
      </div>
    </div>
  </article>
}