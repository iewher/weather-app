import React, { useState, useEffect } from 'react'
import  GET_API  from './GET_API'
import {WiDaySunny, WiCloud, WiDayFog, WiHail } from "react-icons/wi";
import './style.css'

export default function Container() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weather, setWeather] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherText, setWeatherText] = useState('');

  useEffect(() => {
    if (weather === 'Clear') {
      setWeatherText('Ясно');
    } else if (weather === 'Clouds') {
      setWeatherText('Облачно');
    } else if (weather === 'Fog') {
      setWeatherText('Туман');
    } else if (weather === 'Hail') {
      setWeatherText('Град');
    } else {
      setWeatherText('');
    }
  }, [weather]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSelectedCity(city);
      setCity('');
      setTemp(null);
      setWindSpeed(null);
      setWeather('');
      GET_API(city, (temp, windSpeed, weather) => {
        setTemp(temp);
        setWindSpeed(windSpeed);
        setWeather(weather);
        console.log(temp);
        console.log(windSpeed);
        console.log(weather);
      });
    }
  }

  return (
    <div className='main'>
      <div className='container'>
        <div className='header'>
        <input type='text' placeholder='Введите город, чтобы узнать о нем информацию' value={city} onChange={(event) => setCity(event.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className='name-city'>{selectedCity}</div>
        <div className='celsius'>{temp}°C</div>
        <div className='content'>
          <WiCloud className={'react-icons'}/>
        </div>
        <div className='bottom'>
          <ul className='list'>
            <li>Состояние: {weatherText}</li>
            <li>Скорость ветра: {windSpeed} м/c</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
