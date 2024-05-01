"use client";

import { useState } from "react";
import temp from "../../public/temp.png";
import Header from "@/components/header";
import Degree from "@/components/degree";
import Search from "@/components/search";
import styles from "./page.module.scss";
import Image from "next/image";

export interface DataProps {
  name: string;
  visibility: number;
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
    gust: number;
  };
}

export default function Page() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<DataProps>();
  const [degree, setDegree] = useState("°C" || "°F");

  return (
    <div>
      <Header />
      <Degree degree={degree} setDegree={setDegree} />
      <Search city={city} setCity={setCity} setData={setData} />
      {data && (
        <div className={styles.Content}>
          <div className={styles.Card}>
            <div className={styles.Info}>
              <p>{data.name}</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
            <div className={styles.Temp}>
              <Image src={temp} alt="temp" width={20} height={60} />
              <p>
                {Math.round(
                  degree === "°C" ? data.main.temp : data.main.temp * 1.8 + 32,
                )}
                {degree}
              </p>
            </div>
            <div className={styles.Statuses}>
              {data.visibility && (
                <div className={styles.Status}>
                  <p>Видимость</p>
                  <p>{data.visibility / 100} %</p>
                </div>
              )}
              {data.wind.gust && (
                <div className={styles.Status}>
                  <p>Туман</p>
                  <p>{data.wind.gust} %</p>
                </div>
              )}
              {data.wind.speed && (
                <div className={styles.Status}>
                  <p>Ветер</p>
                  <p>{data.wind.speed} m/s</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
