import React from 'react'
import axios from 'axios'

const API_KEY = '88e144c5d2e3e012c2db6b8be6114ff8';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function GET_API(city) {
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
  .catch(error => {
    console.log(error);
  });

  return (
    <div>
      Привет
    </div>
  );
}

export default GET_API;