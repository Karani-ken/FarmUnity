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
const WeatherCard = ({
    temperature,
    windspeed,
    humidity,
    place,
    heatIndex,
    iconString,
    conditions,
}) => {
    const [icon, setIcon] = useState(sun)
    const {time} = useDate()

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
        <div className='w-[20rem] min-w-[10rem] h-[27rem] glassCard p-2'>
            <div className='flex w-full justify-center items-center gap-2 mt-10 mb-2'>
                <img src={icon} alt="weather_icon" />
                <p className='font-bold text-2xl flex justify-center items-center'>{temperature} &deg;C</p>
            </div>
            <div className='font-bold text-center text-xl'>
                {place}
            </div>
            <div className='w-full flex justify-between items-center mt-2'>
                <p className='flex-1 text-center p-1'>{new Date().toDateString()}</p>
                <p className='flex-1 text-center p-1'>{time}</p>
            </div>
            <div className='w-full flex justify-center items-center mt-2 gap-2'>
                <p className='flex-1 text-center p-1 font-bold bg-blue-600 shadow rounded-lg'>
                    Wind Speed <p className='font-normal'>{windspeed}</p></p>
                <p className="flex-1 text-center p-1 font-bold rounded-lg bg-green-600">
                    Humidity <p className='font-normal'>{humidity}</p></p>
            </div>
            <div className='w-full p-1 mt-2 flex justify-between items-center'>
                <p className='font-semibold text-lg'>Heat Index <p className='text-lg'>{
                    heatIndex ? heatIndex : 'N/A'}
                </p></p>
            </div>
            <hr className='bg-slate-600'/>
            <div className='w-full p-1 flex justify-center items-center text-2xl font-semibold'> 
                    {conditions}
            </div>

        </div>
    )
}

export default WeatherCard