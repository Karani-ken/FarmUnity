import { useState } from "react"
import { useStateContext } from "../../Context"
import Clear from '../../Assets/Image/Clear.jpg'
import Cloudy from '../../Assets/Image/Cloudy.jpg'
import Fog from '../../Assets/Image/fog.png'
import Rainy from '../../Assets/Image/Rainy.jpg'
import Snow from '../../Assets/Image/snow.jpg'
import Stormy from '../../Assets/Image/Stormy.jpg'
import Sunny from '../../Assets/Image/Sunny.jpg'
import { useEffect } from "react"
const BackgroundLayout = () => {
    const {weather} = useStateContext()
   const [image, setImage] = useState(Clear)
   useEffect(()=>{
        if(weather?.conditions){
            let imageString = weather.conditions

            if(imageString.toLowerCase().includes('clear')){
                setImage(Clear)
            }else if(imageString.toLowerCase().includes('cloud')){
                setImage(Cloudy)
            }else if(imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('showers')){
                setImage(Rainy)
            }else if(imageString.toLowerCase().includes('snow')){
                setImage(Snow)
            }else if(imageString.toLowerCase().includes('fog')){
                setImage(Fog)
            }else if(imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')){
                setImage(Stormy)
            }
        }
   },[weather])
  return (
   <img src={image} alt="Weather_image" className="h-[90vh] w-full fixed left-0 top-10 mt-[92px]  -z-[10]"/>
  )
}

export default BackgroundLayout