import axios, { all } from "axios"
import { useEffect } from "react"
import { useState } from "react"

const Country = ({ data }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_OPENWEATHER_KEY
    
    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${data.capital[0]}&limit=1&appid=${api_key}`)
        .then(response => {
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=${api_key}`)
            .then(res => {
                setWeather(res.data)
            })
        })
    }, [])

    return (
        <div>
            <h1>{data.name.common}</h1>

            <p>
                capital {data.capital[0]} <br/>
                area {data.area}
            </p>

            <h4>Languages:</h4>

            <ul>
                {Object.values(data.languages).map((lang) => 
                    <li key={lang}>{lang}</li>
                )}
            </ul>

            <img src={data.flags.png} alt={data.flags.alt} />

            {weather && (
                <>
                    <h3>Weather in {data.capital[0]}</h3>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>wind {weather.wind.speed} m/s</p>
                </>
            )}       
        </div>
    )
}

const Countrylist = ({ value, handleClick }) => {
    const [countryList, setCountryList] = useState("")

    useEffect(() => {
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
            const list = response.data.filter(
                country => country.name.common.toUpperCase().includes(value.toUpperCase())
            )

            setCountryList(list)
        })
    }, [value])

    if (countryList.length >= 250) {
        return null
    }  
    else if (countryList.length > 10 && countryList.length < 251) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countryList.length > 1) {
        return (
            <div>
                {countryList.map(country => 
                    <li key={country.name.common}> {country.name.common} 
                    <button onClick={() => handleClick(country.name.common)}>show</button></li>
                )}
            </div>
        )
    } 
    else if (countryList.length === 1) {
        return (
            <Country data={countryList[0]} />
        )
    }
    
    return null
}

export default Countrylist