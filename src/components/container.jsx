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
  const [temp_min, setTemp_min] = useState(null);
  const [temp_max, setTemp_max] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weather, setWeather] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherText, setWeatherText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [homeScreen, setHomeScreen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
  Определяю функцию, которая будет вызываться при нажатии клавиши Enter на клавиатуре в инпуте
  Переменные обновляют состояние
  */

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSelectedCity(city);
      setCity('');
      setTemp(null);
      setTemp_min(null);
      setTemp_max(null);
      setFeelsLike(feelsLike);
      setWindSpeed(null);
      setWeather('');
      setShowContent(true);
      setHomeScreen(false);
      GET_API(city, (temp, temp_min, temp_max, feelsLike, windSpeed, weather) => {
        setTemp(temp);
        setTemp_min(temp_min);
        setTemp_max(temp_max);
        setFeelsLike(feelsLike);
        setWindSpeed(windSpeed);
        setWeather(weather);

  /*
  Проверяю правильность поступления данных
  */      
  
        console.log(temp);
        console.log(windSpeed);
        console.log(weather);
        console.log(temp_min);
        console.log(temp_max);
      });
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const containerClassName = `container ${isDarkMode ? 'dark' : 'light'}`;

  return (
    <div className={`main ${isDarkMode ? 'dark' : 'light'}`}>
      <div className={containerClassName}>
        <div className='header'>
        <input type='text' placeholder='Введите город, чтобы узнать о нем информацию' value={city} onChange={(event) => setCity(event.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Светлая тема': 'Темная тема'}
        </button>
        </div>
        {homeScreen && (
          <>
          <div className='home-screen'>Добро пожаловать, введите любой город на карте мира и я покажу о нем информацию</div>
          </>
        )}
        {showContent && (
          <>
          <div className='name-city'>{selectedCity}</div>
          <div className='celsius'>{Math.round(temp)} °C</div>
          <div className='temp_min'>Минимально: {Math.round(temp_min)} °C</div>
          <div className='temp_max'>Максимально: {Math.round(temp_max)} °C</div>
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
