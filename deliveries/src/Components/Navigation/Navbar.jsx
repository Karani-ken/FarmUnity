import React from 'react'
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div>
      <nav className='p-3 bg-emerald-500 text-white justify-around flex flex-wrap'>
        <h1 className='font-bold text-2xl p-2'>Farm Unity Deliveries</h1>
        <ul className='flex justify-evenly'>
          <li className='m-2 font-semibold'>
            <Link to="/">Dashboard</Link>
          </li>
          <li className='m-2 font-semibold'>
            <Link to="/login">Sign in</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Homepage