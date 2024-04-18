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
    <div className='w-full h-screen text-black px-8'>
       <nav className='w-full p-3 flex justify-between items-center'>
          <h1 className='font-bold tracking-wide text-3xl'>Weather Updates</h1>
          
       </nav>
       <BackgroundLayout></BackgroundLayout>
       <main className='w-full flex flex-wrap gap-4 py-2 justify-center'>
              <WeatherCard
                place={place}
                windspeed={weather?.wspd}
                humidity={weather?.humidity}
                temperature={weather?.temp}
                heatIndex={weather?.heatindex}
                iconString={weather?.conditions}
                conditions={weather?.conditions}
              />
              <div className='flex justify-center gap-4 flex-wrap w-[60%]'>
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