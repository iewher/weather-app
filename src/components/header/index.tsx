import { useState } from "react";
import Input from "antd/es/input/Input";
import json from "../../../data.json";
import { DataProps } from "@/app/page";
import { FiSearch, FiMenu } from "react-icons/fi";
import styles from "./index.module.scss";

interface HeaderProps {
  city: string;
  setCity: (city: string) => void;
  setData: (arg0: DataProps) => void;
  setDefaultScreen: (arg0: boolean) => void;
  setSwitchTheme: (arg0: boolean) => void;
}

export default function Header({
  city,
  setCity,
  setData,
  setDefaultScreen,
  setSwitchTheme,
}: HeaderProps) {
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
      setCity("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={styles.Header} onSubmit={getData}>
      <Input
        typeof="text"
        placeholder="Введите город, чтобы узнать о нем информацию"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button type="submit">
        <FiSearch />
      </button>
    </form>
  );
}
