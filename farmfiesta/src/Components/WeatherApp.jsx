import React,{useState} from 'react'
import search from '../Assets/Image/search.svg'
import BackgroundLayout from './Weather/BackgroundLayout'
import WeatherCard from './Weather/WeatherCard'
import { useStateContext } from '../Context'
import MiniCard from './Weather/MiniCard'
const WeatherApp = () => {
  const [input, setInput] = useState('')
  const {weather,location,values,place} = useStateContext()

  return (
    <div className='w-full h-screenn text-white px-8'>
       <nav className='w-full p-3 flex justify-between items-center'>
          <h1 className='font-bold tracking-wide text-3xl'>Weather Updates</h1>
          <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
            <input type='text' 
            onKeyUp={(e) =>{
              if(e.key === 'Enter'){
                //submit the form
              }
            }}
            className='focus:outline-none w-full text-[#212121] text-lg'value={input} onChange={e => setInput(e.target.value)}/>

          </div>
       </nav>
       <BackgroundLayout></BackgroundLayout>
       <main className='w-full flex flex-wrap gap-8 py-4 justify-center'>
              <WeatherCard
                place={place}
                windspeed={weather?.wspd}
                humidity={weather?.humidity}
                temperature={weather?.temp}
                heatIndex={weather?.heatindex}
                iconString={weather?.conditions}
                conditions={weather?.conditions}
              />
              <div className='flex justify-center gap-0 flex-wrap w-[60%]'>
                    {
                      values?.slice(1, 7).map(curr =>{
                       return( 
                       <MiniCard 
                          key={curr.datetime}
                          time={curr.datetime}
                          temp={curr.temp}
                          iconString={curr.conditions}
                        />
                       )
                      })
                    }
              </div>
       </main>
    </div>
  )
}

export default WeatherApp