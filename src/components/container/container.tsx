import React, { useState, useEffect } from "react";
import GET_API from "../get-api/get-api";
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
import "../scss/container.scss";

interface ContainerProps {}

const Container: React.FC<ContainerProps> = () => {
  const [city, setCity] = useState<string>("");
  const [temp, setTemp] = useState<number | null>(null);
  const [temp_min, setTemp_min] = useState<number | null>(null);
  const [temp_max, setTemp_max] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [weather, setWeather] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [weatherText, setWeatherText] = useState<string>("");
  const [showContent, setShowContent] = useState<boolean>(false);
  const [homeScreen, setHomeScreen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (weather === "Clear") {
      setWeatherText("Ясно");
    } else if (weather === "Clouds") {
      setWeatherText("Облачно");
    } else if (weather === "Mist") {
      setWeatherText("Туман");
    } else if (weather === "Hail") {
      setWeatherText("Град");
    } else if (weather === "Rain") {
      setWeatherText("Дождь");
    } else if (weather === "Snow") {
      setWeatherText("Снег");
    } else if (weather === "Haze") {
      setWeatherText("Мгла");
    } else {
      setWeatherText("");
    }
  }, [weather]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSelectedCity(city);
      setCity("");
      setTemp(null);
      setTemp_min(null);
      setTemp_max(null);
      setFeelsLike(null);
      setWindSpeed(null);
      setWeather("");
      setShowContent(true);
      setHomeScreen(false);
      GET_API(
        city,
        (
          temp: number,
          temp_min: number,
          temp_max: number,
          feelsLike: number,
          windSpeed: number,
          weather: string
        ) => {
          setTemp(temp);
          setTemp_min(temp_min);
          setTemp_max(temp_max);
          setFeelsLike(feelsLike);
          setWindSpeed(windSpeed);
          setWeather(weather);
        }
      );
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const containerClassName = `container ${isDarkMode ? "dark" : "light"}`;

  return (
    <div className={`main ${isDarkMode ? "dark" : "light"}`}>
      <div className={containerClassName}>
        <div className="header">
          {/* <input
            type="text"
            placeholder="Введите город, чтобы узнать о нем информацию"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={handleKeyDown}
          /> */}
          <Input
            typeof="text"
            placeholder="Введите город, чтобы узнать о нем информацию"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={toggleDarkMode}>
            {isDarkMode ? "Светлая тема" : "Темная тема"}
          </button>
        </div>
        {homeScreen && (
          <>
            <div className="home-screen">
              Добро пожаловать, введите любой город на карте мира и я покажу о
              нем информацию
            </div>
          </>
        )}
        {showContent && (
          <>
            <div className="name-city">{selectedCity}</div>
            <div className="celsius">{Math.round(temp!)} °C</div>
            <div className="temp_min">
              Минимально: {Math.round(temp_min!)} °C
            </div>
            <div className="temp_max">
              Максимально: {Math.round(temp_max!)} °C
            </div>
            <div className="feels-like">
              Ощущается как: {Math.round(feelsLike!)} °C
            </div>
            <div className="content">
              {weatherText === "Ясно" && (
                <WiDaySunny className={"react-icons"} />
              )}
              {weatherText === "Облачно" && (
                <WiCloud className={"react-icons"} />
              )}
              {weatherText === "Туман" && <WiWindy className={"react-icons"} />}
              {weatherText === "Град" && <WiHail className={"react-icons"} />}
              {weatherText === "Дождь" && (
                <WiDayRainWind className={"react-icons"} />
              )}
              {weatherText === "Снег" && (
                <WiDaySnow className={"react-icons"} />
              )}
              {weatherText === "Мгла" && (
                <WiDayHaze className={"react-icons"} />
              )}
            </div>
            <div className="bottom">
              <ul className="list">
                <li>Состояние: {weatherText}</li>
                <li>Скорость ветра: {Math.round(windSpeed!)} м/c</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Container;
