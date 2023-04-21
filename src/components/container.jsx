import React, { useState } from 'react'
import  GET_API  from './GET_API'
import {WiDaySunny, WiCloud, WiDayFog, WiHail } from "react-icons/wi";
import './style.css'

export default function Container() {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSelectedCity(city);
      setCity('');
      GET_API(city);
    }
  }

  return (
    <div className='main'>
      <div className='container'>
        <div className='header'>
        <input type='text' placeholder='Введите город, чтобы узнать о нем информацию' value={city} onChange={(event) => setCity(event.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <div className='name-city'>{selectedCity}</div>
        <div className='celsius'>°C</div>
        <div className='content'>
          <WiCloud className={'react-icons'}/>
        </div>
        <div className='bottom'>
          <ul className='list'>
            <li>Состояние: </li>
            <li>Скорость ветра: </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
