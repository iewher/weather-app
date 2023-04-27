import React from 'react'
import axios from 'axios'

/*
Обьявляеем переменные API_KEY и API_URL
В API_KEY передаем значение токена
В API_URL передаем ссылку, куда будем делать запрос
*/

const API_KEY = '88e144c5d2e3e012c2db6b8be6114ff8';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

/*
Фукнция принимает два параметра
city - название города, для которого нужно получить данные
callback - фукнция обратного вызова, которая будет выполнена после получения ответа от API
*/

function GET_API(city, callback) {
  axios.get(API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  })
  .then(response => {

/*
Обязательно проверяем поступление данных
Если данные не поступили, обрабатывает ошибку
*/

    if (response) {
      console.log(response.data)

/*
Обращаемся к данным, которые нам вернул API запрос
*/

      const temp = response.data.main.temp;
      const temp_min = response.data.main.temp_min;
      const temp_max = response.data.main.temp_max;
      const feelsLike = response.data.main.feels_like
      const windSpeed = response.data.wind.speed;
      const weather = response.data.weather[0].main;
      callback(temp, temp_min, temp_max, feelsLike, windSpeed, weather);
    } else {
      console.log('Response is undefined');
    }
  })
  .catch(error => {
    console.log(error);
  });
}

export default GET_API;