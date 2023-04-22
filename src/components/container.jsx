import React, { useState, useEffect } from 'react'
import  GET_API  from './GET_API'
import {WiDaySunny, WiCloud, WiWindy, WiHail, WiDayRainWind, WiDaySnow, WiDayHaze } from "react-icons/wi";
import './styles/style.css'

export default function Container() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weather, setWeather] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherText, setWeatherText] = useState('');

  useEffect(() => {
    if (weather === 'Clear') {
      setWeatherText('Ясно');
    } else if (weather === 'Clouds') {
      setWeatherText('Облачно');
    } else if (weather === 'Mist') {
      setWeatherText('Туман');
    } else if (weather === 'Hail') {
      setWeatherText('Град');
    } else if (weather === 'Rain') {
      setWeatherText('Дождь')
    } else if (weather === 'Snow') {
      setWeatherText('Снег');
    } else if (weather === 'Haze') {
      setWeatherText('Мгла');
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
      setFeelsLike(feelsLike);
      setWindSpeed(null);
      setWeather('');
      GET_API(city, (temp, feelsLike, windSpeed, weather) => {
        setTemp(temp);
        setFeelsLike(feelsLike);
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
        <div className='celsius'>{temp} °C</div>
        <div className='feels-like'>Ощущается как: {feelsLike} °C</div>
        <div className='content'>
          {weatherText === 'Ясно' && <WiDaySunny className={'react-icons'}/>}
          {weatherText === 'Облачно' && <WiCloud className={'react-icons'}/>}
          {weatherText === 'Туман' && <WiWindy className={'react-icons'}/>}
          {weatherText === 'Град' && <WiHail className={'react-icons'}/>}
          {weatherText === 'Дождь' && <WiDayRainWind className={'react-icons'}/>}
          {weatherText === 'Снег' && <WiDaySnow className={'react-icons'}/>}
          {weatherText === 'Мгла' && <WiDayHaze className={'react-icons'}/>}
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
