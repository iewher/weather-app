import React from 'react'
import axios from 'axios'

const API_KEY = '88e144c5d2e3e012c2db6b8be6114ff8';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function GET_API(city, callback) {
  axios.get(API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  })
  .then(response => {
    if (response) {
      console.log(response.data)
      const temp = response.data.main.temp;
      const feelsLike = response.data.main.feels_like
      const windSpeed = response.data.wind.speed;
      const weather = response.data.weather[0].main;
      callback(temp, feelsLike, windSpeed, weather);
    } else {
      console.log('Response is undefined');
    }
  })
  .catch(error => {
    console.log(error);
  });
}

export default GET_API;