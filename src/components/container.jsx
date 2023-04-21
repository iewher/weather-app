import React, { useState } from 'react'
import GET_API from './GET_API'
import './style.css'

export default function Container() {
  const [city, setCity] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value)
    GET_API(event.target.value)
  }

  return (
    <div className='main'>
      <div className='container'>
        <div className='header'>
          <input type='text' placeholder='Введите город, чтобы узнать о нем информацию' value={city} onChange={handleInputChange} />
        </div>
        <div className='content'>

        </div>
        <div className='bottom'>

        </div>
      </div>
    </div>
  )
}
