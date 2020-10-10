import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ Country }) => {
    const [weather, setWeather] = useState({
        "current": {
            temperature: "",
            weather_descriptions: [],
            weather_icons: []
        }
    });


    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const weatherApiURI = `http://api.weatherstack.com/current?access_key=${api_key}&query=${Country.capital}`
        axios
            .get(weatherApiURI)
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data)
            })
    }, [Country.capital]);

    return (
        <div>
            <h2>{Country.name}</h2>
            <p>Alpha code: {Country.alpha2Code}</p>
            <p>Capital:    {Country.capital}</p>
            <p>Region:     {Country.region}</p>
            <div>Languages:
            <ul>
                {Country.languages.map(l =>
                    <li key={l.name}> {l.name}</li>
                )}
            </ul>
            </div>
            <img alt="flag" src={Country.flag} width="100" height="100" />
            <h3>Weather in {Country.capital}</h3>
            <p>Temperature: {weather.current.temperature}</p>
            <p>Description: {weather.current.weather_descriptions[0]}</p>
            <img alt="flag" src={weather.current.weather_icons[0]} width="50" height="50" />
        </div>
    )
}

export default Country