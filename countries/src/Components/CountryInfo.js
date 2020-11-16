import React,{useState,useEffect} from 'react';
import axios from 'axios';

const CountryInfo = ({country}) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const [climate,setWeather] = useState({});
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
            .then(response => {
                setWeather(response.data);
            })
    },[])
    return(
        <>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            {
                country.languages.map(language => {
                    return (
                        <li key={language.name}>{language.name}</li>
                    )
                })
            }

            {
                climate.hasOwnProperty('weather') ? 
                    <>
                    <h2>Weather in {country.capital}</h2>
                    <p>{climate.main.temp} in Kelvin</p>
                    <p>{climate.wind.speed} in meter/sec</p>
                    <p>{climate.wind.deg} in wind direction in degrees</p>
                    </>
                :''
            }
            
        </>
    )
}

export default CountryInfo;