import React, { useState, useEffect } from 'react'
import  GET_API  from './GET_API'
import {WiDaySunny, WiCloud, WiWindy, WiHail, WiDayRainWind, WiDaySnow, WiDayHaze } from "react-icons/wi";
import './styles/style.css'

export default function Container() {

  /* 
  Добавляю хук состояния для каждого элемента, который в дальнейшем вызываю
  Для каждого элемента задаю переменную, а так же фукнцию, обновляющую ее состояние
  */
 
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weather, setWeather] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherText, setWeatherText] = useState('');
  const [showContent, setShowContent] = useState(false);

  /*
  Добавляю хук отслеживания событий и обновления переменной
  При выполнении условия, значение переменной обновляется
  */

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

  /*
  Определяю функцию handleInputChange, которая будет вызываться при изменении значения в инпуте
  Эта функция используется для обновления значений в режиме реального времени
  */

  const handleInputChange = (event) => {
    setCity(event.target.value);
  }

  /*
  Определяю функцию, которая будет вызываться при нажатии клавиши на клавиатуре в инпуте
  Переменные обновляют состояние
  */

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSelectedCity(city);
      setCity('');
      setTemp(null);
      setFeelsLike(feelsLike);
      setWindSpeed(null);
      setWeather('');
      setShowContent(true);
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
        {showContent && (
          <>
          <div className='name-city'>{selectedCity}</div>
          <div className='celsius'>{Math.round(temp)} °C</div>
          <div className='feels-like'>Ощущается как: {Math.round(feelsLike)} °C</div>
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
              <li>Скорость ветра: {Math.round(windSpeed)} м/c</li>
            </ul>
          </div>
          </>
        )}
      </div>
    </div>
  )
}
