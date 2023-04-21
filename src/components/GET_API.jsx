import React from 'react'
import axios from 'axios'

const API_KEY = '88e144c5d2e3e012c2db6b8be6114ff8';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function GET_API(city, temp) {

  axios.get(API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  })
  .then(response => {
    console.log(response.data);
  })
  .then(response => {
    console.log(response.data);
    const temp = response.data.main.temp;
    console.log(`Temperature in ${city}: ${temp}°C`);
  })
  .catch(error => {
    console.log(error);
  });
}

export default GET_API;