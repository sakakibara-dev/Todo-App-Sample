import React from "react"
import Summary from '../components/summary'


const data = [
  { name: 'item A long long name blah blah blah', quantity: 100, description: 'more description ...', contact: 'contact@example.com' },
  { name: 'item B', quantity: 20, description: 'blah blah blah ...', contact: 'twitter@user_id' },
  { name: 'item C', quantity: 1, description: 'lorem ipsum', contact: 'contact@example.com' },
  { name: 'item D', quantity: 3, description: '', contact: '123-4567-8901' },
];

export default function Weekly(props) {
  let week = [];
  for (let i = 0; i < 7; i++) {
    week.push(props.selectedDate.add(i, 'day'));
  }

  return <div className="w-full h-full overflow-y-auto flex flex-col space-y-2 custom-scrollbar">
    { week.map((date, i) =>
      <div key={i} className="flex">
        <div className="w-1/6 rounded h-full bg-orange-200 text-white text-2xl font-bold text-center">
          <span className="sticky top-0 mb-4">{ date.date() }</span>
        </div>
        <div className="w-5/6 px-4 space-y-1">
          {
            data.map((v, j) => <Summary key={j} item={v} large={true} />)
          }
        </div>
      </div>
    )}
  </div>
}