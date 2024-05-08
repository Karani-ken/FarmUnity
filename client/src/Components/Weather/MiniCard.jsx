import { useState, useEffect } from 'react'
import { useDate } from '../../Utils/useDate'
import sun from '../../Assets/icons/sun.png'
import cloud from '../../Assets/icons/cloud.png'
import fog from '../../Assets/icons/fog.png'
import rain from '../../Assets/icons/rain.png'
import snow from '../../Assets/icons/snow.png'
import windy from '../../Assets/icons/windy.png'
import storm from '../../Assets/icons/storm.png'
import '../../index.css'
const MiniCard = ({time, temp, iconString}) => {
    const [icon, setIcon] = useState(sun)
  

    useEffect(() => {
        if (iconString) {
            if (iconString.toLowerCase().includes('cloud')) {
                setIcon(cloud)
            } else if (iconString.toLowerCase().includes('rain')) {
                setIcon(rain)
            } else if (iconString.toLowerCase().includes('clear')) {
                setIcon(sun)
            } else if (iconString.toLowerCase().includes('thunder')) {
                setIcon(storm)
            } else if (iconString.toLowerCase().includes('snow')) {
                setIcon(snow)
            } else if (iconString.toLowerCase().includes('wind')) {
                setIcon(windy)
            } else if (iconString.toLowerCase().includes('fog')) {
                setIcon(fog)
            }
        }
    },[iconString])
  return (
    <div className='glassCard w-[10rem] h-[10rem] p-2 flex  flex-col'>
        <p className='text-center'>{
            new Date(time).toLocaleTimeString('en',{weekday: 'long'}).split(' ')[0]
        }</p>

        <hr />
        <div className='w-full flex justify-center items-center flex-1'>
            <img src={icon} alt="weather_icon" className='w-[4rem] h-[4rem]' />
        </div>
        <p className="text-center font-bold">{temp}&deg;C</p>

    </div>
  )
}

export default MiniCard