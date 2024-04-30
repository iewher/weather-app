"use client";

import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiWindy,
  WiHail,
  WiDayRainWind,
  WiDaySnow,
  WiDayHaze,
} from "react-icons/wi";
import { Input } from "antd";
import json from "../../data.json";
import styles from "./page.module.scss";

interface DataProps {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function Page() {
  const [city, setCity] = useState("");
  const [defaultScreen, setDefaultScreen] = useState(true);
  const [data, setData] = useState<DataProps>();

  const getData = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      fetch(
        json.API_URL +
          `?q=${city}` +
          `&appid=${json.API_KEY}` +
          `&units=metric` +
          `&lang=ru`,
      )
        .then((res) => res.json())
        .then((data) => setData(data));

      setDefaultScreen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.Main}>
      <form className="header" onSubmit={getData}>
        <Input
          typeof="text"
          placeholder="Введите город, чтобы узнать о нем информацию"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Поиск</button>
      </form>
      {defaultScreen && (
        <>
          <div className="home-screen">
            Добро пожаловать, введите любой город на карте мира и я покажу о нем
            информацию
          </div>
        </>
      )}
      {!defaultScreen && data && (
        <>
          <div className="name-city">{data.name}</div>
          <div className="celsius">{Math.round(data.main.temp)} °C</div>
          <div className="temp_min">
            Минимально: {Math.round(data?.main.temp_min)} °C
          </div>
          <div className="temp_max">
            Максимально: {Math.round(data.main.temp_max)} °C
          </div>
          <div className="feels-like">
            Ощущается как: {Math.round(data.main.feels_like)} °C
          </div>
          <div className="content">
            {data.weather[0].main === "Clear" && (
              <WiDaySunny className={"react-icons"} />
            )}
            {data.weather[0].main === "Cloudy" && (
              <WiCloud className={"react-icons"} />
            )}
            {data.weather[0].main === "Fog" && (
              <WiWindy className={"react-icons"} />
            )}
            {data.weather[0].main === "Hail" && (
              <WiHail className={"react-icons"} />
            )}
            {data.weather[0].main === "Rain" && (
              <WiDayRainWind className={"react-icons"} />
            )}
            {data.weather[0].main === "Snow" && (
              <WiDaySnow className={"react-icons"} />
            )}
            {data.weather[0].main === "Haze" && (
              <WiDayHaze className={"react-icons"} />
            )}
          </div>
          <div className="bottom">
            <ul className="list">
              <li>Состояние: {data.weather[0].description}</li>
              <li>Скорость ветра: {Math.round(data.wind.speed)} м/c</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
