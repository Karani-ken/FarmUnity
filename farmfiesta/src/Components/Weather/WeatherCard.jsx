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
        <div className='w-[20rem] min-w-[15rem] h-[40rem] glassCard p-4'>
            <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
                <img src={icon} alt="weather_icon" />
                <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
            </div>
            <div className='font-bold text-center text-xl'>
                {place}
            </div>
            <div className='w-full flex justify-between items-center mt-4'>
                <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
                <p className='flex-1 text-center p-2'>{time}</p>
            </div>
            <div className='w-full flex justify-center items-center mt-4 gap-4'>
                <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>
                    Wind Speed <p className='font-normal'>{windspeed}</p></p>
                <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
                    Humidity <p className='font-normal'>{humidity}</p></p>
            </div>
            <div className='w-full p-3 mt-4 flex justify-between items-center'>
                <p className='font-semibold text-lg'>Heat Index <p className='text-lg'>{
                    heatIndex ? heatIndex : 'N/A'}
                </p></p>
            </div>
            <hr className='bg-slate-600'/>
            <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'> 
                    {conditions}
            </div>

        </div>
    )
}

export default WeatherCard