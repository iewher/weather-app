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
      <form className={styles.Header} onSubmit={getData}>
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
          <div className={styles.Default}>
            Добро пожаловать, введите любой город на карте мира и я покажу о нем
            информацию
          </div>
        </>
      )}
      {!defaultScreen && data && (
        <>
          <div className={styles.CityName}>{data.name}</div>
          <div className={styles.Celsius}>{Math.round(data.main.temp)} °C</div>
          <div className={styles.MinTemp}>
            Минимально: {Math.round(data?.main.temp_min)} °C
          </div>
          <div className={styles.MaxTemp}>
            Максимально: {Math.round(data.main.temp_max)} °C
          </div>
          <div className={styles.FeelsLike}>
            Ощущается как: {Math.round(data.main.feels_like)} °C
          </div>
          <div className={styles.Content}>
            {data.weather[0].main === "Clear" && (
              <WiDaySunny className={styles.Icon} />
            )}
            {data.weather[0].main === "Cloudy" && (
              <WiCloud className={styles.Icon} />
            )}
            {data.weather[0].main === "Fog" && (
              <WiWindy className={styles.Icon} />
            )}
            {data.weather[0].main === "Hail" && (
              <WiHail className={styles.Icon} />
            )}
            {data.weather[0].main === "Rain" && (
              <WiDayRainWind className={styles.Icon} />
            )}
            {data.weather[0].main === "Snow" && (
              <WiDaySnow className={styles.Icon} />
            )}
            {data.weather[0].main === "Haze" && (
              <WiDayHaze className={styles.Icon} />
            )}
          </div>
          <div className={styles.Bottom}>
            <ul className={styles.List}>
              <li>Состояние: {data.weather[0].description}</li>
              <li>Скорость ветра: {Math.round(data.wind.speed)} м/c</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
