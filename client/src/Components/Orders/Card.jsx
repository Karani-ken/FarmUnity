import React from 'react'

const Card = ({status, count, bg}) => {
  return (
    <div className={`shadow-xl p-2 m-2 h-32 w-32 text-center ${bg} text-white rounded-lg`}>
        <h4 className="text-xl p-2">{status}</h4>
        <h1 className="font-bold  text-2xl">{count}</h1>
    </div>
  )
}

export default Card