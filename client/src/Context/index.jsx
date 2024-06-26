import { createContext,useState,useEffect, useContext } from "react";

import axios from 'axios'

const StateContext = createContext();

export const StateContextProvider = ({children})=>{
    const [weather, setWeather]  = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Nyeri')
    const [location, setLocation] = useState('')

    const fetchWeather = async() =>{
        const options = {
            method:'GET',
            url:'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params:{
                aggregateHours: '24',
                location: place,
                contentType:'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers:{
                'x-RapidAPI-Key':'8d84922c8bmsh556f39e8cef391cp1bfc5ejsna5fb3444a910',
                'x-RapidAPI-Host':'visual-crossing-weather.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
           // console.log(response.data)
            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            setWeather(thisData.values[0])
        } catch (error) {
            console.error(error)   
            
        }
    }

    useEffect(()=>{
        fetchWeather()
    },[place])

    useEffect(()=>{
       // console.log(values)
    },[values])

    return(
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            location,
            place
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)