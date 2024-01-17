import React from "react";
import axios from "axios";
import data from '../../data.json';

const API_KEY = data.API_KEY;
const API_URL = data.API_URL;

function GET_API(city: string, callback: any) {
  axios
    .get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    })
    .then((response) => {
      if (response) {
        const temp = response.data.main.temp;
        const temp_min = response.data.main.temp_min;
        const temp_max = response.data.main.temp_max;
        const feelsLike = response.data.main.feels_like;
        const windSpeed = response.data.wind.speed;
        const weather = response.data.weather[0].main;
        callback(temp, temp_min, temp_max, feelsLike, windSpeed, weather);
      } else {
        console.log("Response is undefined");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export default GET_API;
